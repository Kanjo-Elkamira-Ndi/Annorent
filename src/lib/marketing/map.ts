/**
 * Static content for the interactive map discovery page — `/[locale]/map`.
 *
 * Ported from Stitch screen `1567d9d5515a48da855f69e63632b78b` ("Interactive
 * Map Discovery - Annorent").
 *
 * The design is a stylised vector map of Abidjan, not a tiled geographic map:
 * the base map is a hand-drawn SVG and the markers are HTML elements placed
 * over it in percentages. So a "position" here is a percentage of the SVG's
 * 1200x900 viewBox rather than a latitude/longitude — see `map/abidjan-map.tsx`.
 * That is what lets the whole page work with no mapping library, no tile server,
 * and no API key.
 *
 * Pin ids match the reference's `data-id` values, so this data lines up with the
 * ported markup one-for-one.
 *
 * Prices are pre-formatted strings rather than numbers formatted at render time,
 * matching `lib/marketing/{home,rentals,hotels}.ts`. Only the price *slider*
 * readout needs live formatting, and that is handled in `map-discovery.tsx`.
 */

/** The listing categories the filter pills offer, plus "all". */
export type MapCategory = "all" | "villa" | "apartment" | "coworking" | "hotel";

/** A single detail in a card's spec row, e.g. beds or floor area. */
export type MapSpec = {
  /** Material Symbols ligature. */
  icon: string;
  /** i18n key; resolved by the page. */
  labelKey: string;
};

export type MapListing = {
  id: string;
  /** i18n keys — the page resolves all of these before handing data to the island. */
  nameKey: string;
  areaKey: string;
  /** Street address, used only in the pin popup. */
  addressKey: string;
  /** Small uppercase category chip on the card, e.g. "Luxury Villa". */
  categoryLabelKey: string;
  category: Exclude<MapCategory, "all">;
  /** Material Symbols ligature used by the active pin and the popup. */
  icon: string;
  specs: MapSpec[];
  /** Pre-formatted rate, e.g. "2 400 000". */
  price: string;
  /** Cadence, e.g. "FCFA/m". Separated so the suffix can be translated. */
  priceUnitKey: string;
  /** Compact label for the pin bubble, e.g. "2.4M FCFA". */
  pinLabel: string;
  /** Numeric rate in FCFA, used by the "max rent" filter. */
  priceValue: number;
  /** Percentage offsets over the SVG. */
  top: string;
  left: string;
  /** i18n key for the card thumbnail's corner badge, e.g. "360° VR" / "Nightly". */
  badgeKey: string;
  /** Material Symbols ligature for the corner badge. Null hides the badge. */
  badgeIcon: string | null;
  /** i18n key for the card's bottom-right ribbon, e.g. "Guest Favorite". */
  ribbonKey: string | null;
  /** i18n key for the popup's image ribbon, e.g. "Exclusive". */
  popupBadgeKey: string | null;
  /** Self-hosted thumbnail; replaces the reference's unreachable aida-public URL. */
  image: string;
  imageAltKey: string;
};

export const MAP_LISTINGS: MapListing[] = [
  {
    id: "pin-1",
    nameKey: "map.listing.1.name",
    areaKey: "map.listing.1.area",
    addressKey: "map.listing.1.address",
    categoryLabelKey: "map.listing.1.category",
    category: "villa",
    icon: "apartment",
    specs: [
      { icon: "bed", labelKey: "map.listing.1.beds" },
      { icon: "square_foot", labelKey: "map.listing.1.areaSize" },
    ],
    price: "2 400 000",
    priceUnitKey: "map.unit.month",
    pinLabel: "2.4M FCFA",
    priceValue: 2_400_000,
    top: "28%",
    left: "64%",
    badgeKey: "map.badge.vr",
    badgeIcon: "view_in_ar",
    ribbonKey: null,
    popupBadgeKey: null,
    image: "/images/search/property-01.jpg",
    imageAltKey: "map.listing.1.imageAlt",
  },
  {
    id: "pin-2",
    nameKey: "map.listing.2.name",
    areaKey: "map.listing.2.area",
    addressKey: "map.listing.2.address",
    categoryLabelKey: "map.listing.2.category",
    category: "apartment",
    icon: "apartment",
    specs: [
      { icon: "bed", labelKey: "map.listing.2.beds" },
      { icon: "square_foot", labelKey: "map.listing.2.areaSize" },
    ],
    price: "1 800 000",
    priceUnitKey: "map.unit.month",
    pinLabel: "1.8M FCFA",
    priceValue: 1_800_000,
    top: "36%",
    left: "34%",
    badgeKey: "map.badge.vr",
    badgeIcon: "view_in_ar",
    ribbonKey: "map.listing.2.ribbon",
    popupBadgeKey: "map.listing.2.popupBadge",
    image: "/images/hotels/hotel-02.jpg",
    imageAltKey: "map.listing.2.imageAlt",
  },
  {
    id: "pin-3",
    nameKey: "map.listing.3.name",
    areaKey: "map.listing.3.area",
    addressKey: "map.listing.3.address",
    categoryLabelKey: "map.listing.3.category",
    category: "coworking",
    icon: "domain",
    specs: [
      { icon: "desk", labelKey: "map.listing.3.desks" },
      { icon: "speed", labelKey: "map.listing.3.fiber" },
    ],
    price: "450 000",
    priceUnitKey: "map.unit.month",
    pinLabel: "450k FCFA",
    priceValue: 450_000,
    top: "68%",
    left: "62%",
    badgeKey: "map.badge.flex",
    badgeIcon: "domain",
    ribbonKey: null,
    popupBadgeKey: null,
    image: "/images/rentals/space-02.jpg",
    imageAltKey: "map.listing.3.imageAlt",
  },
  {
    id: "pin-4",
    nameKey: "map.listing.4.name",
    areaKey: "map.listing.4.area",
    addressKey: "map.listing.4.address",
    categoryLabelKey: "map.listing.4.category",
    category: "hotel",
    icon: "hotel",
    specs: [
      { icon: "king_bed", labelKey: "map.listing.4.room" },
      { icon: "restaurant", labelKey: "map.listing.4.breakfast" },
    ],
    price: "85 000",
    priceUnitKey: "map.unit.night",
    pinLabel: "85k FCFA/n",
    priceValue: 85_000,
    top: "75%",
    left: "78%",
    badgeKey: "map.badge.nightly",
    badgeIcon: "hotel",
    ribbonKey: null,
    popupBadgeKey: null,
    image: "/images/hotels/hotel-01.jpg",
    imageAltKey: "map.listing.4.imageAlt",
  },
  {
    id: "pin-5",
    nameKey: "map.listing.5.name",
    areaKey: "map.listing.5.area",
    addressKey: "map.listing.5.address",
    categoryLabelKey: "map.listing.5.category",
    category: "villa",
    icon: "apartment",
    specs: [
      { icon: "bed", labelKey: "map.listing.5.beds" },
      { icon: "square_foot", labelKey: "map.listing.5.areaSize" },
    ],
    price: "1 350 000",
    priceUnitKey: "map.unit.month",
    pinLabel: "1.35M FCFA",
    priceValue: 1_350_000,
    top: "21%",
    left: "53%",
    badgeKey: "map.badge.vr",
    badgeIcon: null,
    ribbonKey: null,
    popupBadgeKey: null,
    image: "/images/search/property-03.jpg",
    imageAltKey: "map.listing.5.imageAlt",
  },
];

/** Category filter pills. Order matches the reference. */
export const MAP_CATEGORIES: { value: MapCategory; labelKey: string }[] = [
  { value: "all", labelKey: "map.filter.all" },
  { value: "villa", labelKey: "map.filter.villa" },
  { value: "apartment", labelKey: "map.filter.apartment" },
  { value: "coworking", labelKey: "map.filter.coworking" },
  { value: "hotel", labelKey: "map.filter.hotel" },
];

/** The "+18" / "+9" density clusters from the reference. */
export const MAP_CLUSTERS: { count: number; top: string; left: string; sizeClass: string; labelKey: string }[] = [
  { count: 18, top: "16%", left: "81%", sizeClass: "w-11 h-11", labelKey: "map.cluster.riviera" },
  { count: 9, top: "82%", left: "45%", sizeClass: "w-10 h-10", labelKey: "map.cluster.zone3" },
];

/** Slider bounds, matching the reference's `min` / `max` / `step`. */
export const MAP_RENT = { min: 300_000, max: 6_000_000, step: 100_000, defaultMax: 3_500_000 } as const;

/** The reference's "142 Properties in visible area" headline. */
export const MAP_TOTAL = 142;

/** The reference's subtitle under the counter. */
export const MAP_AREA_KEY = "map.areaSummary";

/** Districts shown as chips over the map, plus the reference's viewport label. */
export const MAP_DISTRICT_KEYS = [
  "map.district.cocody",
  "map.district.plateau",
  "map.district.marcory",
  "map.district.bietry",
  "map.district.treichville",
  "map.district.lagoon",
] as const;

/** Base viewBox of the ported SVG, which zoom scales about its centre. */
export const MAP_VIEWBOX = { width: 1200, height: 900 } as const;

/** Zoom bounds: 1 is the reference's framing, 2.2 is roughly street-block level. */
export const MAP_ZOOM = { min: 1, max: 2.2, step: 0.2 } as const;

/**
 * Controls the reference draws but that have nothing to act on: the base map is
 * a static vector, so there is no tile layer to switch, no geolocation to
 * recentre against, and no 3D geometry to tilt. Exported so the inert set is
 * explicit and reviewable rather than scattered through the JSX, and so
 * `context/sitemap.md` can list exactly what does not work yet.
 */
export const MAP_INERT_CONTROLS = [
  "satellite / map mode",
  "recentre on my location",
  "3D navigation view",
  "search as I move the map",
] as const;
