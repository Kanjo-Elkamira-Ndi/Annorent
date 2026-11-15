# Annorent - Frontend Architecture

## 1. Architectural Objective

Build a scalable, maintainable frontend for the
Annorent marketplace.

The architecture should support multiple application
surfaces without creating unnecessary coupling.

Prioritize:

- Separation of concerns.
- Reusable components.
- Feature-oriented organization.
- Strong typing.
- Predictable data flow.
- Testability.
- Security.
- Maintainability.

## 2. Technical Stack

The intended stack is:

- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- A suitable component primitive library.
- A suitable form validation solution.
- A suitable testing framework.

The exact versions and dependencies must be determined
by auditing the existing repository.

Do not upgrade major versions without justification.

Do not install libraries merely because they are popular.

## 3. Rendering Strategy

Use the Next.js rendering capabilities appropriately.

Prefer Server Components by default.

Use Client Components only when browser-side interaction
or client-side state is required.

Examples of appropriate Client Component use:

- Interactive search controls.
- Dropdowns.
- Dialogs.
- Theme controls.
- Complex forms.
- Browser-dependent functionality.

Avoid converting entire pages into Client Components
without a clear reason.

## 4. Proposed Directory Structure

The following is a proposed organization.

Adjust it to the existing Next.js conventions and
approved architecture.

src/
  app/
    (public)/
    (auth)/
    (account)/
    (owner)/
    (hotel)/
    (admin)/

  components/
    ui/
    layout/
    navigation/
    shared/

  features/
    authentication/
    properties/
    hotels/
    bookings/
    customers/
    owners/
    administration/

  hooks/

  lib/
    api/
    auth/
    config/
    formatting/
    validation/
    utilities/

  services/

  types/

  styles/

  server/

public/
  images/
  icons/
  fonts/

context/

## 5. Application Routing

Use Next.js App Router where appropriate.

Route groups should organize application surfaces
without unnecessarily changing public URLs.

Use dynamic route segments for property and hotel
details.

Keep page files focused on composition and data loading.

Avoid placing all business logic inside page components.

## 6. Component Architecture

Organize components by responsibility.

### UI Components

Low-level reusable elements.

Examples:

- Button.
- Input.
- Select.
- Checkbox.
- Dialog.
- Dropdown.
- Badge.
- Tooltip.
- Skeleton.

### Shared Components

Components reused across multiple features.

Examples:

- Page heading.
- Empty state.
- Error state.
- Loading state.
- Image gallery.
- Price display.

### Feature Components

Components that belong to a particular product feature.

Examples:

- Property card.
- Property filters.
- Hotel card.
- Booking summary.
- Property form.

Avoid creating abstractions that make simple components
harder to understand.

## 7. Feature Organization

Keep feature-specific code together where practical.

A feature may contain:

- Components.
- Hooks.
- Types.
- Validation.
- Utilities.
- API functions.
- Tests.

Do not create unnecessary files for every small component.

## 8. State Management

Choose state management based on actual requirements.

Use local React state for simple local interactions.

Use URL state for shareable search and filtering state.

Use server-side data fetching for server-owned data.

Use a shared state solution only when cross-component
state genuinely requires it.

Do not introduce a global state library without
explaining why it is necessary.

## 9. Data Fetching

Centralize API communication.

Avoid scattering raw fetch calls throughout page
components.

The API layer should provide:

- Base URL configuration.
- Request construction.
- Response parsing.
- Error normalization.
- Type-safe boundaries.
- Appropriate authentication handling.
- Consistent timeout and cancellation behaviour
  where appropriate.

Use server-side data fetching when suitable.

Do not expose private backend credentials to the browser.

## 10. Forms

Use a consistent form architecture.

Forms should support:

- Schema-based validation.
- Accessible labels.
- Inline validation messages.
- Submission state.
- Server error display.
- Success feedback.
- Prevention of duplicate submissions.

Keep validation rules close to the relevant feature.

Backend validation remains authoritative.

## 11. Authentication Architecture

Authentication must be implemented only after the
backend contract has been verified.

Prefer a secure server-managed session architecture
where supported by the backend.

A Next.js server-side boundary or BFF may be appropriate
for handling authentication and session cookies.

Do not assume the backend supports a particular
cookie or token flow.

Do not hardcode sessions.

Do not use frontend-only role authorization.

## 12. Error Handling

Establish consistent handling for:

- Network failures.
- Validation errors.
- Unauthorized requests.
- Forbidden requests.
- Missing resources.
- Server errors.
- Unexpected responses.

Present useful user-facing messages without exposing
internal implementation details.

## 13. Configuration

Use environment variables for configuration.

Keep public and private environment variables separate.

Example:

NEXT_PUBLIC_API_BASE_URL=

The exact variable names should follow the approved
configuration design.

Never commit real secrets.

Provide an .env.example file where appropriate.

## 14. TypeScript

Use TypeScript consistently.

Avoid unnecessary any types.

Define clear types for:

- API responses.
- Domain entities.
- Form values.
- Component props.
- Search parameters.
- Error responses.

Do not assume frontend types are proof of backend
contract compatibility.

## 15. Styling

Use the established design system.

Avoid arbitrary one-off styling values.

Use shared tokens and reusable patterns.

Keep styling consistent across public pages and
workspace interfaces.

## 16. Assets

Inspect existing assets before replacing them.

Use optimized image handling.

Provide appropriate fallback images.

Avoid embedding large images directly in components.

## 17. Testing

Organize tests around features and shared functionality.

Test:

- Components.
- Utility functions.
- Validation.
- API behaviour.
- User workflows.
- Route protection.
- Responsive behaviour where practical.

## 18. Maintainability

Do not create an unnecessarily complex architecture.

Prefer simple, explicit solutions.

Introduce abstractions when they solve a real problem.

Keep business logic separate from presentation.

Update documentation when significant architectural
decisions change.