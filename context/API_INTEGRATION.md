# Annorent - API Integration Strategy

## 1. Overview

The Annorent backend is maintained separately using
NestJS.

This repository is responsible only for frontend
implementation and API consumption.

The frontend must integrate with the actual backend
contracts.

Do not modify the backend repository.

## 2. API Contract Verification

Before implementing an integration, inspect available
backend documentation or verified API definitions.

Verify:

- Base URL.
- API version.
- Authentication mechanism.
- Endpoint paths.
- HTTP methods.
- Request payloads.
- Response payloads.
- Error responses.
- Pagination.
- Filtering.
- Sorting.
- Role values.
- Permission requirements.

Never invent these details.

## 3. Provisional API Conventions

An earlier frontend proposal considered:

- A versioned API prefix such as /api/v1.
- Success responses using a data/meta structure.
- Errors using an error object with code and message.
- Access and refresh token authentication.

These are proposals only.

They are not verified backend contracts.

Inspect the actual NestJS implementation before
depending on any of them.

## 4. API Client

Create a centralized API client.

It should handle:

- Base URL.
- HTTP requests.
- Headers.
- Request serialization.
- Response parsing.
- Error normalization.
- Authentication integration.
- Request cancellation where appropriate.

Avoid duplicating request logic across features.

## 5. API Organization

Organize API functions by feature.

Potential organization:

lib/
  api/
    client.ts
    errors.ts
    configuration.ts

features/
  properties/
    api/
      properties.api.ts

  hotels/
    api/
      hotels.api.ts

  bookings/
    api/
      bookings.api.ts

  authentication/
    api/
      authentication.api.ts

Use naming and organization that fit the approved
architecture.

## 6. Type Safety

Define frontend types based on verified API contracts.

Do not assume that a frontend interface guarantees
that the backend returns the same structure.

Where appropriate, validate external data at runtime.

Avoid unsafe type assertions that conceal mismatches.

## 7. Error Handling

Normalize errors into a consistent frontend format.

Potential error categories include:

- Network error.
- Validation error.
- Unauthorized.
- Forbidden.
- Not found.
- Conflict.
- Rate limited.
- Server error.
- Unexpected response.

The exact backend status codes and error formats
must be verified.

## 8. Authentication Integration

Authentication integration must follow the real
backend contract.

Verify:

- Login.
- Registration.
- Logout.
- Session restoration.
- Token refresh, if supported.
- Password recovery.
- Email verification.
- Session expiry.

Prefer secure httpOnly cookies where the backend
architecture supports them.

Do not assume a token refresh mechanism exists.

Never store sensitive authentication tokens in
localStorage.

## 9. Server and Browser Boundaries

Private credentials must remain server-side.

Browser code may use only explicitly public
configuration.

If a Next.js server-side API boundary is used,
ensure it does not become an insecure proxy.

The server must enforce appropriate authentication
and authorization checks.

## 10. Data Fetching

Use server-side data fetching where appropriate.

Use client-side fetching for genuinely interactive
workflows.

Avoid unnecessary duplicate requests.

Handle:

- Loading.
- Empty results.
- Errors.
- Stale data.
- Pagination.
- Cancellation.

## 11. Property API Integration

Potential capabilities:

- List properties.
- Search properties.
- Filter properties.
- Get property details.
- Create property.
- Update property.
- Delete or archive property.
- Manage listing status.

These capabilities must be confirmed against
the backend.

## 12. Hotel API Integration

Potential capabilities:

- List hotels.
- Search hotels.
- Get hotel details.
- Retrieve accommodation options.
- Retrieve availability.
- Create reservations.
- Manage reservations.

These capabilities must be confirmed against
the backend.

## 13. Booking and Payment Integration

Booking and payment flows are sensitive operations.

Verify:

- Booking lifecycle.
- Availability validation.
- Booking confirmation.
- Payment initiation.
- Payment status.
- Failure handling.
- Duplicate submission protection.
- Cancellation rules.

Never simulate a successful payment or confirmed
reservation in production workflows.

## 14. API Documentation

Maintain a frontend API reference containing
verified endpoints and their contracts.

Record:

- Endpoint.
- HTTP method.
- Authentication requirement.
- Required role or permission.
- Request schema.
- Response schema.
- Error cases.
- Implementation status.

Mark unverified endpoints clearly.

## 15. Integration Acceptance Criteria

An integration is complete when:

- The endpoint has been verified.
- Request types are accurate.
- Response handling is accurate.
- Errors are handled.
- Authentication is correct.
- Authorization assumptions are safe.
- Loading and empty states exist.
- Relevant tests pass.