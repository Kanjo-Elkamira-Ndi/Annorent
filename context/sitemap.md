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
| Home `/` | **Built** from Stitch screen `53edc501418847e6ba5066b915f3b3da` ("Home - Annorent Marketplace") — fixed header, hero + search card, trust row, neighborhood map band, the three listing grids (properties / rentals / hotels), the owner CTA, and the footer. |
| Property search `/properties` | **Built** from Stitch screen `8dd45e1def024c899757214e76101f5e` ("Property Search - Annorent") — context bar with live count + alert/map actions, active-filter chips, sort control, sticky filter sidebar (budget, type, bedrooms, neighborhoods, amenities), verified-assurance bar, 6-card result grid, district map preview, pagination. |
| Property detail `/properties/[id]` | **Built** from Stitch screen `ad6d0ce30328440b8d379c7c71308307` ("Property Details - Villa Cocody - Annorent") — breadcrumb, 5-image gallery mosaic with photo-count overlay, certification chips, spec row, about copy, power-continuity callout, 9-amenity grid, location map, legal certificate, sticky booking form with price breakdown + lease terms + agent card. Dynamic (not prerendered) because it resolves `[id]`. |
| Coworking `/rentals` | **Built** from Stitch screen `2415b3c5330b4bcdaaa16ce14927e258` ("Flexible Rentals & Coworking - Annorent") — hero with category chips + billing toggle, 2-item assurance row, 6 workspace cards with dual price tiers, enterprise CTA band, pagination, per-page selector. |
| Hotels `/hotels` | **Built** from Stitch screen `55151c6f54ec458f9f83f6f67fda3d28` ("Hotels & Residences - Annorent") — escrow badge, labelled search panel (destination/dates/guests), 3-item assurance row, 7 quick-filter chips, sort control, 3 hotel cards with star ratings, escrow-guarantee band, pagination. |
| Public/marketing (remaining routes above) | Fully prompted in `annorent-stitch-prompts.md` |

**Inert controls on the four browse pages.** Every filter, sort, chip, chip-removal,
quick-filter, date/guest field, and pagination control is rendered with the
Stitch visual state but is not yet wired to query params or a backend — sorting
and filtering do not yet change the result set, and the search panel does not
submit. This is deliberate: the reference artwork specifies appearance, not the
query-parameter contract. All of them are real native controls (`<select>`,
`<input type=checkbox|radio|date>`, `<button>`, `<a>`) with programmatically
associated labels rather than div-with-onclick, so wiring them up is a matter of
adding a submit handler and a router update, not a rewrite. See §"Wiring the
browse filters" below before implementing.
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
