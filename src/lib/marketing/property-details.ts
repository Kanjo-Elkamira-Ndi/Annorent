/**
 * Static content for the public property detail page, ported from the Stitch
 * reference screen "Property Details - Villa Cocody - Annorent".
 *
 * One property is modelled, matching the single reference screen. A real
 * implementation resolves `[id]` to this same shape server-side, so the page
 * component and every card below it are already id-agnostic.
 */

import type { IconLabel } from "./types";

export type GalleryImage = {
  /** Path under `public/images/details/`. */
  src: string;
  /** Full-sentence description, carried from the Stitch `data-alt`. */
  alt: string;
  /** Caption chip. The hero carries none — Stitch labels only the thumbs. */
  captionKey?: string;
};

export type Amenity = IconLabel & { noteKey: string };

export type PriceLine = {
  labelKey: string;
  amount: string;
  /** Marks the total row, which Stitch renders emphasised with a top rule. */
  emphasis?: boolean;
  /** Renders the `info` glyph Stitch puts beside the deposit row. */
  note?: boolean;
};

export type DetailSpec = {
  icon: string;
  value: string;
  labelKey: string;
};

/**
 * One breadcrumb segment. `href` is absent on the final segment, which renders
 * as `aria-current="page"` rather than a link.
 */
export type Breadcrumb = {
  labelKey: string;
  href?: string;
};

export const DETAIL_BREADCRUMB: readonly Breadcrumb[] = [
  { labelKey: "details.breadcrumb.realEstate", href: "/properties" },
  { labelKey: "details.breadcrumb.abidjan", href: "/properties" },
  { labelKey: "details.breadcrumb.cocody", href: "/properties" },
  { labelKey: "details.breadcrumb.villa" },
];

export const DETAIL_HERO = {
  image: "/images/details/villa-01.jpg",
  imageAlt:
    "Luxurious contemporary tropical villa facade in Cocody Abidjan with infinity pool reflections, floor-to-ceiling glass windows, lush palm trees, warm golden hour architectural lighting, and manicured tropical landscaping.",
  photoCount: 24,
} as const;

export const DETAIL_GALLERY: GalleryImage[] = [
  {
    src: "/images/details/villa-02.jpg",
    alt: "High-end African modern living room interior with double height ceiling, bespoke Italian marble flooring, custom ivory furniture, warm architectural recessed lighting, large garden view through sliding panoramic glass",
    captionKey: "details.gallery.livingRoom",
  },
  {
    src: "/images/details/villa-03.jpg",
    alt: "Ultra-modern designer kitchen with island, matte black quartz countertops, built-in German appliances, integrated wine cellar, ambient under-cabinet LED warm strip lights",
    captionKey: "details.gallery.kitchen",
  },
  {
    src: "/images/details/villa-04.jpg",
    alt: "Master suite bedroom with private balcony, solid teak wall paneling, king-size bed, floor to ceiling windows and a serene tropical garden view",
    captionKey: "details.gallery.masterSuite",
  },
  {
    src: "/images/details/villa-05.jpg",
    alt: "Spa-inspired bathroom with freestanding bathtub, natural stone tiles, skylight and indoor tropical ferns",
    captionKey: "details.gallery.bathroom",
  },
];

export const DETAIL_SPECS: DetailSpec[] = [
  { icon: "bed", value: "4", labelKey: "details.specs.bedrooms" },
  { icon: "shower", value: "4.5", labelKey: "details.specs.bathrooms" },
  { icon: "square_foot", value: "380 m²", labelKey: "details.specs.area" },
  { icon: "directions_car", value: "3", labelKey: "details.specs.parking" },
];

export const DETAIL_POWER = {
  icon: "electric_bolt",
  titleKey: "details.power.title",
  bodyKey: "details.power.body",
  statKey: "details.power.stat",
} as const;

export const DETAIL_AMENITIES: Amenity[] = [
  { icon: "mode_fan", label: "Full Air Conditioning", noteKey: "details.amenities.ac" },
  { icon: "pool", label: "Private Pool", noteKey: "details.amenities.pool" },
  {
    icon: "file_download_done",
    label: "Backup Generator",
    noteKey: "details.amenities.generator",
  },
  { icon: "security", label: "24/7 Security", noteKey: "details.amenities.security" },
  {
    icon: "water_drop",
    label: "Water Tank & Filtration",
    noteKey: "details.amenities.water",
  },
  {
    icon: "wifi",
    label: "High-Speed Fiber Optic",
    noteKey: "details.amenities.fiber",
  },
  {
    icon: "local_laundry_service",
    label: "Separate Laundry Room",
    noteKey: "details.amenities.laundry",
  },
  { icon: "person", label: "Staff Quarters", noteKey: "details.amenities.staff" },
  { icon: "yard", label: "Landscaped Garden", noteKey: "details.amenities.garden" },
];

export const DETAIL_PRICES: PriceLine[] = [
  { labelKey: "details.price.monthly", amount: "1 800 000 FCFA" },
  {
    labelKey: "details.price.deposit",
    amount: "3 600 000 FCFA",
    note: true,
  },
  { labelKey: "details.price.agency", amount: "1 800 000 FCFA" },
  { labelKey: "details.price.total", amount: "7 200 000 FCFA", emphasis: true },
];

export const DETAIL_LEASE_OPTIONS = [
  "details.lease.standard",
  "details.lease.multiYear",
  "details.lease.corporate",
  "details.lease.flexible",
] as const;

export const DETAIL_MAP = {
  image: "/images/details/location-map.png",
  /** i18n key — the map is decorative, so the description lives in the table. */
  imageAltKey: "details.map.imageAlt",
  addressKey: "details.map.address",
  neighborhoodKey: "details.map.neighborhood",
  nearby: [
    { icon: "timer", labelKey: "details.map.nearby.school" },
    { icon: "school", labelKey: "details.map.nearby.malls" },
    { icon: "check_circle", labelKey: "details.map.nearby.embassies" },
    { icon: "check_circle", labelKey: "details.map.nearby.road" },
  ],
  privacyKey: "details.map.privacyBody",
} as const;

export const DETAIL_CERTIFICATE = {
  icon: "verified_user",
  titleKey: "details.certificate.title",
  badgeKey: "details.certificate.badge",
  bodyKey: "details.certificate.body",
  linkKey: "details.certificate.link",
} as const;

export const DETAIL_AGENT = {
  image: "/images/details/agent.jpg",
  imageAlt: "Portrait of Kouamé, a licensed institutional property manager wearing a modern navy suit.",
  name: "Kouamé & Associés",
  roleKey: "details.agent.role",
  rating: "4.9",
  reviews: 42,
  verifiedKey: "details.agent.verified",
  escrowKey: "details.agent.escrow",
  escrowBodyKey: "details.agent.escrowBody",
} as const;
