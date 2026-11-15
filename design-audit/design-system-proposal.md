# Design system proposal: "Open Door"

**Date:** 2026-11-15  
**Rationale:** `visual-direction.md`  
**Contrast evidence:** `tooling/contrast-report.txt`. Every proposed pair passes (61 checks). The 2 FAIL lines are the documented anti-pairs: `#36B373` as text, and white on taxi-yellow.

This is a specification. Nothing here is implemented yet. Syntax notes were verified against the installed packages, Tailwind CSS 4.3.3 (`@custom-variant` exists in `node_modules/tailwindcss/dist/lib.mjs`) and Next 16.3.6 (`node_modules/next/dist/docs/`).

## 1. Principles (the rules agents and humans check against)

1. **One meaning per colour.**
   - Blue = act or focus.
   - Green = verified or confirmed.
   - Amber = pending.
   - Red = error or destructive.
   - Grey = locked or cancelled.
   - Yellow fill = featured (paid).
   - Ink = everything else.
2. **Facts, not claims.** No absolute or unverifiable statements in UI copy (no "100%", "guaranteed", "certified" without a backend field).
3. **Five facts per listing card.**
4. **Tokens only.** No hex values, arbitrary pixel values or one-off radii in components. Tailwind arbitrary values (`w-[523px]`) need a code comment justifying them.
5. **Mobile canvas is 360 px.** Every component is designed there first.
6. **No decoration without a job.** No gradients, glass, blobs, corner bursts or decorative icons in headings.
7. **Bilingual from the start.** No user-facing string inside a component; every string goes in the `en` and `fr` catalogues.

## 2. Colour

### 2.1 Primitive palette (never used directly in components)

| Ramp | Steps |
|---|---|
| `blue` (from logo `#024BFF`) | 50 `#EEF3FF` · 100 `#DCE6FF` · 200 `#B5CAFF` · 300 `#8CB0FF` · 500 `#024BFF` · 600 `#0040E0` · 700 `#003BD1` · 800 `#0030A8` · 900 `#0B1E5C` |
| `ink` (from documented neutral `#172B4D`) | 50 `#F4F5F7` · 100 `#ECEEF2` · 200 `#DCDFE6` · 400 `#8993A4` · 500 `#5E6C84` · 600 `#44546F` · 800 `#172B4D` · 900 `#111D33` · 950 `#0B1424` |
| `green` | 50 `#E6F4EC` · 400 `#5CC98F` · 500 `#36B373` (decorative) · 700 `#1C7A4F` |
| `amber` | 50 `#FDF3DC` · 400 `#F2B84B` · 700 `#8A5A00` |
| `red` | 50 `#FCEBE8` · 400 `#FF8A7A` · 700 `#C42B1C` |
| `slate` (locked) | 600 `#5F6470` |
| `taxi` | 400 `#FFC72C` |

The `blue-50/100/200` and `blue-800/900` steps are interpolated for tints and the dark-theme accent. Before use as text they must be re-checked with `tooling/contrast.mjs`. Only the pairs in the report are certified.

### 2.2 Semantic tokens: light theme (default)

| Token | Value | Use | Contrast (measured) |
|---|---|---|---|
| `--bg-canvas` | ink-50 `#F4F5F7` | page background | — |
| `--bg-surface` | `#FFFFFF` | cards, panels, inputs | — |
| `--bg-sunken` | ink-100 `#ECEEF2` | table headers, wells, skeleton base | — |
| `--bg-inverse` | ink-800 `#172B4D` | dark bands, footer, tooltips | white text 14.10:1 |
| `--text-primary` | ink-800 | headings, body | 14.10 on surface · 12.93 on canvas · 12.14 on sunken |
| `--text-secondary` | ink-600 `#44546F` | supporting text | 7.65 · 7.02 · 6.59 |
| `--text-muted` | ink-500 `#5E6C84` | captions, placeholders, meta | 5.31 · 4.87 · 4.57 |
| `--text-link` | blue-600 `#0040E0` | inline links (underlined) | 7.47 · 6.85 · 6.43 |
| `--action` | blue-500 `#024BFF` | primary buttons, selected controls | white label 6.08 |
| `--action-hover` | blue-700 `#003BD1` | hover/pressed | white label 8.25 |
| `--action-subtle` | blue-50 | selected rows, active nav background | re-verify with ink text |
| `--focus` | blue-500 | 2 px focus ring + 2 px offset | 6.08 vs surface, 5.58 vs canvas (≥3 required) |
| `--border` | ink-200 `#DCDFE6` | dividers, card edges (decorative, exempt) | — |
| `--border-strong` | ink-400 `#8993A4` | input and checkbox edges (non-text UI) | 3.10 (≥3 required) |
| `--success` / `--success-bg` | green-700 / green-50 | verified, confirmed, available | 4.69 on tint · decorative icon green-500 |
| `--pending` / `--pending-bg` | amber-700 / amber-50 | pending review, awaiting payment | 5.37 |
| `--danger` / `--danger-bg` | red-700 / red-50 | errors, destructive | 4.90 on tint · 5.66 on surface |
| `--locked` | slate-600 `#5F6470` | locked, cancelled, suspended | 5.93 |
| `--featured` | taxi-400 `#FFC72C` | featured-placement chip **fill only**, with ink text | ink on it 9.04 · **white on it 1.56 (forbidden)** |

### 2.3 Semantic tokens: dark theme (designed, not inverted)

**Principles:**
- Navy, not black. The canvas comes from the brand ink.
- Elevation is shown by lighter surfaces, not shadows.
- Status colours shift to their light steps.
- The action fill keeps logo blue (white label 6.08:1). Link and focus switch to blue-300.

| Token | Dark value | Measured on canvas / surface / raised |
|---|---|---|
| `--bg-canvas` | ink-950 `#0B1424` | — |
| `--bg-surface` | ink-900 `#111D33` | — |
| `--bg-raised` (menus, dialogs) | `#18263F` | — |
| `--text-primary` | `#E9EDF5` | 15.70 / 14.35 / 12.90 |
| `--text-secondary` | `#B3BED1` | 9.83 / 8.98 / 8.07 |
| `--text-muted` | `#8E9AB0` | 6.49 / 5.93 / 5.33 |
| `--text-link`, `--focus` | blue-300 `#8CB0FF` | 8.57 / 7.83 / 7.04 |
| `--action` | blue-500 `#024BFF` (white label 6.08) | — |
| `--border` / `--border-strong` | `#26354F` / `#5B6B87` | strong 3.12 vs surface |
| `--success` · `--pending` · `--danger` | `#5CC98F` · `#F2B84B` · `#FF8A7A` | ≥ 6.61 on every surface |

**Images in dark mode** are never dimmed by filter. They keep their colours, and cards get a 1 px `--border` so photos don't bleed into the canvas.

### 2.4 Theme mechanism

- **Attribute:** `<html data-theme="light|dark">`. Tailwind v4 maps it with `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`.
- **Tokens:** defined as CSS variables under `:root` and `[data-theme=dark]`, then exposed through `@theme inline`. Components use `bg-surface`, `text-primary` and so on, and almost never need a `dark:` prefix.
- **Initial value:**
  - an explicit choice stored in a `theme` cookie (non-sensitive preference), else
  - `prefers-color-scheme`
- **Avoiding a flash:** an inline `<head>` script applies the value before first paint, per `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` §Themes. `<html suppressHydrationWarning>` stays limited to that attribute.
- **Theme switcher:** System / Light / Dark, in the account menu and the footer.

## 3. Typography

**Family:** Instrument Sans (variable: wdth 75–100, wght 400–700; OFL), loaded with `next/font/google`:
- `axes: ['wdth']`, `subsets: ['latin', 'latin-ext']`, `variable: '--font-sans'`, `display: 'swap'`
- automatic `adjustFontFallback` to limit layout shift

Measured: about 77 KB Latin woff2, `tnum` present, full French coverage (`design-research.md` §5).

**Fallback stack:** `var(--font-sans), ui-sans-serif, system-ui, "Segoe UI", Roboto, Arial, sans-serif`.

### 3.1 Scale (rem at a 16 px root; ratio about 1.25, rounded to a 4 px baseline)

| Token | Size / line height | Weight | Tracking | Width | Use |
|---|---|---|---|---|---|
| `display` | 48/56 (≥1024 px) → 36/44 (≥640 px) → 32/38 | 600 | −0.02em | 100 | Marketing hero `<h1>` only |
| `h1` | 30/36 → 26/32 | 600 | −0.015em | 100 | Page titles (marketing, detail) |
| `h2` | 24/32 → 22/28 | 600 | −0.01em | 100 | Section headings |
| `h3` | 20/28 | 600 | 0 | 100 | Card group titles, dialog titles |
| `title-ws` | 22/28 | 600 | −0.01em | 100 | Workspace page title (never larger) |
| `body-lg` | 18/28 | 400 | 0 | 100 | Lead paragraphs, detail descriptions |
| `body` | 16/24 | 400 | 0 | 100 | Default |
| `body-sm` | 14/20 | 400 / 500 | 0 | 100 | Secondary text, form help, card meta |
| `ui` | 14/20 | 500 | 0 | 100 | Buttons, tabs, nav |
| `table` | 14/20 | 400 | 0 | **87.5** | Workspace tables (more columns, same legibility) |
| `caption` | 12/16 | 500 | +0.01em | 100 | Timestamps, chart labels. **Never essential info, never on photos.** |
| `price-lg` | 28/32 | 600 | −0.01em | 100 | Detail-page price, `tnum` |
| `price` | 18/24 | 600 | 0 | 100 | Card price, `tnum` |

**Rules:**
- **No all-caps labels.** Sentence case everywhere, including table headers.
- **Prices and all tabular numbers** use `font-variant-numeric: tabular-nums`. Amounts are always formatted by the single formatter (`formatMoney(amount, 'XAF', locale)`, currently `formatCfa` with the XOF bug). A period suffix is always explicit and styled `body-sm` muted: "350 000 FCFA / month".
- **Measure:** prose maxes out at 68ch (about 680 px). Legal, about and descriptions use the reading container.
- **Headings** never use more than one colour and never accent a single word.
- **Weight budget:** 400, 500 and 600 in normal use; 700 is reserved for nothing (available, not used). This keeps the type calm.

## 4. Space, layout, grid

**Spacing scale** (4 px base, Tailwind defaults): 1 = 4 · 2 = 8 · 3 = 12 · 4 = 16 · 5 = 20 · 6 = 24 · 8 = 32 · 10 = 40 · 12 = 48 · 16 = 64 · 20 = 80 · 24 = 96.

| Context | Rule |
|---|---|
| Page gutter (side padding) | 16 px below 640 px · 24 px from 640 px · 32 px from 1280 px |
| Marketing section rhythm | 48 px mobile · 64 px tablet · 96 px desktop between sections |
| Card padding | 16 px (mobile and dense) · 20 px (marketing desktop) |
| Form field stack | 16 px between fields, 6 px label to input, 6 px input to help or error |
| Workspace content | 24 px panel padding, 16 px gaps in grids |

**Containers:**

| Name | Max width | Use |
|---|---|---|
| `reading` | 680 px | Legal, about, long descriptions |
| `content` | 1200 px | Marketing, detail pages |
| `wide` | 1440 px | Search results with map, workspaces |

**Grid:** 4 columns below 640 px, 8 columns from 640 px, 12 columns from 1024 px. Gutters 16 / 24 / 24 px.

**Breakpoints:** Tailwind defaults are kept (sm 640, md 768, lg 1024, xl 1280, 2xl 1536); there is no reason to diverge. **Design and test widths:** 360 (low-end Android, the floor), 390, 768, 1024, 1280, 1440.

**Layout rules:**
- **Discovery:** results 2 columns at ≥640 px, 3 at ≥1280 px. List + map split at ≥1024 px, with a map toggle below that.
- **Detail:** 8/4 split at ≥1024 px with a sticky booking panel (`top: 88px`). Below 1024 px, a sticky bottom action bar.
- **Workspace shell:** 248 px sidebar at ≥1024 px. Below that, a top bar with a menu drawer. Content is fluid. **No fixed widths** inside content; tables scroll horizontally inside their own container only.

## 5. Shape, elevation, borders

**Radii (tiered by role, not uniform):**

| Token | Value | Elements |
|---|---|---|
| `radius-sm` | 4 px | Badges, checkboxes, tags, table chips |
| `radius-md` | 8 px | Buttons, inputs, selects, small cards, menu items |
| `radius-lg` | 12 px | Cards, panels, dialogs, sheets (top corners only) |
| `radius-full` | 9999 px | The floating nav pills (top and bottom), the nav's active-link pill, the segmented control and its thumb, filter chips, avatars, toggle switches |
| `radius-door` | `9999px 9999px 12px 12px` | **Doorway frame**: hero, auth panel and empty-state images only |

**Elevation (light theme; navy-tinted shadows; borders do the work at rest):**

| Level | Treatment | Use |
|---|---|---|
| 0 | `--bg-surface` + 1 px `--border` | Cards, panels, table containers |
| 1 | `0 1px 2px rgb(23 43 77 / .06)` | Sticky headers, the sticky booking panel |
| 2 | `0 8px 24px rgb(23 43 77 / .12)` + 1 px border | Dropdowns, popovers, the date picker |
| 3 | `0 24px 48px rgb(23 43 77 / .18)` | Dialogs, sheets, drawers |

In dark mode, levels 1–3 drop the shadow and step up to `--bg-raised` with a `--border` edge.

A scrim behind dialogs uses `rgb(11 20 36 / .56)`. There is no backdrop blur (cost on low-end GPUs, and it is a "glass" cliché).

## 6. Iconography

**Decision: replace the 4 MB Material Symbols font with `lucide-react` SVG components.**

- **Why:**
  - Tree-shaken, so only imported icons ship.
  - No font-load blocking or flash (the legacy used `font-display: block`).
  - No ligature text leaking to screen readers or copy-paste.
  - Inherits `currentColor`.
- **Dependency cost:** to be measured with `next build` bundle output in Phase 1, before adoption is final. **Fallback** if rejected: hand-maintained inline SVGs in `src/components/ui/icons/`.
- **Specs:**
  - Sizes 16 (dense, inline), 20 (default UI), 24 (navigation, empty states).
  - Stroke 1.75.
  - Icons never carry meaning alone. Every icon-only button has `aria-label` and a tooltip.
- **Banned:** icons inside headings, icon + caption "feature chip" rows on cards, emoji as UI.

## 7. Motion

| Interaction | Duration / easing | Property |
|---|---|---|
| Hover/press colour | 120 ms ease-out | color, background-color, border-color |
| Menu, popover open | 140 ms ease-out (close 100 ms) | opacity, translateY(4 px → 0) |
| Dialog | 180 ms cubic-bezier(.2,.8,.2,1) | opacity, scale(.98 → 1) |
| Sheet/drawer | 220 ms same curve | translate |
| Skeleton shimmer | 1.4 s linear, infinite | background-position |
| Hero doorway image (once per session) | 400 ms ease-out | opacity, clip from 92% to 100% height |

- **No animation** on scroll entry, card hover lift, parallax or counters.
- Under `prefers-reduced-motion: reduce`, everything becomes instant or an opacity-only change at ≤100 ms, and the shimmer becomes a static tint.

## 8. Component standards

Every interactive component specifies the same state set: default, hover, focus-visible, active/pressed, disabled, loading (where async), error (where input), and selected (where selectable). It ships with a component test (role, keyboard, `aria-*`) and EN/FR strings passed in, never hard-coded.

### 8.1 Primitives (`src/components/ui/`)

| Component | Specification | Implementation basis |
|---|---|---|
| **Button** | Variants: primary (action fill, white text), secondary (surface + strong border, ink text), ghost (no border, ink text), destructive (danger fill or outline), link. Sizes sm 32 px / md 40 px / lg 48 px. **Minimum touch target 44 × 44 px** on touch (sm buttons get an expanded hit area). Loading: spinner replaces the leading icon, the label stays, `aria-busy`, width does not change, double submit blocked. No trailing arrows in labels. | Native `<button>`. A `cva`-style variant map written locally (no dependency). |
| **Input / Textarea** | 48 px tall on mobile, 40 px at ≥1024 px. Label always visible above (no placeholder-as-label). Help text below. Error text replaces help, with `aria-invalid` and `aria-describedby`, an icon plus colour. Prefix/suffix adornments ("FCFA", "+237", "m²"). Read-only uses the sunken background. | Native. |
| **Select (single)** | Native `<select>` styled with a chevron. Best on low-end Android, where it opens the OS picker. | Native. |
| **Combobox / multi-select** | City and neighbourhood search, amenities. Type-ahead with keyboard navigation and `aria-activedescendant`. | Radix Popover + a local listbox, **or** native `<datalist>` for the simple city case. Decide in Phase 1. |
| **Checkbox, Radio, Switch** | 20 px box inside a 44 px label hit area. Checked uses the action fill. Switch only for instant settings, never in forms that need a submit. | Native inputs. |
| **Segmented control** | Rent / Buy / Stay, list / map, day / month. Radio group semantics. Selected thumb `radius-full` on sunken. | Native radio inputs. |
| **Dropdown menu** | Account menu, row actions. Level 2 elevation, 8 px items, 40 px rows, typeahead, Esc to close, focus return. | `@radix-ui/react-dropdown-menu` (accessibility is hard to get right; justified). |
| **Popover** | Date picker, filter popovers on desktop. | `@radix-ui/react-popover`. |
| **Dialog (modal)** | Confirmations, checkout steps. Max 560 px, full-screen sheet below 640 px. Title required. Focus trapped, Esc closes unless a destructive action is in progress, background `inert`. | Native `<dialog>` with `showModal()` (built-in focus trap and inert), plus a small wrapper. |
| **Drawer / bottom sheet** | Mobile filters, workspace navigation below 1024 px. Grab handle, max 90 vh, sticky footer for the primary action ("Show 24 results"). | Same `<dialog>` wrapper with a sheet variant. |
| **Badge / status** | One component, a **closed** `status` prop, typed from the backend enum once verified: `verified` · `confirmed` · `available` → success; `pending_review` · `awaiting_payment` → pending; `rejected` · `failed` → danger; `locked` · `cancelled` · `suspended` → locked; `featured` → taxi fill. 24 px tall, `radius-sm`, icon + text (colour is never the only signal). | Local. |
| **Tabs** | Underline style, 2 px action indicator, roving tabindex, arrow keys. On mobile a scrollable row with fade edges. | Local, or Radix Tabs if roving focus proves costly. |
| **Card** | Container only (surface, border, `radius-lg`, padding token). Domain cards compose it (§8.2). | Local. |
| **Table** | Sticky header on sunken, `table` type token (wdth 87.5), 48 px rows (40 px compact option), right-aligned `tnum` numbers, sortable headers with `aria-sort`, row-selection checkboxes, horizontal scroll inside the container. Below 768 px, rows become stacked "row cards" with the 3 key columns. | Native `<table>`. |
| **Skeleton** | Matches the final layout's geometry exactly (no layout shift). Sunken tint with shimmer. Never a spinner for page content. | Local. |
| **Toast** | Bottom-centre on mobile, bottom-right on desktop. `role="status"` for success, `role="alert"` for errors. Auto-dismiss 5 s for success; errors persist until dismissed. **Never announces a payment or booking success the backend has not confirmed.** | Local, with an `aria-live` region. |
| **Inline alert** | Info / success / warning / danger, with a 4 px left rule in the status colour on the subtle background, title + body + optional action. Not filled blocks (the legacy sage boxes). | Local. |
| **Empty state** | Doorway-framed illustration or photo (max 160 px), one-sentence heading saying what's missing, one sentence on what to do, one primary action. Example: "No properties yet" / "Add your first property to start receiving enquiries." / [Add a property]. | Local. |
| **Error state** | Says what failed and how to recover, never apologises: "We couldn't load these listings. Check your connection and try again." [Try again]. Retains user input. | Local plus `error.tsx` per segment. |
| **Pagination** | Previous / page numbers (max 7 with ellipsis) / next; "Showing 1–24 of 248" only when the total comes from the API. On mobile, "Load more" plus a page indicator. | Links (URL state). |

### 8.2 Domain components

| Component | Content contract (in order) | Notes |
|---|---|---|
| **PropertyCard** | 4:3 image (lazy, `sizes` set) → price + period (`price`) → type + bedrooms phrase ("3-bedroom apartment") → "Neighbourhood, City" (muted) → **one** status (verified *or* featured). Save (heart) button top-right of the image, 44 px target. | The whole card is one link. The save button is a separate control, outside the link in the DOM. |
| **HotelCard** | 3:2 image → name → "Neighbourhood, City" → rating only if the API provides one → "from X FCFA / night" → one status. | No invented stars. |
| **SpaceCard** (flexible) | 4:3 image → price with the selected period (day/month toggle drives it) → type + capacity ("Meeting room · 8 people" is written as "Meeting room for 8") → place. | One price shown, never dual tiers. |
| **SearchBar** | Segmented Rent/Buy/Stay → location combobox → (Stay only) dates + guests → Search button. The hotel variant follows Where / When / Who. | URL-driven. Submits with an empty location (shows everything). |
| **FilterPanel** | Desktop: left rail, applies on change, updates the URL, live count. Mobile: bottom sheet, "Show N results" footer, "Clear all". | Only filters the backend supports (contract D-4). |
| **Gallery** | Desktop: 1 + 4 mosaic, "All photos (n)" opens a keyboard-operable lightbox (arrows, Esc, focus return). Mobile: swipe carousel with a counter "3 / 24". | Low-res blur placeholders. |
| **BookingPanel / ActionBar** | Price breakdown **only from API fields**, date/duration inputs, the primary action named by intent ("Request a viewing", "Reserve", per contract), a secondary "Message the owner". Mobile: sticky bottom bar with price + primary action. | Never shows a success state without a backend response. |
| **LocationBlock** | District-level map or static image + "Exact address shared after your booking is confirmed." | Coordinates never reach the client before confirmation (Decision 007). |
| **ConversationList / Thread** | Avatar, name, listing context, last message, time, unread dot. Thread with day separators, sent/read state (only if the backend supplies it). Composer with attachments only if supported. | Realtime is contract-dependent. |
| **AvailabilityCalendar** | Month grid, unit rail, booked/blocked/available states using status tokens + patterns (striped for blocked), keyboard grid navigation. | Owner and hotel. |
| **StatTile** | Label (sentence case, `body-sm` muted) → value (`h2`, `tnum`) → optional delta with direction icon + text. **Only API-backed numbers.** No decorative corner shapes. | Workspaces. |

### 8.3 Navigation

- **Public header: floating pill nav** (developer decision, 2026-11-15).
  - **Shape and position:**
    - A `position: fixed` bar detached from the viewport edges, `top: 12px` (16 px from 1024 px).
    - Horizontally centred, width `min(100% - 2 × gutter, 1200px)`, so it aligns with the `content` container.
    - Height 56 px (48 px below 640 px), `radius-full`.
  - **Surface (no glass):**
    - Solid `--bg-surface` (dark: `--bg-raised`), 1 px `--border` and elevation 2.
    - No backdrop blur and no transparency. It must stay legible over photography and readable on low-end GPUs (§5).
  - **Contents (≥1024 px):**
    - Left: keyhole mark + wordmark.
    - Centre: Properties, Hotels, Flexible spaces, Map. The active link sits on an inner `--action-subtle` pill with `aria-current="page"`, which echoes the segmented control so the nav and the search speak the same shape language.
    - Right: language (EN/FR), "List your property" (ghost), "Sign in" (secondary, `radius-full` inside the pill) or the avatar menu.
  - **Contents (below 1024 px):** logo, language, and a menu button that opens a full-width sheet. The pill stays compact; links never wrap.
  - **Scroll behaviour:** always visible (no hide-on-scroll; users on slow devices lose the nav otherwise). After 8 px of scroll, elevation 2 → 3 to separate it from the content passing under it. No size animation.
  - **Layout consequences:**
    - Every public page gets `padding-top: calc(56px + 12px + 16px)` (≥1024 px: `calc(56px + 16px + 24px)`), set once in the marketing layout.
    - `html { scroll-padding-top }` takes the same value, so anchor jumps and focus-scroll are never hidden under the pill (WCAG 2.4.11 Focus Not Obscured).
    - The detail page's sticky booking panel uses `top: 88px`, which still clears the pill: 16 + 56 + 16.
  - **Layering:** `z-index` scale: pill nav 40, sheets and drawers 50, dialogs 60, toasts 70.
  - **Applies to public and auth pages only.** Workspaces keep the docked sidebar shell below. A floating bar over dense tables wastes vertical space and hides sticky table headers.
- **Public bottom bar (below 768 px), also a floating pill** for one shape language:
  - Search, Map, Saved, Account.
  - Inset 12 px from the side edges and `calc(12px + env(safe-area-inset-bottom))` from the bottom, height 64 px, `radius-full`.
  - Same surface and elevation as the top pill.
  - Icons + labels; active item in the action colour + `aria-current="page"`.
  - Page content gets matching bottom padding.
  - The detail page's sticky action bar **replaces** the bottom pill on that page (never stacked).
- **Workspace shell:**
  - Sidebar items grouped by job.
  - Owner: *Overview* / *Listings* (Properties, Add a property) / *Bookings & visits* (Requests, Calendar) / *Messages* / *Money* (Payouts) / *Settings*.
  - Hotel and admin follow the same pattern with their own groups.
  - Badge counts only from the API.
  - Below 1024 px: top bar with a menu button opening the drawer.
- **Footer:** 3 link groups (Explore, Company, Legal) + language/theme controls + © line. **No currency switcher** until multi-currency is real.

### 8.4 Forms

- **Validation:** schema validation with `zod` (dependency; justified because `context-files/FRONTEND_ARCHITECTURE.md` §10 requires schema-based validation). Shared schemas live per feature. Server errors map to fields when the API returns field paths.
- **Submission:** React 19 `useActionState` / form actions. No form library unless a later form proves it necessary.
- **Validation timing:** on blur, then on change once the field is invalid. A summary at the top on submit for forms longer than 6 fields, with links to the fields.
- **Phone:** `+237` default country, with a country selector for future markets. Format as typed: `6 XX XX XX XX`.
- **Dates:** displayed `dd/mm/yyyy` (EN-CM and FR-CM). Native `<input type="date">` on mobile. A custom range picker on desktop for hotels only (dependency decision deferred to the hotel phase).

### 8.5 Writing rules (UI copy)

- Sentence case. Active verbs. A button says what happens: "Request a viewing", "Save changes", "Publish listing". The resulting toast uses the same verb: "Listing published".
- **No** "Submit", "Click here", "Learn more" without an object, exclamation marks, "Oops", or apologies.
- Errors name the problem and the fix. Empty states invite the next action.
- Location format: "Bonapriso, Douala". Money: "350 000 FCFA / month" (narrow no-break space thousands separator, matching `Intl` fr-CM output; verify `en-CM` output in Phase 1).
- Every string goes in `messages/{namespace}.ts` with both `en` and `fr` tables. A missing `fr` key fails CI (a test, not a runtime fallback, for shipped namespaces).

## 9. Responsive rules (checklist per screen)

1. Works at **360 px** with no horizontal page scroll. Wide tables scroll inside their container.
2. Primary action reachable without scrolling on detail and checkout steps (sticky bar).
3. Touch targets ≥ 44 × 44 px; at least 8 px between adjacent targets.
4. Images use `next/image` with explicit `sizes`, and `priority` only on the LCP image.
5. Filters become a sheet below 1024 px; workspace nav becomes a drawer below 1024 px.
6. Text never sits on photos except in the hero, and then on a solid ink scrim panel (not a gradient).
7. Font sizes never go below 12 px. Essential text is never below 14 px.

## 10. Proposed Tailwind v4 token sketch (illustrative; written in Phase 1)

```css
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

:root {
  --bg-canvas: #F4F5F7; --bg-surface: #FFFFFF; --bg-sunken: #ECEEF2; --bg-inverse: #172B4D;
  --text-primary: #172B4D; --text-secondary: #44546F; --text-muted: #5E6C84; --text-link: #0040E0;
  --action: #024BFF; --action-hover: #003BD1; --focus: #024BFF;
  --border: #DCDFE6; --border-strong: #8993A4;
  --success: #1C7A4F; --success-bg: #E6F4EC; --pending: #8A5A00; --pending-bg: #FDF3DC;
  --danger: #C42B1C; --danger-bg: #FCEBE8; --locked: #5F6470; --featured: #FFC72C;
}
[data-theme="dark"] {
  --bg-canvas: #0B1424; --bg-surface: #111D33; --bg-sunken: #0E1829; --bg-raised: #18263F;
  --text-primary: #E9EDF5; --text-secondary: #B3BED1; --text-muted: #8E9AB0; --text-link: #8CB0FF;
  --focus: #8CB0FF; --border: #26354F; --border-strong: #5B6B87;
  --success: #5CC98F; --pending: #F2B84B; --danger: #FF8A7A;
}
@theme inline {
  --color-canvas: var(--bg-canvas); --color-surface: var(--bg-surface); /* … one line per token … */
  --font-sans: var(--font-instrument), ui-sans-serif, system-ui, sans-serif;
  --radius-door: 9999px 9999px 12px 12px;
}
```

`--bg-sunken` in dark mode (`#0E1829`) is measured: text tokens on it range from 6.26:1 to 15.15:1.

## 11. Dependency decisions summary

| Need | Decision | Status |
|---|---|---|
| Font | `next/font/google` Instrument Sans (already available, no new package) | Ready |
| Icons | `lucide-react` (replaces the 4 MB font) | Proposed; measure in Phase 1 |
| Accessible menus/popovers | `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover` only | Proposed |
| Dialog, sheet, select, checkbox | Native elements, no package | Ready |
| Validation | `zod` | Proposed |
| Class composition | Existing `src/lib/utils/cn.ts` (no `clsx` or `tailwind-merge`) | Ready |
| Maps | **Deferred.** Needs a provider decision (D-5) and must respect approximate locations. | Blocked |
| Date-range picker | **Deferred** to the hotel phase | Blocked by the hotel booking contract |
| Charts | **None** until an API returns time series worth plotting | — |
