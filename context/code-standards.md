# Annorent — Code Standards

> How code gets written here, consistently, whether it's written by a person or by
> opencode. When in doubt, match the pattern already in the nearest existing file
> before inventing a new one.

## Languages & tooling

- **TypeScript everywhere** (web, backend, shared types) — strict mode on, no `any`
  without a comment explaining why.
- **npm exclusively** — no yarn/pnpm lockfiles in any repo.
- **Python** (FastAPI + Celery/RQ) for the AI and tour-processing services only —
  kept isolated behind their own API/queue boundary, never imported into the
  TypeScript codebase or vice versa.

## Database access: no ORM, ever

Raw `pg` queries behind a repository layer — this is a standing convention, not
open for debate per-PR:
- Hand-written SQL migrations, numbered sequentially, run by a custom migration
  runner (not an ORM's migration tool).
- Each module (M1–M13) gets a `repositories/` file that maps rows → domain objects
  and exposes typed functions (`findPropertyById`, `createBooking`, etc.) —
  controllers/services never write raw SQL directly, only repositories do.
- Parameterized queries only — no string-concatenated SQL, ever (NFR-S4).
- Transactions (`BEGIN`/`COMMIT`/`ROLLBACK`) are explicit in the repository/service
  layer for any multi-step write (see `architecture.md` booking flow) — don't rely
  on an ORM's unit-of-work abstraction that doesn't exist here.

## Structure conventions

- **Backend (NestJS):** one module per M1–M13 domain area — controller → service →
  repository, each layer with a single responsibility. Business logic lives in
  services, never in controllers.
- **Frontend (Next.js):** see `annorent-web-file-structure.md` — components by
  domain, `lib/` for shared client-safe logic, `server/` stays a thin BFF (session,
  locale, proxying) and must never grow business logic. If a PR adds a
  repository/service-style file under the web app's `src/server/`, that logic
  belongs in the backend instead.
- **Shared types:** generated from the backend's OpenAPI spec
  (`scripts/generate-api-types.mjs`) — never hand-duplicate a DTO shape on the
  frontend.

## Naming

- Files: `kebab-case.ts` / `kebab-case.tsx`
- Classes, types, interfaces: `PascalCase`
- Functions, variables: `camelCase`
- Constants that are truly fixed: `SCREAMING_SNAKE_CASE`
- Database columns/tables: `snake_case` (Postgres convention), mapped to `camelCase`
  domain objects at the repository boundary — the mapping itself lives in one place
  per table, not scattered.

## Error handling (NFR-SU3)

- Typed error classes per failure category (`ValidationError`, `NotFoundError`,
  `BookingConflictError`, `PaymentError`) — never throw raw strings or let a driver
  error escape to the client.
- No stack traces or raw database error messages ever reach a production response —
  map to the error-code envelope described in `api-reference.md`.
- Every caught error that isn't expected user-input error gets logged with context
  (request id, user id if available) but never with secrets, tokens, or full
  payment payloads (see `security.md`).

## Testing

- Unit tests co-located with the file they test (`*.test.ts` next to the source
  file).
- Every repository function gets a test against a real (test) Postgres instance —
  not mocked SQL, since the whole point of raw `pg` is exact query behavior.
- Every service function with business rules (booking atomicity, pricing
  calculation, RBAC checks) gets unit tests covering the failure paths, not just
  the happy path.
- End-to-end tests (Playwright, web repo) cover cross-cutting flows: auth + RBAC
  redirect, full booking + payment, owner listing creation + admin verification.

## Documentation expectations

- Every new module gets a short doc comment at the top of its main service file:
  what it owns, what it explicitly does not own.
- Any deviation from a pattern described in these `/context` docs needs a one-line
  comment explaining why, so the next reader (human or agent) doesn't "fix" it back.

## Working with opencode specifically

- Point opencode at the relevant `/context/*.md` file(s) for the task before asking
  it to generate code — don't rely on it inferring architecture from a single file
  it's currently looking at.
- Generated code follows every rule above exactly as if written by a person — "the
  agent wrote it" is not an exception to review against `security.md` or this file.
- Review AI-generated database access code especially carefully for the no-ORM/
  parameterized-query rule — this is the rule most likely to get silently violated
  since it goes against the default pattern most training data assumes for NestJS.
