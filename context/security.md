# Annorent — Security

> Maps directly to the SRS's non-functional security requirements (NFR-S1–S5,
> NFR-R1–R3). Treat this as a checklist for any PR touching auth, payments, or user
> data — not aspirational.

## Authentication

- JWT access + refresh tokens for **all** clients — web, mobile, and any future
  integration. Web stores the access token in an httpOnly, secure, SameSite cookie
  set via the Next.js BFF; mobile uses secure device storage. No client-side JS ever
  reads the raw token on web.
- Passwords hashed with a strong, slow algorithm (argon2 or bcrypt with an adequate
  cost factor) — never reversible encryption, never plain text, ever.
- Refresh token rotation on use; a reused/stale refresh token invalidates the whole
  session family (basic theft detection).

## Authorization (RBAC)

- Every route on the Core API is guarded by role (`tenant`, `property_owner`,
  `hotel_owner`, `admin`) — enforced server-side in NestJS guards, never trusted
  from a client-supplied role claim alone without re-verifying against the DB/JWT.
- "Only verified users can act on listings" (NFR-S1) — a property/rental/hotel
  action endpoint checks `is_verified` on the owner before allowing writes, not just
  role.
- Ownership checks are separate from role checks: a `property_owner` can only edit
  *their own* properties — every mutating endpoint verifies `owner_id` matches the
  authenticated user (or that the caller is `admin`).

## Rate limiting (NFR-S3)

Auth endpoints (login, register, password-reset, refresh) get a dedicated, stricter
rate limiter than general API traffic, keyed by IP and/or account — never sharing a
limiter bucket with search/browse endpoints (see `api-reference.md`).

## Input validation & injection prevention (NFR-S4)

- Every request body/query validated against a schema (Zod on the frontend forms,
  class-validator or Zod on the NestJS side) before it reaches a service.
- No raw SQL string concatenation, ever — parameterized queries only (see
  `code-standards.md`), since there's no ORM providing this by default.
- File uploads (property photos, videos, 3D tours) validated by type and size before
  a signed upload URL is issued; scan/validate again on the processing worker side,
  don't trust the client-declared MIME type alone.
- CORS configured via environment variables per environment (dev/staging/prod), not
  hardcoded, and never `*` in production.

## Secrets

- No secrets in source control, ever — `.env.example` documents variable names only.
- Payment aggregator API keys, JWT signing secrets, and map/CDN keys live in the
  deployment platform's secret manager, injected as environment variables at
  runtime.
- Logs never contain tokens, password hashes, full payment payloads, or raw
  request/response bodies from the payments module — log identifiers (user id,
  payment id, request id), not the sensitive content itself.

## Payments (NFR-S2)

- Annorent never stores raw card numbers or full Mobile Money account details —
  that's the aggregator's PCI-scope responsibility, not this platform's.
- Payment webhooks from the aggregator are signature-verified before being trusted;
  an unsigned or invalid-signature webhook is rejected and logged, never processed.
- Idempotency: a webhook or client retry must not double-charge or double-create a
  booking — use an idempotency key (e.g. the aggregator's transaction reference) to
  make payment confirmation safe to receive more than once.
- Certified payment slips (F8.4, NFR-R2) must be tamper-resistant — generate with a
  verifiable signature/hash stored alongside the receipt record, so a slip can be
  validated independently of trusting the PDF/image file itself.

## Data privacy (NFR-R3)

- GPS coordinates for a property are withheld from API responses until a booking is
  confirmed (F2.3) — this is enforced at the repository/service layer (the field is
  simply not included in the serialized response), not hidden client-side only.
- Personal data (phone numbers, addresses, chat content) is only ever returned to
  parties with a legitimate relationship to it (the two sides of a conversation, the
  property owner and a confirmed tenant) — not broadly queryable across roles.
- Multi-language users' data is stored once; localization is a presentation concern,
  not a data-duplication one.

## Audit trail (NFR-S5)

Every payment, booking-status change, and admin approval/rejection action writes an
entry to the `transactions`/audit log path — who did it, what changed, when. This is
what admin reporting and dispute resolution rely on; it is not optional logging.

## Environment separation

Dev, staging, and production use separate databases, separate payment-aggregator
credentials (staging never touches real money), and separate JWT signing secrets.
Never point a local dev environment at production data.

## Dependency hygiene

Run dependency vulnerability scanning (e.g. `npm audit` / equivalent for the Python
services) as part of CI, not as an occasional manual check — see `workflows.md`.
