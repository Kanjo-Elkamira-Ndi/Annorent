import Link from "next/link";

import { t, type Locale } from "@/lib/i18n";
import type { ListingSection } from "@/lib/marketing-data";

import { ListingCard } from "./listing-card";

/**
 * One of the three listing bands on the home page (properties, rentals,
 * hotels). They differ only in copy and listings, so they share this wrapper.
 *
 * Stitch lays each one out as a header row — kicker, heading, supporting line,
 * and a "view all" link — above a three-column grid that collapses to one
 * column on small screens. These are static grids, not carousels: the reference
 * has no scroll container and no prev/next controls, so there is nothing to
 * hydrate here.
 */

type ListingGridSectionProps = {
  locale: Locale;
  section: ListingSection;
  variant: "property" | "rental" | "hotel";
  /** Route prefix for per-card links, e.g. "/properties". */
  baseHref: string;
};

export function ListingGridSection({
  locale,
  section,
  variant,
  baseHref,
}: ListingGridSectionProps) {
  return (
    <section
      aria-labelledby={`${variant}-heading`}
      className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {section.kicker ? (
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                {section.kicker}
              </span>
            </div>
          ) : null}
          <h2
            id={`${variant}-heading`}
            className="font-headline-md text-headline-md text-on-surface"
          >
            {t(locale, "marketing", section.titleKey)}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {t(locale, "marketing", section.bodyKey)}
          </p>
        </div>
        <Link
          href={`/${locale}${section.linkHref}`}
          className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors"
        >
          {t(locale, "marketing", section.linkLabelKey)}
          <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-6">
        {section.listings.map((listing) => (
          <li key={listing.id} className="flex">
            <ListingCard
              listing={listing}
              variant={variant}
              href={`/${locale}${baseHref}/${listing.id}`}
              className="w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
