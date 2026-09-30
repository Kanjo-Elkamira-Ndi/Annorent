import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { dirFor, isLocale, localeTags, locales, type Locale } from "@/lib/i18n";
import "./globals.css";

/**
 * Real root layout for the localized tree.
 *
 * Owns: fonts, the Tailwind entry (`globals.css`), static params for every
 * supported locale, and the locale-validity gate that 404s anything outside
 * the supported list.
 * Does not own: RBAC guards (those live in each role's own `layout.tsx`, rule 12)
 * or page content.
 *
 * Deviation from `context/file-structure.md` §3, noted per
 * `context/code-standards.md`: §3 lists `I18nProvider`, `AuthProvider`,
 * `ToastProvider`, and `SocketProvider` here. None of those modules exist yet,
 * and inventing empty provider shells would be dead code — they are added when
 * the first feature needs them.
 */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;

  return (
    <div lang={localeTags[typed]} dir={dirFor(typed)} className="flex min-h-full flex-1 flex-col">
      <div className={inter.variable} aria-hidden="true" />
      {children}
    </div>
  );
}
