# Annorent - Frontend Implementation Roadmap

## 1. Objective

Rebuild the Annorent frontend incrementally using
a clean architecture and consistent design system.

All implementation takes place locally.

The developer controls commits, pushes and deployments.

## 2. Phase 0 - Repository Audit

Objectives:

- Understand the existing project.
- Inspect dependencies.
- Inspect routing.
- Inspect components.
- Inspect styling.
- Inspect authentication.
- Inspect API integration.
- Inspect tests.
- Identify reusable assets.
- Identify incomplete or unsafe functionality.

Deliverables:

- Repository audit report.
- Proposed architecture.
- Dependency recommendations.
- File-by-file cleanup plan.

No destructive changes without approval.

## 3. Phase 1 - Foundation

Objectives:

- Establish clean project structure.
- Establish design tokens.
- Establish themes.
- Establish shared UI primitives.
- Establish application layouts.
- Establish routing foundation.
- Establish API integration boundary.
- Establish error handling.
- Establish testing foundation.

Deliverables:

- Working application scaffold.
- Consistent design system.
- Shared component library.
- Route placeholders.
- Type-safe integration foundation.

## 4. Phase 2 - Public Application Shell

Objectives:

- Build public navigation.
- Build responsive mobile navigation.
- Build public footer.
- Establish page containers.
- Establish shared public layouts.

Deliverables:

- Consistent public application shell.
- Responsive navigation.
- Reusable layout components.

## 5. Phase 3 - Homepage

Objectives:

- Implement premium homepage.
- Implement search interface.
- Implement category discovery.
- Implement featured listings.
- Implement popular locations.
- Implement calls to action.

Deliverables:

- Complete responsive homepage.
- Working interactions where supported.
- Appropriate loading and empty states.

## 6. Phase 4 - Property Discovery

Objectives:

- Implement property listing page.
- Implement search.
- Implement filters.
- Implement sorting where supported.
- Implement pagination where supported.
- Implement property cards.

Deliverables:

- Usable property discovery experience.
- URL-based search state where appropriate.
- Verified API integration where available.

## 7. Phase 5 - Property Details

Objectives:

- Implement property detail pages.
- Implement image gallery.
- Implement property information.
- Implement contact or enquiry actions.
- Implement viewing requests where supported.

Deliverables:

- Complete property detail experience.
- Dynamic property data.
- Appropriate error and loading states.

## 8. Phase 6 - Hotel Discovery

Objectives:

- Implement hotel listing pages.
- Implement destination search.
- Implement filters.
- Implement hotel cards.
- Implement hotel details.
- Implement reservation interface where supported.

Deliverables:

- Complete hospitality discovery experience.

## 9. Phase 7 - Authentication

Prerequisite:

Verify backend authentication contracts.

Objectives:

- Registration.
- Login.
- Logout.
- Session restoration.
- Password recovery.
- Email verification where supported.
- Protected routes.

Deliverables:

- Real backend-connected authentication.
- Secure session handling.
- No mock production sessions.

## 10. Phase 8 - Customer Workspace

Objectives:

- Customer overview.
- Profile management.
- Saved properties.
- Bookings.
- Reservations.
- Enquiries.
- Account settings.

Deliverables:

- Functional customer workspace.

## 11. Phase 9 - Owner Workspace

Objectives:

- Owner dashboard.
- Property management.
- Listing creation.
- Listing editing.
- Enquiry management.
- Viewing management.
- Booking management where supported.

Deliverables:

- Functional owner workspace.

## 12. Phase 10 - Hotel Workspace

Objectives:

- Hotel management.
- Accommodation management.
- Availability management.
- Reservation management.
- Hotel profile.

Deliverables:

- Functional hotel workspace.

## 13. Phase 11 - Administration

Objectives:

- Administrative overview.
- User management.
- Listing moderation.
- Property management.
- Hotel management.
- Booking oversight.
- Supported reporting.

Deliverables:

- Secure administration interface.

Only implement capabilities confirmed by the backend.

## 14. Phase 12 - Hardening

Objectives:

- Accessibility review.
- Performance optimization.
- Responsive review.
- Security review.
- Test coverage.
- Error handling.
- Documentation review.
- Production build validation.

Deliverables:

- Stable, tested frontend.
- Documented known limitations.
- Release readiness report.

## 15. Implementation Rules

Implement one meaningful feature or vertical slice
at a time.

Do not attempt to build the entire marketplace
in one prompt.

Do not proceed to dependent features when required
backend contracts remain unknown.

Do not deploy automatically.

Do not push automatically.

## 16. Progress Tracking

Maintain a clear record of:

- Completed phases.
- Current phase.
- In-progress features.
- Blocked features.
- Backend dependencies.
- Outstanding defects.
- Next implementation task.

Update this document when the approved roadmap
changes.