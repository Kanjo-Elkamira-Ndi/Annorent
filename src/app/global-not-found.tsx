import "./[locale]/globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/shared/logo";
import { instrumentSans } from "@/lib/fonts";
import { themeScript } from "@/lib/theme";

/**
 * 404 for URLs that match no route at all (outside `/[locale]`). It bypasses
 * every layout, so it brings its own styles, font and theme script. The locale
 * is unknown here, so the copy is bilingual.
 */

export const metadata: Metadata = {
  title: "Page not found · Page introuvable · Annorent",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="light" className={instrumentSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas font-sans text-primary antialiased">
        <main className="mx-auto flex min-h-dvh max-w-[680px] flex-col justify-center gap-6 px-4 py-16">
          <LogoMark className="size-12" />
          <div className="space-y-2">
            <h1 className="text-h1 font-semibold">We can&apos;t find that page</h1>
            <p className="text-body text-secondary" lang="fr">
              Page introuvable
            </p>
          </div>
          <p className="flex flex-wrap gap-4 text-body">
            <Link className="font-medium text-link underline underline-offset-4" href="/en">
              Go to the home page
            </Link>
            <Link className="font-medium text-link underline underline-offset-4" href="/fr" lang="fr">
              Aller à l&apos;accueil
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
