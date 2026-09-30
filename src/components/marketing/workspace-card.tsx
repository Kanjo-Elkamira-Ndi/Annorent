import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { WorkspaceCard } from "@/lib/marketing/rentals";
import { cn } from "@/lib/utils/cn";

/**
 * The workspace card on the flexible rentals / coworking page.
 *
 * Two price tiers side by side is the card's distinguishing detail — the
 * coworking market is bought in days, hours, or months, so the card has to
 * show more than one rate to be useful. The design renders the tiers as plain
 * text pairs, so they are a definition list rather than a table.
 *
 * Availability gets two lines: a bold "Available Now" status and the
 * fine-grained next slot underneath. The status is the scannable part and gets
 * the filled check glyph; the slot is supporting detail.
 */

type WorkspaceCardViewProps = {
  locale: Locale;
  card: WorkspaceCard;
  href: string;
};

export function WorkspaceCardView({ locale, card, href }: WorkspaceCardViewProps) {
  return (
    <a
      href={href}
      className="group flex h-full flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(23,43,77,0.08)] hover:shadow-xl transition-all"
    >
      <div className="relative w-full h-52 bg-surface-container-high overflow-hidden">
        <div
          role="img"
          aria-label={card.imageAlt}
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url('${card.image}')` }}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[11px] shadow-sm">
            <span aria-hidden="true" className="material-symbols-outlined text-[13px]">
              check_circle
            </span>
            {t(locale, "marketing", "rentals.availability.now")}
          </span>
          {card.badgeKey === "rentals.badge.b2b" ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] shadow-sm">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              {t(locale, "marketing", card.badgeKey)}
            </span>
          ) : null}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-on-surface/80 backdrop-blur-md text-on-secondary font-label-sm text-[11px] shadow-sm">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[14px] text-primary-fixed"
            >
              view_in_ar
            </span>
            {t(locale, "marketing", "rentals.vr360")}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-on-surface/80 backdrop-blur-md text-on-secondary font-label-sm text-[11px] shadow-sm">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[13px] text-primary-fixed"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-bold">{card.rating}</span> ({card.reviews})
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-on-surface/80 to-transparent p-3 pt-8">
          <p className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/95 text-tertiary font-label-sm text-[11px] font-semibold shadow-sm">
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
              event_available
            </span>
            {t(locale, "marketing", card.slotKey)}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <p className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wide">
            {t(locale, "marketing", card.locationKey)}
          </p>
          <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold tracking-tight mt-1 group-hover:text-primary transition-colors">
            {t(locale, "marketing", card.nameKey)}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
            {t(locale, "marketing", card.descriptionKey)}
          </p>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {card.amenities.map((amenity) => (
            <li
              key={amenity.icon}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[15px] text-primary">
                {amenity.icon}
              </span>
              {amenity.label}
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-surface-container flex items-end justify-between gap-3 mt-auto">
          <dl className="flex gap-4">
            {card.prices.map((price) => (
              <div key={price.labelKey}>
                <dt className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wide">
                  {t(locale, "marketing", price.labelKey)}
                </dt>
                <dd className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                  {price.amount}
                </dd>
              </div>
            ))}
          </dl>

          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-on-primary",
              "font-label-sm text-label-sm font-semibold shadow-sm transition-colors shrink-0",
              "group-hover:bg-primary-container",
            )}
          >
            {t(locale, "marketing", card.ctaKey)}
            {card.ctaKey === "rentals.cta.view" ? (
              <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                visibility
              </span>
            ) : (
              <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                calendar_month
              </span>
            )}
          </span>
        </div>
      </div>
    </a>
  );
}
