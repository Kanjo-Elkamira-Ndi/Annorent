# Annorent — Architecture

> The confirmed system design. If a change would violate a boundary described here,
> that's a signal to raise it before implementing, not to route around it quietly.

## Guiding principle

**One API contract, many clients.** Web (Next.js), mobile (Flutter), and any future
third-party integration all consume the same versioned NestJS core API — nothing
talks to the database, cache, realtime layer, or Python services directly except the
core API itself.

## Service map

| Service | Tech | Responsibility | Scales independently because |
|---|---|---|---|
| **Web frontend** | Next.js (frontend-only) | SSR/ISR public pages, authenticated dashboards | Client, not compute-shared with backend |
| **Mobile app** | Flutter | Native Android/iOS client | Same reason |
| **Core API** | NestJS/TypeScript | Auth, RBAC, all business logic, orchestrates everything else | Stateless REST, horizontally scalable |
| **Realtime service** | Socket.IO + Redis adapter | Chat (M6), live notifications (M9) | Long-lived connections behave nothing like REST traffic — isolated so a chat surge doesn't degrade search/booking |
| **AI service** | Python (FastAPI) | Recommendation serving (planned) | Synchronous, lightweight — separate from tour processing so a processing spike doesn't slow inference |
| **Tour-processing workers** | Python (Celery/RQ + Redis) | Panorama stitching / 3D reconstruction / media processing | Async, CPU-heavy, queue-driven — scales out under load, scales to zero when idle |
| **Database** | PostgreSQL + PostGIS | System of record, geospatial queries | Vertical + read replicas as needed |
| **Cache/Queue** | Redis | Search/availability caching, job queue backing | Shared infra, not a bottleneck at current scale |
| **Object storage + CDN** | S3-compatible + CDN | All media (photos, video, 3D tours) | Media traffic never touches app-server compute |
| **Payments** | Mobile-money aggregator (e.g. CinetPay/Fapshi) | Orange Money, bank transfer, future cards | External, PCI/compliance burden lives with the aggregator |

## Why services are split this way

This split exists specifically to avoid three failure modes discussed and rejected
during design:

1. **Monolithic Next.js (frontend + API in one process).** Rejected — SSR and API
   traffic have different resource profiles and would compete for the same compute
   under load, and mobile clients would need a second, inconsistent auth model
   bolted on.
2. **"Two threads, one server" for maps and virtual tours.** Rejected — threads
   share a process and a crash domain; a leak or spike in one takes down both, and
   neither gets independent scaling. Maps and virtual tours also have opposite load
   profiles (I/O-bound vs. CPU/bandwidth-bound) and shouldn't be paired at all.
3. **AI and virtual-tour processing bundled into one Python service.** Rejected for
   the same reason — synchronous recommendation-serving and async heavy media
   processing have incompatible scaling needs and must be separately deployable.

## Data flow: a booking

1. Client calls `POST /api/v1/.../bookings` on the Core API with a valid JWT.
2. Core API opens a Postgres transaction, checks availability (PostGIS/date-range
   query), creates the booking row, and initiates payment via the aggregator.
3. On success, commit; on any failure, roll back entirely — no partial state
   (NFR-R1, NFR-RENT-1).
4. Core API pushes a `booking:status_changed` event to the realtime service, which
   fans it out to the relevant connected clients, and enqueues a receipt-generation
   job on Redis.
5. A worker generates the certified receipt (NFR-R2) and the notification service
   fires a `notification:new` event.

## Data flow: media (photos, video tours, 3D tours)

1. Client requests a signed upload URL from the Core API.
2. Client uploads directly to object storage — bytes never pass through the Core API
   or app server.
3. Core API enqueues a processing job (thumbnailing, tour stitching) on the
   tour-processing workers.
4. Worker writes results back to storage, updates status via the Core API, which
   notifies the client.
5. All clients (web via CDN URL, mobile via the same URL) fetch media straight from
   the CDN — never re-proxied through the Core API.

## Geospatial

PostGIS handles all "nearby," distance, and map-bounds queries (F5.1–F5.5) directly
in Postgres. The maps provider (external) is used only for geocoding addresses and
rendering map tiles/directions client-side — Annorent does not attempt to replace a
mapping provider, only to query its own inventory geospatially.

## Caching strategy

Redis caches:
- Search/availability query results (short TTL, invalidated on booking/listing
  change) — NFR-P2, NFR-RENT-2 (fast, deterministic availability).
- Geocoding lookups from the maps provider (addresses rarely move).

Redis backs:
- The job queue for receipt generation, notification fan-out, media processing
  callbacks, and monthly billing reminders (NFR-RENT-3).

## No ORM, by design

Data access uses raw `pg` queries behind a repository layer, not an ORM (Prisma,
TypeORM, etc.), consistent with the team's standing convention. See
`code-standards.md` and `database-schema.md` for how this is structured — the
tradeoff (more explicit SQL, no auto-generated migrations) is accepted deliberately
in exchange for full control over the queries that back atomicity and geospatial
performance requirements.

## Deployment independence

Each service in the map above is independently deployable. A web frontend deploy
never requires a backend deploy and vice versa; a Python service deploy never
requires touching the NestJS core. This is what makes the versioning discipline in
`api-reference.md` necessary — clients (especially mobile, which can't be
force-updated) must tolerate the Core API evolving without them.
