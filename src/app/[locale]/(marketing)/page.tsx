import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/marketing/hero";
import { ListingGridSection } from "@/components/marketing/listing-grid-section";
import { MapBand } from "@/components/marketing/map-band";
import { OwnerCta } from "@/components/marketing/owner-cta";
import { SiteFooter } from "@/components/marketing/site-footer";
import { TrustMetrics } from "@/components/marketing/trust-metrics";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  HOTEL_SECTION,
  PROPERTY_SECTION,
  RENTAL_SECTION,
} from "@/lib/marketing-data";

/**
 * Home page.
 *
 * Composition only (rule 11): it arranges marketing components and holds no
 * presentation logic. The locale is validated here and threaded to the
 * components that need it, rather than each component re-deriving it.
 *
 * Section order follows the Stitch reference "Home - Annorent Marketplace":
 * header, hero, trust metrics, neighborhood map band, then the three listing
 * grids, the owner CTA, and the footer.
 *
 * The header is `fixed`, so `<main>` carries `pt-20` to reserve its height and
 * the hero pulls back up with `-mt-20` — the pair Stitch uses so the hero bleeds
 * to the top of the viewport while every section below clears the bar. Both
 * halves are required: dropping either one lets the header overlap the hero.
 */

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <SiteHeader locale={typed} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <Hero locale={typed} />
          <TrustMetrics locale={typed} />
          <MapBand locale={typed} />
          <ListingGridSection
            locale={typed}
            section={PROPERTY_SECTION}
            variant="property"
            baseHref="/properties"
          />
          <ListingGridSection
            locale={typed}
            section={RENTAL_SECTION}
            variant="rental"
            baseHref="/rentals"
          />
          <ListingGridSection
            locale={typed}
            section={HOTEL_SECTION}
            variant="hotel"
            baseHref="/hotels"
          />
          <OwnerCta locale={typed} />
        </div>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
