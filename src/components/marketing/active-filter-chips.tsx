import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { ActiveFilter } from "@/lib/marketing/types";

/**
 * The "Active filters: …  Clear all" strip above the results grid.
 *
 * Each chip's remove control is a real `<button>` carrying an accessible name
 * that names the filter it removes — an `x` glyph alone tells a screen-reader
 * user nothing about which of four identical chips they are dismissing. The
 * name comes from the data, so adding a chip cannot forget to supply one.
 *
 * The controls are inert until filtering is wired; see `context/sitemap.md`.
 */

type ActiveFilterChipsProps = {
  locale: Locale;
  filters: readonly ActiveFilter[];
  /** Query string the chips and "Clear all" build, e.g. "neighborhood=cocody". */
  baseHref: string;
};

export function ActiveFilterChips({ locale, filters, baseHref }: ActiveFilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium mr-1">
        {t(locale, "marketing", "search.activeFilters")}
      </span>

      {filters.map((filter) => {
        const isVerified = filter.tone === "tertiary";
        return (
          <span
            key={filter.labelKey}
            className={
              isVerified
                ? "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm"
                : "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-sm text-label-sm"
            }
          >
            {isVerified ? (
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            ) : null}
            {t(locale, "marketing", filter.labelKey)}
            <button
              type="button"
              aria-label={t(locale, "marketing", filter.removeLabelKey)}
              className="hover:text-error flex items-center"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                close
              </span>
            </button>
          </span>
        );
      })}

      <a
        href={baseHref}
        className="font-label-sm text-label-sm text-primary hover:underline ml-1"
      >
        {t(locale, "marketing", "common.clearAll")}
      </a>
    </div>
  );
}
