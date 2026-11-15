# Annorent - Accessibility and Performance

## 1. Objective

Annorent must be accessible and performant across
supported devices and network conditions.

Accessibility and performance are product requirements,
not optional finishing tasks.

## 2. Accessibility Standards

Target WCAG 2.2 AA where practical.

## 3. Semantic HTML

Use semantic elements appropriately.

Examples:

- header.
- nav.
- main.
- section.
- article.
- aside.
- footer.
- button.
- form.

Avoid using generic div elements for every purpose.

## 4. Keyboard Navigation

All interactive elements must be keyboard accessible.

Ensure:

- Logical tab order.
- Visible focus.
- Keyboard-accessible dropdowns.
- Keyboard-accessible dialogs.
- Keyboard-accessible navigation.
- Escape handling where appropriate.

## 5. Forms

Every form control should have an accessible label.

Validation errors should be communicated clearly.

Do not rely only on colour to indicate errors.

Provide meaningful instructions and feedback.

## 6. Images

Provide meaningful alternative text for informative
images.

Use empty alternative text for purely decorative
images where appropriate.

Avoid using filenames as alternative text.

## 7. Colour and Contrast

Ensure sufficient contrast between text and
backgrounds.

Do not communicate information through colour alone.

Verify contrast for:

- Normal text.
- Large text.
- Buttons.
- Form borders.
- Focus indicators.
- Status indicators.

## 8. Motion

Respect prefers-reduced-motion.

Avoid unnecessary parallax, excessive movement
and distracting animations.

Motion should not interfere with reading or interaction.

## 9. Responsive Design

Support:

- Small mobile devices.
- Large mobile devices.
- Tablets.
- Laptops.
- Desktop displays.

Test layouts at multiple widths.

Avoid horizontal overflow.

Ensure important controls remain accessible.

## 10. Performance

Prioritize:

- Fast initial rendering.
- Efficient image delivery.
- Minimal unnecessary JavaScript.
- Appropriate server rendering.
- Lazy loading where appropriate.
- Code splitting.
- Efficient data fetching.
- Reduced layout shifts.

## 11. Images

Use appropriate Next.js image optimization where
applicable.

Specify image dimensions or aspect ratios.

Use responsive image sizes.

Avoid loading unnecessarily large images.

## 12. Rendering

Prefer Server Components where appropriate.

Use Client Components only where interactivity
requires them.

Avoid unnecessary hydration.

## 13. Data Fetching

Avoid duplicate requests.

Use appropriate caching and revalidation strategies.

Do not cache private user data inappropriately.

Ensure user-specific data is isolated.

## 14. Loading Experience

Provide:

- Skeletons.
- Loading indicators.
- Progress feedback where appropriate.
- Optimistic updates only when safe.

Avoid blank screens during normal loading.

## 15. Performance Validation

Use appropriate tools and browser inspection.

Evaluate:

- Largest Contentful Paint.
- Interaction to Next Paint.
- Cumulative Layout Shift.
- Image loading.
- JavaScript bundle size.
- Console errors.

Use Lighthouse or equivalent tooling where practical.

## 16. Accessibility Validation

Test:

- Keyboard navigation.
- Focus visibility.
- Screen reader semantics.
- Form labels.
- Contrast.
- Responsive layouts.
- Reduced-motion behaviour.

## 17. Acceptance Criteria

A page should not be considered complete if it has:

- Unusable mobile layouts.
- Missing labels.
- Inaccessible controls.
- Invisible focus states.
- Severe layout shifts.
- Unnecessarily heavy assets.
- Unhandled loading states.