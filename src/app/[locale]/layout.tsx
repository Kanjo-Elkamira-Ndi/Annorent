import "./globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { ToastProvider } from "@/components/ui/toast";
import { instrumentSans } from "@/lib/fonts";
import { isLocale, locales, t } from "@/lib/i18n";
import { themeScript } from "@/lib/theme";

/**
 * Root layout. It sits under `[locale]` (there is no `app/layout.tsx`) so the
 * server renders the correct `<html lang>` for every page, which the old
 * client-side `DocumentLangSync` workaround could not. URLs that match no route
 * fall through to `app/global-not-found.tsx` (next.config `globalNotFound`).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const name = t(locale, "common", "brand.name");
  return {
    title: { default: name, template: `%s · ${name}` },
    description: t(locale, "common", "footer.tagline"),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1424" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} data-theme="light" className={instrumentSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas font-sans text-body text-primary antialiased">
        <a
          href="#main"
          className="sr-only rounded-md bg-surface px-4 py-2 text-body-sm font-medium text-primary shadow-e2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80]"
        >
          {t(locale, "common", "nav.skipToContent")}
        </a>
        <ToastProvider closeLabel={t(locale, "common", "state.dismiss")}>{children}</ToastProvider>
      </body>
    </html>
  );
}
