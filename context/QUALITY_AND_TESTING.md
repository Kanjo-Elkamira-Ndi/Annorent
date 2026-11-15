# Annorent - Quality Assurance and Testing

## 1. Objective

Establish a consistent quality assurance strategy
for the Annorent frontend.

Testing must cover functionality, integration,
security boundaries, responsiveness and usability.

## 2. Testing Philosophy

Do not consider code complete merely because it
compiles.

Test the behaviour that users actually experience.

Prefer meaningful tests over large numbers of
superficial tests.

## 3. Testing Levels

### Unit Tests

Test isolated functionality.

Examples:

- Formatting utilities.
- Validation functions.
- Reusable hooks.
- State transformations.
- Business rules.

### Component Tests

Test reusable components.

Examples:

- Buttons.
- Inputs.
- Dialogs.
- Property cards.
- Search components.
- Navigation elements.

### Integration Tests

Test interactions between components and services.

Examples:

- Search and filtering.
- Form submission.
- API error handling.
- Authentication boundaries.
- Booking workflows.

### End-to-End Tests

Test complete user journeys.

Examples:

- Browse properties.
- Search for accommodation.
- Open property details.
- Submit an enquiry.
- Complete supported booking workflows.

Do not create E2E tests that depend on fabricated
production authentication.

## 4. Existing Tooling

The existing repository has used:

- Vitest.
- Playwright.

Inspect the current configuration before modifying it.

Do not assume the existing test setup is complete.

## 5. Type Checking

Run the project's TypeScript checks.

Resolve errors introduced by implementation.

Do not silence errors using unnecessary any types
or broad compiler exclusions.

## 6. Linting

Run the configured linting command.

Fix relevant errors and warnings.

Do not disable lint rules simply to make the
build pass.

## 7. Build Validation

Run a production build after meaningful changes.

A successful development server does not guarantee
a successful production build.

## 8. Responsive Testing

Test at representative viewport sizes.

Check:

- Navigation.
- Cards.
- Forms.
- Tables.
- Dashboards.
- Dialogs.
- Image galleries.
- Search interfaces.

## 9. Browser Testing

Inspect the actual rendered application.

Check:

- Visual appearance.
- Interactions.
- Console errors.
- Network errors.
- Responsive behaviour.
- Loading states.
- Empty states.
- Error states.

Do not rely exclusively on code inspection.

## 10. Security Testing

Where relevant, test:

- Unauthenticated access.
- Unauthorized access.
- Invalid sessions.
- Invalid input.
- Restricted data visibility.
- Sensitive information exposure.

## 11. Test Data

Keep test data separate from production data.

Mock data may be used for isolated tests.

Never allow mock responses to be mistaken for
real backend functionality.

## 12. Test Reporting

For every significant task, report:

- Tests executed.
- Tests passed.
- Tests failed.
- Tests not executed.
- Reasons for failures.
- Remaining risks.

Never claim that tests passed without running them.

## 13. Definition of Done

A feature is considered complete when:

- Requirements are satisfied.
- Code is maintainable.
- TypeScript checks pass.
- Relevant lint checks pass.
- Relevant tests pass.
- Responsive behaviour is checked.
- Accessibility is considered.
- Errors are handled.
- No fake production functionality exists.
- Documentation is updated where necessary.