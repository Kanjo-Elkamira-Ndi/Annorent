/**
 * Minimal root shell.
 *
 * Owns: the `<html>`/`<body>` document every route renders into.
 * Does not own: fonts, providers, or page content — those belong to
 * `src/app/[locale]/layout.tsx`, the real root layout for the localized tree
 * (see `context/file-structure.md` §3).
 *
 * Deviation from §3, noted per `context/code-standards.md`: §3 calls this the
 * "minimal root shell" and `[locale]/layout.tsx` the "real root layout", but
 * Next.js allows only one layout to own `<html>`. This file owns it, so the
 * per-locale `lang`/`dir` are applied to the `[locale]` subtree element
 * instead of the document element.
 */

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-surface text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
