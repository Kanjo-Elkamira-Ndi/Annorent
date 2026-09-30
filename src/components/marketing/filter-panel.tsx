import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { FilterGroup } from "@/lib/marketing/types";
import { cn } from "@/lib/utils/cn";

/**
 * The sticky filter sidebar on the property search page.
 *
 * Accessibility notes, because this panel is the page's densest control set:
 *
 * - Every checkbox and radio has a real `<label for>`, not a placeholder.
 *   The two price fields and the bedrooms group are the places a design-led
 *   implementation is most likely to drop the association.
 * - `fieldset` + `legend` wrap each group so the heading is announced with
 *   its controls. `legend` is visually replaced by the styled heading row.
 * - The bedroom chips are real radio inputs inside a `radiogroup`, styled
 *   with `peer-checked`, so arrow keys and the tab order behave natively
 *   instead of needing a custom roving-tabindex implementation.
 * - The range slider is a decorative visual: two static thumbs over a track.
 *   The actual min/max inputs below it are the accessible controls, so the
 *   slider is `aria-hidden` and never becomes an unreachable focus stop.
 */

type FilterPanelProps = {
  locale: Locale;
  groups: readonly FilterGroup[];
  /** Result count Stitch shows on the primary button, e.g. "Apply Filters (248)". */
  resultCount: string;
};

export function FilterPanel({ locale, groups, resultCount }: FilterPanelProps) {
  return (
    <aside className="lg:col-span-4 xl:col-span-3">
      <form
        className="bg-surface-container-lowest rounded-xl shadow-sm p-6 sticky top-24 space-y-7"
        aria-label={t(locale, "marketing", "search.filterPanel")}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-[22px]">
              tune
            </span>
            <h2 className="font-headline-sm text-[18px] text-on-surface">
              {t(locale, "marketing", "search.filterTitle")}
            </h2>
          </div>
          <button
            type="button"
            className="font-label-sm text-label-sm text-primary hover:underline"
          >
            {t(locale, "marketing", "common.reset")}
          </button>
        </div>

        {groups.map((group) => (
          <FilterGroupFieldset key={group.titleKey} locale={locale} group={group} />
        ))}

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm"
          >
            {t(locale, "marketing", "search.applyFilters")} ({resultCount})
          </button>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            {t(locale, "marketing", "common.reset")}
          </button>
        </div>
      </form>
    </aside>
  );
}

function FilterGroupFieldset({
  locale,
  group,
}: {
  locale: Locale;
  group: FilterGroup;
}) {
  const baseId = `filter-${group.titleKey.replace(/\W+/g, "-").toLowerCase()}`;

  // The budget group is a bespoke control rather than a list of options.
  if (group.options.length === 0) {
    return <BudgetFieldset locale={locale} baseId={baseId} />;
  }

  return (
    <fieldset>
      <legend className="font-label-md text-label-md font-semibold text-on-surface mb-3">
        {t(locale, "marketing", group.titleKey)}
      </legend>
      {group.control === "chips" ? (
        <ChipGroup locale={locale} group={group} baseId={baseId} />
      ) : (
        <OptionList locale={locale} group={group} baseId={baseId} />
      )}
    </fieldset>
  );
}

function OptionList({
  locale,
  group,
  baseId,
}: {
  locale: Locale;
  group: FilterGroup;
  baseId: string;
}) {
  return (
    <div className="space-y-2.5">
      {group.options.map((option) => {
        const id = `${baseId}-${option.labelKey.replace(/\W+/g, "-").toLowerCase()}`;
        return (
          <label
            key={option.labelKey}
            htmlFor={id}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              id={id}
              type="checkbox"
              defaultChecked={option.defaultSelected}
              className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary shrink-0"
            />
            {option.icon ? (
              <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-[16px] text-primary"
                >
                  {option.icon}
                </span>
                {t(locale, "marketing", option.labelKey)}
              </span>
            ) : (
              <span className="font-body-md text-label-md text-on-surface group-hover:text-primary transition-colors flex-1">
                {t(locale, "marketing", option.labelKey)}
              </span>
            )}
            {option.count !== undefined ? (
              <span className="font-label-sm text-label-sm text-outline-variant">
                {option.count}
              </span>
            ) : null}
          </label>
        );
      })}
    </div>
  );
}

function ChipGroup({
  locale,
  group,
  baseId,
}: {
  locale: Locale;
  group: FilterGroup;
  baseId: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={t(locale, "marketing", group.titleKey)}
      className="grid grid-cols-6 gap-1.5 p-1 rounded-lg bg-surface-container-low"
    >
      {group.options.map((option) => {
        const id = `${baseId}-${option.labelKey.replace(/\W+/g, "-").toLowerCase()}`;
        return (
          <label
            key={option.labelKey}
            htmlFor={id}
            className="cursor-pointer"
            title={t(locale, "marketing", option.labelKey)}
          >
            <input
              id={id}
              type="radio"
              name={`${baseId}-group`}
              defaultChecked={option.defaultSelected}
              className="peer sr-only"
            />
            <span
              className={cn(
                "block text-center py-1.5 rounded font-label-sm text-label-sm transition-colors",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1",
                "peer-checked:bg-surface-container-lowest peer-checked:text-primary peer-checked:font-bold",
                "text-on-surface-variant hover:text-on-surface",
              )}
            >
              {t(locale, "marketing", option.labelKey)}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/**
 * The dual-thumb budget range. Stitch draws it as a filled track with two
 * static thumbs; the accessible controls are the labelled number inputs below,
 * so the visual is hidden from assistive tech and never focusable.
 */
function BudgetFieldset({ locale, baseId }: { locale: Locale; baseId: string }) {
  return (
    <fieldset>
      <legend className="sr-only">{t(locale, "marketing", "search.filters.budget")}</legend>
      <div className="flex items-center justify-between mb-3">
        <p className="font-label-md text-label-md font-semibold text-on-surface">
          {t(locale, "marketing", "search.filters.budget")}
        </p>
        <span className="font-label-sm text-label-sm text-primary font-medium">
          {t(locale, "marketing", "search.filters.perMonth")}
        </span>
      </div>

      <div aria-hidden="true" className="px-1 py-2">
        <div className="relative w-full h-1.5 bg-surface-container-high rounded-full flex items-center">
          <div className="absolute left-[12%] right-[28%] h-full bg-primary rounded-full" />
          <div className="absolute left-[12%] w-4 h-4 bg-surface-container-lowest shadow-md rounded-full -translate-x-1/2" />
          <div className="absolute right-[28%] w-4 h-4 bg-surface-container-lowest shadow-md rounded-full translate-x-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label
            htmlFor={`${baseId}-min`}
            className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
          >
            {t(locale, "marketing", "search.filters.minFcfa")}
          </label>
          <input
            id={`${baseId}-min`}
            type="number"
            name="priceMin"
            inputMode="numeric"
            defaultValue={500000}
            className="w-full bg-surface-container-low px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface focus:outline-primary"
          />
        </div>
        <div>
          <label
            htmlFor={`${baseId}-max`}
            className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
          >
            {t(locale, "marketing", "search.filters.maxFcfa")}
          </label>
          <input
            id={`${baseId}-max`}
            type="number"
            name="priceMax"
            inputMode="numeric"
            defaultValue={2500000}
            className="w-full bg-surface-container-low px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface focus:outline-primary"
          />
        </div>
      </div>
    </fieldset>
  );
}
