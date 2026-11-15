# Annorent — API Reference & Contract Conventions

> This is the contract every client (Next.js web, Flutter mobile, and internal
> services) consumes identically. No client gets a bespoke shape. Full field-level
> docs are generated from NestJS decorators into an OpenAPI spec — this doc is the
> structural convention that spec must follow, and what an agent should assume when
> writing or consuming an endpoint.

## Base conventions

- **Base path:** `/api/v1/...` — every route is versioned from day one. Mobile apps
  live on devices across many backend deploys; an unversioned API breaks old app
  versions silently.
- **Auth:** Bearer JWT access token in the `Authorization` header for all clients
  (web included — stored in an httpOnly cookie and attached server-side/via the BFF,
  not read by client JS). Refresh tokens rotate via a dedicated endpoint.
- **Format:** JSON in, JSON out. No endpoint returns HTML.

## Response envelope

Every response follows the same shape so clients can handle success/error uniformly:

```json
// success
{ "data": { ... }, "meta": { ... } }

// error
{ "error": { "code": "BOOKING_CONFLICT", "message": "..." } }
```

- `code` is a stable, machine-readable string (`AUTH_INVALID_CREDENTIALS`,
  `BOOKING_CONFLICT`, `PAYMENT_FAILED`, `VALIDATION_ERROR`, `NOT_FOUND`,
  `FORBIDDEN`) — never a raw stack trace or driver error message (NFR-SU3).
- `meta` carries pagination info on list endpoints (see below).

## Pagination (NFR-P2)

All list endpoints are paginated with a consistent shape:

```json
{ "data": [ ... ], "meta": { "currentPage": 1, "totalPages": 8, "totalItems": 152, "pageSize": 20 } }
```

## Resource groups (one per module, M1–M13)

| Path prefix | Module | Notes |
|---|---|---|
| `/auth` | M1 | register, login, refresh, logout, register/owner, register/hotel |
| `/users` | M1 | profile, role management (admin only for role changes) |
| `/properties` | M2 | CRUD, search, `gpsCoordinates` withheld until `status = booked` (F2.3) |
| `/rentals` | M4 | rentable units, availability, pricing |
| `/hotels`, `/rooms`, `/reservations` | M3 | business accounts, room lock/unlock, reservations |
| `/search` | M5 | filtered search across properties/rentals/hotels |
| `/map` | M5 | nearby, directions, distance — thin proxy to the maps provider, cached in Redis |
| `/conversations`, `/messages` | M6 | REST for history; live delivery is WebSocket, not polling |
| `/appointments` | M7 | scheduling, reminders |
| `/payments`, `/receipts` | M8 | initiate, webhook receiver, receipt retrieval |
| `/notifications` | M9 | REST for history/read-state; live delivery is WebSocket |
| `/advertisements` | M10 | featured/business ad management |
| `/admin/*` | M11 | verification queues, user management, reports — all guarded by `admin` role |
| `/recommendations` | Planned (AI) | proxies to the Python recommendation service — never called directly by clients |

## WebSocket events (Socket.IO, realtime service)

Clients connect to the realtime service (separate from the REST API) after
authenticating with the same JWT. Event naming: `domain:action`.

| Event | Direction | Payload |
|---|---|---|
| `message:new` | server → client | new chat message |
| `message:read` | client → server → server → client | read receipt |
| `typing:start` / `typing:stop` | client ↔ client | conversation id |
| `notification:new` | server → client | notification payload (M9) |
| `booking:status_changed` | server → client | booking/reservation status update |

## Booking + payment atomicity (NFR-R1, NFR-RENT-1)

`POST /rentals/:id/bookings` and equivalent hotel/property booking endpoints must:
1. Open a DB transaction.
2. Lock/check the availability window.
3. Create the booking row.
4. Initiate the payment (or reserve the slot pending payment, per product decision).
5. Commit only if all steps succeed; roll back entirely on any failure — no
   double-booked units, no charged-but-unbooked payments.

## Rate limiting (NFR-S3)

Auth endpoints (`login`, `register`, `password-reset`, `refresh`) are rate-limited
per IP/account distinct from general API rate limits — stricter, and never shares a
limiter bucket with search/browse traffic.

## Client type-generation

Frontend TypeScript types are generated from the backend's OpenAPI spec
(`scripts/generate-api-types.mjs` in the web repo) — never hand-duplicated. If a
backend DTO changes and the frontend type doesn't regenerate, that's a build-breaking
signal, which is the intended behavior.

## What an agent should never do

- Never have a client (web or mobile) call the Python AI or tour-processing services
  directly — always through `/api/v1/...` on the core API.
- Never add an endpoint that returns a different shape for web vs. mobile "because
  it's easier" — one contract, one DTO, both clients adapt in their own render layer.
- Never skip the pagination envelope on a list endpoint, even one that "won't ever
  have many rows" — consistency here is what lets one API client library work
  everywhere.
