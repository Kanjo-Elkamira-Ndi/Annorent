# Annorent - Information Architecture

## 1. Purpose

This document describes the intended frontend
application surfaces, route organization and navigation.

The final route implementation must be checked against
the existing repository and approved architecture.

## 2. Application Surfaces

The platform is divided into five major areas:

1. Public marketplace.
2. Authentication.
3. Customer workspace.
4. Owner workspace.
5. Hotel workspace.
6. Administration.

## 3. Public Marketplace

Proposed routes:

/
    Homepage.

/properties
    Property discovery.

/properties/[id]
    Property details.

/hotels
    Hotel discovery.

/hotels/[id]
    Hotel details.

/locations
    Location discovery, if supported.

/about
    About Annorent.

/contact
    Contact information.

/terms
    Terms and conditions.

/privacy
    Privacy policy.

The exact route structure may be adjusted to the
approved localization strategy.

## 4. Authentication

Proposed routes:

/login
    Login.

/register
    Registration.

/forgot-password
    Password recovery.

/reset-password
    Password reset.

/verify-email
    Email verification, if supported.

Do not implement unsupported authentication flows.

## 5. Customer Workspace

Proposed route group:

/account
    Customer overview.

/account/profile
    Customer profile.

/account/saved
    Saved properties.

/account/bookings
    Bookings.

/account/reservations
    Reservations, if distinct in the backend.

/account/enquiries
    Enquiries.

/account/settings
    Account settings.

The final route names must align with the product
model and backend capabilities.

## 6. Owner Workspace

Proposed route group:

/owner
    Owner overview.

/owner/properties
    Managed properties.

/owner/properties/new
    Create property listing.

/owner/properties/[id]
    Property management.

/owner/properties/[id]/edit
    Edit property.

/owner/enquiries
    Enquiries.

/owner/viewings
    Viewing requests.

/owner/bookings
    Booking management.

/owner/settings
    Owner settings.

Only implement operations supported by the backend.

## 7. Hotel Workspace

Proposed route group:

/hotel
    Hotel overview.

/hotel/profile
    Hotel profile.

/hotel/rooms
    Room or accommodation management.

/hotel/rooms/new
    Create accommodation listing.

/hotel/rooms/[id]
    Accommodation details.

/hotel/availability
    Availability management.

/hotel/reservations
    Reservation management.

/hotel/settings
    Hotel settings.

The final structure depends on the backend data model.

## 8. Administration

Proposed route group:

/admin
    Administration overview.

/admin/users
    User management.

/admin/properties
    Property moderation.

/admin/hotels
    Hotel management.

/admin/bookings
    Booking oversight.

/admin/reports
    Reports, where supported.

/admin/settings
    Platform settings.

Administrative routes must be protected by real
backend authorization.

## 9. Navigation Principles

### Public Navigation

The public navigation should provide access to:

- Home.
- Properties.
- Hotels.
- Relevant discovery categories.
- Authentication.
- Account access when authenticated.

The exact navigation labels should be determined by
the approved UX.

### Workspace Navigation

Each workspace should have contextual navigation.

Avoid mixing unrelated role-specific functions.

### Mobile Navigation

Mobile navigation must remain accessible.

Do not simply hide desktop navigation links.

Provide a suitable mobile menu or navigation drawer.

## 10. Route Protection

Public routes should remain accessible without
authentication.

Protected routes require a valid authenticated session.

Role-specific routes require appropriate authorization.

Frontend route guards are a usability mechanism.
They do not replace backend authorization.

## 11. Route Parameters

Dynamic detail routes must use stable identifiers
or slugs supported by the backend.

Do not use hardcoded property details for every
dynamic route.

Handle:

- Invalid identifiers.
- Missing resources.
- Loading states.
- Unauthorized access.
- Server errors.

## 12. URL State

Where appropriate, search and filter state should
be represented in URL query parameters.

This enables:

- Shareable searches.
- Browser navigation.
- Refresh persistence.
- Better discoverability.

## 13. Localization

The routing strategy must support the approved
localization approach.

English is the initial language.

French support should be considered in the architecture.

Do not introduce locale-prefixed routing without
reviewing the existing project and deciding the
localization strategy.