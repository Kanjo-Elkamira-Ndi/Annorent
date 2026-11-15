# Current frontend audit

**Date:** 2026-11-15  
**Subject:** the last real UI, git tag `legacy-ui-v1` (commit `55815cc`), compared with branch `reset/ui-v2` (commit `ba2a0d5`, stubs only)  
**Evidence:** 90 screenshots in `screenshots/legacy/` (30 pages × 390 / 768 / 1440 px), plus `screenshots/legacy/report.json` (HTTP status, horizontal overflow, page height, console errors for every capture).

## How this was audited

1. `legacy-ui-v1` was checked out into a temporary worktree, outside the repo, and run with `next dev`. The worktree has since been removed.
2. In that throwaway copy only, the mock role redirect in `requireRole()` was disabled so owner and admin pages could render. No repo file was changed.
3. Each page was loaded in headless Chrome at three widths. The script is `tooling/shoot.mjs`.
4. Code facts were taken with `git grep` against the tag. Quoted numbers are counts, not estimates.

## 1. Summary verdict

The legacy UI looks polished in desktop screenshots, but cannot be kept. Five problems are each disqualifying on their own:

| # | Problem | Evidence | Why it blocks reuse |
|---|---|---|---|
| 1 | **Wrong market.** | Content is set in Abidjan, Dakar, Kigali, Cotonou and Nairobi. Login defaults to `CI (+225)`. Claims cite BCEAO (the West African central bank). Currency is `XOF` (`src/lib/utils/format.ts:25`, still present on `reset/ui-v2`). | Annorent launches in Cameroon, which uses BEAC and XAF. Every string, location and price would need replacing. |
| 2 | **Fabricated capabilities.** | 280 occurrences of escrow, notarial, BCEAO, certified or guarantee claims. Examples: "100% Verified", "4,850+ Secured", "98.4% Cadastral precision", "BCEAO custodial vault", "OHADA … biometric and national e-ID verification", "Annorent Trust™ Protocol", "Mobile Money ID" sign-in. | Forbidden by `context-files/PRODUCT_REQUIREMENTS.md` §7 and `AGENT_RULES.md` §7. None of these capabilities exist in a verified backend. |
| 3 | **Workspaces unusable on phones.** | Every owner and admin page overflows horizontally at 390 px: page width 507–739 px (`report.json`). `/owner/rentals` also overflows at 768 px. At 390 px the sidebar never collapses and squeezes the content into a column about 100 px wide (`owner@390.jpg`). | The market is mobile-first. |
| 4 | **More than half the product never existed.** | 35 of 65 routes are `return null` stubs: all of `/account`, all of `/hotel`, 10 of 14 admin routes, and owner messages, payments, profile, edit and pricing. | There is little to keep, so a rebuild costs little. |
| 5 | **No design system underneath.** | `ui/input`, `modal`, `select`, `tabs` and `toast` are 0-byte files. Pages are monolithic: `properties/[id]/page.tsx` is 545 lines and `about/page.tsx` is 560 lines. There is no dark mode (0 `dark:` usages). There are 322 Material Symbols ligature spans, served by a 4 MB icon font. | Violates file-structure rule 11 (pages compose components) and the new design-system requirements. |

**Recommendation:** keep the static imagery that doesn't show UI chrome, the brand logo, `cn()`, the formatters (after fixing XAF) and the i18n core. Rebuild every screen against the new design system (`design-system-proposal.md`). The file-by-file breakdown is in `cleanup-plan.md`.

## 2. Global issues (every page)

### Visual
- **Two logos.**
  - The header uses the real keyhole mark (`public/logo.jpg`).
  - The footer, auth card and both dashboard sidebars use a generic Material `apartment` building glyph in a blue square.
  - Brand recognition is split, and the building glyph is the most generic real-estate icon available.
- **One blue, three jobs.** Blue is used for action, brand and data: buttons, chart bars, prices, links, active nav, the "3D VR Tour" chips. With no semantic hierarchy, everything competes. The new system splits these roles (see `design-system-proposal.md` §2).
- **Template chrome everywhere.** These are the "generated look" tells:
  - all-caps eyebrows: "LUXURY RESIDENTIAL", "SECURED REAL ESTATE MARKET", "INSTITUTIONAL TIER PORTAL", "MONTHLY RENT"
  - pill badges stacked on every image
  - icon + label + caption chips in rows of 3–4
  - decorative circle bursts in stat-card corners
- **Inverted hierarchy on the property detail page.** The `<h1>` "Contemporary 5-Room Villa with Swimming Pool" renders at about 16 px, while the tagline paragraph under it renders at about 20 px (`properties__villa-cocody@1440.jpg`).
- **Image assets contaminated with design-tool UI.** Several "photos" are crops of Stitch mockups, with UI text and nav bars visible inside them:
  - home card 2 ("Exclusive Sale") and hotel card 1, both on `home@1440.jpg`
  - the detail gallery's "Main living room" tile
  - these come from `public/images/listings/*` and `public/images/details/villa-02.jpg`
  - Each image must be inspected before reuse (see `cleanup-plan.md`).
- **Oversized display type in workspaces.** The owner dashboard `<h1>` is set at about 48 px over two lines, larger than the marketing pages. Dashboards should lead with the data, not the page title.

### UX
- **Navigation hides discovery.** The top nav reads Available Rentals ▾ / Home / About / Contact / Legal / Partners. Properties, hotels and the map sit inside a dropdown, while four company pages get top-level slots. There is no Register or "List a property" entry, only "Log In".
- **Inert controls look live.** Filters, sort, pagination, the currency toggle (FCFA/USD) and the language toggle render as working controls but do nothing. `context/sitemap.md` documents this, but the UI gives users no signal.
- **Pages are far too long on mobile.** Home is 8,384 px tall at 390 px and About is 12,901 px, roughly 9 and 14 phone screens. That is too much to scroll, and too many bytes on a slow connection.
- **Date inputs use the browser's US format.** `mm/dd/yyyy` appears in `en`. Cameroon writes `dd/mm/yyyy` in both English and French.
- **No real loading, error or empty states.** `[locale]/error.tsx` and `not-found.tsx` return `null`. No `loading.tsx` files exist.

### Technical
- **4 MB icon font.** `public/fonts/material-symbols-outlined.woff2` is 4,001,608 bytes and set to `font-display: block`. On a 3G connection icons are invisible for seconds, and ligature names can leak into copied text.
- **Low `next/image` adoption.** Only 8 files use `next/image`, and 5 raw `<img>` tags remain.
- **Hard-coded session.** `MOCK_SESSION` in `src/lib/auth/guards.ts` hard-codes a privileged session and is checked only client-side. On `reset/ui-v2` it is `role: "admin"`, which fails 3 tests in `guards.test.ts`.
- **20 fixed pixel widths** (`w-[NNNpx]`, `min-w-[NNNpx]`) cause the workspace overflow.
- **Console is clean.** All 90 captures returned HTTP 200 with zero console errors. Build hygiene is fine; the problems are product and design.

### Security and privacy (positive findings)
- **No coordinates exposed.** No GPS coordinates appear in any mock data: no `lat`/`lng` fields in `src/lib/marketing`. Map pins are percentage-positioned over a hand-drawn SVG.
- **Correct location privacy.** The property detail page shows only a district-level map image, plus the notice "The exact address … shared upon visit confirmation". The rebuild should keep this behaviour (Decision 007).

## 3. Page-by-page

Notation: **Keep** = worth carrying into the rebuild. **Fix** = must change. **Refs** = see `design-reference-index.md`.

### Home `/` (`home@*.jpg`, 68-line page)
- **Current:**
  - full-bleed photo hero with a centred headline and a 4-tab search card (Rent / Buy / Flexible Rentals / Hotels)
  - a trust row of 4 stats
  - a dark "neighbourhood map" band
  - three 3-card listing rows
  - an owner CTA and a 5-column footer
- **Visual weaknesses:**
  - The centred headline and centred search card are the generic default.
  - The trust row shows fabricated numbers.
  - The map band is a screenshot of a third-party map with a gradient over it.
  - The three listing rows are visually identical, so the categories don't read differently.
- **UX weaknesses:**
  - The search card's fields come pre-filled with values ("Abidjan, Côte d'Ivoire", "Contemporary villa") instead of placeholders.
  - The trending chips mix four cities in two countries.
  - The owner CTA offers "Investor Portal", which does not exist.
- **Missing states:** nothing for a loading or failed featured feed, or for an empty category.
- **Responsive:** the 390 px page is 8,384 px tall, and the four search tabs wrap to two lines.
- **Keep:** the idea of a single search entry point with category tabs. The search entry is the right hero.
- **Redesign:**
  - Left-aligned, type-led hero; the search becomes the hero object.
  - Category rows each get their own card form: property card, workspace card and hotel card.
  - City shortcuts use real Cameroonian cities: Douala, Yaoundé, Buea, Limbe, Kribi, Bafoussam, Bamenda, Garoua.
  - Remove every unverifiable stat.
- **Refs:** Compass (hero search), Property24 (search with tabs), Airbnb (category tabs), PropertyPro (mobile search).

### Property search `/properties` (`properties@*.jpg`, 191 lines)
- **Current:**
  - Context bar: "248 properties available in Abidjan & Surroundings".
  - Active-filter chips, a sort select and a sticky left filter panel (budget slider, type, bedrooms, neighbourhoods, amenities).
  - A sage-green "All listings are physically audited" banner.
  - A 3-column card grid, a district map image and pagination.
- **Visual weaknesses:**
  - Each card stacks a "Verified Property" badge, a "3D VR Tour" badge and an "Exclusive" tag on the photo.
  - Amenity tags in grey micro-type.
  - A dark CTA button "Details & VR" on every card is heavier than the price.
  - The green banner is a filled box (sage on sage) and reads as an alert.
- **UX weaknesses:**
  - "Apply Filters (248)" is an apply-button pattern on desktop, but nothing applies.
  - "VR" is in the CTA although VR tours are out of MVP scope.
  - Monthly rent and sale prices share one layout with no transaction-type distinction.
  - Bedrooms use a "St." (studio) chip with no label.
- **Missing states:** no results, loading skeleton, failed fetch, invalid filter.
- **Responsive:** on mobile the filter panel stacks above the results, so results start roughly 1.5 screens down. There is no filter drawer and no sticky "Filters (n)" button.
- **Keep:**
  - active-filter chips with a clear-all
  - neighbourhood checkboxes with counts
  - the range inputs (min/max as number fields as well as the slider, which is accessible)
- **Redesign:**
  - URL-driven filters that apply on change (desktop) or through a bottom sheet with "Show N results" (mobile).
  - Card CTA becomes the whole card as a link; the price leads.
  - Transaction type (Rent / Buy) is a top-level segmented control, not buried in filters.
- **Refs:** Property24 (filter row + Filters sheet), Rightmove (one location field), Airbnb (card density), Zillow (not inspected).

### Property detail `/properties/[id]` (`properties__villa-cocody@*.jpg`, 545 lines)
- **Current:**
  - Breadcrumb, then a 5-image mosaic with "24 photos" overlay plus "3D Virtual Tour" and "Guided Video Tour" buttons.
  - Two badges, then the title. The title is visually smaller than its tagline.
  - A 4-spec row, then description and a "Guaranteed Power & Water Continuity" callout.
  - A 9-amenity grid, then a location map image with a privacy note.
  - A "Legal Guarantee & Compliance" card.
  - A sticky booking card: price breakdown, date, 4 lease-type radios, "Request Booking / Visit", "Contact Owner", agent card and an escrow note.
- **Visual weaknesses:**
  - Inverted heading hierarchy.
  - Two sage-filled callouts with contrast-weak body text.
  - Amenity tiles have equal weight, so nothing stands out.
  - The gallery mosaic includes a UI-screenshot image.
- **UX weaknesses:**
  - "Request Booking / Visit" merges two different intents (book vs schedule a viewing). The backend contract decides which exist; the UI must keep them separate.
  - The fee breakdown invents "Agency & Escrow fees".
  - The lease-type radios are invented terms.
  - There is no way to share or save.
  - The gallery has no keyboard-operable lightbox.
- **Missing states:** unknown id (the page renders for *any* id, because the data is static), loading, and photos that fail to load.
- **Responsive:** at 390 px the booking card drops below about 3,000 px of content, so the primary action is 4–5 screens away. A sticky bottom action bar is needed.
- **Keep:**
  - the privacy note pattern
  - the district-level map
  - the price-breakdown idea, but only with fees the backend actually returns
- **Redesign:**
  - Title → price → location → key specs, in that order.
  - Mobile gallery is a swipe carousel with a count; desktop is a mosaic with a lightbox.
  - Sticky action bar on mobile ("Request a viewing" / "Message owner", subject to contract).
- **Refs:** Airbnb (detail page structure, sticky booking box), Compass (gallery), Booking.com (not inspected).

### Flexible rentals `/rentals` and `/rentals/[id]` (214 / 171 lines)
- **Current:**
  - Hero with category chips and a billing toggle.
  - 6 "workspace cards" with dual price tiers.
  - An enterprise CTA band.
- **Weaknesses:**
  - Dual price tiers on every card double the visual load.
  - Coworking copy ("Barista Coffee", "Podcast Studio") reads as Nairobi or Kigali tech-hub marketing, not as Cameroonian flexible rentals: rooms, studios, offices, meeting rooms.
  - The detail page is thin (171 lines) and has no availability calendar.
- **IA conflict:** `context-files/INFORMATION_ARCHITECTURE.md` has no `/rentals` route, but the product brief lists flexible rentals as a category. Proposal: fold flexible rentals into `/properties?type=flexible`, or keep `/rentals`. Open decision D-3 in `frontend-improvement-roadmap.md`.
- **Keep:** the billing-period toggle (day / month), which maps to the old schema's `duration_unit`.

### Hotels `/hotels` and `/hotels/[id]` (263 / 178 lines)
- **Current:**
  - Escrow badge and a labelled search panel (destination / dates / guests).
  - 7 quick-filter chips and 3 hotel cards with star ratings.
  - An "escrow guarantee" band.
- **Weaknesses:**
  - Star ratings and review counts are invented.
  - "Instant Booking" and "Available tonight" claims have no availability API behind them.
  - The detail page has no room list and no date-aware pricing.
- **Missing:** room selection, date and guest validation, the sold-out state.
- **Keep:** the labelled destination / dates / guests panel. Fields should be labelled, not placeholder-only.
- **Refs:** Airbnb (Where / When / Who), Booking.com and Aman (not inspected; screenshots requested).

### Map `/map` (130 lines + `map-discovery.tsx` 728 lines)
- **Current:**
  - A filter bar with location, category pills, a max-rent slider and reset.
  - A results rail.
  - A hand-drawn SVG of Abidjan with price pins, clusters, a popup and zoom.
  - Five controls disabled with tooltips.
- **Weaknesses:**
  - A fictional map of the wrong city.
  - The "Search as I move the map" checkbox is disabled but looks enabled.
  - "142 Properties in visible area" is a fixed number.
- **Keep:** the list–map pairing, price pins and disabled-with-reason pattern. Also the privacy property: pins are approximate.
- **Decision needed:** the map provider (D-5). The rebuild should not hand-draw maps.

### About, Contact, Partners, Legal (560 / 423 / 504 / ~30 lines + data)
- **Weaknesses:**
  - About is 12,901 px tall on mobile.
  - Partners promises "Bank-Escrow Guarantees".
  - Legal pages contain drafted legal text that no lawyer has reviewed. They need a "draft" banner or must stay unpublished.
  - Contact's "Pan-African Team" headline is off-market.
- **Rebuild:** short, reading-width (680 px) prose pages. They are low design risk and come after the core flows.

### Authentication (7 routes, `login@*.jpg`)
- **Current:**
  - A split card: form left, trust panel right.
  - Three tabs: Sign In / Create Account / Pro & Hospitality.
  - Google and "Mobile Money ID" buttons.
- **Weaknesses:**
  - No `<h1>` on any auth page (`report.json`: `h1: null`).
  - The login form asks for "Email address or phone number" with the placeholder "e.g., Aya Koné" (a name), then a second "Phone number or business email" field. That is two contradictory identifier fields.
  - The trust panel shows an invented testimonial and invented notary and escrow claims.
  - "256-bit SSL" is meaningless reassurance.
  - Social and Mobile Money sign-in are not verified backend capabilities.
- **Responsive:** at 390 px the trust panel stacks *below* the form, which is acceptable, but the whole card is 1,580 px tall.
- **Keep:** the split layout on desktop, which `context-files/DESIGN_SYSTEM.md` §13 requires, and the route-fixed account type for `/register/owner` and `/register/hotel`.
- **Redesign:**
  - One identifier field (email or phone, per contract) and the password.
  - The trust panel is photography plus one factual line, not claims.
  - The mobile layout is form only, with the panel hidden.

### Owner workspace (`owner@*.jpg`; 7 real routes, 5 stubs)
- **Current:**
  - A 260 px fixed sidebar with 8 items.
  - A 48 px page title and 4 stat cards with decorative corner bursts.
  - A bar chart built from divs, with no axis scale.
  - A "Legal Compliance" card, occupancy bars, an inquiries list ("99% Tier 1" tenant scores) and quick actions.
  - An add-property wizard (724 lines), a listings table (521 lines) and an availability calendar (463 lines).
- **Weaknesses:**
  - Invented metrics everywhere.
  - Tenant "Tier" percentage scoring is ethically sensitive and has no product basis.
  - The chart has no values on its y-axis.
  - The sidebar links to a "Documents & Cadastre" vault that was deleted on `reset/ui-v2`.
- **Responsive:** unusable below 768 px (see §1). `/owner/rentals` overflows even at 768 px.
- **Keep (as design intent, not code):**
  - the wizard's step structure
  - the calendar's month grid with unit rail
  - listing-table columns: title, status, price, views, updated
- **Redesign:**
  - A responsive shell: sidebar ≥1024 px, drawer or bottom bar below.
  - The dashboard shows only metrics the API returns; empty states teach first actions ("Add your first property").
- **Refs:** Guesty (multi-calendar, unified inbox), Hostaway (owner statements), AppFolio and Buildium (portal per role).

### Admin console (`admin@*.jpg`; 4 real routes, 10 stubs)
- **Current:**
  - "Directoire des Opérations Foncier & Séquestre" as the `<h1>` in the English locale.
  - Monospace labels ("SEC-OPS // LEVEL 4", "UINL Hub: SYNC OK (42ms)", "BCEAO Clearing: Active RTGS").
  - 4 stat cards, and an empty area below them.
- **Weaknesses:** theatrical fake system telemetry, mixed languages, no tables on the dashboard, no queue.
- **Keep:** the intent from `context/ui-context.md` that admin is denser and more utilitarian. That remains correct.
- **Redesign:**
  - Queue-first. Verification queue, user search and transactions are tables with filters, bulk actions and audit context.
- **Refs:** Linear (status columns, density), Stripe (transaction states, rule tables).

### Tenant account `/account/*`, hotel workspace `/hotel/*`, messaging, booking
- **Never built** (all stubs on the tag). Nothing to audit visually.
- Designs are specified fresh in `design-system-proposal.md` §9 and sequenced in the roadmap.
- **Messaging and booking depend on unverified contracts** (WebSocket events and booking/payment lifecycles in old `context/api-reference.md` are proposals only).

## 4. Documentation vs implementation conflicts

`context-files/` is authoritative (user decision, 2026-11-15). Each conflict has a proposed resolution:

| Topic | Old `context/` | `context-files/` | Code (`reset/ui-v2`) | Proposed resolution |
|---|---|---|---|---|
| Locales | 4 locales, prefixed (`/en`, `/fr`, `/pt`, `/sw`) | English first, French "considered"; don't add prefixed routing without review | `[locale]` prefix, 4 locales, `proxy.ts` redirect | **Decision D-1.** Keep the `[locale]` prefix (Cameroon is officially bilingual, and prefixed URLs give clean FR SEO), but ship only `en` and `fr`. Drop `pt` and `sw`. |
| Rentals and map routes | `/rentals`, `/map` are first-class | Not in the IA; `/locations` "if supported" | Both exist on the tag | **D-3.** Keep `/map`, which serves the "map exploration" requirement in `prompt.md` §1. Fold `/rentals` into `/properties` with a `type` filter unless the backend models rentable units separately (the old schema does). |
| Legal routes | `/legal/terms`, `/legal/privacy` | `/terms`, `/privacy` | `/legal/*` | Adopt `/terms` and `/privacy` (shorter, matches the new IA). Low risk; no external links exist yet. |
| Dark mode | Not mentioned | Required, designed separately (Decision 012) | None | Adopt (`design-system-proposal.md` §2.3). |
| Sessions | Mock data allowed, MOCK_SESSION stub | No mock sessions ever | `MOCK_SESSION` with role `admin` | Delete it. Workspaces render behind a real session or a clearly labelled "design preview" route that is never shipped. |
| Brand blue | `#0052CC` | `#0052CC` as a "candidate" | `#034CFF` in `globals.css` | Logo blue `#024BFF` (user decision). The deeper `#0040E0` for link text. |
| Currency | XAF/FCFA | XAF/FCFA, centralised | `formatCfa()` uses `XOF` | Fix to `XAF` in the rebuild (one line, plus a test). |
| Payments provider | CinetPay/Fapshi (uncommitted edit: Notchpay/Fapshi) | "approved payment provider" | None | Out of frontend scope until the backend picks one. Leave the uncommitted `context/architecture.md` edit for the developer to commit or drop. |
| Mock content | Static data modules mirroring API shapes are fine | Mock data must be clearly labelled and never presented as real | Static data with invented claims | Keep the typed fixtures pattern for tests and Storybook-style previews. Strip all claims. Label previews. |
| Owner surface i18n | English-only by decision | English first | `owner.ts` = `{}` | Rebuild strings into `en` and `fr` catalogues from the start. |
| Instruction files | `context/*.md`, root `AGENTS.md` (Next-managed block), empty root `CLAUDE.md` | `context-files/CLAUDE.md` and `AGENTS.md` reference `context/README.md` etc. | — | Migrate `context-files/` into `context/` and archive the old files (see `cleanup-plan.md` §4). |

## 5. Prioritised recommendations

| Priority | Recommendation | Fixes |
|---|---|---|
| P0 | Remove every fabricated claim and statistic. Seed copy only with what Annorent can stand behind. | §1.2 |
| P0 | Responsive workspace shell (drawer below 1024 px, no fixed widths). | §1.3 |
| P0 | Cameroon market defaults: XAF, `+237`, Cameroonian cities, `dd/mm/yyyy`, EN and FR. | §1.1 |
| P0 | Delete `MOCK_SESSION`; gate workspaces on a real session. | security |
| P1 | Design-system foundation: tokens, light and dark, primitives (`design-system-proposal.md`). | §1.5 |
| P1 | Replace the 4 MB icon font with tree-shaken SVG icons. | performance |
| P1 | One logo everywhere (keyhole mark). Provide real SVGs; `logo-mark.svg` and `logo-wordmark.svg` are 0 bytes. | brand |
| P1 | Loading, empty and error states for every data surface; designed `error.tsx` and `not-found.tsx`. | UX |
| P2 | Replace contaminated images; source licensed Cameroonian photography. | imagery |
| P2 | Shorten long pages (About, Partners, Home) to a third of their length. | performance, UX |
