# Annorent — Developer Map

> Start here if you're new — human or agent. This is the index; every other file in
> `/context` is the detail.

## The system in one paragraph

Annorent is a real estate & hospitality marketplace (property sales, long-term
leases, flexible/coworking rentals, hotel bookings) serving Cameroon → Africa →
international. One versioned NestJS core API serves a Next.js web app and a Flutter
mobile app identically. Realtime chat/notifications, AI recommendations, and virtual
tour processing are separate services behind that same API — never called directly
by clients. PostgreSQL + PostGIS is the system of record, accessed via raw `pg`
queries (no ORM), never an ORM. Redis caches and queues. Media lives in object
storage behind a CDN, never proxied through app compute. Payments run through a
Mobile Money aggregator.

## Repos (assumed layout — confirm against actual repo names)

| Repo | Contains |
|---|---|
| `annorent-web` | Next.js frontend — see `annorent-web-file-structure.md` |
| `annorent-mobile` | Flutter app |
| `annorent-api` | NestJS core API — modules M1–M13 |
| `annorent-ai-services` | Python FastAPI (recommendations) + Celery/RQ workers (tour processing) |

Each repo keeps its own `/context` copy (or symlinks to a shared docs source) so
opencode always has this reference material loaded regardless of which repo it's
working in.

## Where to find what

| Question | Read |
|---|---|
| What is this product, who's it for, what modules exist? | `project-overview.md` |
| What should a screen look/feel like, and where does it live? | `ui-context.md` |
| How do clients call the backend? What's the response shape? | `api-reference.md` |
| How are services split, and why? | `architecture.md` |
| How should this code be written/structured? | `code-standards.md` |
| What tables exist, how do they relate? | `database-schema.md` |
| What's the auth model, RBAC rule, payment-security rule? | `security.md` |
| How do I branch, test, deploy, and work with opencode? | `workflows.md` |
| Where does a given file/component actually live in the web repo? | `file-structure.md` |
| What routes exist and who can see them, and what's designed vs. not yet? | `sitemap.md` |
| Where do the brand colour/type tokens live, and how do I add one? | `src/app/[locale]/globals.css` — the `@theme` block |
| Where does the home hero live? | `src/components/marketing/hero.tsx` (server), `search-bar.tsx` (the one client island), `trust-metrics.tsx` |

## Read order for a new developer or a fresh opencode session

1. `project-overview.md` — what and why.
2. `architecture.md` — how the pieces fit and why they're split this way.
3. `database-schema.md` — the data model everything builds on.
4. `api-reference.md` — the contract every client speaks.
5. `security.md` — the non-negotiables.
6. `code-standards.md` — how to actually write it.
7. `ui-context.md` — for anything touching a screen.
8. `file-structure.md` — for anything in the web repo specifically.
9. `workflows.md` — how to ship it.

## Non-negotiables worth repeating here

These come up across almost every doc above, which is itself a signal of how central
they are:

- **No ORM. Ever.** Raw `pg`, parameterized queries, repository layer.
- **One API contract for web and mobile.** No client-specific response shapes.
- **Media never touches app-server compute.** Object storage + CDN, always.
- **Booking + payment is atomic.** A DB transaction, every time, no exceptions for
  "quick" flows.
- **GPS hidden until booking confirmed.** Enforced server-side, not client-side.
- **API versioned from day one.** Mobile clients can't be force-updated.
- **`src/server/` in the web repo stays a thin BFF.** Business logic belongs in the
  Core API, not the frontend repo.

## Keeping this map current

If a new service, module, or major table gets added, update this file's "repos"
and "where to find what" tables in the same PR — an out-of-date developer map is
worse than none, since it actively points the next reader (or agent) somewhere
stale.