# Annorent Web App — File Structure & Governing Rules

> This is now the
> canonical structural reference and lives in `context/` alongside the other
> reference docs, per the standing `/context` convention — not scattered at repo
> root. Every file the app needs is listed below; nothing here is illustrative.

---

## 1. Complete file tree

```
annorent/
├── context/
│   ├── project-overview.md
│   ├── ui-context.md
│   ├── api-reference.md
│   ├── architecture.md
│   ├── code-standards.md
│   ├── database-schema.md
│   ├── security.md
│   ├── workflows.md
│   ├── developer-map.md
│   ├── file-structure.md              # this file
│   └── sitemap.md
├── public/
│   ├── logo-mark.svg
│   ├── logo-wordmark.svg
│   └── favicon.ico
├── scripts/
│   └── generate-api-types.mjs
├── e2e/
│   ├── auth.spec.ts
│   ├── booking-flow.spec.ts
│   ├── owner-listing.spec.ts
│   └── admin-verification.spec.ts
├── src/
│   ├── middleware.ts
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── opengraph-image.png
│   │   ├── opengraph-image.alt.txt
│   │   ├── icon.svg
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── properties/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── rentals/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── hotels/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── map/page.tsx
│   │   │   ├── partners/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── legal/
│   │   │       ├── terms/page.tsx
│   │   │       └── privacy/page.tsx
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── owner/page.tsx
│   │   │   │   └── hotel/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   └── verify-email/page.tsx
│   │   ├── account/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── appointments/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── messages/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [conversationId]/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   ├── saved/page.tsx
│   │   │   ├── notifications/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── owner/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── properties/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── rentals/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── availability/page.tsx
│   │   │   │       └── pricing/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── hotel/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── rooms/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/edit/page.tsx
│   │   │   ├── reservations/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── users/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── listings/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/review/page.tsx
│   │   │   ├── rentals/page.tsx
│   │   │   ├── hotels/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/review/page.tsx
│   │   │   ├── media/page.tsx
│   │   │   ├── advertisements/page.tsx
│   │   │   ├── transactions/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── session/
│   │       │   ├── route.ts
│   │       │   └── logout/route.ts
│   │       ├── locale/route.ts
│   │       └── revalidate/route.ts
│   ├── components/
│   │   ├── providers.tsx
│   │   ├── marketing/
│   │   │   ├── hero.tsx
│   │   │   ├── search-bar.tsx
│   │   │   ├── featured-listing-card.tsx
│   │   │   ├── trust-bar.tsx
│   │   │   └── site-footer.tsx
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── business-register-form.tsx
│   │   │   └── step-indicator.tsx
│   │   ├── account/
│   │   │   ├── booking-card.tsx
│   │   │   ├── appointment-list.tsx
│   │   │   └── saved-listings-grid.tsx
│   │   ├── owner/
│   │   │   ├── listing-table.tsx
│   │   │   ├── property-form.tsx
│   │   │   └── availability-calendar.tsx
│   │   ├── hotel/
│   │   │   ├── room-status-grid.tsx
│   │   │   └── reservation-row.tsx
│   │   ├── admin/
│   │   │   ├── verification-panel.tsx
│   │   │   ├── user-table.tsx
│   │   │   └── transaction-table.tsx
│   │   ├── booking/
│   │   │   ├── booking-flow.tsx
│   │   │   ├── checkout-modal.tsx
│   │   │   └── price-summary.tsx
│   │   ├── chat/
│   │   │   ├── conversation-list.tsx
│   │   │   ├── message-thread.tsx
│   │   │   └── attachment-picker.tsx
│   │   ├── map/
│   │   │   ├── map-canvas.tsx
│   │   │   ├── pin-cluster.tsx
│   │   │   └── list-map-panel.tsx
│   │   ├── media/
│   │   │   ├── photo-gallery.tsx
│   │   │   ├── video-tour-player.tsx
│   │   │   ├── tour-3d-viewer.tsx
│   │   │   └── media-uploader.tsx
│   │   ├── recommendations/
│   │   │   └── recommendation-carousel.tsx
│   │   ├── layout/
│   │   │   ├── app-shell.tsx
│   │   │   ├── role-sidebar.tsx
│   │   │   ├── site-header.tsx
│   │   │   └── locale-switcher.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── modal.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── toast.tsx
│   │       └── skeleton.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── errors.ts
│   │   ├── domain/
│   │   │   ├── property.ts
│   │   │   ├── booking.ts
│   │   │   ├── user.ts
│   │   │   ├── payment.ts
│   │   │   ├── message.ts
│   │   │   └── generated/              # .generated.ts output only — never hand-created
│   │   ├── auth/
│   │   │   ├── use-session.ts
│   │   │   └── guards.ts
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   └── messages/
│   │   │       ├── common.ts
│   │   │       ├── marketing.ts
│   │   │       ├── account.ts
│   │   │       ├── owner.ts
│   │   │       ├── hotel.ts
│   │   │       └── admin.ts
│   │   ├── realtime/
│   │   │   ├── socket-client.ts
│   │   │   ├── use-chat.ts
│   │   │   └── use-notifications.ts
│   │   ├── maps/
│   │   │   └── client.ts
│   │   ├── payments/
│   │   │   └── money.ts
│   │   ├── ai/
│   │   │   └── recommendations-client.ts
│   │   ├── validation/
│   │   │   ├── property.ts
│   │   │   └── booking.ts
│   │   ├── hooks/
│   │   │   ├── use-debounce.ts
│   │   │   └── use-media-query.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       └── format.ts
│   ├── server/
│   │   ├── session.ts
│   │   ├── locale.ts
│   │   ├── proxy.ts
│   │   └── config.ts
│   ├── assets/
│   │   └── images/
│   └── tests/
│       ├── test-utils.tsx
│       └── mock-api.ts
├── .env.example
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── playwright.config.ts
├── vitest.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── .prettierrc
└── .gitignore
```

---

## 2. Rules governing this structure

### Placement rules

1. **A component used by more than one role's screens goes in a shared domain
   folder** (`booking/`, `chat/`, `map/`, `media/`, `layout/`, `ui/`) — never
   duplicated into each role's folder.
2. **A component used by exactly one role's screens goes in that role's folder**
   (`account/`, `owner/`, `hotel/`, `admin/`, `marketing/`, `auth/`). If a second
   role later needs it, move it to a shared folder in the same PR that introduces
   the second usage — don't leave a copy behind.
3. **Never create a new top-level folder under `src/components/` or `src/lib/`
   without updating this file and `context/developer-map.md` in the same PR.**
   An undocumented new folder is an out-of-band decision, not a shortcut.
4. **`src/lib/domain/generated/` is machine-written only.** Nothing in it is ever
   hand-edited; regenerate via `scripts/generate-api-types.mjs` instead of patching
   a generated file directly.
5. **`src/server/` stays a thin BFF.** Session, locale, and request-proxying code
   only. If a PR adds a repository, a service with business rules, or direct
   database access here, that logic belongs in the NestJS core API instead — this
   is the single most important rule in this document; see `security.md` and
   `architecture.md` for why.

### Naming rules

6. Files: `kebab-case.ts` / `kebab-case.tsx`. Route files keep Next.js's required
   names exactly (`page.tsx`, `layout.tsx`, `route.ts`, `error.tsx`,
   `not-found.tsx`).
7. Component default exports: `PascalCase`, matching the file's purpose, not
   necessarily the filename verbatim (`booking-flow.tsx` exports `BookingFlow`).
8. One component per file. If a file grows a second exported component that isn't
   a tiny private subcomponent, split it.
9. Route group folders use parentheses exactly as shown — `(marketing)`,
   `(auth)` — and dynamic segments use brackets exactly as shown — `[id]`,
   `[conversationId]`.

### Route rules

10. `page.tsx` files are composition only — they assemble components from
    `src/components/`, they don't contain business logic or large inline JSX
    trees. If a page file is getting long, that's a signal to extract a
    component, not a reason to keep growing the page file.
11. `layout.tsx` at each role's root (`account/layout.tsx`, `owner/layout.tsx`,
    `hotel/layout.tsx`, `admin/layout.tsx`) is where the RBAC guard for that role
    lives — every page under it inherits the guard; don't re-check the role
    inside individual `page.tsx` files.
12. Every new route added to `src/app/` must be added to `context/sitemap.md` in
    the same PR — the sitemap and the file tree describe the same thing from two
    angles and must never drift apart.

### Testing rules

13. Unit/component tests are co-located as `*.test.ts` / `*.test.tsx` next to the
    file they test — not gathered into a separate mirrored test tree.
14. `e2e/` holds only cross-cutting, multi-page flows (auth+RBAC, full booking,
    listing verification) — a single-component behavior test belongs co-located,
    not in `e2e/`.

### Barrel files / re-exports

15. **No `index.ts` barrel re-export files**, except `lib/i18n/index.ts`
    (which is a real module, not a re-export barrel). Explicit imports from the
    actual file keep import graphs traceable and avoid circular-import risk as
    the codebase grows — don't add a barrel "for convenience" in `components/ui/`
    or elsewhere.

### Empty folders

16. Any folder that's intentionally empty at scaffold time gets a `.gitkeep` —
    remove the `.gitkeep` the moment a real file lands in that folder, don't leave
    both.

### Keeping this document current

17. This file, `context/sitemap.md`, and `context/developer-map.md`'s "where to
    find what" table are the three places a structural change must be reflected.
    A PR that adds/moves/removes a route, a top-level component/lib folder, or a
    service boundary is incomplete without updating the relevant one(s) of these
    three — treat an out-of-date structure doc as a bug, not a documentation
    nice-to-have, since it's what opencode and new developers rely on to place
    new code correctly.