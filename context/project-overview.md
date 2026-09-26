# Annorent — Project Overview

> Read this first. It's the "what and why" — pair it with `architecture.md` for the
> "how" and `developer-map.md` for where everything else lives.

## What Annorent is

Annorent is a real estate and hospitality platform connecting people who want to buy,
rent, or book properties with verified property owners, hotels, and guest houses.
Launching in Cameroon, with a roadmap to expand across Africa and eventually
internationally.

**Unified journey:** Search → Connect → Book/Schedule → Pay

## Scope

Annorent covers four distinct transaction types under one platform — this breadth is
deliberate but means no single module should assume it's the only thing the platform
does:

| Transaction type | Description |
|---|---|
| Property sales | Buying/selling houses between owners and buyers |
| Long-term rentals | Apartment leasing |
| Flexible rentals | Daily/monthly rental of houses, rooms, studios, coworking desks, private offices, meeting rooms |
| Accommodation bookings | Hotel and guest house reservations |

## User roles

| Role | Key capabilities |
|---|---|
| **Tenant / User** | Register/login, map search, view listings, chat, book appointments, make payments |
| **Property Owner** | Register business account, list properties, manage flexible rental units, chat |
| **Hotel / Guest House Owner** | Register business account, lock/unlock rooms, manage reservations, accept payments, send receipts, chat |
| **Administrator** | Manage users, verify listings, approve business accounts, manage media/ads, view reports, monitor transactions |

## Platform modules (M1–M13)

These module boundaries are the source of truth for how the backend is organized —
each maps to a NestJS module with its own controllers/services/repositories.

| # | Module | Responsibility |
|---|---|---|
| M1 | Identity & Access | Registration, login, roles, RBAC |
| M2 | Property Management | Property CRUD, verification, media, GPS disclosure after booking |
| M3 | Hospitality | Hotel/guest house accounts, room availability, reservations, receipts |
| M4 | Flexible Rentals & Coworking | Daily/monthly rentals, availability calendars, duration-based pricing |
| M5 | Search & Discovery | Filtered search, map-based discovery, distance/directions |
| M6 | Messaging | Real-time chat (text, images, documents, voice), read receipts |
| M7 | Appointments & Scheduling | Property visits, hotel inspections, reminders |
| M8 | Payments & Billing | Mobile Money, bank transfer, certified slips |
| M9 | Notifications | Real-time notifications across all events |
| M10 | Advertising | Featured listings, business advertising |
| M11 | Administration & Reporting | Verification, approvals, monitoring, reports |
| M12 | Localization | English, French, Portuguese, Arabic, Swahili, and others |
| M13 | Monetization | Commissions, subscriptions, fees |

## Business model

| Revenue stream | Type |
|---|---|
| Commission on property sales | Transactional |
| Subscription plans for real estate agents | Recurring |
| Transaction fees on hotel/guest house bookings | Transactional |
| Featured property advertisements | Advertising |
| Business advertising | Advertising |
| Virtual visit fees | Transactional |

## Growth roadmap

**Sequencing logic:** Core platform → Adoption & monetization → Advanced services.
**Expansion:** Cameroon → Regional (Africa) → International.

**Planned future features** (not in current scope — build so these can be added
without a rearchitecture, but don't build them speculatively now):
AI property recommendations, electronic contracts/digital signatures, richer video
tours, maintenance request management, VR tours, restaurant reservations.

## Comparable platforms

Useful shorthand when explaining a feature's intent: Annorent is functionally
"Booking.com's hotel/room inventory management + Airbnb's flexible-stay pricing + a
real-estate sales/leasing marketplace + Mobile Money-native payments," unified under
one trust/verification layer. The GPS-reveal-after-booking pattern and Mobile Money
rail are Annorent-specific — neither major platform does either.

## Where to go next

- **`architecture.md`** — system design, service boundaries, data flow
- **`database-schema.md`** — the domain model as tables
- **`api-reference.md`** — API conventions and contract
- **`ui-context.md`** — brand, design language, sitemap
- **`code-standards.md`** — how code should be written
- **`security.md`** — auth, RBAC, payment security, compliance requirements
- **`workflows.md`** — branching, CI, deployment, working with the AI agent
- **`developer-map.md`** — the index tying all of this together
