# Frontend improvement roadmap

**Date:** 2026-11-15  
**Basis:** `context-files/IMPLEMENTATION_ROADMAP.md`, adjusted with audit findings.  
**Rule:** one vertical slice at a time. No phase starts while a **blocking** decision or contract it depends on is open.

## 0. Open decisions (need the developer)

| ID | Decision | Recommendation | Blocks |
|---|---|---|---|
| **D-1** | Locales and routing | Keep the `[locale]` URL prefix with **`en` + `fr` only**. Drop `pt` and `sw`. | Phase 1 |
| **D-2** | Visual direction | Direction B "Open Door" (`visual-direction.md`) | Phase 1 |
| **D-3** | Flexible rentals route | Keep `/map`. Merge `/rentals` into `/properties?type=…` **unless** the backend models rentable units separately (the old schema does: `rentable_units`). | Phase 4 |
| **D-4** | Backend contract access | Provide the NestJS repo path or an OpenAPI spec. Needed for filters, auth, bookings and roles. | Phases 4–11 (data) |
| **D-5** | Map provider | Recommend MapLibre GL + an OSM-based tile host (no per-load fees). **Approximate locations only**, server-enforced. Decide when the API exposes area geometry. | `/map`, location blocks |
| **D-6** | Dependencies | Approve `lucide-react`, `zod`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover` (`design-system-proposal.md` §11). | Phase 1 |
| **D-7** | Imagery | Source licensed photos of Cameroonian properties (≥1600 px wide). Until then, use clearly-labelled placeholders in fixtures only. | Phase 3 polish |
| **D-8** | Rental price convention | Confirm per-month vs per-year, months of advance, agency fees. | Cards, detail page |
| **D-9** | Cleanup plan | Approve `cleanup-plan.md` | Phase 1 start |
| **D-10** | Public navigation style | **Decided by the developer (2026-11-15): floating pill nav.** Spec in `design-system-proposal.md` §8.3. Proposed alongside it (please confirm): the mobile bottom tab bar is also a floating pill; workspaces keep a docked sidebar. | Phase 2 |

## 1. Phases

> **Progress (2026-11-15).** Phases 0–2 are complete.
> - D-1, D-2 and D-6 were taken as approved when the developer asked to start Phases 1–2.
> - D-3 is provisional: flexible spaces use `/spaces`.
> - D-10: the floating pill nav is decided; the bottom pill and the docked workspace sidebar are proposed.
> - Next: Phase 3 (home). It can proceed without the backend.

Each phase has a **definition of done** on top of the global one (typecheck, lint, tests and build pass; 360 / 768 / 1440 screenshots reviewed; keyboard pass; EN + FR strings; no fake success states).

### Phase 0: Cleanup (after D-9). ✅ Done 2026-11-15
- Execute `cleanup-plan.md` exactly. Move context docs into place.
- **Done when:**
  - `git status` matches the plan's file list
  - `npm run typecheck`, `lint` and `test` pass on the reduced tree
  - The app boots to a blank shell at `/en` and `/fr`

### Phase 1: Foundation. ✅ Done 2026-11-15
- **Scope:**
  - tokens (light + dark) in `globals.css`
  - Instrument Sans via `next/font`
  - theme script + switcher
  - SVG logo mark and wordmark (traced from `logo.jpg` and checked against it)
  - UI primitives from §8.1: Button, Input, Select, Checkbox/Radio, Segmented, Badge, Card, Skeleton, Dialog/Sheet, Toast, Inline alert, Empty state, Error state
  - `formatMoney` with XAF
  - an i18n catalogue structure with EN/FR parity test
  - `error.tsx`, `not-found.tsx` and `loading.tsx` patterns
  - an API client boundary (`lib/api/client.ts` with error normalisation, no endpoints yet)
- **Dependencies:** D-1, D-2, D-6.
- **Acceptance:**
  - Every primitive renders in both themes on a single internal `/[locale]/_design` preview route, excluded from production builds or behind a flag, and never linked.
  - Contrast script extended with every token pair and passing.
  - Lighthouse accessibility ≥ 95 on the preview route.
- **Tests:** component tests per primitive (role, keyboard, states); an i18n parity test; formatter tests (XAF, `fr-CM` / `en-CM` output).

### Phase 2: Public shell. ✅ Done 2026-11-15
- **Scope:** floating pill nav (desktop + compact mobile), floating bottom pill tab bar, menu sheet, footer, language and theme switchers, page containers with the pill offset.
- **Acceptance:**
  - No horizontal scroll at 360 px.
  - Bottom pill respects the safe-area inset.
  - The pill never covers a focused element or an anchor target (`scroll-padding-top` test: tab through a long page at 390 px and check every focused element is fully visible).
  - The pill stays legible over the hero photo in both themes (solid surface, no transparency).
  - `aria-current` on active items.
  - Skip link present.
- **Tests:** a Playwright navigation test across 360 and 1440 viewports.

### Phase 3: Home
- **Scope:**
  - hero (headline + SearchBar + doorway image)
  - Cameroonian city shortcuts
  - three category rows with distinct card forms
  - an "How Annorent works" section, only processes that exist
  - an owner CTA
- **Blocked parts:** featured listings need a listings endpoint. Until then, the rows render their **empty state** in production, or labelled fixtures in the preview.
- **Acceptance:**
  - LCP ≤ 2.5 s on a simulated slow-4G Moto G profile.
  - Total JS on home ≤ 120 KB gzip (to be confirmed from the Phase 1 baseline).
  - No unverifiable statistic anywhere.

### Phase 4: Property discovery
- **Scope:** `/properties` with URL-state filters, sort, pagination, list/map toggle, filter sheet, PropertyCard, all states.
- **Blocking:** D-4 (supported query parameters), D-3.
- **Acceptance:**
  - Filters reflected in the URL.
  - Back and forward restore state.
  - Empty, loading and error states each have a screenshot.
- **Tests:** an integration test for filter → URL → request; Playwright browse → open detail.

### Phase 5: Property detail
- **Scope:**
  - gallery + lightbox
  - facts and price
  - description and amenities
  - LocationBlock (approximate)
  - BookingPanel / ActionBar wired to verified actions only (enquiry, viewing request)
  - `notFound()` for unknown ids
- **Blocking:** D-4, D-8.
- **Security test:** assert that no coordinate-shaped values (`lat`, `lng`, `coordinates`, `-?\d{1,2}\.\d{4,}`) appear in the HTML or the RSC payload for a non-confirmed viewer.

### Phase 6: Hotels
- **Scope:** `/hotels` and `/hotels/[id]`: Where / When / Who search, room list, date validation, reservation start.
- **Blocking:** hotel availability and reservation contracts. The date-range picker dependency is decided here.

### Phase 7: Authentication
- **Scope:** login, register (customer / owner / hotel), forgot and reset password, verify email, session restore, logout, protected-route redirects.
- **Blocking:** D-4 (auth mechanism, cookie vs token, refresh, CSRF).
- **Acceptance:**
  - No `MOCK_SESSION` or equivalent anywhere.
  - httpOnly cookie via the BFF if the backend supports it.
  - Rate-limit errors surfaced clearly.
- **Tests:** unauthenticated → redirect; wrong role → 403 page; expired session handling.

### Phase 8: Customer workspace (`/account`)
- **Scope:** overview, saved, bookings and reservations, enquiries, profile, settings. Each screen built from empty states first.
- **Blocking:** Phase 7 + contracts per section.

### Phase 9: Owner workspace (`/owner`)
- **Scope:**
  - responsive shell
  - listings table
  - add/edit property wizard (multi-step, autosaved draft only if the API supports drafts)
  - enquiries / viewing requests
  - availability calendar
  - payouts (read-only, if exposed)
- **Acceptance:** fully usable at 360 px (tables become row cards).

### Phase 10: Hotel workspace (`/hotel`)
- **Scope:** profile, rooms, availability, reservations, room lock/unlock.

### Phase 11: Administration (`/admin`)
- **Scope:** verification queue first (status columns with counts), then users, listings and hotels review, transactions table, reports only where the API provides them.
- **Acceptance:** every action has a confirmation step and produces an audit-visible result from the backend.

### Phase 12: Hardening
- **Scope:** an accessibility audit (axe on every route), performance budget checks, a security review (`context-files/SECURITY_AND_PRIVACY.md` §14), the contrast script in CI, docs refresh, and a release-readiness report.

## 2. Dependency graph

```
D-9 ─▶ P0 ─▶ P1 (needs D-1, D-2, D-6) ─▶ P2 ─▶ P3
                                         │
                       D-4 contracts ────┼─▶ P4 (D-3) ─▶ P5 (D-8) ─▶ P6
                                         └─▶ P7 ─▶ P8 ─▶ P9 ─▶ P10 ─▶ P11 ─▶ P12
```

Phases 1–3 can proceed with **no backend**. From Phase 4 on, UI work can continue against typed fixtures in the preview route, but nothing ships until its contract is verified.

## 3. Testing strategy

| Layer | Tool | What | When |
|---|---|---|---|
| Unit | Vitest (existing config, jsdom) | Formatters, validation schemas, URL ↔ filter mapping, i18n parity | Every PR |
| Component | Vitest + Testing Library (installed) | Every primitive and domain component: roles, keyboard, states | Every PR |
| Contrast | `design-audit/tooling/contrast.mjs` (to move into `scripts/`) | Every token pair in both themes | Every PR touching tokens |
| E2E | Playwright (`playwright.config.ts` is empty today and must be written) | Browse → detail; filter round-trip; auth redirects; responsive navigation at 360 and 1440 | Before merge to main |
| Visual review | The `tooling/shoot.mjs` pattern | 360 / 768 / 1440 screenshots of changed routes, reviewed by a human | Every UI PR |
| Accessibility | axe-core in Playwright | Zero serious or critical violations | Phase 12 gate, then CI |
| Performance | Lighthouse CI (mobile, slow 4G) | LCP, INP, CLS, JS weight | Phase 3 onward |
| Security | Playwright + payload assertions | No coordinates pre-confirmation, no tokens in the client, protected routes | Phases 5, 7, 12 |

## 4. Risks

| Risk | Mitigation |
|---|---|
| Backend contracts arrive late | Build phases 1–3 fully. Build later phases against typed fixtures in the preview route only, and mark every fixture file `// FIXTURE: not real data`. |
| The direction is executed timidly and looks generic | The doorway frame, taxi-yellow featured chip and photography quality are review gates in Phases 3–5. |
| Placeholder imagery ships to production | D-7. Images in production come only from the API. Fixture images live under a `fixtures/` path that a test asserts is never referenced by production routes. |
| French strings lag behind English | The parity test fails CI. |
