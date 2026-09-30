/**
 * Static marketing content for the home page, ported from the Stitch reference
 * screen "Home - Annorent Marketplace".
 *
 * This is deliberately a plain data module rather than an API call: the design
 * is the source of truth for the marketing surface, and the API is not running
 * in this environment. The shapes here mirror what a real endpoint would return
 * so swapping in a fetch is a change to this file alone — see
 * `context/api-reference.md` before wiring it.
 *
 * Images are self-hosted under `public/images/listings/` rather than hotlinked
 * from Stitch's CDN, so the page makes no third-party request on load.
 */

/** A short icon + label pair rendered as a pill or a spec row. */
export type ListingSpec = {
  /** Material Symbols ligature name. */
  icon: string;
  label: string;
};

/**
 * Badge pinned to the card image. `tone` maps to the Stitch variants:
 * `neutral` for the properties listing-type chip, `primary` for the first
 * rental's capacity chip, `secondary` and `tertiary` for the remaining rentals,
 * and `tertiaryContainer` for hotels' instant-booking pill.
 */
export type CardBadge = {
  label: string;
  tone: "neutral" | "primary" | "secondary" | "tertiary" | "tertiaryContainer";
};

export type Listing = {
  id: string;
  /** Path under `public/images/listings/`. */
  image: string;
  /** Full-sentence image description, carried from the Stitch `data-alt`. */
  imageAlt: string;
  title: string;
  /** Neighborhood, city and country, already formatted for display. */
  location: string;
  /** Price with its currency, e.g. "2 800 000 FCFA". */
  price: string;
  /** Period suffix, e.g. "month", "night". Empty when the price is a one-off. */
  pricePeriod: string;
  /**
   * Trailing note on the price row. Properties show a reference code, rentals a
   * connectivity perk, hotels an availability check. Empty when unused.
   */
  priceNote: string;
  /** Properties only — a 3D tour chip plus a verified chip. */
  hasVirtualTour?: boolean;
  verified?: boolean;
  /** Hotels only — star rating and review count. */
  rating?: { value: string; reviews: number };
  /** Hotels only — whether the price row shows a filled check icon. */
  priceNoteIcon?: string;
  badge?: CardBadge;
  /** Small availability note under the image, rentals only. */
  availability?: string;
  /** Property spec row (beds, baths, area, …). */
  specs?: ListingSpec[];
  /** Pill-style spec row (meeting rooms, buffet, …). */
  amenities?: ListingSpec[];
};

/** A heading block that introduces a grid of listings. */
export type ListingSection = {
  /** Small uppercase label above the heading. */
  kicker?: string;
  /** i18n key into the `marketing` namespace. */
  titleKey: string;
  /** i18n key into the `marketing` namespace. */
  bodyKey: string;
  /** i18n key for the "view all" link text. */
  linkLabelKey: string;
  /** Route the "view all" link points at, already locale-prefixed. */
  linkHref: string;
  listings: ReadonlyArray<Listing>;
};

export const PROPERTY_SECTION = {
  kicker: "LUXURY RESIDENTIAL",
  titleKey: "home.properties.title",
  bodyKey: "home.properties.body",
  linkLabelKey: "home.properties.linkAll",
  linkHref: "/properties",
  listings: [
    {
      id: "AN-CI-882",
      image: "/images/listings/properties-01.jpg",
      imageAlt:
        "High-end modern villa in Cocody Ambassades with large swimming pool, manicured exotic garden, architectural wooden louvers, and warm dusk lighting.",
      title: "Villa Contemporaine Les Palmes",
      location: "Cocody Ambassades, Abidjan • Côte d'Ivoire",
      price: "2 800 000 FCFA",
      pricePeriod: "month",
      priceNote: "Ref: AN-CI-882",
      hasVirtualTour: true,
      verified: true,
      badge: { label: "Furnished Rental", tone: "neutral" },
      specs: [
        { icon: "bed", label: "5 Beds" },
        { icon: "bathtub", label: "6 Baths" },
        { icon: "square_foot", label: "620 m²" },
        { icon: "pool", label: "Swimming Pool" },
      ],
    },
    {
      id: "AN-SN-410",
      image: "/images/listings/properties-02.jpg",
      imageAlt:
        "Luxurious beachfront penthouse apartment in Almadies Dakar overlooking the Atlantic ocean with huge sunset terrace and floor-to-ceiling glass.",
      title: "Penthouse Vue Mer Panoramique",
      location: "Les Almadies, Dakar • Senegal",
      price: "420 000 000 FCFA",
      pricePeriod: "",
      priceNote: "Ref: AN-SN-410",
      hasVirtualTour: true,
      verified: true,
      badge: { label: "Exclusive Sale", tone: "neutral" },
      specs: [
        { icon: "bed", label: "4 Beds" },
        { icon: "bathtub", label: "4 Baths" },
        { icon: "square_foot", label: "380 m²" },
        { icon: "water", label: "Seafront" },
      ],
    },
    {
      id: "AN-CM-102",
      image: "/images/listings/properties-03.jpg",
      imageAlt:
        "Modern architect villa in Bonapriso Douala with geometric concrete facades, lush tropical foliage, double-height living room windows and minimalist outdoor lighting.",
      title: "Résidence Architecturale Bonapriso",
      location: "Bonapriso, Douala • Cameroon",
      price: "1 950 000 FCFA",
      pricePeriod: "month",
      priceNote: "Ref: AN-CM-102",
      hasVirtualTour: true,
      verified: true,
      badge: { label: "Long-Term Rental", tone: "neutral" },
      specs: [
        { icon: "bed", label: "4 Beds" },
        { icon: "bathtub", label: "3 Baths" },
        { icon: "square_foot", label: "450 m²" },
        { icon: "security", label: "24/7 Security" },
      ],
    },
  ],
} as const satisfies ListingSection;

export const RENTAL_SECTION = {
  titleKey: "home.rentals.title",
  bodyKey: "home.rentals.body",
  linkLabelKey: "home.rentals.linkAll",
  linkHref: "/rentals",
  listings: [
    {
      id: "plateau-suite-c",
      image: "/images/listings/rentals-01.jpg",
      imageAlt:
        "High-end corporate executive office suite in Plateau Abidjan business district with ergonomic chairs, glass partitions, and skyline city views.",
      title: "Plateau Corporate Hub - Suite C",
      location: "Le Plateau, Abidjan • Climate control & backup generator",
      price: "1 250 000 FCFA",
      pricePeriod: "month",
      priceNote: "500 Mbps Fiber",
      badge: { label: "Team Office 10-15 desks", tone: "primary" },
      availability: "Available this Monday",
      amenities: [
        { icon: "meeting_room", label: "2 Meeting Rooms" },
        { icon: "coffee", label: "Barista Coffee" },
        { icon: "print", label: "Print & Mail" },
      ],
    },
    {
      id: "kigali-campus",
      image: "/images/listings/rentals-02.jpg",
      imageAlt:
        "Vibrant tech coworking space in Kigali innovation city with open wood desks, green plant dividers, beanbags, and entrepreneurs collaborating.",
      title: "Silicon Kigali Innovation Campus",
      location: "Kacyiru, Kigali • Investor community hub",
      price: "140 000 FCFA",
      pricePeriod: "month",
      priceNote: "Flex Pass",
      badge: { label: "Dedicated Desk / Nomad", tone: "secondary" },
      availability: "24/7 Access",
      amenities: [
        { icon: "wifi", label: "1 Gbps Fiber" },
        { icon: "podcasts", label: "Podcast Studio" },
        { icon: "lock", label: "Secure Locker" },
      ],
    },
    {
      id: "akwa-studio",
      image: "/images/listings/rentals-03.jpg",
      imageAlt:
        "Chic studio apartment and work-from-home loft in Akwa Douala with modern desk setup, sleek kitchen, and designer furniture.",
      title: "Studio Design Nomad Akwa",
      location: "Akwa Centre, Douala • Bi-weekly cleaning service",
      price: "550 000 FCFA",
      pricePeriod: "month",
      priceNote: "Utilities included",
      badge: { label: "Live & Work Studio", tone: "tertiary" },
      availability: "Turnkey",
      amenities: [
        { icon: "desk", label: "Ergonomic WFH" },
        { icon: "local_laundry_service", label: "Laundry Room" },
        { icon: "fitness_center", label: "Gym Club" },
      ],
    },
  ],
} as const satisfies ListingSection;

export const HOTEL_SECTION = {
  kicker: "LUXURY HOSPITALITY",
  titleKey: "home.hotels.title",
  bodyKey: "home.hotels.body",
  linkLabelKey: "home.hotels.linkAll",
  linkHref: "/hotels",
  listings: [
    {
      id: "reserve-suites-spa",
      image: "/images/listings/hotels-01.jpg",
      imageAlt:
        "Boutique luxury hotel suite in Abidjan Marcory with plush king bed, marble bathroom, African bronze artwork, and mood lighting.",
      title: "La Réserve Suites & Spa 5★",
      location: "Marcory Zone 4, Abidjan • Airport transfer included",
      price: "165 000 FCFA",
      pricePeriod: "night",
      priceNote: "Available tonight",
      priceNoteIcon: "check_circle",
      rating: { value: "4.96", reviews: 142 },
      badge: { label: "Instant Booking", tone: "tertiaryContainer" },
      amenities: [
        { icon: "restaurant", label: "Buffet breakfast" },
        { icon: "spa", label: "Spa & Hammam" },
      ],
    },
    {
      id: "oceanique-ngor",
      image: "/images/listings/hotels-02.jpg",
      imageAlt:
        "Oceanfront luxury resort apartment hotel in Dakar Ngor with infinity pool looking over the Atlantic bay, sunbeds, and whitewashed architecture.",
      title: "Résidence Océanique Ngor Bay",
      location: "Ngor Island Front, Dakar • Valet parking & concierge",
      price: "190 000 FCFA",
      pricePeriod: "night",
      priceNote: "Available tonight",
      priceNoteIcon: "check_circle",
      rating: { value: "4.92", reviews: 98 },
      badge: { label: "Instant Booking", tone: "tertiaryContainer" },
      amenities: [
        { icon: "pool", label: "Infinity Pool" },
        { icon: "room_service", label: "Room Service 24h" },
      ],
    },
    {
      id: "marina-palace",
      image: "/images/listings/hotels-03.jpg",
      imageAlt:
        "Modern executive suite in Cotonou Marina district with balcony overlooking the Gulf of Guinea, contemporary wood paneling, and curated art.",
      title: "Marina Palace Executive Suites",
      location: "Haie Vive, Cotonou • Dedicated business center",
      price: "110 000 FCFA",
      pricePeriod: "night",
      priceNote: "Available tonight",
      priceNoteIcon: "check_circle",
      rating: { value: "4.89", reviews: 76 },
      badge: { label: "Instant Booking", tone: "tertiaryContainer" },
      amenities: [
        { icon: "vpn_lock", label: "Secured Network" },
        { icon: "local_bar", label: "Rooftop Lounge" },
      ],
    },
  ],
} as const satisfies ListingSection;

/**
 * The "explore by neighborhood" band. Stitch renders a static photograph behind
 * a gradient rather than an embedded map, so this stays a static image until a
 * real map provider is chosen.
 */
export const MAP_BAND = {
  image: "/images/listings/map-abidjan.png",
  imageAlt: "Street map of Abidjan, Ivory Coast, showing neighbourhood boundaries.",
  stats: [
    { value: "+1,420", labelKey: "home.map.statVerified" },
    { value: "98.4%", labelKey: "home.map.statCadastral" },
  ],
} as const;
