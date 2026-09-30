/**
 * Static content for the public hotels page, ported from the Stitch reference
 * screen "Hotels & Residences - Annorent".
 *
 * The destination picker, date/guest fields, and quick-filter chips are the
 * page's client islands; the cards themselves stay server-rendered.
 */

import type { Assurance, IconLabel, Pagination, SortOption } from "./types";

export type HotelCard = {
  id: string;
  image: string;
  imageAlt: string;
  /** Star rating, 1–5. Rendered as filled/half Material Symbols `star`s. */
  stars: number;
  /** Listing type line under the name, e.g. "5-Star Hotel". */
  categoryKey: string;
  nameKey: string;
  locationKey: string;
  rating: string;
  ratingLabelKey: string;
  reviews: number;
  reviewsLabelKey: string;
  perks: IconLabel[];
  /** "From 135 000 FCFA" — the rate and its cadence. */
  price: string;
  priceSuffixKey: string;
  priceNoteKey: string;
  /** Fills the discount pill, e.g. "Save 15%". */
  promoKey: string;
  ctaKey: string;
  ctaSubKey: string;
  verified?: boolean;
  hasTour?: boolean;
  instantBooking?: boolean;
};

export const HOTEL_DESTINATIONS = [
  "hotels.destinations.abidjan",
  "hotels.destinations.dakar",
  "hotels.destinations.kigali",
  "hotels.destinations.douala",
  "hotels.destinations.nairobi",
] as const;

export const HOTEL_QUICK_FILTERS: Array<{ labelKey: string; icon?: string }> = [
  { labelKey: "hotels.filters.fiveStars", icon: "hotel_class" },
  { labelKey: "hotels.filters.fourStars", icon: "hotel_class" },
  { labelKey: "hotels.filters.boutique", icon: "apartment" },
  { labelKey: "hotels.filters.pool", icon: "pool" },
  { labelKey: "hotels.filters.breakfast", icon: "free_breakfast" },
  { labelKey: "hotels.filters.shuttle", icon: "airport_shuttle" },
  { labelKey: "hotels.filters.lagoon", icon: "waves" },
];

export const HOTEL_SORT_OPTIONS: SortOption[] = [
  { labelKey: "hotels.sort.relevance", value: "relevance" },
  { labelKey: "hotels.sort.priceAsc", value: "price-asc" },
  { labelKey: "hotels.sort.priceDesc", value: "price-desc" },
  { labelKey: "hotels.sort.reviews", value: "reviews" },
];

export const HOTEL_ASSURANCES: Assurance[] = [
  {
    icon: "verified",
    titleKey: "hotels.assurance.inspectedTitle",
    bodyKey: "hotels.assurance.inspectedBody",
  },
  {
    icon: "view_in_ar",
    titleKey: "hotels.assurance.twinTitle",
    bodyKey: "hotels.assurance.twinBody",
  },
  {
    icon: "credit_card",
    titleKey: "hotels.assurance.currencyTitle",
    bodyKey: "hotels.assurance.currencyBody",
  },
];

export const HOTEL_CARDS: HotelCard[] = [
  {
    id: "HT-ABJ-01",
    image: "/images/hotels/hotel-01.jpg",
    imageAlt:
      "High-end African luxury hotel exterior with an infinity pool, palm-lined forecourt, and warm evening lighting at dusk.",
    stars: 5,
    categoryKey: "hotels.cards.01.category",
    nameKey: "hotels.cards.01.name",
    locationKey: "hotels.cards.01.location",
    rating: "4.9",
    ratingLabelKey: "hotels.rating.exceptional",
    reviews: 218,
    reviewsLabelKey: "hotels.reviews.verified",
    perks: [
      { icon: "check_circle", label: "Free cancellation (up to 48h)" },
      { icon: "restaurant", label: "Buffet breakfast included" },
      { icon: "wifi", label: "Fiber-optic Wi-Fi 300 Mbps" },
      { icon: "lock", label: "Hotel agreement escrowed by Annorent" },
    ],
    price: "135 000 FCFA",
    priceSuffixKey: "hotels.price.perNight",
    priceNoteKey: "hotels.price.allIncluded",
    promoKey: "hotels.promo.save15",
    ctaKey: "hotels.cta.book",
    ctaSubKey: "hotels.cta.roomTypes",
    instantBooking: true,
    hasTour: true,
  },
  {
    id: "HT-ABJ-02",
    image: "/images/hotels/hotel-02.jpg",
    imageAlt:
      "Modern boutique hotel executive room with floor-to-ceiling windows, a king bed, and warm wood and textile finishes.",
    stars: 4,
    categoryKey: "hotels.cards.02.category",
    nameKey: "hotels.cards.02.name",
    locationKey: "hotels.cards.02.location",
    rating: "4.8",
    ratingLabelKey: "hotels.rating.excellent",
    reviews: 142,
    reviewsLabelKey: "hotels.reviews.verified",
    perks: [
      { icon: "check_circle", label: "Free cancellation" },
      { icon: "airport_shuttle", label: "VIP Airport shuttle available" },
      { icon: "fitness_center", label: "24/7 Fitness Center" },
      { icon: "bolt", label: "Automatic confirmation within 12 seconds" },
    ],
    price: "85 000 FCFA",
    priceSuffixKey: "hotels.price.perNight",
    priceNoteKey: "hotels.price.allIncluded",
    promoKey: "hotels.promo.corporate",
    ctaKey: "hotels.cta.book",
    ctaSubKey: "hotels.cta.roomTypes",
    instantBooking: true,
    hasTour: true,
  },
  {
    id: "HT-ABJ-03",
    image: "/images/hotels/hotel-03.jpg",
    imageAlt:
      "Charming luxury tropical guest house villa with a manicured garden, private pool, and a covered terrace overlooking palms.",
    stars: 4,
    categoryKey: "hotels.cards.03.category",
    nameKey: "hotels.cards.03.name",
    locationKey: "hotels.cards.03.location",
    rating: "4.7",
    ratingLabelKey: "hotels.rating.highlyRated",
    reviews: 89,
    reviewsLabelKey: "hotels.reviews.business",
    perks: [
      { icon: "check_circle", label: "Free cancellation" },
      { icon: "pool", label: "Private outdoor pool" },
      { icon: "local_parking", label: "Free secure parking" },
      { icon: "format_image_left", label: "Annorent certified institutional host" },
    ],
    price: "60 000 FCFA",
    priceSuffixKey: "hotels.price.perNight",
    priceNoteKey: "hotels.price.utilitiesIncluded",
    promoKey: "hotels.promo.favorite",
    ctaKey: "hotels.cta.book",
    ctaSubKey: "hotels.cta.availability",
    verified: true,
    hasTour: true,
  },
];

export const HOTEL_GUARANTEE = {
  icon: "verified_user",
  titleKey: "hotels.guarantee.title",
  bodyKey: "hotels.guarantee.body",
  perks: [
    { icon: "gavel", labelKey: "hotels.guarantee.regulated" },
    { icon: "support_agent", labelKey: "hotels.guarantee.concierge" },
  ],
} as const;

export const HOTEL_PAGINATION: Pagination = {
  showingRangeKey: "hotels.pagination.showing",
  totalNounKey: "hotels.pagination.totalNoun",
  page: 1,
  totalPages: 13,
  pages: [1, 2, 3],
  truncated: true,
};
