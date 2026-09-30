import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { Assurance } from "@/lib/marketing/types";

/**
 * A row of reassurance callouts — the `shield`/`verified` strips that sit under
 * the hero on the results pages and above the footer's CTA.
 *
 * `variant="bar"` is the single-item, boxed strip the property search page
 * puts between the toolbar and the grid. `variant="inline"` is the borderless
 * three-up row the hotels page uses under its search panel.
 */

type AssuranceStripProps = {
  locale: Locale;
  assurances: readonly Assurance[];
  variant?: "bar" | "inline";
};

export function AssuranceStrip({ locale, assurances, variant = "inline" }: AssuranceStripProps) {
  if (variant === "bar") {
    const [only] = assurances;
    if (!only) return null;

    return (
      <aside className="flex items-start gap-3 rounded-xl bg-tertiary-container/40 border border-tertiary/20 p-4">
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-tertiary text-[22px] shrink-0"
        >
          {only.icon}
        </span>
        <div className="flex-1">
          <p className="font-label-md text-label-md font-semibold text-on-surface">
            {t(locale, "marketing", only.titleKey)}
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            {t(locale, "marketing", only.bodyKey)}
          </p>
        </div>
        <a
          href="#"
          className="hidden sm:inline-flex items-center gap-1 font-label-md text-label-md font-semibold text-primary hover:underline shrink-0"
        >
          {t(locale, "marketing", "common.learnMore")}
          <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </a>
      </aside>
    );
  }

  return (
    <ul className="grid sm:grid-cols-3 gap-4">
      {assurances.map((item) => (
        <li key={item.titleKey} className="flex items-start gap-2.5">
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-primary text-[20px] shrink-0"
          >
            {item.icon}
          </span>
          <div>
            <p className="font-label-md text-label-md font-semibold text-on-surface leading-snug">
              {t(locale, "marketing", item.titleKey)}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
              {t(locale, "marketing", item.bodyKey)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
