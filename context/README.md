# Annorent Frontend Context Documentation

## Purpose

This directory contains the product, architecture,
design, security and engineering documentation guiding
the Annorent frontend rebuild.

These documents are the primary source of project
context for AI coding agents and human developers.

They must be reviewed before significant implementation
work.

## Documentation Structure

| Document | Purpose |
|---|---|
| AGENT_RULES.md | Rules for AI coding agents |
| PROJECT_BRIEF.md | Product vision and background |
| PRODUCT_REQUIREMENTS.md | Functional and non-functional requirements |
| DESIGN_SYSTEM.md | Visual identity and interface standards |
| INFORMATION_ARCHITECTURE.md | Pages, routes and navigation |
| FRONTEND_ARCHITECTURE.md | Technical architecture |
| API_INTEGRATION.md | Backend communication |
| SECURITY_AND_PRIVACY.md | Security and privacy expectations |
| ACCESSIBILITY_AND_PERFORMANCE.md | Accessibility and performance |
| QUALITY_AND_TESTING.md | Testing and quality assurance |
| IMPLEMENTATION_ROADMAP.md | Recommended implementation phases |
| DECISIONS.md | Recorded architectural decisions |

## How to Use These Documents

Before starting a feature:

1. Read PROJECT_BRIEF.md.
2. Read PRODUCT_REQUIREMENTS.md.
3. Read DESIGN_SYSTEM.md.
4. Read INFORMATION_ARCHITECTURE.md.
5. Read FRONTEND_ARCHITECTURE.md.
6. Read API_INTEGRATION.md where backend integration
   is involved.
7. Read SECURITY_AND_PRIVACY.md.
8. Read QUALITY_AND_TESTING.md.

Read other documents whenever they become relevant.

## Documentation Authority

These documents describe the intended frontend product.

However, verified source code, backend contracts and
approved developer decisions take precedence where
specific technical facts are concerned.

If a conflict exists:

1. Do not silently choose one interpretation.
2. Identify the conflicting information.
3. Explain the consequences.
4. Recommend a resolution.
5. Wait for approval when the decision is significant.

## Provisional Information

Some details may remain unverified until the backend
repository is inspected.

These include:

- API routes.
- Request and response DTOs.
- Authentication implementation.
- User role values.
- Permission definitions.
- Booking lifecycle.
- Payment lifecycle.
- Localization strategy.

Never treat provisional information as a confirmed
backend contract.

## Updating Documentation

When an approved architectural or product decision
changes:

1. Update the relevant document.
2. Update DECISIONS.md.
3. Keep the documentation consistent.
4. Mention documentation changes in the task report.

Documentation must evolve with the implementation.