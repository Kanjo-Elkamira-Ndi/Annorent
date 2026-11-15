# Annorent - Architecture and Product Decisions

This document records important decisions and
assumptions affecting the frontend rebuild.

Update it when decisions are confirmed or changed.

## Decision 001 - Frontend Repository Scope

Status: Confirmed.

The repository being rebuilt is the frontend only.

The backend is maintained separately.

Frontend implementation must not modify the
backend repository.

## Decision 002 - Local Development Workflow

Status: Confirmed.

All implementation must happen locally using
Visual Studio Code and Claude Code.

The developer controls:

- Local development.
- Git commits.
- Git pushes.
- Pull requests.
- Deployment.

No cloud-based rebuild or automatic remote
implementation is intended.

## Decision 003 - Frontend Framework

Status: Existing project direction; verify during audit.

The existing project uses Next.js, React and TypeScript.

Retain or adjust the framework only after examining
the current repository and its dependencies.

## Decision 004 - Backend Technology

Status: Confirmed by project context.

The backend is a separate NestJS application.

Frontend developers must consume verified API
contracts rather than inventing them.

## Decision 005 - Product Market

Status: Confirmed.

Cameroon is the initial market.

The architecture should permit expansion across
other African markets.

## Decision 006 - Currency

Status: Confirmed.

The initial market uses XAF/FCFA.

Centralize currency formatting.

Avoid hardcoding currency strings across components.

## Decision 007 - Property Location Privacy

Status: Confirmed.

Exact GPS coordinates must only be disclosed after
an authorized confirmed booking, subject to
backend enforcement.

Public listing experiences may use approximate
locations.

## Decision 008 - Authentication

Status: Pending backend verification.

Do not use mock production sessions.

Implement authentication only after verifying
the backend authentication contract.

## Decision 009 - User Roles

Status: Pending backend verification.

The product includes customers, property owners,
hotel owners/managers and administrators.

Exact backend role names and permission structures
must be inspected.

## Decision 010 - API Contract

Status: Pending backend verification.

Do not assume endpoint paths, DTOs, response
structures or authentication behaviour.

Use actual backend documentation or source code.

## Decision 011 - Design Direction

Status: Approved direction; exact tokens to be finalized.

Annorent should have a premium, sophisticated,
modern and trustworthy visual identity.

Design references are recorded in DESIGN_SYSTEM.md.

Avoid generic marketplace templates.

## Decision 012 - Theme Support

Status: Intended requirement.

Support light and dark themes.

Dark mode must be deliberately designed rather
than implemented through colour inversion.

## Decision 013 - Localization

Status: Pending final implementation decision.

English is the initial language.

French support should be considered in the architecture.

The final routing and translation strategy must be
verified before implementation.

## Decision 014 - Future Features

Status: Roadmap only.

AI recommendations, electronic contracts,
electronic signatures, VR tours, video tours,
maintenance requests and restaurant reservations
are potential future capabilities.

They are not automatically part of the MVP.

## Decision 015 - Clean-Slate Rebuild

Status: Cleanup executed on 2026-11-15 per the approved
file-by-file plan in design-audit/cleanup-plan.md.
The pre-cleanup UI remains recoverable at git tag
legacy-ui-v1.

The existing frontend is intended to be rebuilt
with a clean architecture.

However, files must be audited before deletion.

Preserve valuable assets, configuration, lockfiles,
licenses and deployment infrastructure unless
explicitly approved for removal.

## Decision 016 - Git and Deployment

Status: Confirmed.

Claude Code must not commit, push, merge or deploy
without explicit developer instruction.

The developer retains control of the Git workflow.

## Decision 017 - Documentation Authority

Status: Confirmed (2026-11-15).

The documents in context/ (formerly context-files/)
are authoritative. The previous context documents
are archived in docs/archive/context-v1/ for
reference only, mainly for backend planning detail.

## Decision 018 - Brand Blue

Status: Confirmed (2026-11-15).

The brand and action blue is the logo's own blue,
#024BFF, sampled from public/logo.jpg. It replaces
the earlier documented primary #0052CC. Accessible
derived shades are defined in
design-audit/design-system-proposal.md.

## Decision 019 - Public Navigation Style

Status: Confirmed (2026-11-15).

The public marketplace uses a floating pill
navigation bar: solid surface, not translucent.
Specification: design-audit/design-system-proposal.md
section 8.3.

Proposed and awaiting confirmation: the mobile
bottom tab bar is also a floating pill, and
workspaces keep a docked sidebar.


## Decision 020 - Locales and Routing

Status: Confirmed (2026-11-15, roadmap D-1).

The app ships English and French only, with a locale
URL prefix (/en, /fr). Intl formatting uses the
Cameroonian tags en-CM and fr-CM (FCFA labels,
day-first dates).

The root layout lives at src/app/[locale]/layout.tsx so
<html lang> is server-rendered per locale. URLs that
match no route use src/app/global-not-found.tsx
(next.config experimental.globalNotFound).

## Decision 021 - Visual Direction

Status: Confirmed (2026-11-15, roadmap D-2).

"Open Door", as specified in
design-audit/visual-direction.md and
design-audit/design-system-proposal.md. Implemented as
tokens in src/app/[locale]/globals.css.

## Decision 022 - Dependencies

Status: Confirmed (2026-11-15, roadmap D-6).

Added: lucide-react 1.66.0 (SVG icons; replaces the
4 MB Material Symbols font) and @playwright/test 1.64.1
(dev, e2e). Both pinned exactly, both at least two weeks
old when added. zod and the Radix dropdown/popover
packages are approved but are added only with the first
form or menu that needs them.

## Decision 023 - Flexible Spaces Route

Status: Provisional (2026-11-15, roadmap D-3).

Flexible rentals (rooms, studios, desks, offices,
meeting rooms) have their own route, /spaces, because
the planned backend models rentable units separately
from properties. Revisit when the backend contract is
verified.
