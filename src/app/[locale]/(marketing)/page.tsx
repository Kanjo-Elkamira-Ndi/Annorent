import { Hero } from "@/components/marketing/hero";
import { ListingGridSection } from "@/components/marketing/listing-grid-section";
import { MapBand } from "@/components/marketing/map-band";
import { OwnerCta } from "@/components/marketing/owner-cta";
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
 * hero, trust metrics, neighborhood map band, then the three listing grids,
 * closing on the owner call to action.
 */

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
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
    </>
  );
}
