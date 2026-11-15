# ROLE

Act as a world-class multidisciplinary product design team consisting of:

- A Senior Product Designer specialising in premium digital products.
- A Lead UI/UX Designer with experience in real estate, hospitality and marketplace platforms.
- A Design Systems Architect.
- A Senior Frontend Architect specialising in Next.js, React, TypeScript and Tailwind CSS.
- A UX Researcher focused on usability, accessibility and conversion optimisation.

Your assignment is to conduct a comprehensive design research and frontend experience audit of ANNORENT, then develop a strong, evidence-based visual refinement strategy.

Do not start coding yet.

# 1. UNDERSTAND THE PRODUCT

Annorent is a real estate and hospitality marketplace designed initially for Cameroon, with a long-term vision of expanding across Africa.

The platform brings together:

- Residential property rentals.
- Property purchases.
- Commercial property listings.
- Hotels, guest houses and accommodation.
- Property discovery and map exploration.
- Property owner and hotel management.
- Tenant/customer accounts.
- Messaging and inquiries.
- Appointments and bookings.
- Payments and transaction management.
- Property verification and administrative operations.

This is a multi-sided platform, not a simple real estate landing page.

The experience must communicate:

- Trust.
- Quality.
- Security.
- Convenience.
- Sophistication.
- Professionalism.
- Local relevance.
- Ease of use.

The product should feel like a mature, well-funded PropTech and hospitality platform.

# 2. AUDIT THE EXISTING CODEBASE FIRST

Before researching designs, inspect the entire existing frontend repository.

Read the documentation in the context directory, especially:

- project-overview.md
- architecture.md
- ui-context.md
- sitemap.md
- workflows.md
- code-standards.md
- file-structure.md
- database-schema.md
- api-reference.md
- security.md

Inspect the actual implementation, not just the documentation.

Understand:

- Existing routes and page structures.
- Existing reusable components.
- Existing layout and navigation systems.
- Existing design tokens.
- Existing typography.
- Existing colors.
- Existing responsive behaviour.
- Existing component composition.
- Existing mock data and API integration.
- Existing dashboard layouts.
- Existing mobile experience.

Preserve the existing architectural organisation. Do not propose rebuilding the application from scratch.

Identify inconsistencies between documentation and implementation.

# 3. CONDUCT EXTERNAL DESIGN RESEARCH

Research premium design references from:

- Behance.
- Dribbble.
- Awwwards.
- Relevant live real estate and hospitality products.
- High-quality SaaS dashboard products.

Search for complete product experiences, not just attractive promotional images.

Research these categories independently:

1. Premium real estate marketplace websites.
2. Property search and discovery experiences.
3. Property detail pages.
4. Hotel booking and hospitality websites.
5. Property management dashboards.
6. Tenant/customer dashboards.
7. Admin dashboards.
8. Responsive mobile marketplace interfaces.

For each relevant reference:

- Record the project/product name.
- Record the designer or studio where available.
- Provide the original URL.
- Identify the specific screen or experience being studied.
- Explain what makes the design effective.
- Identify its layout, typography, spacing, colour, imagery and interaction patterns.
- Explain which design principles could be adapted to Annorent.
- Explain which aspects should NOT be copied or adopted.

Aim to study at least 15-20 genuinely relevant references across the categories.

Use browser/search tools or available MCP integrations to inspect the references.

If a reference is inaccessible, do not pretend to have inspected it. Record the limitation and request screenshots or an accessible alternative.

Do not bypass access restrictions, scrape protected content, download paid templates without authorisation or reuse copyrighted assets.

The objective is to extract design principles and inspiration, not clone another designer's work.

# 4. DEVELOP ANNORENT'S VISUAL DIRECTION

After the research, propose three distinct but suitable visual directions.

For each direction, explain:

- Visual personality.
- Colour direction.
- Typography direction.
- Layout philosophy.
- Image treatment.
- Card and surface treatment.
- Navigation style.
- Interaction and animation philosophy.
- Strengths and weaknesses.
- Suitability for Annorent's audience.

Evaluate the existing brand colours and design system before proposing changes.

The existing documented palette includes:

- Primary: #0052CC
- Secondary: #F4F5F7
- Tertiary: #36B373
- Neutral: #172B4D

Do not change these arbitrarily. Determine whether they need refinement, better hierarchy or more sophisticated supporting colours.

Recommend one final visual direction and justify the choice.

The result should be recognisably Annorent, not a clone of a Behance or Dribbble project.

# 5. DESIGN SYSTEM AUDIT

Evaluate and propose improvements for:

- Colour tokens.
- Typography scale.
- Font weights.
- Line heights.
- Spacing scale.
- Layout grid.
- Container widths.
- Border radii.
- Shadows.
- Elevation.
- Borders.
- Iconography.
- Buttons.
- Inputs.
- Selects.
- Dropdowns.
- Modals.
- Drawers.
- Badges.
- Tabs.
- Cards.
- Tables.
- Empty states.
- Loading states.
- Error states.
- Notifications.
- Responsive breakpoints.

Create a consistent design language that can be applied across public pages, dashboards and administrative interfaces.

Avoid excessive rounded corners, random gradients, unnecessary glassmorphism, oversized typography, decorative clutter and generic AI-generated visual patterns.

# 6. AUDIT EVERY IMPORTANT PAGE

Evaluate the existing implementation page by page.

For each page, document:

- Current implementation.
- Visual weaknesses.
- UX weaknesses.
- Missing states.
- Responsive issues.
- Recommended improvements.
- Relevant inspiration references.
- Components that should be reused.
- Components that should be redesigned.

Pay particular attention to:

- Homepage.
- Property search and listing pages.
- Rental pages.
- Hotel discovery.
- Property details.
- Hotel details.
- Authentication.
- Tenant dashboard.
- Property owner dashboard.
- Hotel management dashboard.
- Admin dashboard.
- Verification workflows.
- Messaging and booking experiences.

# 7. UX AND INTERACTION QUALITY

A premium interface must also work exceptionally well.

Evaluate:

- Search and filtering interactions.
- Sorting.
- Property image galleries.
- Property comparison where appropriate.
- Date and guest selection.
- Booking and inquiry flows.
- Forms and validation.
- Confirmation states.
- Loading skeletons.
- Empty states.
- Error recovery.
- Navigation consistency.
- Mobile interactions.
- Keyboard accessibility.

Consider the realities of users in Cameroon, including varying connection speeds and mobile-first usage.

Preserve the security requirement that precise property GPS coordinates must not be disclosed before the appropriate booking confirmation.

# 8. OUTPUT DELIVERABLES

Do not modify source code yet.

Produce the following documents inside a clearly organised design-audit folder:

1. design-research.md
   - Research methodology.
   - Reference catalogue.
   - Findings and design patterns.

2. current-frontend-audit.md
   - Detailed page-by-page assessment.
   - Technical and visual weaknesses.
   - Prioritised recommendations.

3. visual-direction.md
   - Three proposed directions.
   - Recommended final direction.
   - Visual rationale.

4. design-system-proposal.md
   - Design tokens.
   - Typography.
   - Colour system.
   - Spacing.
   - Component standards.
   - Responsive rules.

5. frontend-improvement-roadmap.md
   - Phased implementation plan.
   - Dependencies.
   - Priorities.
   - Acceptance criteria.
   - Testing strategy.

6. design-reference-index.md
   - Original links.
   - Screens studied.
   - Lessons extracted.
   - Intended application within Annorent.

# IMPORTANT CONSTRAINTS

- Do not code yet.
- Do not rebuild the application from scratch.
- Do not introduce unnecessary dependencies.
- Do not fabricate backend capabilities.
- Do not treat mock data as real data.
- Do not remove working functionality merely to improve appearance.
- Do not copy complete designs or proprietary assets.
- Do not recommend visual changes without explaining their purpose.
- Preserve the current Next.js, React, TypeScript and Tailwind architecture unless there is a compelling technical reason to change something.

Be critical, specific and opinionated.

I do not want generic advice such as "improve spacing" or "make the cards modern".

I want precise recommendations, concrete design decisions and a professional implementation strategy.