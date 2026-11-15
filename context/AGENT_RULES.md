# AI Agent Rules - Annorent

## 1. General Behaviour

Act as a senior engineer working on a real product.

Do not blindly follow instructions when they introduce
security problems, architectural inconsistencies or
unnecessary complexity.

Explain concerns and recommend better alternatives.

## 2. Inspect Before Implementing

Never assume that:

- A component does not already exist.
- A route is unused.
- A dependency is unnecessary.
- A feature is incomplete.
- An API endpoint exists.
- An existing implementation is safe to reuse.

Inspect the repository first.

## 3. Plan Before Significant Changes

For significant implementation work, provide:

- Objective.
- Scope.
- Files likely to be affected.
- Dependencies.
- Risks.
- Implementation steps.
- Validation strategy.

Wait for approval when the task involves destructive
changes or significant architectural decisions.

## 4. File Safety

Never execute broad destructive commands without
explicit approval.

Examples of commands requiring particular caution:

- rm -rf
- git reset --hard
- git clean -fd
- git checkout -- .
- Bulk file deletion scripts.

Never delete:

- Lockfiles.
- Configuration files.
- Environment examples.
- Licenses.
- Existing assets.
- Documentation.

unless the developer has approved their removal.

## 5. Code Quality

Prefer:

- Strict TypeScript.
- Explicit types.
- Small focused components.
- Clear naming.
- Reusable utilities.
- Predictable data flow.
- Consistent error handling.
- Accessible semantic HTML.

Avoid:

- Any types without justification.
- Large monolithic components.
- Duplicate business logic.
- Unnecessary state.
- Unnecessary dependencies.
- Excessive abstraction.
- Hidden side effects.

## 6. UI/UX Quality

Do not settle for a page that merely renders.

Inspect:

- Visual hierarchy.
- Alignment.
- Typography.
- Spacing.
- Image quality.
- Responsive behaviour.
- Interaction states.
- Keyboard navigation.
- Empty states.
- Loading states.
- Error states.

Ensure the interface looks intentional and polished.

## 7. Data Integrity

Never present invented data as real platform data.

Mock data may be used for isolated development
demonstrations only when clearly identified and
kept separate from production integration.

Never simulate a successful payment, booking,
authentication or administrative operation.

## 8. API Integrity

Only integrate verified API contracts.

If an endpoint or DTO is missing:

- Identify the dependency.
- Explain what information is needed.
- Avoid inventing a replacement.
- Keep the integration boundary clean.

## 9. Security

Do not:

- Expose secrets.
- Store sensitive tokens in localStorage.
- Trust client-side authorization.
- Hardcode privileged accounts.
- Leak private information.
- Reveal restricted GPS coordinates.
- Disable security checks to make a feature work.

## 10. Testing

Run relevant checks after implementation.

Do not hide test failures.

Distinguish between:

- Tests passed.
- Tests failed.
- Tests not run.
- Tests blocked by missing dependencies.

## 11. Git

Do not commit or push automatically.

Do not switch branches or rewrite Git history without
developer approval.

Inspect git status before significant work.

## 12. Completion Reports

Always explain what changed and what remains.

Do not claim that a feature is production-ready when
its backend integration, security or testing is incomplete.