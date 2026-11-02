/**
 * Route and label constants for navigation.
 * Single source of truth for header and footer.
 */

import type { Locale } from "@/lib/i18n";

export type NavLink = {
  key: string;
  href: string;
};

export type CompanyLink = {
  key: string;
  href: string;
};

export const PRIMARY_NAV: readonly NavLink[] = [
  { key: "nav.buyRent", href: "/properties" },
  { key: "nav.flex", href: "/rentals" },
  { key: "nav.hotels", href: "/hotels" },
  { key: "nav.map", href: "/map" },
] as const;

export const COMPANY_LINKS: readonly CompanyLink[] = [
  { key: "nav.company.about", href: "/about" },
  { key: "nav.company.partner", href: "/partners" },
  { key: "nav.company.contact", href: "/contact" },
] as const;

export const FOOTER_EXPLORE: readonly NavLink[] = [
  { key: "nav.buyRent", href: "/properties" },
  { key: "nav.flex", href: "/rentals" },
  { key: "nav.hotels", href: "/hotels" },
  { key: "nav.map", href: "/map" },
] as const;

export const FOOTER_COMPANY: readonly CompanyLink[] = [
  { key: "nav.company.about", href: "/about" },
  { key: "nav.company.partner", href: "/partners" },
  { key: "nav.company.contact", href: "/contact" },
] as const;

export const FOOTER_LEGAL: readonly NavLink[] = [
  { key: "nav.legal.terms", href: "/legal/terms" },
  { key: "nav.legal.privacy", href: "/legal/privacy" },
] as const;

export function localeHref(locale: Locale, href: string): string {
  return `/${locale}${href}`;
}

/**
 * Check if a path matches a nav route (ignoring locale prefix).
 */
export function isNavActive(pathname: string, href: string): boolean {
  // Remove locale prefix
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return false;
  const locales = ["en", "fr", "pt", "sw"];
  const pathWithoutLocale = locales.includes(parts[0])
    ? "/" + parts.slice(1).join("/")
    : pathname;

  if (pathWithoutLocale === href) return true;
  if (href !== "/" && pathWithoutLocale.startsWith(href + "/")) return true;
  // Company pages are active for company label
  if (href === "/about" || href === "/partners" || href === "/contact") {
    return ["about", "partners", "contact"].some(
      (p) => pathWithoutLocale === `/${p}` || pathWithoutLocale.startsWith(`/${p}/`),
    );
  }
  return false;
}

export function isCompanyActive(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  const locales = ["en", "fr", "pt", "sw"];
  const pathWithoutLocale = locales.includes(parts[0])
    ? "/" + parts.slice(1).join("/")
    : pathname;
  return ["/about", "/partners", "/contact"].some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(p + "/"),
  );
}
