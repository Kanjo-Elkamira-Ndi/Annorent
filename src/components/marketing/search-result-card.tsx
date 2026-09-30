import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { SearchCard } from "@/lib/marketing/property-search";
import { cn } from "@/lib/utils/cn";

/**
 * The rich result card on the property search page.
 *
 * Distinct from the home page's `ListingCard`: this one leads with the photo
 * and floating status chips, puts the title and spec row above the price, and
 * exposes a per-card "Details & VR" affordance.
 *
 * A plain background layer rather than `next/image` for the same reason as
 * `ListingCard` — 512px decorative thumbnails behind an opaque text block. Swap
 * for `<Image>` once real listing photography of known dimensions lands.
 *
 * The whole card is an `<a>`, and the inner CTA is a `<span>` styled as a
 * button rather than a nested `<button>`: nesting interactive elements breaks
 * keyboard traversal and the accessible name of the link.
 */

type SearchResultCardProps = {
  locale: Locale;
  card: SearchCard;
  /** Route to the property, already locale-prefixed. */
  href: string;
};

export function SearchResultCard({ locale, card, href }: SearchResultCardProps) {
  return (
    <a
      href={href}
      className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(23,43,77,0.08)] hover:shadow-xl transition-all flex flex-col"
    >
      <div className="relative w-full h-56 bg-surface-container-high overflow-hidden">
        <div
          role="img"
          aria-label={card.imageAlt}
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url('${card.image}')` }}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[11px] shadow-sm">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            {t(locale, "marketing", "search.verifiedProperty")}
          </span>
          {card.exclusive ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-on-surface/75 backdrop-blur-md text-on-secondary font-label-sm text-[10px]">
              {t(locale, "marketing", "search.exclusive")}
            </span>
          ) : null}
        </div>

        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-on-surface/80 backdrop-blur-md text-on-secondary font-label-sm text-[11px] shadow-sm">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[14px] text-primary-fixed"
            >
              view_in_ar
            </span>
            {t(locale, "marketing", "search.vrTour")}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-full bg-on-surface/40 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest" />
          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/50" />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between mb-2 gap-3">
            <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wide">
              {t(locale, "marketing", card.locationKey)}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0">
              {t(locale, "marketing", card.typeKey)}
            </span>
          </div>

          <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold tracking-tight line-clamp-1 group-hover:text-primary transition-colors mb-2">
            {t(locale, "marketing", card.titleKey)}
          </h3>

          <div className="flex items-center gap-4 text-on-surface-variant font-label-md text-label-md mb-4 py-2">
            {card.specs.map((spec) => (
              <span key={spec.icon} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-[18px] text-primary"
                >
                  {spec.icon}
                </span>
                {spec.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {card.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="block font-label-sm text-[11px] text-on-surface-variant uppercase">
              {t(locale, "marketing", "search.monthlyRent")}
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {card.price}{" "}
              <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                {t(locale, "marketing", card.currencyKey)}
              </span>
            </span>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-on-primary",
              "font-label-sm text-label-sm font-semibold transition-colors shadow-sm",
              "group-hover:bg-primary-container",
            )}
          >
            {t(locale, "marketing", "search.detailsAndVr")}
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
