# Design research

**Date:** 2026-11-15  
**Companion files:** `design-reference-index.md` (one row per reference), `tooling/` (scripts used).

## 1. Methodology

### 1.1 Sources and how they were inspected

| Method | What it yields | Used for |
|---|---|---|
| **Text fetch** of the public page (web-fetch agent) | Page structure, nav labels, search field labels, card content, microcopy, trust wording | All 25 URLs attempted |
| **Rendered visit** in headless Chrome, one load per page at 1440 and 390 px | Viewport screenshot (kept in a private scratchpad, **not** committed, because the content is copyrighted) | 12 sites |
| **Computed styles** via `getComputedStyle` on the rendered page | Real font families, sizes, weights, line heights, button colours, radii, text colours | 10 sites |
| **Font-file inspection** (`tooling/fontcheck.py`, fontTools) | Tabular figures, French glyph coverage, variable axes, Latin woff2 size | 7 candidate typefaces |
| **Local skill data** (`ui-ux-pro-max` typography search) | Category-default pairings | Used as a baseline to *avoid* (see §4.3) |

### 1.2 Rules followed
- **Nothing was described that wasn't seen.**
  - Every reference carries an evidence level: `text`, `render`, `styles`, or `not inspected`.
  - Sites that refused automated access were **not** worked around. Behance (403), Dribbble (empty 202) and Booking.com (empty 202, blank render) are recorded as not inspected, along with others.
- **No assets were downloaded, no paid templates were opened, and no screenshots of third-party work are committed.**
- **Rightmove's footer prohibits scraping.** It was loaded once, like a normal browser visit, for analysis only.

### 1.3 Coverage

| Category (prompt §3) | Inspected | Not inspected |
|---|---|---|
| 1. Premium real-estate marketplaces | Compass, Property24, Private Property (text), **Nesto** (developer screenshot) | — |
| 2. Search and discovery | Rightmove, Property24, PropertyPro, meQasa, **NESTORA** (developer screenshot) | Zillow, Redfin |
| 3. Property detail pages | Airbnb (card and detail structure via text), Compass (cards) | Zillow, Redfin |
| 4. Hotel booking and hospitality | Airbnb | Booking.com, Aman |
| 5. Property-management dashboards | Guesty, Hostaway, AppFolio, Buildium, Envato UI kit (text), **ClarityUI** (developer screenshot) | Behance "Investment SaaS", Behance "CRM" (unless they are among the screenshots) |
| 6. Tenant / customer dashboards | AppFolio and Buildium resident portals (text) | — |
| 7. Admin dashboards | Linear, Stripe | — |
| 8. Responsive mobile marketplaces | Airbnb @390, PropertyPro @390, Property24 (text: filter sheet) | Jiji.cm (DNS failure), BuyRentKenya |

**17 references inspected:**
- 6 with render + computed styles
- 8 text-only or partial
- 3 from developer-provided screenshots, added 2026-11-15

That meets the prompt's 15–20 target. **8 remain not inspected** (Booking.com, Zillow, Redfin, Awwwards, Aman, Jiji.cm, BuyRentKenya, and whichever Behance/Dribbble links the screenshots don't cover).

## 2. What the inspected products actually do (observed facts)

### 2.1 Typography and colour in production (computed styles, 1440 px)

| Product | Body face | Display face | Body size / lh | Text colour | Action colour | Button radius |
|---|---|---|---|---|---|---|
| Airbnb | Airbnb Cereal VF | same | 14 / 20 | `#222222` | `#FF385C` (brand used for one CTA) | full / 20 px |
| Compass | Compass Sans | **Compass Serif** 48 / 72, 600 | 16 / 24 | `#171717` | black / white | 0 px |
| Rightmove | Effra | same, 500 | 16 / normal | `#000433` navy | `#00DEB6` mint | 8 px |
| Property24 | Source Sans (custom) | same, **400** at 54 px | 15 / 22 | `#0F0C36` | `#F04432` (search), `#1A72DB` | 0 / 8 px |
| PropertyPro | Avenir Next LT Pro | same, 700 | 14 / 21 | `#1A2258` navy | `#330066`, `#216BFF` | 4 / 8 px |
| meQasa | Raleway | same, 600, −1 px tracking | 14 / 20 | `#333`, body `#888` | `#FD5573` | 0 / 24 px |
| Guesty | Figtree | same, **400** at 56 px | 16 / 24 | `#101010` | `#007A67` teal | 30 px pill |
| Hostaway | Montserrat | Lato Bold (caps, +2.7 px tracking) | 16 / 18.4 | `#465262` | `#B94D00`, `#008380` | 0 / 4 px |
| Linear | Inter Variable | same, 510 at 64 px, −1.4 px | 16 / 24 | `#F7F8F8` on `#08090A` | translucent whites | 8 px / full |
| Stripe | Söhne (var.) | same, 700 | 16, **weight 300** | `#425466` | `#9966FF` / `#533AFD` | 16.5 px pill |

Patterns that matter for Annorent:
1. **Every leading marketplace uses one family**, often proprietary. Only Compass pairs a serif display, and only for the hero `<h1>`.
2. **Ink is never pure black.** Rightmove, PropertyPro and Property24 all use a **navy ink** (`#000433`, `#1A2258`, `#0F0C36`). This validates keeping the documented neutral `#172B4D` as Annorent's ink.
3. **The brand colour is rarely the main action colour on marketplaces.** Airbnb reserves its pink for the search button. Compass and Property24 use black or high-contrast accents for search. One loud colour, used in one place, is what makes a CTA findable.
4. **Large display type is set light, not bold, on the more refined products.** Property24 and Guesty set display type at weight 400 at 54–56 px; Linear uses 510 with negative tracking. Bold-everything is the template look.
5. **The African marketplaces (Property24, PropertyPro, meQasa) are the least refined visually**, with ad-heavy layouts. meQasa shows two display banners above the search and relies on a Google Translate bar for French. That is the competitive gap: a calm, fast, properly bilingual product would stand out locally.

### 2.2 Search and discovery

| Product | Observed pattern | Lesson for Annorent |
|---|---|---|
| Airbnb | Three labelled segments: Where / When / Who ("Search destinations", "Add dates", "Add guests"). Category tabs above. Mobile: bottom tab bar Explore / Wishlists / Log in. | Hotels use this three-question model. The mobile bottom bar is the right pattern for the public site too. |
| Rightmove | A single field: "Enter postcode, city, town or station". Buy / Rent live in the top nav, not in the search. | Start with one location field. Put advanced filters on the results page, not the homepage. |
| Compass | Buy / Rent / Sell tabs fused to one wide search input with a square search button; a serif headline over full-bleed photography. | The search object can *be* the hero. Tabs attached to the field, not floating above it. |
| Property24 | Search field + a "Map" toggle + Search button; then a row of selects (Property Type, Min Price, Max Price, Bedrooms) + "Filters". The expanded filter set is a sheet with a count badge. Location hierarchy: province → city → suburb, in URLs. | Region → city → neighbourhood is the right model for Cameroon (10 regions). Put the hierarchy in URLs for SEO. Use a "Filters (n)" sheet on mobile. |
| PropertyPro (NG) | Tabs Buy / Rent / Short Let / Land; Type, Bed, Min and Max price; listing price "₦ 750,000,000", rent "/year"; state → area URLs. | Long-term rent is quoted per year in West Africa (Nigeria). **Cameroon convention must be verified** (monthly rent with multi-month advance is common). Show the period explicitly on every price. |
| meQasa (GH) | Tabs For Rent / For Sale / New Units / Short Lease / Land; currency label "GH₵" inside the price inputs; Region then Locality; a visible phone number in the header. | Put the currency inside the field ("FCFA" adornment). A phone/WhatsApp contact path is expected locally, subject to privacy rules. |

### 2.3 Listing cards (observed content order)
- **Airbnb:** photo → optional "Guest favorite" badge → "Apartment in Douala" (type + city) → "$114 for 2 nights" (the price always carries its period) → rating.
  - **No title and no specs.** Airbnb's live content was even localised to **Douala and Libreville**, proof that this card works for the Cameroonian market.
- **PropertyPro:** image → "5 bedroom fully detached home" (the title *is* the spec) → price → location.
- **meQasa:** For Rent / For Sale tag → "4 bedroom House for rent at Tse Addo" → three numbers (beds, baths, toilets).
- **Lesson:** the strongest cards carry **at most 5 facts**:
  1. image
  2. price with period
  3. type + bedrooms as one phrase
  4. neighbourhood, city
  5. one status (verified *or* featured, never both stacked)

  The legacy card carried 11, including three overlay badges and three amenity chips.

### 2.4 Trust signals (observed wording)
- **Compass:** licence statement, Equal Housing Opportunity, "Scam Avoidance" link, a sourced statistic ("Source: April 2025 RealTrends…").
- **Airbnb:** AirCover, "Get help with a safety issue", "Report neighborhood concern". Trust is a **service with a name**, not a badge.
- **Property24:** agent ratings, attorney finder, tenant screening as a named product.
- **meQasa:** a gate on posting until the user is verified ("Please get verified to begin posting properties").
- **Lesson:** credible trust is **specific, sourced and actionable** (report a listing, how verification works, a named process). Annorent's legacy used **absolute claims** ("100% verified", "Guaranteed"), which the strongest products avoid.
  - Annorent can honestly show "Verified by Annorent" **only** where the backend returns a verification status, and link it to a page that explains the process.

### 2.5 Dashboards (text plus Guesty and Stripe renders)
- **Guesty:** information architecture grouped by job:
  - "Guests and reservations": Unified Inbox, Multi-Calendar, Reviews
  - "Distribution and operations": Channel Manager, Tasks
  - "Business and financials": Payments, Trust Accounting, Owners
- **Hostaway:** "Owner Statements" and "Owner Portal" as distinct modules. Automation framed as "never face a double booking".
- **AppFolio / Buildium:** **one portal per role** (resident, owner, vendor, investor), confirming Annorent's role-segmented `/account`, `/owner`, `/hotel`, `/admin`.
- **Linear:**
  - status as a fixed ordered set (Backlog → Todo → In Progress → In Review → Done) with counts per column
  - dense 13 px UI text on a dark surface
- **Stripe:**
  - tables with explicit states ("Payment succeeded", "Processing Approved")
  - rule tables with counts (Matches / Changes)
  - money with the currency on every figure
- **Lessons:**
  1. Group workspace navigation by **job**, not by data type.
  2. Every status is a **closed set** with one colour each, shown identically everywhere.
  3. Admin is a **queue**, not a dashboard of vanity stats.
  4. The inbox and calendar are the two most-used owner and hotel screens, so they deserve the most design effort, not the overview page.

### 2.6 Developer-provided design references (Nesto, NESTORA, ClarityUI)

These are design-tool concepts, not live products, so they show *intent*, not proven usability. Their data is placeholder, and some of it is visibly broken: ClarityUI's y-axis repeats "AED 1500" on every gridline.

| Pattern seen | Where | Verdict for Annorent |
|---|---|---|
| Nav as floating pills over a contained, rounded hero card | Nesto | **Adopted** as the floating pill nav (D-10), but solid rather than translucent, and aligned to the content container |
| Search card: tab row fused to labelled fields + one strong button | NESTORA | **Adopted.** It matches the SearchBar spec (labels always visible) |
| Card order: price → title → address → specs → agent + action | NESTORA | **Partly adopted.** Price first, yes. The agent row is dropped from cards (it fails the 5-fact rule) and moves to the detail page. |
| "How the platform works" with numbered steps | NESTORA | **Adopted**, because it is a true sequence (search → visit → book → pay). Only steps the product supports. |
| FAQ accordion as trust content | NESTORA | **Adopted** for home and the owner page, answering real questions (verification, fees, viewing). |
| Workspace top bar with breadcrumbs, search, messages, notifications | ClarityUI | **Adopted** for the workspace shell. |
| KPI with an actionable sub-line ("2 Checks Bounced") | ClarityUI | **Adopted** in StatTile: the sub-line tells the owner what to do next. |
| Entity detail rail on the right | ClarityUI | **Adopted** for owner property pages and admin review pages. |
| Big invented stats, accent word in the headline, caps eyebrows, arrow-in-circle CTAs, dark-gold or purple palettes, yellow as the action colour | All three | **Rejected.** Each is either a fabricated claim or a "generated look" tell, and yellow already means "featured" in Annorent. |

## 3. Synthesis: design principles for Annorent

1. **Search is the hero; content is the decoration.** Open with the act of looking for a place in a Cameroonian city, not with a slogan.
2. **One colour means "you can act".** Logo blue is reserved for actions and focus. Ink navy carries brand and text. Green means only "verified / confirmed". A taxi-yellow fill means only "featured (paid)".
3. **Facts over claims.** Every trust statement must be backed by a backend field or a published process page.
4. **Five facts per card.** Image, price + period, type + size, place, and one status.
5. **Mobile is the primary canvas at 360 px.** Bottom navigation on public pages, bottom sheets for filters, a sticky action bar on detail pages.
6. **Bilingual by construction.** EN and FR catalogues from day one, never machine translation (the meQasa anti-pattern).
7. **Light on bytes.** One variable font (about 77 KB Latin), SVG icons, responsive images, no hero video.
8. **Workspaces are tools.** Dense, tabular, queue-first; display type is reserved for marketing.

## 4. Things deliberately not adopted

### 4.1 From the references
- **Airbnb's brand-pink-only search button.** Copying Airbnb's single loud colour verbatim would make Annorent read as a clone. The principle (one loud action colour) is adopted, with Annorent's own blue.
- **Compass's serif display and black-and-white palette.** Gallery-luxury reads exclusionary for a broad Cameroonian market of families, students and young professionals.
- **Stripe's diagonal gradient bands, and Linear's near-black canvas as the default theme.** Both are distinctive to those brands, and both appear in the "generated look" catalogue.
- **meQasa and PropertyPro's ad slots above the search.** The product loses trust at the first scroll.
- **Rightmove's full-screen consent wall** (212 partners). Annorent should run minimal, first-party analytics and use a non-blocking notice.

### 4.2 From the legacy UI
- Absolute trust claims, institutional or investor framing, all-caps eyebrows, stacked badges, decorative stat-card bursts, monospace telemetry in admin.

### 4.3 From the local `ui-ux-pro-max` dataset
- The search for "real estate marketplace hospitality trust premium" returned these category defaults:
  - Cinzel + Josefin Sans ("Real Estate Luxury")
  - Playfair Display SC + Karla
  - DM Sans
  - Lexend + Source Sans 3
  - IBM Plex Sans
  - Bodoni Moda + Jost
- These are what every generated real-estate site reaches for. They were used only as a list of what to avoid. Typeface selection was instead driven by measured requirements (§5).

## 5. Typeface evaluation (measured, `tooling/fontcheck.py`)

Requirements:
- **tabular figures (`tnum`)** for FCFA amounts in tables and price columns
- full **French glyph coverage** (é è ê ë à â ç î ï ô û ù ü ÿ œ æ « »)
- a **variable** file
- a small Latin woff2
- **OFL licence** and availability in `next/font/google` (verified in `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`)

| Typeface | tnum | French | Axes | Latin woff2 | Verdict |
|---|---|---|---|---|---|
| **Instrument Sans** | ✅ | ✅ | wdth 75–100, wght 400–700 | **77 KB** | **Selected.** The width axis gives a condensed cut for dense tables and a normal cut for marketing, from one file. Less over-used than Inter, Manrope, DM Sans or Plus Jakarta. |
| Schibsted Grotesk | ✅ | ✅ | wght 400–900 | 51 KB | Strong runner-up (Direction A body face). |
| Manrope | ✅ | ✅ | wght 200–800 | 27 KB | Smallest file, but it was the old Pan-African spec's choice and is now a category default. |
| Geist | ✅ | ✅ | wght 100–900 | 33 KB | Reads as "Vercel template". Rejected for brand distinctiveness. |
| Bricolage Grotesque | ✅ | ✅ | opsz, wdth, wght | 157 KB | Characterful (Direction C), but double the bytes. |
| Fraunces | ❌ | ✅ | opsz, wght, SOFT, WONK | 134 KB | Display only (Direction A). No tabular figures, so prices could never use it. |
| Hanken Grotesk | ❌ | ✅ | wght 100–900 | 37 KB | Rejected: no tabular figures. |

## 6. Limitations and requests

1. **Partly resolved (2026-11-15).** The developer supplied 3 screenshots (§2.6). The 6 linked references in `context-files/DESIGN_SYSTEM.md` still can't be fetched automatically, and which link each screenshot came from is unconfirmed. Original note:
   - 4 Behance projects returned HTTP 403, and the Dribbble shot returned an empty page. Only the Envato item's text was readable; its preview images were not inspected.
   - **Request:** please export 2–3 screenshots of each Behance and Dribbble project (the screens you liked) into `design-audit/screenshots/references/`. I'll add them to the catalogue with proper attribution and analysis.
2. **No real Cameroonian product was inspected.** `jiji.cm` failed DNS resolution.
   - **Request:** name any Cameroonian property or hotel sites you or your users actually use (e.g. Facebook groups, WhatsApp channels, local agency sites). Local habits matter more than global references.
3. **Hotel references are thin.** Booking.com rendered blank and Aman failed. Airbnb is the only hospitality reference inspected. Screenshots of Booking.com's hotel detail and date picker would help.
4. **Price-period convention for Cameroonian rentals** (monthly vs yearly, months of advance rent, agency fees) is unverified and drives card and detail-page design. The backend team or the product owner should confirm it.
