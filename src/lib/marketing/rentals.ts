/**
 * Static content for the public coworking / flexible rentals page, ported from
 * the Stitch reference screen "Flexible Rentals & Coworking - Annorent".
 *
 * The category chips and billing toggle are the page's only client islands;
 * everything else is a server component.
 */

import type { IconLabel, Pagination, SortOption } from "./types";

export type WorkspaceCard = {
  id: string;
  image: string;
  imageAlt: string;
  /** "Plateau, Abidjan • Coworking Space" — city, district, and space type. */
  locationKey: string;
  nameKey: string;
  descriptionKey: string;
  rating: string;
  reviews: number;
  /** i18n key for the availability line, e.g. "Available now". */
  availabilityKey: string;
  /** Second, more specific availability line Stitch shows above the location. */
  slotKey: string;
  /** Pill in the corner: "Available Now", "B2B Certified". */
  badgeKey: string;
  amenities: IconLabel[];
  /** Two price tiers, e.g. a day rate and a full-month rate. */
  prices: Array<{ labelKey: string; amount: string }>;
  /** Some cards expose "View Space" instead of "Book a Slot". */
  ctaKey: string;
};

export const RENTALS_CATEGORIES = [
  "rentals.categories.all",
  "rentals.categories.studios",
  "rentals.categories.desks",
  "rentals.categories.offices",
  "rentals.categories.meeting",
  "rentals.categories.events",
] as const;

export const RENTALS_BILLING = ["rentals.billing.hourly", "rentals.billing.daily", "rentals.billing.monthly"] as const;

export const RENTALS_SORT_OPTIONS: SortOption[] = [
  { labelKey: "rentals.sort.earliest", value: "earliest" },
  { labelKey: "rentals.sort.priceAsc", value: "price-asc" },
  { labelKey: "rentals.sort.rating", value: "rating" },
  { labelKey: "rentals.sort.fiber", value: "fiber" },
];

export const RENTALS_CARDS: WorkspaceCard[] = [
  {
    id: "WS-ABJ-01",
    image: "/images/rentals/space-01.jpg",
    imageAlt:
      "Premium open-plan coworking space interior with exposed architectural finishes in navy and emerald green accents, rows of desks, and floor-to-ceiling glazing.",
    locationKey: "rentals.cards.01.location",
    nameKey: "rentals.cards.01.name",
    descriptionKey: "rentals.cards.01.description",
    rating: "4.9",
    reviews: 42,
    availabilityKey: "rentals.availability.now",
    slotKey: "rentals.cards.01.slot",
    badgeKey: "rentals.availability.now",
    amenities: [
      { icon: "speed", label: "300 Mbps Fiber" },
      { icon: "coffee", label: "Cafe & Lounge" },
      { icon: "ac_unit", label: "Air Conditioning" },
      { icon: "schedule", label: "24/7 Access" },
    ],
    prices: [
      { labelKey: "rentals.price.day", amount: "15,000 FCFA" },
      { labelKey: "rentals.price.month", amount: "180,000 FCFA" },
    ],
    ctaKey: "rentals.cta.book",
  },
  {
    id: "WS-DKR-02",
    image: "/images/rentals/space-02.jpg",
    imageAlt:
      "Executive private office with floor-to-ceiling glass wall looking onto an ocean-view terrace, executive desk, and warm natural light.",
    locationKey: "rentals.cards.02.location",
    nameKey: "rentals.cards.02.name",
    descriptionKey: "rentals.cards.02.description",
    rating: "5.0",
    reviews: 19,
    availabilityKey: "rentals.availability.now",
    slotKey: "rentals.cards.02.slot",
    badgeKey: "rentals.badge.b2b",
    amenities: [
      { icon: "speed", label: "500 Mbps Fiber" },
      { icon: "fingerprint", label: "24/7 Access" },
      { icon: "local_parking", label: "2 Parking Spots" },
      { icon: "tv", label: '65" Smart TV' },
    ],
    prices: [
      { labelKey: "rentals.price.day", amount: "35,000 FCFA" },
      { labelKey: "rentals.price.month", amount: "520,000 FCFA" },
    ],
    ctaKey: "rentals.cta.view",
  },
  {
    id: "WS-ABJ-03",
    image: "/images/rentals/space-03.jpg",
    imageAlt:
      "Serviced studio with an ergonomic sit-stand desk, Herman Miller chair, large windows, and sliding doors leading to a private balcony.",
    locationKey: "rentals.cards.03.location",
    nameKey: "rentals.cards.03.name",
    descriptionKey: "rentals.cards.03.description",
    rating: "4.8",
    reviews: 34,
    availabilityKey: "rentals.availability.now",
    slotKey: "rentals.cards.03.slot",
    badgeKey: "rentals.availability.now",
    amenities: [
      { icon: "wifi", label: "200 Mbps Fiber" },
      { icon: "local_laundry_service", label: "Laundry" },
      { icon: "ac_unit", label: "Air Conditioning" },
      { icon: "security", label: "24/7 Security" },
    ],
    prices: [
      { labelKey: "rentals.price.day", amount: "25,000 FCFA" },
      { labelKey: "rentals.price.month", amount: "350,000 FCFA" },
    ],
    ctaKey: "rentals.cta.book",
  },
  {
    id: "WS-KGL-04",
    image: "/images/rentals/space-04.jpg",
    imageAlt:
      "Boardroom with a long conference table, acoustic paneling, and clean architectural lighting, set for a sixteen-person video conference.",
    locationKey: "rentals.cards.04.location",
    nameKey: "rentals.cards.04.name",
    descriptionKey: "rentals.cards.04.description",
    rating: "4.95",
    reviews: 51,
    availabilityKey: "rentals.availability.now",
    slotKey: "rentals.cards.04.slot",
    badgeKey: "rentals.availability.now",
    amenities: [
      { icon: "videocam", label: "4K Video Conference" },
      { icon: "speed", label: "1 Gbps Fiber" },
      { icon: "podium", label: '85" Interactive Screen' },
      { icon: "local_cafe", label: "Catering Break" },
    ],
    prices: [
      { labelKey: "rentals.price.hourly", amount: "12,000 FCFA" },
      { labelKey: "rentals.price.day", amount: "85,000 FCFA" },
    ],
    ctaKey: "rentals.cta.book",
  },
  {
    id: "WS-DLA-05",
    image: "/images/rentals/space-05.jpg",
    imageAlt:
      "Event villa with wide sunlit living rooms set up for media productions, modular staging, and large sliding doors opening onto a garden.",
    locationKey: "rentals.cards.05.location",
    nameKey: "rentals.cards.05.name",
    descriptionKey: "rentals.cards.05.description",
    rating: "4.88",
    reviews: 27,
    availabilityKey: "rentals.availability.now",
    slotKey: "rentals.cards.05.slot",
    badgeKey: "rentals.availability.now",
    amenities: [
      { icon: "power", label: "Backup Generator" },
      { icon: "pool", label: "Pool & Garden" },
      { icon: "local_parking", label: "8 Vehicle Parking" },
      { icon: "wifi", label: "200 Mbps Fiber" },
    ],
    prices: [
      { labelKey: "rentals.price.day", amount: "85,000 FCFA" },
      { labelKey: "rentals.price.week", amount: "450,000 FCFA" },
    ],
    ctaKey: "rentals.cta.view",
  },
  {
    id: "WS-COT-06",
    image: "/images/rentals/space-06.jpg",
    imageAlt:
      "Agile team office with whiteboard walls, warm African textile upholstery, and eight electric sit-stand desks around a shared table.",
    locationKey: "rentals.cards.06.location",
    nameKey: "rentals.cards.06.name",
    descriptionKey: "rentals.cards.06.description",
    rating: "4.79",
    reviews: 31,
    availabilityKey: "rentals.availability.now",
    slotKey: "rentals.cards.06.slot",
    badgeKey: "rentals.availability.now",
    amenities: [
      { icon: "wifi", label: "200 Mbps Fiber" },
      { icon: "print", label: "Print Hub Included" },
      { icon: "ac_unit", label: "Air Conditioning" },
      { icon: "key", label: "24/7 Access" },
    ],
    prices: [
      { labelKey: "rentals.price.day", amount: "28,000 FCFA" },
      { labelKey: "rentals.price.month", amount: "390,000 FCFA" },
    ],
    ctaKey: "rentals.cta.book",
  },
];

export const RENTALS_PAGINATION: Pagination = {
  showingRangeKey: "rentals.pagination.showing",
  totalNounKey: "rentals.pagination.totalNoun",
  page: 1,
  totalPages: 11,
  pages: [1, 2, 3],
  truncated: true,
};

export const RENTALS_VIEW_OPTIONS = [12, 24, 48];
