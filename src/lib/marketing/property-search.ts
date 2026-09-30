/**
 * Static content for the public property search page, ported from the Stitch
 * reference screen "Property Search - Annorent".
 *
 * Static for the same reason as the home page's data: the design is the source
 * of truth and the API is not running here. The shapes mirror a real
 * `/properties` response, so swapping in a fetch touches only this file.
 *
 * Filter options carry i18n keys rather than literal labels so the panel is
 * translatable; counts and pre-ticked state are data, not copy.
 */

import type { ActiveFilter, Assurance, FilterGroup, Pagination, SortOption } from "./types";

export type SearchCard = {
  id: string;
  /** Path under `public/images/search/`. */
  image: string;
  /** Full-sentence description, carried from the Stitch `data-alt`. */
  imageAlt: string;
  /** Uppercase neighborhood label in primary. */
  locationKey: string;
  /** Right-aligned listing type, e.g. "Duplex Villa". */
  typeKey: string;
  titleKey: string;
  /** Beds / baths / area, in the order Stitch lists them. */
  specs: Array<{ icon: string; label: string }>;
  /** The three short amenity chips under the spec row. */
  highlights: string[];
  /** Monthly rent, pre-formatted with thin spaces as Stitch renders them. */
  price: string;
  currencyKey: string;
  /** Stitch shows a short code under the price on some cards. */
  priceCode?: string;
  /** Fills the "Exclusive" ribbon on the first card only. */
  exclusive?: boolean;
};

/** The `/properties` listing type, kept here so the detail page can reuse it. */
export type PropertyTypeFilter = {
  labelKey: string;
  count: number;
  defaultSelected: boolean;
};

export const SEARCH_ASSURANCES: Assurance[] = [
  {
    icon: "verified_user",
    titleKey: "search.assurance.auditedTitle",
    bodyKey: "search.assurance.auditedBody",
  },
];

export const SEARCH_ACTIVE_FILTERS: ActiveFilter[] = [
  {
    labelKey: "search.filters.active.cocody",
    removeLabelKey: "search.filters.active.removeCocody",
  },
  {
    labelKey: "search.filters.active.price",
    removeLabelKey: "search.filters.active.removePrice",
  },
  {
    labelKey: "search.filters.active.beds",
    removeLabelKey: "search.filters.active.removeBeds",
  },
  {
    labelKey: "search.filters.active.verified",
    removeLabelKey: "search.filters.active.removeVerified",
    tone: "tertiary",
  },
];

export const SEARCH_SORT_OPTIONS: SortOption[] = [
  { labelKey: "search.sort.relevance", value: "relevance" },
  { labelKey: "search.sort.priceAsc", value: "price-asc" },
  { labelKey: "search.sort.priceDesc", value: "price-desc" },
  { labelKey: "search.sort.recent", value: "recent" },
  { labelKey: "search.sort.area", value: "area" },
];

export const SEARCH_FILTER_GROUPS: FilterGroup[] = [
  {
    titleKey: "search.filters.budget",
    control: "options",
    options: [],
  },
  {
    titleKey: "search.filters.type",
    control: "options",
    options: [
      { labelKey: "search.filters.type.detachedVilla", count: 64, defaultSelected: true },
      { labelKey: "search.filters.type.luxuryApartment", count: 112, defaultSelected: true },
      { labelKey: "search.filters.type.duplex", count: 38, defaultSelected: false },
      { labelKey: "search.filters.type.penthouse", count: 19, defaultSelected: false },
      { labelKey: "search.filters.type.landPlot", count: 15, defaultSelected: false },
    ],
  },
  {
    titleKey: "search.filters.bedrooms",
    control: "chips",
    options: [
      { labelKey: "search.filters.bedrooms.studio", defaultSelected: false },
      { labelKey: "search.filters.bedrooms.one", defaultSelected: false },
      { labelKey: "search.filters.bedrooms.two", defaultSelected: false },
      { labelKey: "search.filters.bedrooms.three", defaultSelected: true },
      { labelKey: "search.filters.bedrooms.four", defaultSelected: false },
      { labelKey: "search.filters.bedrooms.fivePlus", defaultSelected: false },
    ],
  },
  {
    titleKey: "search.filters.neighborhoods",
    control: "options",
    options: [
      { labelKey: "search.filters.neighborhoods.cocody", defaultSelected: true },
      { labelKey: "search.filters.neighborhoods.marcory", defaultSelected: true },
      { labelKey: "search.filters.neighborhoods.plateau", defaultSelected: false },
      { labelKey: "search.filters.neighborhoods.riviera", defaultSelected: false },
      { labelKey: "search.filters.neighborhoods.almadies", defaultSelected: false },
    ],
  },
  {
    titleKey: "search.filters.amenities",
    control: "options",
    options: [
      { labelKey: "search.filters.amenities.vr", icon: "view_in_ar", defaultSelected: true },
      { labelKey: "search.filters.amenities.generator", icon: "power", defaultSelected: true },
      { labelKey: "search.filters.amenities.security", icon: "shield", defaultSelected: false },
      { labelKey: "search.filters.amenities.pool", icon: "pool", defaultSelected: false },
      { labelKey: "search.filters.amenities.ac", icon: "ac_unit", defaultSelected: false },
      { labelKey: "search.filters.amenities.fiber", icon: "wifi", defaultSelected: false },
    ],
  },
];

export const SEARCH_CARDS: SearchCard[] = [
  {
    id: "AN-CI-1041",
    image: "/images/search/property-01.jpg",
    imageAlt:
      "A modern luxury duplex villa in Cocody Abidjan with large glass windows, lush tropical palm trees in the front yard, ambient evening warm architectural lighting, and refined African contemporary finishes.",
    locationKey: "search.cards.01.location",
    typeKey: "search.cards.01.type",
    titleKey: "search.cards.01.title",
    specs: [
      { icon: "bed", label: "4 beds" },
      { icon: "bathtub", label: "3 baths" },
      { icon: "square_foot", label: "320 m²" },
    ],
    highlights: ["60kVA Generator", "Private Pool", "Pro Fiber"],
    price: "1 850 000",
    currencyKey: "search.currency.fcfa",
    exclusive: true,
  },
  {
    id: "AN-CI-1042",
    image: "/images/search/property-02.jpg",
    imageAlt:
      "Interior of an ultra modern penthouse in Marcory Zone 4 featuring floor-to-ceiling glass, a private terrace overlooking the lagoon, and premium contemporary furnishings.",
    locationKey: "search.cards.02.location",
    typeKey: "search.cards.02.type",
    titleKey: "search.cards.02.title",
    specs: [
      { icon: "bed", label: "3 beds" },
      { icon: "bathtub", label: "3 baths" },
      { icon: "square_foot", label: "245 m²" },
    ],
    highlights: ["60m² Terrace", "Private Elevator", "24/7 Security"],
    price: "2 400 000",
    currencyKey: "search.currency.fcfa",
  },
  {
    id: "AN-CI-1043",
    image: "/images/search/property-03.jpg",
    imageAlt:
      "High end luxury residence in Riviera Golf Abidjan, contemporary facade with a manicured green courtyard, infinity pool, and warm evening lighting.",
    locationKey: "search.cards.03.location",
    typeKey: "search.cards.03.type",
    titleKey: "search.cards.03.title",
    specs: [
      { icon: "bed", label: "3 beds" },
      { icon: "bathtub", label: "2 baths" },
      { icon: "square_foot", label: "180 m²" },
    ],
    highlights: ["Private Garden", "Daikin AC", "Biometric Security"],
    price: "1 300 000",
    currencyKey: "search.currency.fcfa",
  },
  {
    id: "AN-CI-1044",
    image: "/images/search/property-04.jpg",
    imageAlt:
      "Executive duplex apartment in Plateau business district Abidjan, floor-to-ceiling windows with skyline views, bespoke joinery, and a private study.",
    locationKey: "search.cards.04.location",
    typeKey: "search.cards.04.type",
    titleKey: "search.cards.04.title",
    specs: [
      { icon: "bed", label: "2 beds" },
      { icon: "bathtub", label: "2 baths" },
      { icon: "square_foot", label: "140 m²" },
    ],
    highlights: ["Near Bank HQs", "100kVA Generator", "Concierge Service"],
    price: "1 600 000",
    currencyKey: "search.currency.fcfa",
  },
  {
    id: "AN-CI-1045",
    image: "/images/search/property-05.jpg",
    imageAlt:
      "Stunning modern waterfront mansion villa in Cocody Danga with infinity pool overlooking the lagoon, cantilevered terraces, and evening architectural lighting.",
    locationKey: "search.cards.05.location",
    typeKey: "search.cards.05.type",
    titleKey: "search.cards.05.title",
    specs: [
      { icon: "bed", label: "5 beds" },
      { icon: "bathtub", label: "5 baths" },
      { icon: "square_foot", label: "520 m²" },
    ],
    highlights: ["Private Pontoon Access", "Double Garage", "Staff Quarters"],
    price: "3 200 000",
    currencyKey: "search.currency.fcfa",
  },
  {
    id: "AN-CI-1046",
    image: "/images/search/property-06.jpg",
    imageAlt:
      "Modern minimalist furnished loft in Marcory Biétry Abidjan with double-height ceilings, black steel-framed glazing, and designer furniture.",
    locationKey: "search.cards.06.location",
    typeKey: "search.cards.06.type",
    titleKey: "search.cards.06.title",
    specs: [
      { icon: "bed", label: "2 beds" },
      { icon: "bathtub", label: "2 baths" },
      { icon: "square_foot", label: "165 m²" },
    ],
    highlights: ["Roche Bobois Furniture", "1Gbps Fiber", "Rooftop Pool"],
    price: "1 950 000",
    currencyKey: "search.currency.fcfa",
  },
];

export const SEARCH_DISTRICT_MAP = {
  image: "/images/search/districts-map.png",
  imageAltKey: "search.map.imageAlt",
  /** Counts Stitch pins onto the static map preview. */
  pins: [
    { labelKey: "search.map.pin.cocody", count: 84 },
    { labelKey: "search.map.pin.marcory", count: 42 },
    { labelKey: "search.map.pin.plateau", count: 27 },
  ],
} as const;

export const SEARCH_PAGINATION: Pagination = {
  showingRangeKey: "search.pagination.showing",
  totalNounKey: "search.pagination.totalNoun",
  page: 1,
  totalPages: 12,
  pages: [1, 2, 3],
  truncated: true,
};
