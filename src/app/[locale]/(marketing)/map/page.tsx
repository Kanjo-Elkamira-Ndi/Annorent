import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import {
  MapDiscovery,
  type ResolvedMapListing,
} from "@/components/marketing/map/map-discovery";
import { isLocale, t, type Locale } from "@/lib/i18n";
import {
  MAP_AREA_KEY,
  MAP_CATEGORIES,
  MAP_CLUSTERS,
  MAP_DISTRICT_KEYS,
  MAP_LISTINGS,
  MAP_TOTAL,
} from "@/lib/marketing/map";

/**
 * Interactive map discovery — `/[locale]/map`.
 *
 * Ported from the Stitch reference "Interactive Map Discovery - Annorent"
 * (screen `1567d9d5515a48da855f69e63632b78b`).
 *
 * The page stays a server component: it resolves every `map.*` message and
 * hands plain data to `MapDiscovery`, the one client island that owns the
 * interactive state. That keeps the translated copy out of the client bundle
 * and means no i18n lookup ships to the browser.
 *
 * The design's own header and footer are not ported — the site already has
 * `SiteHeader`/`SiteFooter`, and the reference's nav is a duplicate of it. The
 * reference's map viewport is a fixed-height split (results rail beside a
 * full-bleed vector map) rather than a scrolling section, so this page is
 * `min-h-screen` with an internally scrolling card column; see
 * `context/file-structure.md` §3 for the shared `pt-20` / `-mt-20` offset pair.
 *
 * Two things are worth knowing before editing:
 *
 * - The base map is a hand-drawn SVG of Abidjan, not tiles, and the pins are
 *   positioned in percentages over it. That is why there is no mapping
 *   dependency, no API key, and no geocoding — and also why zoom rewrites the
 *   `viewBox` instead of panning. See `components/marketing/map/abidjan-map.tsx`.
 * - The sort control, the satellite toggle, geolocation, and 3D are rendered
 *   explicitly disabled with explanatory tooltips. They need a tile layer, a
 *   geolocation permission, and real 3D geometry respectively, so the reference
 *   does not specify behaviour for them. `MAP_INERT_CONTROLS` is the canonical
 *   list.
 */

/** A pin's detail keys, resolved to the copy the island renders. */
function resolveListing(
  listing: (typeof MAP_LISTINGS)[number],
  locale: Locale,
): ResolvedMapListing {
  return {
    ...listing,
    name: t(locale, "marketing", listing.nameKey),
    area: t(locale, "marketing", listing.areaKey),
    address: t(locale, "marketing", listing.addressKey),
    categoryLabel: t(locale, "marketing", listing.categoryLabelKey),
    priceUnit: t(locale, "marketing", listing.priceUnitKey),
    specs: listing.specs.map((spec) => ({
      icon: spec.icon,
      label: t(locale, "marketing", spec.labelKey),
    })),
    badge: listing.badgeKey ? t(locale, "marketing", listing.badgeKey) : null,
    ribbon: listing.ribbonKey ? t(locale, "marketing", listing.ribbonKey) : null,
    popupBadge: listing.popupBadgeKey ? t(locale, "marketing", listing.popupBadgeKey) : null,
    imageAlt: t(locale, "marketing", listing.imageAltKey),
  };
}

export default async function MapPage({ params }: PageProps<"/[locale]/map">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  const listings = MAP_LISTINGS.map((listing) => resolveListing(listing, typed));
  const categories = MAP_CATEGORIES.map((c) => ({
    value: c.value,
    label: t(typed, "marketing", c.labelKey),
  }));
  const clusters = MAP_CLUSTERS.map((c) => ({
    count: c.count,
    top: c.top,
    left: c.left,
    sizeClass: c.sizeClass,
    label: t(typed, "marketing", c.labelKey),
  }));
  const districtLabels = MAP_DISTRICT_KEYS.map((key) => t(typed, "marketing", key));

  return (
    <>
      <SiteHeader locale={typed} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <MapDiscovery
          locale={typed}
          listings={listings}
          categories={categories}
          clusters={clusters}
          districtLabels={districtLabels}
          total={MAP_TOTAL}
          strings={{
            searchPlaceholder: t(typed, "marketing", "map.search.placeholder"),
            maxRentLabel: t(typed, "marketing", "map.filter.maxRent"),
            reset: t(typed, "marketing", "map.filter.reset"),
            counter: t(typed, "marketing", "map.counter"),
            filteredCounter: t(typed, "marketing", "map.counterFiltered"),
            sort: t(typed, "marketing", "map.sort"),
            sortInert: t(typed, "marketing", "map.sortInert"),
            areaSummary: t(typed, "marketing", MAP_AREA_KEY),
            zoomIn: t(typed, "marketing", "map.zoomIn"),
            zoomOut: t(typed, "marketing", "map.zoomOut"),
            layers: t(typed, "marketing", "map.layers"),
            layersInert: t(typed, "marketing", "map.layersInert"),
            locate: t(typed, "marketing", "map.locate"),
            locateInert: t(typed, "marketing", "map.locateInert"),
            view3d: t(typed, "marketing", "map.view3d"),
            view3dInert: t(typed, "marketing", "map.view3dInert"),
            searchAsIMove: t(typed, "marketing", "map.searchAsIMove"),
            searchAsIMoveInert: t(typed, "marketing", "map.searchAsIMoveInert"),
            viewport: t(typed, "marketing", "map.viewport"),
            closePopup: t(typed, "marketing", "map.closePopup"),
            viewProperty: t(typed, "marketing", "map.viewProperty"),
            verified: t(typed, "marketing", "map.verified"),
            noResults: t(typed, "marketing", "map.noResults"),
          }}
        />
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
