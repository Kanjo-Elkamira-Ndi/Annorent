# Cleanup plan (approved and executed 2026-11-15)

> **Executed.** Approved by the developer and carried out on 2026-11-15. See §7 for what was actually done and the check results.

**Date:** 2026-11-15  
**Branch:** `reset/ui-v2` @ `ba2a0d5`  
**Inventory:** 264 tracked files (excluding `public/images/`, which is listed separately below).  
**Rule:** `context-files/AGENTS.md` §Destructive Changes. This plan is the file-by-file list. Nothing is deleted until the developer approves.

**Safety net:**
- The complete legacy UI is preserved at tag `legacy-ui-v1`.
- The current state is commit `ba2a0d5`.
- Every deletion below is recoverable from git.
- I will not run `git clean`, `reset --hard` or broad `rm -rf`. Deletions use `git rm` on explicit paths, so they are reviewable in `git status` before any commit, which the developer makes.

## 1. Keep unchanged

| Path | Why |
|---|---|
| `package.json`, `package-lock.json` | Lockfile and dependency manifest (never delete) |
| `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts` | Working configuration. Typecheck and lint pass today. |
| `.gitignore` | Keep. **Add** `/design-audit/screenshots/` if the developer prefers not to commit the 14 MB of screenshots. |
| `next-env.d.ts` | Next-managed |
| `src/app/favicon.ico` | Keep until the SVG logo produces a designed favicon |
| `public/logo.jpg` | **The brand source** (sampled `#024BFF`) |
| `src/proxy.ts` | Locale redirect logic. Keep if D-1 keeps the prefix; edit the locale list to `en`, `fr`. |
| `src/lib/utils/cn.ts` + `cn.test.ts` | Small, tested, dependency-free |
| `src/lib/utils/format.ts` + `format.test.ts` | Keep, then **fix `XOF` → `XAF`** at line 25 in Phase 1, with a test |
| `src/lib/i18n/index.ts` | `t()` with fallback and locale registry. Keep the structure; reduce to `en`/`fr` per D-1. |
| `src/tests/setup.ts` | Vitest setup (`jest-dom`) |
| `src/app/api/locale/route.ts` | Locale cookie endpoint stub (needed by the language switcher) |
| `README.md` | Rewrite content later. Keep the file. |
| `design-audit/**` | This audit |

## 2. Delete

### 2.1 Empty (0-byte) placeholder files, 107 tracked files

They have no content, so nothing is lost. The rebuild creates files when it needs them, per the new structure in `context-files/FRONTEND_ARCHITECTURE.md` §4.

| Group | Paths |
|---|---|
| Components | every file under `src/components/**` (all 0 bytes except `role-sidebar.tsx`, see §2.3) |
| Lib stubs | `src/lib/ai/recommendations-client.ts`, `src/lib/api/{client,endpoints,errors}.ts`, `src/lib/auth/use-session.ts`, `src/lib/domain/{booking,message,payment,user}.ts`, `src/lib/hooks/{use-debounce,use-media-query}.ts`, `src/lib/i18n/messages/{account,hotel}.ts`, `src/lib/maps/client.ts`, `src/lib/payments/money.ts`, `src/lib/realtime/{socket-client,use-chat,use-notifications}.ts`, `src/lib/validation/{booking,property}.ts` |
| Server stubs | `src/server/{config,locale,proxy,session}.ts` |
| Test stubs | `src/tests/{mock-api.ts,test-utils.tsx}` |
| E2E stubs | `e2e/{admin-verification,auth,booking-flow,owner-listing}.spec.ts`, `playwright.config.ts` (empty; rewritten in Phase 2) |
| Scripts | `scripts/generate-api-types.mjs` (empty; recreated when an OpenAPI spec exists) |
| Placeholders | `src/assets/images/.gitkeep`, `src/lib/domain/generated/.gitkeep` |
| Empty root files | `CLAUDE.md` (0 bytes; replaced in §4), `.prettierrc` (0 bytes) |
| Empty brand files | `public/logo-mark.svg`, `public/logo-wordmark.svg` (0 bytes; real SVGs are made in Phase 1) |
| Empty env | `.env.example` (0 bytes). **Exception:** keep the file and fill it in Phase 1 with `NEXT_PUBLIC_API_BASE_URL=` (and similar) instead of deleting it, because the context docs require it to exist. |

### 2.2 Route stubs (`return null` pages and layouts), 73 files
- **Paths:** everything under `src/app/[locale]/(marketing|auth)/**`, `account/**`, `owner/**`, `hotel/**`, `admin/**`, plus `src/app/[locale]/{error,not-found}.tsx` and `src/app/not-found.tsx`.
- **Why:** each is a one-line `return null` placeholder. The rebuild recreates routes per the approved IA (D-1, D-3), phase by phase, so empty routes don't 200 with a blank page in the meantime.
- **Keep instead:** `src/app/layout.tsx`, `src/app/[locale]/layout.tsx` and `globals.css`. They are rewritten in Phase 1, not deleted, so the app always boots.
- **Also delete:** `src/app/robots.ts` and `sitemap.ts` (empty rules and empty list). Recreated in Phase 12 with real routes.

### 2.3 Files with content that should go

| Path | Size | Why delete | Depends on it |
|---|---|---|---|
| `src/lib/auth/guards.ts` | 1.6 KB | `MOCK_SESSION` hard-codes a privileged admin session. Forbidden by `context-files/SECURITY_AND_PRIVACY.md` §2. | `guards.test.ts` |
| `src/lib/auth/guards.test.ts` | 1.7 KB | Tests the mock; all 3 of its tests currently fail | — |
| `src/lib/admin/{dashboard,listings,transactions,users}.ts` + 4 tests | ~1.7 KB | Hollow `{}` exports whose tests assert only `toBeDefined()` | — |
| `src/lib/admin/navigation.ts` + test | 1.3 KB | Hard-coded English labels, invented badge count (14) | — |
| `src/lib/owner/{dashboard,listings,calendar,add-property,navigation}.ts` + `dashboard.test.ts` | 25 KB | Invented metrics (BCEAO escrow, "Tier 1" tenant scores, 14.85 M FCFA revenue). `navigation.ts` links to the deleted `/owner/documents`. Structure ideas are captured in `current-frontend-audit.md` §3. | `role-sidebar.tsx` type |
| `src/components/layout/role-sidebar.tsx` | 6 lines | Only a `NavItem` type, consumed by the files above | the above |
| `src/lib/domain/property.ts` | 2.5 KB | Hand-written domain types with an invented status enum. Must come from the verified contract (D-4). Recreate from the OpenAPI spec. | owner lib |
| `src/lib/i18n/messages/{admin,auth,common,marketing,owner}.ts` | ~0.1 KB each | Each is `{}`; rebuilt as `en` + `fr` tables in Phase 1 | `i18n/index.ts` imports, updated in the same change |
| `src/lib/utils/navigation.ts` | 2.7 KB | Route constants for the old IA (`/legal/*`, Partners), with locale list duplicated by hand | — |
| `src/lib/marketing/*.ts` (11 files) | 112 KB | Static copy for the wrong market, with 280 fabricated claims. Typed shapes in `types.ts` don't match a verified API. Nothing reusable beyond ideas, which the audit records. | — |
| `src/app/api/{revalidate,session,session/logout}/route.ts` | 3 lines each | Return 501. Recreated with real behaviour in Phase 7. | — |
| `public/fonts/material-symbols-outlined.woff2` | **4.0 MB** | Replaced by SVG icons (D-6) | legacy only |
| `public/{file,globe,next,vercel,window}.svg` | <2 KB | `create-next-app` defaults, unused | — |

### 2.4 Images (`public/images/**`, 33 files + `public/hero-bg.jpg`)

Each image was inspected on a contact sheet. All are 512 px wide (except the hero, 1376 × 768), which is too small for 2× cards (needs ≥ 800 px) or galleries (≥ 1600 px). They read as generated imagery from the design tool, not photos of real Cameroonian properties.

| Verdict | Files | Reason |
|---|---|---|
| **Delete: contain design-tool UI** | `details/villa-02.jpg`, `details/villa-05.jpg`, `listings/hotels-01.jpg`, `listings/properties-02.jpg`, `listings/rentals-02.jpg`, `search/property-06.jpg` | Visible app chrome, title bars or nav bars inside the photo |
| **Delete: third-party map screenshots** | `details/location-map.png`, `listings/map-abidjan.png`, `search/districts-map.png` | Google Maps renders of Abidjan with a "Map data ©Google" credit. Licensing problem, and the wrong city. |
| **Delete: fabricated person** | `details/agent.jpg` | A generated portrait presented as a real agent |
| **Move to `fixtures/` (dev and test only), or delete** | the remaining 23 photos + `hero-bg.jpg` | Visually clean, but resolution and provenance make them unfit for production. Useful only as labelled placeholders in the design preview until D-7. |

## 3. Branches and worktrees (git metadata; approval needed separately)

| Item | Proposal |
|---|---|
| `feat/home-visual-redesign` (local branch, last commit 2026-09-28) | Keep for now; it holds the "Pan-African" spec, which informed this audit. Delete only on instruction. |
| `.worktrees/home-redesign` (registered worktree, directory missing, "prunable") | `git worktree prune` (metadata only; removes nothing on disk) |
| `refs/agents/389e9d32…/checkpoints/*` (7 refs from an earlier agent session) | Leave; harmless. Optional delete on instruction. |
| Tag `legacy-ui-v1` | **Keep permanently.** This is the recovery point. |

## 4. Documentation migration

`context-files/` is authoritative (user decision). Proposed moves, done with `git mv` so history follows:

| From | To | Notes |
|---|---|---|
| `context/*.md` (11 files) | `docs/archive/context-v1/` | Archived, not deleted. Still useful: `database-schema.md`, `api-reference.md` and `architecture.md` describe the planned backend and will be needed when verifying contracts. |
| `context-files/{README,AGENT_RULES,PROJECT_BRIEF,PRODUCT_REQUIREMENTS,DESIGN_SYSTEM,INFORMATION_ARCHITECTURE,FRONTEND_ARCHITECTURE,API_INTEGRATION,SECURITY_AND_PRIVACY,ACCESSIBILITY_AND_PERFORMANCE,QUALITY_AND_TESTING,IMPLEMENTATION_ROADMAP,DECISIONS}.md` | `context/` | These are the paths `context-files/CLAUDE.md` §2 already references (`context/README.md` etc.) |
| `context-files/CLAUDE.md` | `/CLAUDE.md` | Replaces the 0-byte root file |
| `context-files/AGENTS.md` | `/AGENTS.md` | **Merge, don't overwrite.** The root `AGENTS.md` holds the block that `next dev` re-adds ("This is NOT the Next.js you know…"). Keep that block at the top, then append the new content. |
| `context-files/prompt.md` | `docs/prompts/2026-11-15-design-audit.md` | Keeps the brief next to its output |
| `context-files/` (now empty) | — | Remove the directory |
| `docs/superpowers/plans/2026-10-05-owner-dashboard.md` (101 KB) | `docs/archive/` | Describes the deleted owner implementation |
| `context-files/DESIGN_SYSTEM.md` | — | After approval of `design-system-proposal.md`, update it with the final tokens and record Decision 017 (direction) and 018 (brand blue) in `DECISIONS.md`. |
| Uncommitted edit to `context/architecture.md` (CinetPay → Notchpay) | — | **Developer's call:** commit it before the move, or discard it. I won't touch it. |

## 5. Execution order (once approved)

1. `git worktree prune`.
2. The documentation moves (§4), so the agent instructions are in place first.
3. `git rm` the explicit file list in §2 (generated from this document, shown to the developer as a dry-run list before running).
4. Rewrite the three kept boot files (`src/app/layout.tsx`, `[locale]/layout.tsx`, `globals.css`) to a minimal shell, and update `i18n/index.ts` imports.
5. Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and report the results.
6. Stop. The developer reviews `git status` and commits.

## 6. Resulting tree after cleanup (expected)

```
AGENTS.md  CLAUDE.md  README.md  package.json  package-lock.json  tsconfig.json
next.config.ts  postcss.config.mjs  eslint.config.mjs  vitest.config.ts  .env.example  .gitignore
context/            (13 new docs)
design-audit/       (this audit)
docs/archive/       (old context + old plan)   docs/prompts/
public/logo.jpg     public/fixtures/… (if images are kept as fixtures)
src/proxy.ts
src/app/layout.tsx  src/app/favicon.ico  src/app/api/locale/route.ts
src/app/[locale]/layout.tsx  src/app/[locale]/globals.css
src/lib/i18n/index.ts  src/lib/utils/{cn,format}.ts (+ tests)
src/tests/setup.ts
```

## 7. Execution record (2026-11-15)

- `git worktree prune` removed the stale `.worktrees/home-redesign` registration.
- Documentation migrated as in §4:
  - `context/*.md` (11) → `docs/archive/context-v1/`. Your uncommitted Notchpay edit to `architecture.md` moved with the file, unchanged and still uncommitted.
  - `context-files/*.md` (13) → `context/`.
  - `CLAUDE.md` replaced.
  - `AGENTS.md` merged, with the `next dev` block kept at the top.
  - `prompt.md` → `docs/prompts/2026-11-15-design-audit.md`.
  - The owner-dashboard plan → `docs/archive/`.
- **236 tracked files removed** with `git rm` (§2.1–2.4).
- **24 clean photos moved** to `public/fixtures/images/` (§2.4).
- **Boot files rewritten:**
  - `src/lib/i18n/index.ts`: message imports removed; the locale list is unchanged pending D-1.
  - `globals.css`: tokens removed until Phase 1.
  - New `src/app/[locale]/page.tsx` placeholder, so `/en` and `/fr` boot.
  - `.env.example` filled with `NEXT_PUBLIC_API_BASE_URL=`.
- The generated `.next/` build cache was cleared. Stale route types in it broke `tsc`, and it is regenerated by every build.
- **Checks:**
  - `tsc --noEmit` passes.
  - `eslint` passes.
  - `vitest`: 13 / 13 tests pass (cn, format).
  - `next build` succeeds.
  - `next start` smoke test: `/` → 307 `/en`; `/en` and `/fr` → 200; removed routes → 404.
- Not done, as planned:
  - No commit.
  - Branch `feat/home-visual-redesign`, tag `legacy-ui-v1` and the agent checkpoint refs untouched.
  - `.gitignore` unchanged (screenshots are not ignored; your call).
  - The `XOF` → `XAF` fix is deferred to Phase 1.

