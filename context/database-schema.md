# Annorent — Database Schema

> PostgreSQL + PostGIS. Raw SQL migrations, no ORM (see `code-standards.md`). This
> maps the SRS class architecture to tables — treat class names in the SRS and table
> names here as the same concepts under different casing conventions.

## Conventions

- Tables: `snake_case`, plural (`properties`, `rental_bookings`).
- Primary keys: `id UUID DEFAULT gen_random_uuid()`.
- Every table: `created_at TIMESTAMPTZ DEFAULT now()`; mutable tables also get
  `updated_at`.
- Foreign keys named `<referenced_table_singular>_id`.
- Enums as Postgres `ENUM` types where the value set is small and stable (roles,
  statuses); avoid enums for anything likely to grow (property `type`, use a
  lookup table or a plain validated string instead).

## Core tables

### `users`
`id, name, email, phone, password_hash, role (tenant | property_owner | hotel_owner | admin), language, is_verified, created_at`
— single table for all roles (matches the SRS's `User` base class); role-specific
data lives in related tables, not extra columns on `users`.

### `addresses`
`id, city, town, area, gps_coordinates (geography(Point,4326) — PostGIS)`

### `properties`
`id, title, type, transaction_type (sale | rent | flexible_rent), address_id (FK), bedrooms, bathrooms, area, price, status, owner_id (FK users), is_verified, is_locked, gps_hidden_until_booking, created_at, updated_at`

### `property_media`
`id, property_id (FK), type (photo | video | tour_3d), url, created_at`

### `rentable_units`
`id, type (house | room | studio | desk | private_office | meeting_room), capacity, address_id (FK), owner_id (FK users), is_verified, is_locked`

### `rental_pricing`
`id, rentable_unit_id (FK, unique), daily_rate, monthly_rate, deposit`

### `coworking_spaces`
`id, name, address_id (FK)` — groups multiple `rentable_units` (desks/offices/rooms)
under one space.

### `availability_periods`
`id, rentable_unit_id (FK), start_date, end_date, is_blocked`
— indexed on `(rentable_unit_id, start_date, end_date)` for fast conflict checks
(NFR-RENT-2).

### `rental_bookings`
`id, rentable_unit_id (FK), tenant_id (FK users), start_date, end_date, duration_unit (day | month), duration_value, total_amount, status, created_at`

### `hotels`
`id, name, address_id (FK), owner_id (FK users), is_verified`

### `rooms`
`id, hotel_id (FK), capacity, price, is_available, is_locked`

### `reservations`
`id, room_id (FK), tenant_id (FK users), check_in, check_out, status, payment_id (FK, nullable), created_at`

### `conversations`
`id, created_at` — participants in a join table (`conversation_participants`:
`conversation_id, user_id`) rather than an array column, to keep it queryable.

### `messages`
`id, conversation_id (FK), sender_id (FK users), type (text | image | document | voice), content, sent_at, read_at`

### `appointments`
`id, requester_id (FK users), target_type (property | hotel), target_id, scheduled_at, status, reminder_at`

### `payments`
`id, amount, method (mobile_money | bank_transfer | card), status, reference, payer_id (FK users), payee_id (FK users), purpose (booking | rental | ad | commission | virtual_visit), created_at`

### `payment_receipts`
`id, payment_id (FK, unique), slip_url, is_certified, generated_at`

### `notifications`
`id, user_id (FK), type, payload (JSONB), is_read, created_at`

### `advertisements`
`id, advertiser_id (FK users), property_id (FK, nullable), type (featured | business), fee, duration, status`

### `transactions`
`id, amount, rate, property_id (FK, nullable), booking_id (FK, nullable), created_at`
— the commission/fee ledger, distinct from `payments` (which is the money movement
itself); `transactions` is what powers `NFR-S5`'s audit trail and admin reporting.

### `reports`
`id, period, metrics (JSONB), generated_by (FK users), created_at`

## Indexing priorities

- `properties.address_id` → `addresses.gps_coordinates` — **GIST index** on
  `gps_coordinates` for all "nearby"/map-bounds queries (F5).
- `availability_periods (rentable_unit_id, start_date, end_date)` — for booking
  conflict checks (NFR-RENT-2), the single most latency-sensitive query in the
  system.
- `messages (conversation_id, sent_at)` — for chat history pagination.
- `notifications (user_id, is_read, created_at)` — for the notification feed.

## Atomicity (NFR-R1, NFR-RENT-1)

Any write that touches both `availability_periods`/`rental_bookings` (or
`rooms`/`reservations`) **and** `payments` must happen inside a single Postgres
transaction. This is enforced in the repository/service layer per
`code-standards.md` — there is no ORM-level "unit of work" doing this
automatically, so it must be written explicitly every time a new booking-type flow
is added.

## Deposits (NFR-RENT-4)

Deposits are tracked as their own `payments.purpose` value or a `deposit_amount`
column on `rental_bookings` (pick one convention and apply it everywhere) —
never folded into `total_amount` un-distinguished, since deposits need separate
handling in the audit trail and on refund.

## Migrations

Sequential, hand-written SQL files (`0001_init.sql`, `0002_add_coworking.sql`, ...),
run by the custom migration runner — never an ORM's auto-migration. Every migration
is additive/reversible where possible; destructive changes get a two-step
deploy (add nullable column → backfill → make non-null in a later migration) to
avoid downtime, consistent with the deployment-independence goals in
`architecture.md`.
