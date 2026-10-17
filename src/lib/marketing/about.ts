/**
 * About page content for `/about`.
 *
 * Source of truth: Stitch screen d3aa53b295c04dc9b94023f68b3d161e
 * ("About Annorent").
 *
 * Split rule, consistent with the legal instrument and the approved i18n
 * option (c):
 *   - Headings, eyebrows, labels, stat captions and CTA copy are referenced by
 *     `*Key` and resolved through the `marketing` catalogue, so they translate.
 *   - Long-form editorial prose, list bodies and biographies stay here in
 *     English so there is one reviewable source text.
 *
 * Images are local assets in `public/images`. The reference used remote
 * stock photography; the substitutions are recorded in ABOUT_SHOWCASE and
 * documented in `context/sitemap.md`.
 */

export type AboutIcon =
  | "location_city"
  | "domain_verification"
  | "shield"
  | "check_circle"
  | "gavel"
  | "account_balance"
  | "view_in_ar"
  | "verified"
  | "verified_user"
  | "warning"
  | "cancel"
  | "info"
  | "lock_reset"
  | "policy"
  | "360"
  | "account_balance_wallet"
  | "public"
  | "inventory"
  | "photo_camera"
  | "assignment"
  | "hub"
  | "terminal"
  | "balance"
  | "assured_workload"
  | "search"
  | "handshake"
  | "arrow_forward"
  | "home";

export type AboutStat = {
  value: string;
  icon: AboutIcon;
  tone: "primary" | "tertiary";
  labelKey: string;
  body: string;
};

export type AboutMicroBadge = {
  icon: AboutIcon;
  labelKey: string;
};

export type AboutShowcase = {
  countryLabelKey: string;
  placeKey: string;
  image: string;
  alt: string;
};

export type AboutValue = {
  icon: AboutIcon;
  titleKey: string;
  body: string;
  footnoteKey: string;
  footnoteIcon: AboutIcon;
  footnoteTone: "primary" | "tertiary";
};

export type AboutStage = {
  stage: string;
  titleKey: string;
  body: string;
  icon: AboutIcon;
  tone: "primary" | "tertiary";
};

export type AboutLeader = {
  name: string;
  roleKey: string;
  bio: string;
  city: string;
  affiliation: string;
  affiliationIcon: AboutIcon;
  initials: string;
};

export type AboutPartner = {
  label: string;
  icon: AboutIcon;
};

/** Icon fill axis — Material Symbols renders outlined by default. */
export const ICON_FILL_STYLE = { fontVariationSettings: "'FILL' 1" } as const;

export const ABOUT_HERO = {
  eyebrowKey: "about.hero.eyebrow",
  titleKey: "about.hero.title",
  body: "Annorent bridges the institutional trust gap across West and Central Africa. Through bank-grade fiduciary escrow, rigorous cadastral verification, and immersive 3D spatial technology, we empower tenants, landlords, and travelers to transact with absolute legal certainty.",
  primaryCtaKey: "about.hero.ctaPrimary",
  secondaryCtaKey: "about.hero.ctaSecondary",
  image: "/images/listings/properties-01.jpg",
  imageAlt:
    "Contemporary residential towers in Abidjan photographed in warm evening light.",
  captionLabelKey: "about.hero.captionLabel",
  captionTitleKey: "about.hero.captionTitle",
  captionBody: "Cross-jurisdictional real estate transactions secured by licensed OHADA notaries.",
  overlayTitleKey: "about.hero.overlayTitle",
  overlayBody: "Every parcel verified against National Land Registries.",
};

export const ABOUT_MICRO_BADGES: AboutMicroBadge[] = [
  { icon: "gavel", labelKey: "about.badge.auditedDeeds" },
  { icon: "account_balance", labelKey: "about.badge.escrow" },
  { icon: "view_in_ar", labelKey: "about.badge.digitalTwin" },
];

export const ABOUT_STATS: AboutStat[] = [
  {
    value: "12",
    icon: "location_city",
    tone: "primary",
    labelKey: "about.stat.metropolises",
    body: "Connecting key commercial hubs including Dakar, Abidjan, Kigali, and Douala.",
  },
  {
    value: "4,850+",
    icon: "domain_verification",
    tone: "primary",
    labelKey: "about.stat.properties",
    body: "Physically surveyed, title-confirmed, and photographed with Matterport Pro3 spatial lidar.",
  },
  {
    value: "3.2B",
    icon: "shield",
    tone: "tertiary",
    labelKey: "about.stat.protected",
    body: "Guaranteed safe in regulated BCEAO/BEAC commercial bank fiduciary escrow vaults.",
  },
  {
    value: "0%",
    icon: "check_circle",
    tone: "primary",
    labelKey: "about.stat.fraud",
    body: "Flawless record on title authenticity, zero phantom landlords, zero unreturned deposits.",
  },
];

export const ABOUT_ORIGIN = {
  id: "origin-narrative",
  eyebrowKey: "about.origin.eyebrow",
  titleKey: "about.origin.title",
  body: "For decades, renting, purchasing, or booking corporate housing in African economic epicenters was an opaque, high-risk proposition governed by verbal pledges and uncontrolled informal middle-agents.",
  friction: {
    icon: "warning" as AboutIcon,
    tone: "error" as const,
    headingKey: "about.origin.frictionTitle",
    intro:
      "In cities experiencing explosive urbanization—like Dakar, Abidjan, Douala, and Kinshasa—tenants and institutional investors were routinely exposed to systemic hazards:",
    items: [
      {
        title: "Phantom Listings & Bogus Brokers:",
        body: "Unregulated intermediaries circulating outdated or fabricated photos to collect non-refundable visitation fees.",
      },
      {
        title: "Disputed Title Deeds (Titres Fonciers):",
        body: "Properties encumbered by succession disputes, duplicate colonial registrations, or absent building permits (Permis de Construire).",
      },
      {
        title: "Informal Cash Escrow Risks:",
        body: "Upfront payments of 3 to 6 months of security deposit handed over with zero guarantee of return upon lease expiry.",
      },
    ],
    footnoteIcon: "info" as AboutIcon,
    footnote:
      "Over $1.4B is locked or forfeited in unstructured informal tenancy disputes across West Africa every year.",
  },
  solution: {
    icon: "lock_reset" as AboutIcon,
    tone: "tertiary" as const,
    headingKey: "about.origin.solutionTitle",
    intro:
      "We engineered a modern, pan-African institutional framework replacing ambiguity with cryptographic, legal, and financial guarantees:",
    items: [
      {
        title: "Cadastral & Land Registry Linkage:",
        body: "Every listed asset is cross-verified with the regional Conservation Foncière and certified by licensed notaries prior to publication.",
      },
      {
        title: "Regulated Escrow Accounts:",
        body: "Deposits and lease disbursements are held in central bank-supervised tier-1 partner accounts and only released after digital sign-off.",
      },
      {
        title: "Matterport Spatial Digital Twins:",
        body: "High-definition 3D laser scans ensure international executives and travelers inspect every room with zero distortion.",
      },
    ],
    footnoteIcon: "verified" as AboutIcon,
    footnoteKey: "about.origin.solutionFootnote",
  },
};

/**
 * City showcase strip.
 *
 * The reference paired each city with bespoke stock photography. The project
 * ships a small local set, so these are generic architectural assets; the `alt`
 * text therefore describes the picture rather than asserting a location the
 * photograph does not evidence.
 */
export const ABOUT_SHOWCASE: AboutShowcase[] = [
  {
    countryLabelKey: "about.showcase.senegal",
    placeKey: "about.showcase.dakar",
    image: "/images/listings/properties-02.jpg",
    alt: "Contemporary apartment building with full-height glazing.",
  },
  {
    countryLabelKey: "about.showcase.rwanda",
    placeKey: "about.showcase.kigali",
    image: "/images/listings/properties-03.jpg",
    alt: "Modern mixed-use residence with planted balconies.",
  },
  {
    countryLabelKey: "about.showcase.kenya",
    placeKey: "about.showcase.nairobi",
    image: "/images/listings/hotels-01.jpg",
    alt: "Penthouse interior with floor-to-ceiling city views.",
  },
];

export const ABOUT_VALUES: {
  eyebrowKey: string;
  titleKey: string;
  body: string;
  items: AboutValue[];
} = {
  eyebrowKey: "about.values.eyebrow",
  titleKey: "about.values.title",
  body: "Our four structural pillars provide institutional investors, sovereign funds, multinational executives, and diaspora families with unfailing certainty.",
  items: [
    {
      icon: "policy",
      titleKey: "about.values.integrity",
      body: "We adhere rigorously to the OHADA Uniform Acts on General Commercial Law and Secured Transactions. In collaboration with the International Union of Notaries (UINL), every lease contract and transaction executed through our rails is legally enforceable across 17 African member states.",
      footnoteKey: "about.values.integrityFootnote",
      footnoteIcon: "verified",
      footnoteTone: "primary",
    },
    {
      icon: "360",
      titleKey: "about.values.transparency",
      body: "No fish-eye lenses, misleading filters, or doctored staging. Our network of Matterport Pro3 certified operators deploys high-accuracy lidar digital twins, paired with verified cadastral boundaries. What you inspect virtually matches reality down to the square millimeter.",
      footnoteKey: "about.values.transparencyFootnote",
      footnoteIcon: "view_in_ar",
      footnoteTone: "primary",
    },
    {
      icon: "account_balance_wallet",
      titleKey: "about.values.sovereignty",
      body: "Deposits and rentals should never be subject to counterparty default. Annorent holds transactions in dedicated, segregated escrow custody accounts at central bank-supervised tier-1 financial institutions, guaranteeing immediate refund on unmet conditions and on-time landlord disbursements.",
      footnoteKey: "about.values.sovereigntyFootnote",
      footnoteIcon: "verified_user",
      footnoteTone: "tertiary",
    },
    {
      icon: "public",
      titleKey: "about.values.ambition",
      body: "We are built directly for the continent's multi-trillion dollar urban growth trajectory under the AfCFTA framework. We facilitate seamless mobility for executives, entrepreneurs, diaspora returnees, and international travelers navigating between francophone, anglophone, and lusophone capitals.",
      footnoteKey: "about.values.ambitionFootnote",
      footnoteIcon: "hub",
      footnoteTone: "primary",
    },
  ],
};

export const ABOUT_PROTOCOL: {
  eyebrowKey: string;
  titleKey: string;
  captionKey: string;
  stages: AboutStage[];
} = {
  eyebrowKey: "about.protocol.eyebrow",
  titleKey: "about.protocol.title",
  captionKey: "about.protocol.caption",
  stages: [
    {
      stage: "STAGE 01",
      titleKey: "about.protocol.cadastral",
      body: "Checking Titre Foncier (TF) or Certificat de Propriété with local urban land conservators.",
      icon: "inventory",
      tone: "primary",
    },
    {
      stage: "STAGE 02",
      titleKey: "about.protocol.survey",
      body: "Lidar-guided 3D capture by our certified regional field agents to eliminate staging fraud.",
      icon: "photo_camera",
      tone: "primary",
    },
    {
      stage: "STAGE 03",
      titleKey: "about.protocol.legal",
      body: "OHADA contract template binding with biometric and national e-ID verification for all parties.",
      icon: "assignment",
      tone: "primary",
    },
    {
      stage: "STAGE 04",
      titleKey: "about.protocol.escrow",
      body: "All capital locked in Tier-1 banking partners until digital handover protocol is signed.",
      icon: "verified",
      tone: "tertiary",
    },
  ],
};

/**
 * Leadership cards.
 *
 * The reference used three bespoke executive headshots. The project has no
 * licensed portrait set, and reusing one stock portrait across three named
 * people would misrepresent them, so each card renders an initials monogram in
 * place of the photograph. Card geometry, city chip and copy are unchanged.
 */
export const ABOUT_LEADERS: AboutLeader[] = [
  {
    name: "Koffi Marc-Aurele",
    roleKey: "about.leader.ceo",
    bio: "Former Vice President of Real Estate Structured Finance at Ecobank Capital. 14+ years structuring commercial land syndications and private equity property funds across WAEMU.",
    city: "Abidjan, CI",
    affiliation: "OHADA Commercial Bar Association",
    affiliationIcon: "gavel",
    initials: "KM",
  },
  {
    name: "Aissatou Diallo, Esq.",
    roleKey: "about.leader.md",
    bio: "Distinguished Notary Jurist specialized in maritime cadastral laws and high-end residential leasing. Lead architect of Annorent's standardized notary cross-check network in Dakar and Saint-Louis.",
    city: "Dakar, SN",
    affiliation: "Chambre des Notaires du Sénégal",
    affiliationIcon: "verified_user",
    initials: "AD",
  },
  {
    name: "Etienne Mbeki",
    roleKey: "about.leader.cto",
    bio: "Former spatial computing lead at Dassault Systèmes and fintech architect. Engineered Annorent's proprietary Matterport-to-Cadastre matching algorithms and mobile escrow payment rails.",
    city: "Douala, CM",
    affiliation: "BCEAO / BEAC Interoperability Architect",
    affiliationIcon: "terminal",
    initials: "EM",
  },
];

export const ABOUT_INSTITUTIONS = {
  eyebrowKey: "about.institutions.eyebrow",
  partners: [
    { label: "OHADA", icon: "balance" },
    { label: "BCEAO", icon: "account_balance" },
    { label: "Matterport", icon: "view_in_ar" },
    { label: "UINL", icon: "shield" },
    { label: "BEAC", icon: "assured_workload" },
    { label: "AfCFTA", icon: "public" },
  ] as AboutPartner[],
};

export const ABOUT_CTA = {
  badgeKey: "about.cta.badge",
  titleKey: "about.cta.title",
  body: "Whether you are an international tenant seeking verified lodging, an institutional landlord managing a multi-asset portfolio, or a certified notary looking to integrate with our cadastral rails, Annorent delivers uncompromised safety.",
  primaryKey: "about.cta.primary",
  secondaryKey: "about.cta.secondary",
};
