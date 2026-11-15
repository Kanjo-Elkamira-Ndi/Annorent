# Annorent - Design System

## 1. Design Vision

Annorent should look and feel like a premium,
trustworthy real estate and hospitality marketplace.

The interface should combine:

- Sophisticated real estate presentation.
- Modern marketplace usability.
- Professional SaaS dashboard quality.
- Clear information hierarchy.
- Warm and welcoming hospitality experiences.

The design must be distinctive rather than a generic
template.

## 2. Design References

Use the following references for visual inspiration.

They are references for design direction, not
instructions to reproduce another product.

### Public Marketplace

Luxury Real Estate Website Design:
https://www.behance.net/gallery/254676329/Luxury-Real-Estate-Website-Design

Real Estate Marketplace - Property Discovery:
https://www.behance.net/gallery/256735201/Real-Estate-Marketplace-Property-Discovery

### Dashboards

Real Estate Investment SaaS Platform:
https://www.behance.net/gallery/257773225/Real-Estate-Investment-SaaS-Platform-UIUX-Design

Luxury Real Estate CRM Management:
https://www.behance.net/gallery/249816929/Luxury-Real-Estate-CRM-Management-UIUX-Design

Property Dashboard:
https://dribbble.com/shots/22857788-Property-dashboard-Real-Estate

Additional dashboard inspiration:
https://app.envato.com/search/graphic-templates/b5906f5b-da2f-455f-86d6-c6b026c824b5

## 3. Visual Principles

### Premium Simplicity

Use clear layouts with deliberate spacing.

Do not overcrowd interfaces.

### Strong Hierarchy

Important information must be visually prominent.

Examples:

- Property images.
- Property titles.
- Prices.
- Locations.
- Primary actions.
- Booking information.

### Consistency

Use shared tokens and reusable components.

Do not introduce arbitrary colours, spacing or
border radii throughout individual pages.

### Functional Beauty

Decorative elements must not interfere with usability.

Animations should support interaction and feedback.

## 4. Brand Direction

The brand should communicate:

- Trust.
- Sophistication.
- Accessibility.
- Convenience.
- Modernity.
- Professionalism.

The final logo and brand assets must be inspected
before being integrated.

Do not invent a replacement logo if approved brand
assets exist.

## 5. Colour System

The existing project has used these initial colours:

- Primary: #0052CC
- Secondary: #F4F5F7
- Tertiary: #36B373
- Neutral: #172B4D

Treat these as existing brand-direction candidates,
not unquestionable final design decisions.

Important contrast note:

The existing green (#36B373) should not be used for
small text on white backgrounds without verifying
contrast. It may be suitable for decorative elements
or larger visual accents.

The final palette should define semantic tokens.

Example token categories:

### Light Theme

- Background.
- Surface.
- Elevated surface.
- Primary text.
- Secondary text.
- Muted text.
- Border.
- Primary action.
- Primary action hover.
- Success.
- Warning.
- Danger.
- Information.

### Dark Theme

Define each semantic token separately.

Do not implement dark mode by blindly inverting colours.

Ensure readable text, visible borders and appropriate
surface hierarchy.

## 6. Typography

Typography should be modern, clear and professional.

Establish:

- Display typography.
- Page headings.
- Section headings.
- Body text.
- Supporting text.
- Labels.
- Captions.
- Numeric and price presentation.

Use a consistent type scale.

Avoid too many font families or arbitrary font sizes.

Choose fonts based on readability and brand character.

## 7. Spacing

Establish a consistent spacing scale.

Prefer a predictable spacing system rather than
arbitrary margins and padding.

Use spacing to create:

- Section separation.
- Card breathing room.
- Form clarity.
- Dashboard hierarchy.
- Consistent alignment.

## 8. Border Radius

Establish consistent radii for:

- Small controls.
- Inputs.
- Buttons.
- Cards.
- Dialogs.
- Large containers.

Avoid excessive rounding on every element.

## 9. Shadows and Elevation

Use subtle shadows where they improve hierarchy.

Do not overuse shadows.

Define elevation levels for:

- Base surfaces.
- Raised cards.
- Dropdowns.
- Popovers.
- Modals.

## 10. Imagery

Property and hospitality imagery is central to the
Annorent experience.

Prioritize:

- High-quality property photography.
- Consistent image ratios.
- Appropriate cropping.
- Clear focal points.
- Responsive image delivery.
- Meaningful fallback states.

Avoid distorted or stretched images.

Do not rely on random unrelated stock images for
production listing data.

## 11. Layout

Use consistent content widths and page gutters.

Public pages should feel spacious and editorial.

Dashboard pages should prioritize information density
without becoming crowded.

Responsive layouts must be intentionally designed.

## 12. Components

Build a consistent component system.

### Buttons

Variants should include:

- Primary.
- Secondary.
- Outline.
- Ghost.
- Destructive.

Support:

- Disabled state.
- Loading state.
- Focus state.
- Hover state.

### Inputs

Support:

- Default state.
- Focus state.
- Error state.
- Disabled state.
- Read-only state.

### Cards

Create variants appropriate for:

- Property listings.
- Hotel listings.
- Dashboard summaries.
- General content.

### Feedback

Provide:

- Alerts.
- Toasts.
- Empty states.
- Loading states.
- Error states.
- Success feedback.

### Navigation

Provide consistent navigation components for:

- Public marketplace.
- Customer workspace.
- Owner workspace.
- Hotel workspace.
- Administration.

## 13. Authentication Screens

Authentication screens should use a split-screen
experience on larger screens:

- Brand or visual panel.
- Form panel.

On mobile, simplify the layout and prioritize the form.

The experience should be welcoming and professional.

## 14. Dashboard Design

Dashboards should have:

- Clear navigation.
- Contextual page headings.
- Useful summary information.
- Well-organized content.
- Clear actions.
- Responsive navigation.
- Appropriate data visualization where supported.

Do not fill dashboards with meaningless charts.

Do not invent operational metrics.

## 15. Motion

Use subtle purposeful motion.

Examples:

- Button feedback.
- Dropdown transitions.
- Dialog transitions.
- Card hover feedback.
- Page transitions where appropriate.
- Loading indicators.

Respect prefers-reduced-motion.

Avoid excessive animation and movement.

## 16. Theme Switching

Support light and dark themes.

Use the operating system preference initially,
unless the user has already selected a preference.

Persist explicit user preference using an appropriate
non-sensitive preference mechanism.

Prevent theme flashing where practical.

## 17. Responsive Design

Design deliberately for:

- Small mobile.
- Large mobile.
- Tablet.
- Laptop.
- Desktop.

Do not allow mobile navigation links to disappear
without providing an accessible alternative.

Use a functional mobile navigation drawer where
appropriate.

## 18. Accessibility

Maintain:

- Readable contrast.
- Visible focus.
- Keyboard support.
- Semantic HTML.
- Accessible forms.
- Appropriate alternative text.
- Reduced-motion support.

## 19. Design Quality Gate

Before declaring a page complete, inspect:

1. Visual hierarchy.
2. Alignment.
3. Spacing.
4. Typography.
5. Image treatment.
6. Interaction states.
7. Responsive behaviour.
8. Accessibility.
9. Loading and empty states.
10. Consistency with the design system.

A technically functional but visually weak page is
not considered complete.