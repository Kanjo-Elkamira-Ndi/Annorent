import type { CardBadge, Listing } from "@/lib/marketing-data";
import { cn } from "@/lib/utils/cn";

/**
 * The listing card shared by the properties, rentals, and hotels sections.
 *
 * Stitch draws three visually distinct cards from one shape: a photo with
 * floating chips, a price row, a title/location pair, and a spec row. Only the
 * chips and the spec row's treatment differ, so those are driven off the
 * optional fields on `Listing` rather than by three separate components.
 *
 * Server component — no interactivity, so it needs no client boundary.
 */

const BADGE_TONE: Record<CardBadge["tone"], string> = {
  neutral: "bg-surface-container-lowest/90 text-on-surface",
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-on-secondary",
  tertiary: "bg-tertiary text-on-tertiary",
  tertiaryContainer: "bg-tertiary-container text-on-tertiary",
};

const BADGE_SHAPE: Record<CardBadge["tone"], string> = {
  neutral: "rounded px-2.5 py-1",
  primary: "rounded px-2.5 py-1",
  secondary: "rounded px-2.5 py-1",
  tertiary: "rounded px-2.5 py-1",
  tertiaryContainer: "rounded-full px-2.5 py-1",
};

/** Hotels carry a `bolt` glyph inside the pill; the rest are plain text. */
const BADGE_ICON: Record<CardBadge["tone"], string | null> = {
  neutral: null,
  primary: null,
  secondary: null,
  tertiary: null,
  tertiaryContainer: "bolt",
};

type ListingCardProps = {
  listing: Listing;
  /** Routes the whole card to. Omit to render a non-interactive article. */
  href?: string;
  /**
   * Drives the two details Stitch varies per section: rentals use a shorter
   * photo (h-56) than properties and hotels (h-64).
   */
  variant?: "property" | "rental" | "hotel";
  className?: string;
};

export function ListingCard({
  listing,
  href,
  variant = "property",
  className,
}: ListingCardProps) {
  const { badge, rating } = listing;

  const inner = (
    <>
      <div className={cn("relative w-full overflow-hidden", variant === "rental" ? "h-56" : "h-64")}>
        {/* A plain background layer rather than next/image: these are short,
            decorative thumbnails behind an opaque text block, and the source
            assets are 512px wide, so next/image would add a loader for no
            visual gain. Swap for <Image> when real listing photography lands. */}
        <div
          role="img"
          aria-label={listing.imageAlt}
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url('${listing.image}')` }}
        />

        {badge ? (
          <span
            className={cn(
              "absolute top-3 left-3 font-label-sm text-label-sm font-semibold",
              BADGE_SHAPE[badge.tone],
              BADGE_TONE[badge.tone],
            )}
          >
            {BADGE_ICON[badge.tone] ? (
              <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                {BADGE_ICON[badge.tone]}
              </span>
            ) : null}
            {badge.label}
          </span>
        ) : null}

        {rating ? (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-on-surface/80 backdrop-blur-md text-surface-container-lowest flex items-center gap-1 font-label-sm text-label-sm">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[14px] text-amber-400"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-bold">{rating.value}</span> ({rating.reviews} reviews)
          </span>
        ) : null}

        {listing.hasVirtualTour ? (
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-surface/75 backdrop-blur-md text-surface-container-lowest font-label-sm text-label-sm">
              <span aria-hidden="true" className="material-symbols-outlined text-[15px] text-tertiary-fixed">
                view_in_ar
              </span>
              3D VR Tour
            </span>
            {listing.verified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm">
                <span aria-hidden="true" className="material-symbols-outlined text-[13px]">
                  verified
                </span>
                Verified
              </span>
            ) : null}
          </div>
        ) : null}

        {listing.availability ? (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-tertiary" />
            {listing.availability}
          </span>
        ) : null}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              {listing.price}
              {listing.pricePeriod ? (
                <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                  {" "}
                  / {listing.pricePeriod}
                </span>
              ) : null}
            </span>
            {listing.priceNoteIcon ? (
              <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-0.5">
                <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                  {listing.priceNoteIcon}
                </span>
                {listing.priceNote}
              </span>
            ) : (
              <span className="font-label-sm text-label-sm text-outline">{listing.priceNote}</span>
            )}
          </div>

          <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1 mt-0.5">
            {listing.location}
          </p>

          {listing.specs ? (
            <div className="flex items-center gap-4 text-on-surface-variant mt-4 pt-3 border-t border-surface-container">
              {listing.specs.map((spec) => (
                <span key={spec.label} className="flex items-center gap-1.5 font-label-sm text-label-sm">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    {spec.icon}
                  </span>
                  {spec.label}
                </span>
              ))}
            </div>
          ) : null}

          {listing.amenities ? (
            <div className="flex items-center gap-3 text-on-surface-variant mt-4 pt-3 border-t border-surface-container">
              {listing.amenities.map((amenity) => (
                <span
                  key={amenity.label}
                  className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-surface-container-low px-2 py-1 rounded"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                    {amenity.icon}
                  </span>
                  {amenity.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );

  const shell = cn(
    "group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col",
    className,
  );

  if (href) {
    return (
      <a href={href} className={cn(shell, "block")}>
        {inner}
      </a>
    );
  }

  return <article className={shell}>{inner}</article>;
}
