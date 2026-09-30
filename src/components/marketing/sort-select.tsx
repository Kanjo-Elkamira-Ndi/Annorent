import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { SortOption } from "@/lib/marketing/types";

/**
 * The `Sort by :` dropdown every results page shares.
 *
 * Server component with a real `<select>` and an explicit `<label>` — no client
 * state, no custom listbox. The design's own arrow is a decorative Material
 * glyph layered over the native control, which keeps keyboard and mobile
 * behaviour correct for free.
 *
 * A controlled select would need a client boundary to hold state that nothing
 * reads yet, so the element is left uncontrolled and posts as a native form
 * control when the page grows real query params.
 */

type SortSelectProps = {
  locale: Locale;
  /** i18n key for the visible label, e.g. "Sort by :". */
  labelKey: string;
  options: readonly SortOption[];
  /** Must be unique per page; the label is wired to it. */
  id: string;
  /** Option selected on first render. */
  defaultValue?: string;
};

export function SortSelect({
  locale,
  labelKey,
  options,
  id,
  defaultValue,
}: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={id}
        className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap"
      >
        {t(locale, "marketing", labelKey)}
      </label>
      <div className="relative">
        <select
          id={id}
          name="sort"
          defaultValue={defaultValue ?? options[0]?.value}
          className="appearance-none bg-surface-container-lowest px-4 py-2 pr-9 rounded-lg font-label-md text-label-md text-on-surface shadow-sm focus:outline-primary cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {t(locale, "marketing", option.labelKey)}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]"
        >
          expand_more
        </span>
      </div>
    </div>
  );
}
