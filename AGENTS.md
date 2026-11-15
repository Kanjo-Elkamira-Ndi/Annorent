
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Annorent - AI Agent Instructions

## Project Overview

Annorent is a Cameroon-first real estate and hospitality
marketplace designed to simplify property discovery,
rentals, sales, hotel discovery, reservations and
property management.

The platform is intended to expand across Africa.

This repository contains the frontend application only.

The backend is maintained separately and must not be
modified as part of frontend implementation.

## Primary Instructions

Before implementing any feature:

1. Read CLAUDE.md.
2. Read the relevant documents inside context/.
3. Inspect the existing implementation.
4. Understand the current architecture.
5. Verify backend contracts before integrating APIs.
6. Prepare an implementation plan for significant work.
7. Implement only the approved scope.
8. Run relevant checks after implementation.

## Development Environment

All development must happen locally.

The developer uses:

- Visual Studio Code.
- Claude Code.
- Local Node.js tooling.
- Git for version control.
- GitHub for remote source control.

Do not use cloud development environments.

Do not deploy the application unless explicitly instructed.

Do not push to GitHub unless explicitly instructed.

Do not commit changes unless explicitly instructed.

## Frontend-Only Boundary

This repository is responsible for:

- User interfaces.
- Client-side interactions.
- Frontend routing.
- Form validation.
- Frontend state management.
- API consumption.
- Authentication interface and session integration.
- Responsive layouts.
- Accessibility.
- Frontend testing.

Do not modify the separate NestJS backend repository.

Do not invent API endpoints, request payloads, response
structures, permissions or authentication mechanisms.

When backend functionality is unavailable or unverified,
document the dependency rather than simulating production
functionality.

## Engineering Standards

- Use TypeScript.
- Prefer clear and maintainable code.
- Use reusable components where appropriate.
- Avoid unnecessary abstractions.
- Keep components focused.
- Avoid duplicated business logic.
- Validate user input.
- Handle errors explicitly.
- Avoid hardcoded production data.
- Do not introduce unnecessary dependencies.
- Follow the established project architecture.
- Keep accessibility in mind from the beginning.

## Design Standards

Annorent must have a premium, modern and trustworthy
visual identity.

Avoid generic AI-generated interfaces.

Prioritize:

- Strong visual hierarchy.
- Excellent typography.
- Consistent spacing.
- High-quality imagery.
- Thoughtful interactions.
- Responsive layouts.
- Subtle animations.
- Consistent design tokens.
- Accessible contrast.
- Carefully designed empty and loading states.

Do not use visual effects simply for decoration.

Every interface should have a clear purpose.

## Security Standards

Never:

- Hardcode user sessions.
- Hardcode privileged users.
- Trust client-side role checks as authorization.
- Expose secrets in browser code.
- Store sensitive authentication tokens in localStorage.
- Reveal precise property coordinates before an
  authorized confirmed booking.
- Treat mock data as real backend data.
- Bypass backend authorization.

## Destructive Changes

Before deleting or replacing existing files:

1. Inspect the files.
2. Explain why they should be removed.
3. Identify dependencies.
4. Identify anything worth preserving.
5. Present a file-by-file cleanup plan.
6. Wait for explicit developer approval.

Never perform blanket destructive operations.

## Quality Checks

Where applicable, run:

- TypeScript checks.
- ESLint.
- Unit tests.
- Integration tests.
- End-to-end tests.
- Production build.

Report failures honestly.

Never claim that a test or build passed if it was not run.

## Communication

At the beginning of significant tasks:

- Summarize the objective.
- Identify dependencies.
- Present a concise implementation plan.

At the end of tasks, report:

- What was implemented.
- Files created.
- Files modified.
- Files removed.
- Tests executed.
- Results.
- Outstanding issues.
- Recommended next task.

The developer retains control over commits, pushes,
merges and deployments.