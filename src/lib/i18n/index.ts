/**
 * Locale registry and message lookup.
 *
 * Owns: the supported-locale list (English and French, decision D-1), locale
 * tags for `Intl`, and the typed `t()` lookup used by server and client
 * components.
 * Does not own: translation authoring (`messages/*.ts`).
 *
 * This is the one permitted barrel-style module in the project: it is a real
 * module, not a re-export shim.
 */

import { common } from "./messages/common";

export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * BCP 47 tags for `Intl` formatting. The Cameroonian regional tags give FCFA
 * currency labels and day-first dates (verified with Node's ICU: "350 000 FCFA",
 * "04/03/2026"). `<html lang>` uses the bare language code.
 */
export const localeTags: Record<Locale, string> = {
  en: "en-CM",
  fr: "fr-CM",
};

/** Endonyms: a language switcher reads in its own language. */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export const catalogs = { common } as const;

export type Namespace = keyof typeof catalogs;
export type MessageKey<N extends Namespace> = keyof (typeof catalogs)[N]["en"] & string;

/**
 * Look up a message, then fill `{name}` placeholders from `values`.
 * Falls back to English, then to the key, so a gap is visible instead of blank.
 */
export function t<N extends Namespace>(
  locale: Locale,
  namespace: N,
  key: MessageKey<N>,
  values?: Record<string, string | number>,
): string {
  const tables = catalogs[namespace] as Record<Locale, Record<string, string>>;
  const template = tables[locale]?.[key] ?? tables[defaultLocale]?.[key] ?? key;
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}

/** Swap the locale segment of a path: `/en/hotels` → `/fr/hotels`. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) return `/${[target, ...rest].join("/")}`.replace(/\/$/, "") || `/${target}`;
  return `/${target}${pathname === "/" ? "" : pathname}`;
}
