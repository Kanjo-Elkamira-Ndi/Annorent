# Annorent — Workflows

> How work actually moves from idea to production, for humans and for opencode.

## Branching & PRs

- `main` is always deployable. Feature branches off `main`, named
  `<type>/<short-description>` (`feat/rental-availability-calendar`,
  `fix/booking-race-condition`).
- Every PR: passes lint + typecheck + unit tests in CI before it's reviewable.
- PR description states which module (M1–M13) it touches and links the relevant
  `/context` doc(s) if the change involves a pattern worth double-checking (auth,
  payments, geospatial queries).
- One approving review minimum before merge; **any PR touching auth, payments, or
  raw SQL gets reviewed against `security.md` and `code-standards.md` explicitly**,
  not just skimmed for style.

## CI pipeline (per repo)

1. Install deps (npm).
2. Lint + typecheck.
3. Unit tests (repository tests run against a real test Postgres instance, not
   mocked SQL — see `code-standards.md`).
4. Build.
5. On `main` merge: deploy to staging automatically; production deploy is a
   manual promote after smoke-testing staging.
6. E2E suite (Playwright) runs against staging before a production promote is
   allowed.

## Local development

- `docker-compose up` brings up local Postgres (with PostGIS extension enabled) and
  Redis — no developer should be pointing at a shared or production database
  locally.
- `.env.example` in each repo lists every variable needed; copy to `.env` and fill
  in local/staging values, never commit `.env`.
- Migrations run via the custom runner (`npm run migrate`) — never hand-edit the
  database schema directly, even locally, so migrations stay the single source of
  truth.

## Deployment independence

Per `architecture.md`, each service (web, Core API, realtime, AI service,
tour-processing workers) deploys independently. A web deploy never waits on a
backend deploy. When a backend change is a breaking API change, bump the API
version (`/api/v2/...`) rather than mutating `/api/v1/...` in place, and keep
`/api/v1` serving old mobile clients until a defined deprecation window closes.

## Release cadence for mobile vs. web/backend

- Web and Core API can deploy multiple times a day; that's fine, they're always in
  sync with each other through the versioned contract.
- Mobile app store releases are slow and can't be forced onto users — **never ship
  a backend change that assumes every mobile client has updated.** Add new fields
  additively; don't remove/rename a field an old app version depends on without a
  version bump and a deprecation period.

## Definition of done

A feature isn't done when the code merges — it's done when:
- Tests cover the happy path and at least the primary failure path (booking
  conflict, invalid payment, unauthorized access).
- The relevant `/context` doc is updated if the change introduces a new pattern,
  endpoint group, or table (e.g. a new module's endpoints get added to
  `api-reference.md`, a new table gets added to `database-schema.md`).
- It's been checked against `security.md` if it touches auth, payments, PII, or
  raw SQL.

## Working with opencode

- **Give it the right `/context` file(s) before the task, not after.** For a
  backend endpoint: `api-reference.md` + `database-schema.md` + `code-standards.md`.
  For a UI screen: `ui-context.md` + the file-structure doc. For anything touching
  money or auth: always include `security.md`.
- **Review its output exactly as you'd review a co-developer's PR** — the standards
  in `code-standards.md` and `security.md` apply regardless of who/what wrote the
  code. The no-ORM/raw-`pg` rule is the single most common thing an agent will get
  "wrong by default" since most training data assumes an ORM in a NestJS project —
  check this specifically.
- **Keep `/context` itself up to date.** If a design decision changes (a new module,
  a changed schema, a new security requirement), update the relevant doc in the same
  PR as the code change — stale context docs actively mislead the next agent
  session more than no docs would.
- When opencode's suggestion conflicts with something in `/context`, the doc wins
  unless the team explicitly decides to change the doc first — don't let an
  agent-generated pattern silently become the new de facto standard without that
  being a deliberate decision.

## Issue tracking

Link every PR to an issue/ticket describing the intended behavior — "what should
this do" should be reviewable independent of "how it was implemented," which matters
especially when an agent generated the implementation.
