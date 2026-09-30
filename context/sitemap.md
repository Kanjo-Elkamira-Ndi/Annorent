# Annorent Web — Sitemap

> Companion to `file-structure.md` — every route here must have a matching
> entry in that file's tree, and vice versa (see file-structure.md rule 12).
> This doc describes routes and who can see them; file-structure.md describes
> the files that implement them.

**Locale prefix:** every route sits under `/[locale]/...` (e.g. `/en/properties`,
`/fr/properties`) per F11 (English, French, Portuguese, Arabic, Swahili, +).
Locale is omitted below for readability. Arabic requires RTL layout — see
`ui-context.md`.

---

## 1. Public / marketing (no auth) — route group `(marketing)`

- `/` — Home: unified journey (Search → Connect → Book/Schedule → Pay), featured listings
- `/properties` — Property search & listing (sale + long-term rent)
  - `/properties/[id]` — Property detail (ISR)
- `/rentals` — Flexible rentals & coworking search
  - `/rentals/[id]` — Rental unit detail (ISR)
- `/hotels` — Hotel & guest house search
  - `/hotels/[id]` — Hotel/guest house detail (ISR)
- `/map` — Full map-based discovery
- `/partners` — Partner opportunity page
- `/about`
- `/contact`
- `/legal/terms`
- `/legal/privacy`

## 2. Auth (no auth) — route group `(auth)`

- `/login`
- `/register` — Tenant/user signup
- `/register/owner` — Property owner business registration
- `/register/hotel` — Hotel/guest house business registration
- `/forgot-password`
- `/reset-password`
- `/verify-email`

## 3. Tenant / user (role: `tenant`) — `account/`

- `/account` — Overview
- `/account/bookings` — list + `/account/bookings/[id]`
- `/account/appointments` — list + `/account/appointments/[id]`
- `/account/messages` — list + `/account/messages/[conversationId]`
- `/account/payments`
- `/account/saved`
- `/account/notifications`
- `/account/profile`

## 4. Property owner (role: `property_owner`) — `owner/`

- `/owner` — Dashboard
- `/owner/properties` — list, `/owner/properties/new`, `/owner/properties/[id]/edit`
- `/owner/rentals` — list, `/owner/rentals/new`, `/owner/rentals/[id]/availability`, `/owner/rentals/[id]/pricing`
- `/owner/messages`
- `/owner/payments`
- `/owner/profile`

## 5. Hotel / guest house owner (role: `hotel_owner`) — `hotel/`

- `/hotel` — Dashboard
- `/hotel/rooms` — list, `/hotel/rooms/new`, `/hotel/rooms/[id]/edit`
- `/hotel/reservations` — list + `/hotel/reservations/[id]`
- `/hotel/messages`
- `/hotel/payments`
- `/hotel/profile`

## 6. Administrator (role: `admin`) — `admin/`

- `/admin` — Dashboard
- `/admin/users` — list + `/admin/users/[id]`
- `/admin/listings` — list + `/admin/listings/[id]/review`
- `/admin/rentals` — verification queue
- `/admin/hotels` — list + `/admin/hotels/[id]/review`
- `/admin/media`
- `/admin/advertisements`
- `/admin/transactions`
- `/admin/reports`
- `/admin/settings`

## Design status (Stitch)

Tracked here so it's obvious what's still unbuilt at the design layer, not
just the code layer:

| Section | Status |
|---|---|
| Home `/` | **Built** from Stitch screen `53edc501418847e6ba5066b915f3b3da` ("Home - Annorent Marketplace") — hero + search card, trust row, neighborhood map band, the three listing grids (properties / rentals / hotels), and the owner CTA. The header, footer, and everything below the CTA are not built yet. |
| Public/marketing (remaining routes above) | Fully prompted in `annorent-stitch-prompts.md` |
| Auth: login, register, register/owner, register/hotel | Designed |
| Auth: forgot-password, reset-password, verify-email | **Not yet designed** — not covered by any Stitch prompt |
| Tenant, Owner, Hotel Owner, Admin sections | **Not yet designed** — next Stitch pass after public/marketing ships |

Stitch project: **"Remix of Annorent Property Management Platform."**

## Notes on structure

- **Search state lives in query params, not new routes** — `/properties?type=apartment&city=...`.
- **Every role's authenticated section is a separate top-level segment**, not shared tabs on one `/dashboard`.
- **`/properties/[id]`, `/rentals/[id]`, `/hotels/[id]` are the SEO/ISR-critical pages.**
- Payment checkout is a step inside the booking flow, never a standalone route.

## Keeping this current

Any route added, moved, or removed updates this file **and** `file-structure.md`
in the same PR (file-structure.md rules 13/18). Update the "Design status" table
above whenever a new Stitch pass covers another section.
