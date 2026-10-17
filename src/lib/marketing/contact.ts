/**
 * Static content for the contact page — `/[locale]/contact`.
 *
 * Ported from the Stitch reference "Contact Us - Annorent".
 *
 * Everything here is presentation data: no addresses, dial codes, or desk
 * names are resolved at runtime because there is no directory API in this
 * workspace. Each field is an i18n key rather than a literal so the copy can
 * be translated without touching layout.
 *
 * Two deliberate deviations from the reference artwork, both flagged in the
 * page's doc comment:
 *
 * 1. The "Browse Help Center" action has no route to point at. It is exported
 *    as an inert control rather than shipped as a dead `href="#"`, matching
 *    how `MAP_INERT_CONTROLS` handles the map's unimplemented tiles controls.
 * 2. The country `<select>` options drop the flag emoji and keep the dial code
 *    plus ISO code, per the no-emoji-as-icon rule; ISO codes need no
 *    translation, so this also avoids nine extra keys per locale.
 */

export type ContactMetric = {
  /** Material Symbols ligature. Decorative, so the label carries the meaning. */
  icon: string;
  /** Tonal class for the icon tile. */
  iconClass: string;
  valueKey: string;
  labelKey: string;
};

export type ContactChannel = {
  icon: string;
  iconClass: string;
  labelKey: string;
  /** Literal contact target. `tel:`/`mailto:` are real, so these stay raw. */
  href: string;
  value: string;
  /** Optional trailing badge, e.g. round-the-clock availability. */
  badgeKey?: string;
  /** Channels that are not a phone/mail link show an arrow instead of a badge. */
  trailing: "badge" | "arrow";
};

export type ContactHub = {
  cityKey: string;
  countryKey: string;
  addressKey: string;
};

export type ContactAssurance = {
  icon: string;
  iconClass: string;
  titleKey: string;
  bodyKey: string;
};

export type ContactOption = {
  value: string;
  labelKey: string;
};

export type ContactInertLink = {
  icon: string;
  labelKey: string;
  /** Shown as the native tooltip; explains why the control is not live yet. */
  titleKey: string;
};

/** Breadcrumb trail above the page heading. */
export const CONTACT_BREADCRUMB: readonly { labelKey: string; href?: string }[] = [
  { labelKey: "contact.breadcrumb.home", href: "/" },
  { labelKey: "contact.breadcrumb.current" },
];

export const CONTACT_METRICS: readonly ContactMetric[] = [
  {
    icon: "timer",
    iconClass: "text-primary",
    valueKey: "contact.metrics.response.value",
    labelKey: "contact.metrics.response.label",
  },
  {
    icon: "verified_user",
    iconClass: "text-tertiary-container",
    valueKey: "contact.metrics.escrow.value",
    labelKey: "contact.metrics.escrow.label",
  },
  {
    icon: "language",
    iconClass: "text-primary",
    valueKey: "contact.metrics.hubs.value",
    labelKey: "contact.metrics.hubs.label",
  },
  {
    icon: "support_agent",
    iconClass: "text-secondary",
    valueKey: "contact.metrics.desk.value",
    labelKey: "contact.metrics.desk.label",
  },
];

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    icon: "phone_in_talk",
    iconClass: "bg-tertiary-container/10 text-tertiary-container",
    labelKey: "contact.channels.hotline.label",
    href: "tel:+2252720004500",
    value: "+225 27 20 00 45 00",
    badgeKey: "contact.channels.hotline.badge",
    trailing: "badge",
  },
  {
    icon: "account_balance_wallet",
    iconClass: "bg-primary/10 text-primary",
    labelKey: "contact.channels.escrow.label",
    href: "mailto:escrow@annorent.io",
    value: "escrow@annorent.io",
    trailing: "arrow",
  },
  {
    icon: "gavel",
    iconClass: "bg-secondary-container text-on-secondary-container",
    labelKey: "contact.channels.legal.label",
    href: "mailto:legal@annorent.io",
    value: "legal@annorent.io",
    trailing: "arrow",
  },
];

export const CONTACT_HEADQUARTERS = {
  badgeKey: "contact.headquarters.badge",
  cityKey: "contact.headquarters.city",
  addressLine1Key: "contact.headquarters.addressLine1",
  addressLine2Key: "contact.headquarters.addressLine2",
  /**
   * Self-hosted rather than the reference's remote CDN tile: this project
   * keeps every image local, and the map is decorative behind an address.
   */
  mapImage: "/images/details/location-map.png",
  mapAltKey: "contact.headquarters.mapAlt",
  hoursTitleKey: "contact.headquarters.hoursTitle",
  hours: [
    { dayKey: "contact.headquarters.weekdays", value: "08:00 – 18:30" },
    { dayKey: "contact.headquarters.saturday", value: "09:00 – 14:00" },
  ],
} as const;

export const CONTACT_HUBS: readonly ContactHub[] = [
  {
    cityKey: "contact.hubs.dakar.city",
    countryKey: "contact.hubs.dakar.country",
    addressKey: "contact.hubs.dakar.address",
  },
  {
    cityKey: "contact.hubs.douala.city",
    countryKey: "contact.hubs.douala.country",
    addressKey: "contact.hubs.douala.address",
  },
  {
    cityKey: "contact.hubs.kigali.city",
    countryKey: "contact.hubs.kigali.country",
    addressKey: "contact.hubs.kigali.address",
  },
];

export const CONTACT_ASSURANCES: readonly ContactAssurance[] = [
  {
    icon: "verified",
    iconClass: "bg-tertiary-container/15 text-tertiary-container",
    titleKey: "contact.assurances.cadastre.title",
    bodyKey: "contact.assurances.cadastre.body",
  },
  {
    icon: "lock_clock",
    iconClass: "bg-primary/10 text-primary",
    titleKey: "contact.assurances.escrow.title",
    bodyKey: "contact.assurances.escrow.body",
  },
  {
    icon: "handshake",
    iconClass: "bg-surface-container-highest text-on-surface",
    titleKey: "contact.assurances.notary.title",
    bodyKey: "contact.assurances.notary.body",
  },
];

/** Inquiry categories, in the order the reference lists them. */
export const CONTACT_INQUIRY_CATEGORIES: readonly ContactOption[] = [
  { value: "booking", labelKey: "contact.form.categories.booking" },
  { value: "escrow", labelKey: "contact.form.categories.escrow" },
  { value: "listing", labelKey: "contact.form.categories.listing" },
  { value: "legal", labelKey: "contact.form.categories.legal" },
  { value: "corporate", labelKey: "contact.form.categories.corporate" },
];

/**
 * Dialling prefixes the concierge can be reached on. `label` is deliberately
 * not an i18n key: a dial code and ISO code are the same in every language.
 */
export const CONTACT_COUNTRIES: readonly { value: string; label: string }[] = [
  { value: "+225", label: "+225 (CI)" },
  { value: "+221", label: "+221 (SN)" },
  { value: "+237", label: "+237 (CM)" },
  { value: "+250", label: "+250 (RW)" },
  { value: "+254", label: "+254 (KE)" },
  { value: "+229", label: "+229 (BJ)" },
  { value: "+33", label: "+33 (FR)" },
  { value: "+1", label: "+1 (US)" },
  { value: "+44", label: "+44 (UK)" },
];

/**
 * Actions on this page that reference a product surface which does not exist
 * yet. Rendered as disabled buttons with an explanatory title so the intent
 * stays discoverable without shipping a link that goes nowhere.
 */
export const CONTACT_INERT_LINKS: readonly ContactInertLink[] = [
  { icon: "library_books", labelKey: "contact.banner.helpLabel", titleKey: "contact.banner.helpTitle" },
];

/** The WhatsApp concierge link is real, so it is a normal external anchor. */
export const CONTACT_WHATSAPP_HREF = "https://wa.me/2252720004500";
