# Annorent design audit (2026-11-15)

This is the research-and-audit phase requested in `context-files/prompt.md`. No source code was changed.

| Read in this order | What it answers |
|---|---|
| `current-frontend-audit.md` | What the last real UI (`legacy-ui-v1`) got wrong, page by page, and where the docs and the code disagree |
| `design-research.md` | What the 17 inspected references actually do, and the principles extracted from them |
| `visual-direction.md` | Three directions; recommended: **"Open Door"** |
| `design-system-proposal.md` | Tokens (light and dark), type, spacing, components, responsive rules |
| `frontend-improvement-roadmap.md` | Open decisions D-1 to D-10, phases, acceptance criteria, testing |
| `design-reference-index.md` | Every reference URL, its evidence level, and its lesson |
| `cleanup-plan.md` | File-by-file keep / delete / migrate. **Awaiting approval; nothing has been executed.** |

**Evidence and tooling:**
- `screenshots/legacy/`: 90 captures of the legacy UI (30 routes × 390 / 768 / 1440 px), plus `report.json` (status, overflow, console errors).
- `tooling/shoot.mjs`: the screenshot script.
- `tooling/contrast.mjs` → `tooling/contrast-report.txt`: WCAG ratios for every proposed colour pair.
- `tooling/fontcheck.py`: typeface feature and size checks.

Reference-site screenshots were viewed for analysis only and are intentionally **not** stored here (copyright).
