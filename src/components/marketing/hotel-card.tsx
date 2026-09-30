import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { HotelCard } from "@/lib/marketing/hotels";
import { cn } from "@/lib/utils/cn";

/**
 * The hotel / residence card on the hotels page.
 *
 * The star row is the part worth explaining: Stitch draws five `star` glyphs
 * with a `FILL` variation on the earned ones. A filled icon font conveys
 * "4 out of 5" visually but says nothing to a screen reader, and half-star
 * states are not representable as a binary fill. So the glyph row is
 * `aria-hidden` and the rating travels in a visually-hidden text node instead
 * — the card's visible score and review count remain the sighted affordance.
 */

type HotelCardViewProps = {
  locale: Locale;
  card: HotelCard;
  href: string;
};

export function HotelCardView({ locale, card, href }: HotelCardViewProps) {
  return (
    <a
      href={href}
      className="group flex h-full flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(23,43,77,0.08)] hover:shadow-xl transition-all"
    >
      <div className="relative w-full h-56 bg-surface-container-high overflow-hidden">
        <div
          role="img"
          aria-label={card.imageAlt}
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url('${card.image}')` }}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {card.verified ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[11px] shadow-sm">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              {t(locale, "marketing", "hotels.verifiedGuestHouse")}
            </span>
          ) : null}
          {card.promoKey ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-[10px] font-bold uppercase tracking-wide">
              {t(locale, "marketing", card.promoKey)}
            </span>
          ) : null}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {card.instantBooking ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] shadow-sm">
              <span aria-hidden="true" className="material-symbols-outlined text-[13px]">
                bolt
              </span>
              {t(locale, "marketing", "hotels.instantBooking")}
            </span>
          ) : null}
          {card.hasTour ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-on-surface/80 backdrop-blur-md text-on-secondary font-label-sm text-[11px] shadow-sm">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[14px] text-primary-fixed"
              >
                view_in_ar
              </span>
              {t(locale, "marketing", "hotels.virtualTour")}
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="flex items-center gap-0.5 px-2 py-1 rounded bg-on-surface/80 backdrop-blur-md"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "material-symbols-outlined text-[15px] leading-none",
                  i < card.stars ? "text-amber-400" : "text-on-secondary/50",
                )}
                style={i < card.stars ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                star
              </span>
            ))}
          </span>
          <span className="sr-only">
            {card.stars} / 5 — {t(locale, "marketing", card.categoryKey)}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded bg-on-surface/80 backdrop-blur-md text-on-secondary font-label-sm text-[11px]">
            {t(locale, "marketing", card.categoryKey)}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold tracking-tight group-hover:text-primary transition-colors">
            {t(locale, "marketing", card.nameKey)}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-start gap-1.5">
            <span aria-hidden="true" className="material-symbols-outlined text-[16px] mt-px shrink-0">
              location_on
            </span>
            {t(locale, "marketing", card.locationKey)}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-[11px] font-bold">
              {card.rating}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              {t(locale, "marketing", card.ratingLabelKey)}
            </span>
            <span aria-hidden="true" className="text-outline text-[12px]">
              •
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {card.reviews} {t(locale, "marketing", card.reviewsLabelKey)}
            </span>
          </div>

          <ul className="flex flex-col gap-1.5 mt-4">
            {card.perks.map((perk) => (
              <li key={perk.icon} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-[16px] text-tertiary shrink-0 mt-px"
                >
                  {perk.icon}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {perk.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-surface-container flex items-end justify-between gap-3 mt-auto">
          <div>
            <span className="block font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wide">
              {t(locale, "marketing", "hotels.from")}
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {card.price}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {" "}
              {t(locale, "marketing", card.priceSuffixKey)}
            </span>
            <span className="block font-label-sm text-[11px] text-tertiary mt-0.5">
              {t(locale, "marketing", card.priceNoteKey)}
            </span>
          </div>

          <span
            className={cn(
              "inline-flex flex-col items-center px-4 py-2 rounded-lg bg-primary text-on-primary",
              "font-label-sm text-label-sm font-semibold shadow-sm transition-colors shrink-0",
              "group-hover:bg-primary-container",
            )}
          >
            {t(locale, "marketing", card.ctaKey)}
            <span className="flex items-center gap-1 font-label-sm text-[10px] font-normal opacity-90">
              {t(locale, "marketing", card.ctaSubKey)}
              <span aria-hidden="true" className="material-symbols-outlined text-[12px]">
                arrow_forward
              </span>
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
