/**
 * Partner-network content for `/partners`.
 *
 * Source of truth: Stitch screen bb8242b771a64f8087ad1561868eb0db
 * ("Partner With Us").
 *
 * Same split rule as `/about` and the legal instrument: headings, labels and
 * CTAs are `*Key` references resolved from the `marketing` catalogue; long-form
 * prose stays here in English.
 */

export type PartnerIcon =
  | "add_business"
  | "analytics"
  | "apartment"
  | "hotel"
  | "desk"
  | "verified_user"
  | "lock"
  | "view_in_ar"
  | "shield"
  | "corporate_fare"
  | "gavel"
  | "arrow_forward"
  | "app_registration"
  | "photo_camera"
  | "verified"
  | "payments"
  | "check_circle"
  | "expand_more"
  | "close";

export type PartnerSegment = { icon: PartnerIcon; labelKey: string };

export type PartnerMetric = {
  value: string;
  suffix: string;
  labelKey: string;
  noteKey: string;
};

export type PartnerPillar = {
  icon: PartnerIcon;
  titleKey: string;
  body: string;
  footnoteKey: string;
};

export type PartnerStep = {
  number: string;
  icon: PartnerIcon;
  titleKey: string;
  body: string;
};

export type PartnerCase = {
  company: string;
  city: string;
  quote: string;
  initials: string;
  name: string;
  roleKey: string;
};

export type PartnerFaq = {
  questionKey: string;
  answer: string;
};

export const PARTNERS_HERO = {
  eyebrowKey: "partners.hero.eyebrow",
  titleLeadKey: "partners.hero.titleLead",
  titleAccentKey: "partners.hero.titleAccent",
  titleTailKey: "partners.hero.titleTail",
  body: "Join Africa's premier institutional network for high-standing residential properties, hotel residences, and flexible workspaces across WAEMU & CEMAC zones.",
  primaryCtaKey: "partners.hero.ctaPrimary",
  secondaryCtaKey: "partners.hero.ctaSecondary",
  segmentsLabelKey: "partners.hero.segmentsLabel",
  segments: [
    { icon: "apartment", labelKey: "partners.segment.landlords" },
    { icon: "hotel", labelKey: "partners.segment.hotels" },
    { icon: "desk", labelKey: "partners.segment.flex" },
    { icon: "verified_user", labelKey: "partners.segment.brokers" },
  ] as PartnerSegment[],
};

/** Escrow monitor card, including the yield-simulator configuration. */
export const PARTNERS_VAULT = {
  monitorLabelKey: "partners.vault.monitorLabel",
  titleKey: "partners.vault.title",
  badgeKey: "partners.vault.badge",
  defaultRiskLabelKey: "partners.vault.defaultRiskLabel",
  defaultRiskValue: "0.00%",
  defaultRiskNoteKey: "partners.vault.defaultRiskNote",
  payoutLabelKey: "partners.vault.payoutLabel",
  payoutValueKey: "partners.vault.payoutValue",
  payoutNoteKey: "partners.vault.payoutNote",
  image: "/images/listings/properties-02.jpg",
  imageAlt:
    "Residential apartment tower with glass balconies photographed in warm late-afternoon light.",
  imageCaptionKey: "partners.vault.imageCaption",
  imageTagKey: "partners.vault.imageTag",
  calculatorLabelKey: "partners.calculator.label",
  unitSingularKey: "partners.calculator.unitSingular",
  unitPluralKey: "partners.calculator.unitPlural",
  portfolioKey: "partners.calculator.portfolio",
  tierKey: "partners.calculator.tier",
  sliderLabelKey: "partners.calculator.sliderLabel",
  currency: "FCFA",
  /** Net monthly rent per unit, in FCFA. */
  ratePerUnit: 950_000,
  minUnits: 1,
  maxUnits: 25,
  defaultUnits: 3,
};

export const PARTNERS_METRICS: PartnerMetric[] = [
  {
    value: "4,850",
    suffix: "+",
    labelKey: "partners.metric.leases",
    noteKey: "partners.metric.leasesNote",
  },
  {
    value: "100",
    suffix: "%",
    labelKey: "partners.metric.ontime",
    noteKey: "partners.metric.ontimeNote",
  },
  {
    value: "3.2B",
    suffix: "+",
    labelKey: "partners.metric.volume",
    noteKey: "partners.metric.volumeNote",
  },
  {
    value: "98.4",
    suffix: "%",
    labelKey: "partners.metric.occupancy",
    noteKey: "partners.metric.occupancyNote",
  },
];

export const PARTNERS_ADVANTAGE = {
  eyebrowKey: "partners.advantage.eyebrow",
  titleKey: "partners.advantage.title",
  body: "Traditional property management in West & Central Africa suffers from 18% average payment defaults. Annorent’s fintech architecture closes the gap completely.",
  pillars: [
    {
      icon: "shield",
      titleKey: "partners.pillar.escrow",
      body: "Sovereign notarial ring-fencing ensures timely payouts directly to your bank account on the 1st of every month, backing you with zero default risk.",
      footnoteKey: "partners.pillar.escrowFootnote",
    },
    {
      icon: "view_in_ar",
      titleKey: "partners.pillar.audit",
      body: "Our certified land surveyors digitize and audit your title deeds (TF/ACD), generating high-fidelity digital twins that accelerate tenant commitments by 3.8x.",
      footnoteKey: "partners.pillar.auditFootnote",
    },
    {
      icon: "corporate_fare",
      titleKey: "partners.pillar.demand",
      body: "Direct access to verified multinational diplomatic corps, African Development Bank (AfDB) personnel, and executive corporate relocations with Tier-1 solvency.",
      footnoteKey: "partners.pillar.demandFootnote",
    },
    {
      icon: "gavel",
      titleKey: "partners.pillar.legal",
      body: "Standardized legal contracts enforceable across 17 African member states, certified electronic signatures, and certified inventory check-ins executed by sworn bailiffs.",
      footnoteKey: "partners.pillar.legalFootnote",
    },
  ] as PartnerPillar[],
};

export const PARTNERS_ONBOARDING = {
  eyebrowKey: "partners.onboarding.eyebrow",
  titleKey: "partners.onboarding.title",
  body: "A seamless protocol designed for institutional fund managers and private owners alike.",
  steps: [
    {
      number: "01",
      icon: "app_registration",
      titleKey: "partners.step.submit",
      body: "Complete a 5-minute online submission detailing your property units, location, and documentation.",
    },
    {
      number: "02",
      icon: "photo_camera",
      titleKey: "partners.step.audit",
      body: "Annorent field engineers deploy with LIDAR/Matterport equipment to verify cadastral authenticity and capture VR scans.",
    },
    {
      number: "03",
      icon: "verified",
      titleKey: "partners.step.publication",
      body: "Your listing goes live with an institutional trust badge, broadcast directly to pre-approved corporate tenants and diplomats.",
    },
    {
      number: "04",
      icon: "payments",
      titleKey: "partners.step.payouts",
      body: "Rents are collected via institutional escrow and disbursed on schedule directly to your designated bank account.",
    },
  ] as PartnerStep[],
};

export const PARTNERS_PROOF = {
  eyebrowKey: "partners.proof.eyebrow",
  titleKey: "partners.proof.title",
  citiesLabelKey: "partners.proof.citiesLabel",
  cases: [
    {
      company: "SCI Ivoire Horizon",
      city: "Abidjan, CI",
      quote: "Managing 42 luxury units in Cocody Danga previously resulted in quarterly payment disputes. Switching to Annorent's bank escrow vault completely eradicated defaults. 100% occupancy with multinational tenants since day one.",
      initials: "KA",
      name: "Kouamé Assalé",
      roleKey: "partners.case.role1",
    },
    {
      company: "Teranga Hospitality Group",
      city: "Dakar, SN",
      quote: "The 3D Matterport twin allowed European executives and NGO directors to book entire month-long suites in Almadies before even landing at Blaise Diagne airport. Average booking cycle went from 2 weeks to 48 hours.",
      initials: "MD",
      name: "Marieme Diop",
      roleKey: "partners.case.role2",
    },
    {
      company: "Equateur Real Estate Fund",
      city: "Douala, CM",
      quote: "As an institutional fund under COBAC regulation, strict transparency is paramount. The automatic OHADA lease generation and bailiff check-ins satisfy all our audit and compliance committees seamlessly.",
      initials: "ET",
      name: "Emmanuel Tchounkeu",
      roleKey: "partners.case.role3",
    },
  ] as PartnerCase[],
};

export const PARTNERS_FAQ = {
  eyebrowKey: "partners.faq.eyebrow",
  titleKey: "partners.faq.title",
  body: "Complete clarity regarding commission rates, escrow protection, and legal enforcement.",
  items: [
    {
      questionKey: "partners.faq.q1",
      answer:
        "Annorent charges a flat, institutional-grade commission of **1.5%** on long-term residential and corporate leases, covering full escrow settlement, digital twin maintenance, and tenant background auditing. For boutique hotels and flex spaces, standard distribution commission is 8% to 12% on verified completed bookings, with zero upfront listing fees.",
    },
    {
      questionKey: "partners.faq.q2",
      answer:
        "Tenant rental payments are cleared through segregated central-bank supervised accounts. Once received, funds are ring-fenced under notarial oversight and automatically settled via RTGS or SEPA to your commercial bank on the agreed disbursement date. This eliminates intermediary withholding and counterparty risk.",
    },
    {
      questionKey: "partners.faq.q3",
      answer:
        "Every lease executed through Annorent is backed by an institutional rent guarantee pool and property damage insurance up to 50,000,000 FCFA. In the rare event of tenant delinquency, our legal reserve continues paying your net monthly rent while our accredited OHADA bailiffs handle resolution.",
    },
    {
      questionKey: "partners.faq.q4",
      answer:
        "Yes. Certified agents and brokers can join the Annorent Broker Syndicate. You retain your agency mandates while unlocking our 3D scanning infrastructure, multinational tenant inquiries, and automated commission escrow distribution.",
    },
  ] as PartnerFaq[],
};

export const PARTNERS_CTA = {
  id: "partner-form",
  eyebrowKey: "partners.form.eyebrow",
  titleKey: "partners.form.title",
  body: "Submit your property details below. An Annorent Regional Director will schedule a free physical inspection and 3D digital scan within 24 hours.",
  perks: ["partners.form.perkNoFees", "partners.form.perkOhada"] as string[],
  hubs: [
    "Abidjan, Côte d'Ivoire",
    "Dakar, Senegal",
    "Douala, Cameroon",
    "Yaoundé, Cameroon",
    "Kigali, Rwanda",
    "Cotonou, Benin",
  ],
  partnerTypes: [
    "partners.form.typeResidential",
    "partners.form.typeHotel",
    "partners.form.typeFlex",
    "partners.form.typeBroker",
    "partners.form.typeFund",
  ] as string[],
  submitKey: "partners.form.submit",
  successPendingKey: "partners.form.submitting",
  successTitleKey: "partners.form.successTitle",
  successBodyKey: "partners.form.successBody",
  labels: {
    name: "partners.form.name",
    email: "partners.form.email",
    hub: "partners.form.hub",
    partnerType: "partners.form.partnerType",
    portfolio: "partners.form.portfolio",
  } as Record<string, string>,
  placeholders: {
    name: "partners.form.namePlaceholder",
    email: "partners.form.emailPlaceholder",
    portfolio: "partners.form.portfolioPlaceholder",
  } as Record<string, string>,
  errors: {
    required: "partners.form.errorRequired",
    email: "partners.form.errorEmail",
  } as Record<string, string>,
};

export const PARTNERS_AUDIT = {
  /** The hero's secondary CTA opens this dialog. */
  eyebrowKey: "partners.audit.eyebrow",
  titleKey: "partners.audit.title",
  body: "Comprehensive cadastral reconciliation, yield simulation, and tenancy risk rating for portfolios of 5+ units.",
  entityLabelKey: "partners.audit.entityLabel",
  entityPlaceholderKey: "partners.audit.entityPlaceholder",
  phoneLabelKey: "partners.audit.phoneLabel",
  phonePlaceholderKey: "partners.audit.phonePlaceholder",
  submitKey: "partners.audit.submit",
  closeLabelKey: "partners.audit.close",
  pendingKey: "partners.audit.pending",
  successTitleKey: "partners.audit.successTitle",
  successBodyKey: "partners.audit.successBody",
  doneKey: "partners.audit.done",
  errorRequired: "partners.audit.errorRequired",
  errorPhone: "partners.audit.errorPhone",
};
