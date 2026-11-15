/**
 * Theme preference: system, light or dark.
 *
 * The choice is stored in a non-sensitive `theme` cookie (decision 012,
 * design-system-proposal §2.4) and applied before first paint by an inline
 * script, following node_modules/next/dist/docs/01-app/02-guides/
 * preventing-flash-before-hydration.md §Themes. Reading the cookie in the
 * script, not on the server, keeps pages statically prerendered.
 *
 * `<html data-theme>` always holds the *resolved* theme (light or dark);
 * `data-theme-pref` holds the stored preference.
 */

export const themePreferences = ["system", "light", "dark"] as const;
export type ThemePreference = (typeof themePreferences)[number];
export type ResolvedTheme = "light" | "dark";

export const THEME_COOKIE = "theme";
const ONE_YEAR = 60 * 60 * 24 * 365;

export function isThemePreference(value: unknown): value is ThemePreference {
  return typeof value === "string" && (themePreferences as readonly string[]).includes(value);
}

/** Runs in <head> before paint. Keep it tiny, dependency-free and ES5. */
export const themeScript = `(function(){try{var d=document.documentElement,m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=([^;]*)/),p=m?decodeURIComponent(m[1]):"system";if(p!=="light"&&p!=="dark")p="system";var r=p==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):p;d.setAttribute("data-theme",r);d.setAttribute("data-theme-pref",p)}catch(e){}})()`;

export function resolveTheme(pref: ThemePreference, prefersDark: boolean): ResolvedTheme {
  if (pref === "system") return prefersDark ? "dark" : "light";
  return pref;
}

/** Browser only: apply and persist a preference. */
export function applyThemePreference(pref: ThemePreference): void {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", resolveTheme(pref, prefersDark));
  root.setAttribute("data-theme-pref", pref);
  document.cookie = `${THEME_COOKIE}=${encodeURIComponent(pref)}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}

/** Browser only: the preference the inline script applied. */
export function readThemePreference(): ThemePreference {
  const value = document.documentElement.getAttribute("data-theme-pref");
  return isThemePreference(value) ? value : "system";
}
