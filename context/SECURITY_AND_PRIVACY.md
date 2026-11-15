# Annorent - Security and Privacy Requirements

## 1. Objective

Security and privacy must be considered throughout
frontend development.

The frontend must not undermine backend security
through insecure storage, authorization assumptions
or information disclosure.

## 2. Authentication

Authentication must use the verified backend
authentication mechanism.

Do not:

- Hardcode users.
- Hardcode sessions.
- Simulate successful login.
- Bypass authentication.
- Expose private credentials.
- Treat local state as proof of authentication.

## 3. Session Management

Use secure session management supported by the backend.

Where supported, prefer:

- httpOnly cookies.
- Secure cookies in production.
- Appropriate SameSite settings.
- Server-side session validation.
- Appropriate session expiration.
- Secure logout and invalidation.

Do not assume these capabilities exist until
the backend contract is verified.

## 4. Authorization

The backend is the authority for authorization.

Frontend role checks may control interface visibility
but must never be treated as security enforcement.

All protected operations must be authorized by
the backend.

## 5. Sensitive Information

Never expose:

- Passwords.
- Authentication secrets.
- Private tokens.
- Internal credentials.
- Unauthorized personal information.
- Restricted property coordinates.

Avoid logging sensitive information.

## 6. Property Location Privacy

Precise GPS coordinates must only be disclosed after
an authorized confirmed booking, according to
backend policy.

Public property listings may display approximate
locations where supported.

Do not expose exact coordinates through:

- Public API responses.
- Browser-visible source data.
- HTML attributes.
- Embedded maps.
- URL parameters.
- Client-side application state.

The frontend must not attempt to bypass backend
location restrictions.

## 7. Form Security

Validate user input.

Treat all user-provided content as untrusted.

Do not render untrusted HTML.

Avoid unsafe dynamic rendering.

Backend validation remains authoritative.

## 8. XSS Protection

Use safe React rendering practices.

Avoid dangerouslySetInnerHTML unless a clearly
justified, sanitized use case exists.

Sanitize rich text using an appropriate trusted
approach where necessary.

## 9. CSRF

If authentication uses cookies, verify the backend's
CSRF protection strategy.

Do not assume SameSite cookies alone solve every
CSRF scenario.

Follow the backend's documented requirements.

## 10. Environment Variables

Never commit real secrets.

Never expose private environment variables through
NEXT_PUBLIC_ variables.

Maintain an .env.example file with placeholder values.

## 11. Payment Security

The frontend must not handle sensitive payment
credentials unless the approved payment integration
explicitly requires it.

Use approved payment provider interfaces.

Never fabricate payment confirmations.

Do not claim funds have been received without
verified backend confirmation.

## 12. Administrative Security

Administrative interfaces must only be accessible
to appropriately authorized users.

The backend must enforce permissions for every
administrative operation.

Do not rely on hidden navigation links as security.

## 13. Privacy and Data Minimization

Only display information needed for the current
user workflow.

Do not expose unnecessary personal information.

Avoid retaining sensitive data longer than needed.

## 14. Security Testing

Test:

- Unauthorized access.
- Expired sessions.
- Forbidden operations.
- Invalid input.
- Sensitive data exposure.
- Route protection.
- Restricted location handling.

## 15. Security Acceptance Criteria

No feature should be considered production-ready
if it introduces:

- Hardcoded privileged access.
- Insecure token storage.
- Client-only authorization.
- Sensitive data leakage.
- Unauthorized coordinate exposure.
- Fake payment or booking confirmation.