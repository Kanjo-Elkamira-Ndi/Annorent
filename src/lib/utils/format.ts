import { defaultLocale, localeTags, type Locale } from "@/lib/i18n";

/**
 * Display formatters.
 *
 * Owns: turning stored numbers and ISO strings into locale-aware display text:
 * money, plain counts, calendar dates and relative times.
 * Does not own: currency conversion, rate logic or any network call. Amounts
 * stay integers in their currency's major unit; these helpers only render them.
 *
 * Cameroon uses the Central African CFA franc, `XAF` (BEAC), not the West
 * African `XOF`. Both have no minor unit. `now` is a parameter on the relative
 * formatter so callers and tests are deterministic.
 */

export type CurrencyCode = "XAF";

function tag(locale: Locale): string {
  return localeTags[locale] ?? localeTags[defaultLocale];
}

export function formatMoney(amount: number, locale: Locale, currency: CurrencyCode = "XAF"): string {
  return new Intl.NumberFormat(tag(locale), {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(tag(locale)).format(value);
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(tag(locale), {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Numeric day-first date, e.g. 04/03/2026, for forms and tables. */
export function formatShortDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(tag(locale), { dateStyle: "short", timeZone: "UTC" }).format(date);
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["week", 7 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
];

export function formatRelativeTime(iso: string, locale: Locale, now: Date): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return iso;

  const deltaMs = then.getTime() - now.getTime();
  const formatter = new Intl.RelativeTimeFormat(tag(locale), { numeric: "auto" });

  for (const [unit, msPerUnit] of RELATIVE_UNITS) {
    if (Math.abs(deltaMs) >= msPerUnit) {
      return formatter.format(Math.round(deltaMs / msPerUnit), unit);
    }
  }

  return formatter.format(Math.round(deltaMs / 1000), "second");
}
