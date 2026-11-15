import type { MessageKey } from "@/lib/i18n";

/**
 * Public navigation model, shared by the floating pill nav, the mobile menu,
 * the bottom tab bar and the footer.
 *
 * Paths are locale-relative ("/hotels" → "/en/hotels"). Flexible spaces get
 * their own route, because the planned backend models rentable units
 * separately from properties (docs/archive/context-v1/database-schema.md,
 * `rentable_units`); see roadmap decision D-3.
 */

export type NavItem = { key: MessageKey<"common">; path: string };

export const PRIMARY_NAV: readonly NavItem[] = [
  { key: "nav.properties", path: "/properties" },
  { key: "nav.hotels", path: "/hotels" },
  { key: "nav.spaces", path: "/spaces" },
  { key: "nav.map", path: "/map" },
];

export type BottomNavItem = NavItem & { icon: "search" | "map" | "saved" | "account" };

export const BOTTOM_NAV: readonly BottomNavItem[] = [
  { key: "nav.search", path: "/", icon: "search" },
  { key: "nav.map", path: "/map", icon: "map" },
  { key: "nav.saved", path: "/saved", icon: "saved" },
  { key: "nav.account", path: "/login", icon: "account" },
];

export const SIGN_IN_PATH = "/login";

export function localePath(locale: string, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Active when the current path is the item's path or below it. Home matches exactly. */
export function isActivePath(pathname: string, locale: string, path: string): boolean {
  const target = localePath(locale, path);
  if (path === "/") return pathname === target || pathname === `${target}/`;
  return pathname === target || pathname.startsWith(`${target}/`);
}
