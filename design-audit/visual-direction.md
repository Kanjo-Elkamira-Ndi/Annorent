# Visual direction

**Date:** 2026-11-15  
**Inputs:**
- the brand logo (`public/logo.jpg`)
- the documented palette (`context-files/DESIGN_SYSTEM.md` §5)
- research findings (`design-research.md`)
- the legacy audit (`current-frontend-audit.md`)

Every contrast figure below is computed by `tooling/contrast.mjs`; the full output is in `tooling/contrast-report.txt`.

## 1. Starting point: the brand and the documented palette

### 1.1 The logo
`public/logo.jpg` (1080 × 1080) is a white keyhole inside an open ring, on a saturated blue.

**Sampled blue: `#024BFF`.** It covers about 903,000 of 1.17 M pixels; the next variants (`#024CFD`, `#014CFF`) are JPEG noise.

The logo's geometry says **access**: a keyhole inside an arch, an opening into a closed shape. It contains no house, roof or building. That restraint is a strength. The legacy UI threw it away by using a generic building glyph everywhere outside the header.

There are no vector files: `public/logo-mark.svg` and `logo-wordmark.svg` are 0 bytes. A traced SVG is a Phase 1 dependency (see the roadmap).

### 1.2 The documented palette, evaluated

| Token | Value | Measured | Verdict |
|---|---|---|---|
| Primary | `#0052CC` | White on it 6.82:1 | Passes, but **not the logo colour**. Next to the logo it reads as a different, duller brand. **Replaced by `#024BFF`** (user decision). |
| Logo blue | `#024BFF` | White on it **6.08:1**; as text on white **6.08:1**; on `#F4F5F7` **5.58:1** | Passes AA for normal text and for white button labels. **Becomes the action colour.** |
| Secondary | `#F4F5F7` | Ink on it 12.93:1 | **Kept**, as the page canvas. |
| Tertiary | `#36B373` | As text on white **2.67:1 (fails)** | **Kept for decoration only**: icons, verified-check fills, chart marks. Never text. Success text uses `#1C7A4F` (4.69:1 on its tint). |
| Neutral | `#172B4D` | 14.10:1 on white | **Kept, promoted to brand ink**: headings, body text, footer, dark bands. Rightmove, Property24 and PropertyPro all use navy ink too (`design-research.md` §2.1), which confirms it reads as "property". |

**Conclusion:** the palette needs **better hierarchy, not replacement**. Three of the four documented colours stay. The documented primary is swapped for the logo's own blue, and each colour gets exactly one job.

## 2. Three directions

All three use the same token architecture (`design-system-proposal.md`). They differ in personality, type and the one memorable element.

---

### Direction A: "Title Deed" (editorial and assured)

**Personality:** a serious, document-grade marketplace. It feels like a well-run notary's office that also has great photography.

- **Colour:** ink `#14213D` on a near-white paper `#FAFAF7`, with logo blue only for actions. A brass accent `#8A6A2B` (4.81:1) marks "verified" seals and section rules.
- **Type:**
  - Fraunces (variable serif, opsz 9–144) for page and hero headings.
  - Schibsted Grotesk for body, UI and every number. Fraunces has **no tabular figures**, so a price can never be set in it.
- **Layout:** wide margins, asymmetric 7/5 columns on detail pages, long editorial descriptions, generous leading.
- **Imagery:** large uncropped architectural photography, 3:2, with a thin ink keyline.
- **Surfaces:** flat paper with hairline rules; cards are rare; lists are separated by rules.
- **Navigation:** text-only top nav, serif wordmark; on mobile, a full-screen menu sheet.
- **Motion:** almost none. Image cross-fades in the gallery only.
- **Strengths:** instantly credible for **sales** and high-value rentals; distinctive in a market of ad-cluttered portals.
- **Weaknesses:**
  - Reads exclusive and expensive, which alienates students, young families and budget hotel guests.
  - Two families cost 134 + 51 KB.
  - A serif, near-white paper and hairline rules together sit close to two "generated look" clusters (the editorial broadsheet, the cream-and-serif page).
  - Weak fit for dense dashboards.
- **Fit for Annorent:** good for the sales segment, poor for flexible rentals, hotels and workspaces.

---

### Direction B: "Open Door" (precise, warm, built on the keyhole) — **recommended**

**Personality:** a capable, calm local product. It feels like a well-designed banking app that happens to show beautiful homes. It is confident and plain-spoken, and never claims what it can't prove.

- **Colour:**
  - Ink `#172B4D` for text and brand chrome.
  - Canvas `#F4F5F7` and white surfaces.
  - **Logo blue `#024BFF` reserved for actions and focus.**
  - Green `#1C7A4F` text / `#36B373` icon reserved for **verified or confirmed**.
  - A **taxi-yellow** `#FFC72C` fill (ink text on it: 9.04:1) reserved for **featured (paid) placement**.

  Yellow is a deliberate local reference: the yellow city taxis of Douala and Yaoundé are the most recognisable colour of Cameroonian streets. It is used for exactly one meaning, so it never becomes decoration.
- **Type:** **Instrument Sans only.**
  - One variable file, about 77 KB in Latin, with wdth 75–100 and wght 400–700.
  - Marketing uses width 100.
  - Dense tables and dashboards use width 87.5, so more columns fit without shrinking the type.
  - Prices always use tabular figures.
- **Layout:**
  - Left-aligned.
  - A 12-column grid with a 1200 px marketing container.
  - Search is the hero object.
  - Five-fact cards.
  - Workspaces use a fluid grid and tables.
- **Imagery:**
  - Real photography at fixed ratios: 4:3 cards, 3:2 gallery.
  - No overlays except one status chip.
- **The memorable element, the doorway:** the logo's arch shape becomes a photo frame. An image with fully rounded top corners and square bottom corners, like a doorway, appears in exactly three places:
  - the home hero image
  - the auth panel image
  - empty-state illustrations

  Everything else is rectangular with 8–12 px radii. The arch is the logo made spatial ("Annorent opens the door"), and its rarity is what makes it memorable.
- **Surfaces:**
  - Cards are bordered at rest (1 px `#DCDFE6`), with no shadow.
  - Shadows only for things that float (menus, sheets, dialogs), tinted navy.
- **Navigation:**
  - **Public: a floating pill nav** (developer decision). A solid white capsule detached from the viewport edges, aligned to the content container, holding the real discovery categories.
  - On mobile, a matching floating pill tab bar at the bottom (Search / Map / Saved / Account).
  - Workspaces: a job-grouped docked sidebar at ≥1024 px; a drawer below that.
  - Why it fits:
    - The pill is the segmented-control shape enlarged, so nav, search tabs and filter chips share one form.
    - Detaching the bar from the edges echoes the "doorway" idea of a frame you look through.
  - What keeps it from the trend look: it is **solid, not glass** (no blur, no transparency, legible over any photo) and it **never changes size on scroll**.
- **Motion:** state changes only: sheet slide, dialog fade-scale, skeleton shimmer, a 150 ms colour change on hover. One orchestrated moment: the hero arch image fades in once on first load. Everything respects `prefers-reduced-motion`.
- **Strengths:**
  - One family and few colours give the smallest bytes and the most consistent output.
  - Every colour has a single meaning, which is clear to new users.
  - It scales from a marketing page to an admin table without a second design language.
  - It is built from Annorent's own assets (logo blue, logo arch, documented ink and canvas), not borrowed from a reference.
- **Weaknesses:**
  - A sans-only system can feel generic *if* the arch, the yellow and the photography are executed timidly. All three need confident use.
  - Instrument Sans's wght axis tops out at 700, so there is no "black" weight for shouting (acceptable; nothing should shout).
- **Fit for Annorent:** strong across all four transaction types and all four roles, and on low-end Android over slow networks.

---

### Direction C: "Marché" (vivid and local)

**Personality:** street-level energy. It feels like the busy, colourful Cameroonian market, with signage and taxis.

- **Colour:** logo blue and taxi yellow at equal weight on a white base, with basalt `#1F2421` ink (15.76:1). Yellow used as large fills (section bands, CTA backgrounds) with dark text. **White on yellow is 1.56:1 and fails**, so every yellow surface needs dark text.
- **Type:** Bricolage Grotesque (opsz, wdth, wght; sign-painter character at large sizes) for display, Manrope for body.
- **Layout:** chunky blocks, big category tiles, oversized city names, stacked colour bands.
- **Imagery:** street and neighbourhood photography alongside interiors; cut-out shapes.
- **Surfaces:** heavy rounded tiles (16–20 px), coloured fills.
- **Navigation:** big pill tabs, emoji-free icon tiles.
- **Motion:** playful: bouncing pins, spring transitions.
- **Strengths:** unmistakably local and memorable; strong for flexible rentals and youth or student segments.
- **Weaknesses:**
  - Fights the "trust, security, sophistication" brief.
  - Equal-weight blue + yellow destroys colour semantics.
  - About 184 KB of fonts.
  - Hard to make admin and owner tables feel professional.
  - The risk of reading as a cheap classifieds site is high, which is exactly what PropertyPro and meQasa look like today.
- **Fit for Annorent:** marketing campaigns, not the product.

## 3. Recommendation: Direction B, "Open Door"

**Why B:**
1. **It is made of Annorent's own material.** The logo blue, the logo arch, the documented ink and the documented canvas. A reference would not be recognised in it, and no reference was copied to make it.
2. **It satisfies the brief's hardest constraints at once:** trust and sophistication (ink-led, few colours), mobile-first performance (one 77 KB font, SVG icons), and dark mode (two surface ramps, `design-system-proposal.md` §2.3).
3. **Semantics are enforced by scarcity.** Blue = act, green = confirmed, yellow = paid placement, ink = everything else. A user learns it in one session, and designers and agents can't drift because there is nothing spare to drift into.
4. **It survives density.** The same family at width 87.5 runs the admin queue (the Linear/Stripe lesson) without a second typeface.
5. **It borrows only principles from A and C:**
   - from A: restraint and long-form care on detail pages
   - from C: the taxi-yellow, but quarantined to one meaning

**Checked against the "generated look" catalogue (`frontend-design` skill):**
- Cream background with serif and terracotta: **no.** Canvas is cool `#F4F5F7`; the only warm hue is a functional yellow.
- Near-black with one acid accent: **no.** The dark theme is navy `#0B1424`, and the accent is the brand blue.
- Broadsheet hairlines with zero radius: **no.** Radii are 8 and 12 px.
- SaaS card kit with identical cards and one radius everywhere: **mitigated.** Radii are tiered by role (4 / 8 / 12 / arch). Cards are bordered, not shadowed. Card forms differ per category (property vs hotel vs workspace).
- All-caps eyebrows, middle-dot meta strings, arrows in CTAs: **banned in the design system** (§6 there). Location strings use commas ("Bonapriso, Douala"), not middle dots.

**Applied the "remove one accessory" test:** a texture inspired by the Ndop cloth pattern for section backgrounds was considered and **cut**. It is decorative, it costs bytes, and borrowing a Bamileke ceremonial textile as wallpaper risks cultural misuse.

## 4. What the user sees first (home, 390 px)

```
┌──────────────────────────────┐
│ ╭──────────────────────────╮ │  floating pill nav: 12 px from the edges,
│ │ [keyhole] Annorent FR  ☰ │ │  48 px tall, solid white, border + shadow
│ ╰──────────────────────────╯ │
│                              │
│ Find your next place         │  h1 32/38, ink, weight 600, left-aligned
│ in Cameroon                  │
│                              │
│ ┌ Rent │ Buy │ Stay ┐        │  segmented control attached to the field
│ ┌──────────────────────────┐ │
│ │ ⌕ City or neighbourhood  │ │  one field, 48 px tall
│ └──────────────────────────┘ │
│ [ Search ]  (logo blue, full)│
│ Douala · Yaoundé · Buea …    │  city chips (scrollable row)
│  ╭────────────╮              │
│  │  doorway   │  arch-topped │  the one hero image
│  │   photo    │  4:5         │
│  └────────────┘              │
│ ╭──────────────────────────╮ │  floating pill tab bar, 64 px,
│ │ ⌕Search ◎Map ♡Saved ◯Me  │ │  12 px + safe-area from the bottom
│ ╰──────────────────────────╯ │
└──────────────────────────────┘
```

At ≥1024 px:

```
   ╭───────────────────────────────────────────────────────────────────────────╮
   │ [keyhole] Annorent   (Properties)  Hotels  Flexible spaces  Map   EN  List your property  (Sign in) │
   ╰───────────────────────────────────────────────────────────────────────────╯
     ↑ 16 px from the top, width = 1200 px content container; the active link sits on an inner pill
```

At ≥1024 px the headline and search occupy columns 1–6 and the arch image occupies columns 8–12, so the composition is asymmetric. The search keeps its position across all breakpoints.

The city chips are a horizontal scroll row of separate tappable chips, rendered with visual gaps. The `·` in the sketch is shorthand, not a middle-dot string.
