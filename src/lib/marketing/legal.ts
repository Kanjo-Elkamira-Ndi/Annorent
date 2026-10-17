/**
 * Legal instrument content for /legal/terms and /legal/privacy.
 *
 * Source of truth: Stitch screen 7b8280aa97b340898aae7b1f2f7962cf
 * ("Annorent Master Terms of Service & Data Privacy Policy").
 *
 * The single design screen is split across two real routes:
 *   - "tos"     -> /legal/terms
 *   - "privacy" -> /legal/privacy
 *
 * Per the approved i18n option (c), the substantive legal bodies stay in
 * English here (rather than in the message catalogues) so counsel can review
 * one canonical text. Only page chrome is localised in marketing.ts.
 *
 * Inline emphasis uses `**bold**`, parsed by the renderer in
 * `src/components/marketing/legal-document.tsx`. No raw HTML is injected.
 */

export type LegalVariant = "terms" | "privacy";

export type LegalCategory = "tos" | "privacy";

export type LegalIcon =
  | "task_alt"
  | "view_in_ar"
  | "shield"
  | "currency_exchange"
  | "power"
  | "lock"
  | "security"
  | "pin_drop";

export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "definitions"; items: { title: string; body: string }[] }
  | { kind: "process"; title: string; steps: { title: string; body: string }[] }
  | { kind: "checklist"; items: { title: string; body: string; icon: LegalIcon }[] }
  | {
      kind: "tiers";
      items: { title: string; badge: string; body: string; tone: "primary" | "tertiary" }[];
    }
  | { kind: "features"; items: { title: string; body: string; icon: LegalIcon }[] }
  | { kind: "ordered"; items: { title: string; body: string }[] }
  | { kind: "bullets"; items: { title: string; body: string }[] }
  | { kind: "security"; items: { title: string; body: string; icon: LegalIcon }[] }
  | { kind: "callout"; title: string; text: string };

export type LegalSection = {
  id: string;
  number: string;
  title: string;
  category: LegalCategory;
  blocks: LegalBlock[];
};

export type LegalMeta = {
  /** Short title used by the page <title> and the h1. */
  documentTitle: string;
  /** Eyebrow rendered above the h1 on the terms route. */
  combinedTitle: string;
  complianceBadge: string;
  frameworkRef: string;
  lastUpdatedLabel: string;
  lastUpdatedValue: string;
  effectiveLabel: string;
  effectiveValue: string;
  jurisdictionLabel: string;
  jurisdictionValue: string;
  preambleTitle: string;
  preambleBody: string;
  dpoTitle: string;
  dpoBody: string;
  dpoEmail: string;
  sealTitle: string;
  sealBody: string;
};

export const LEGAL_META: LegalMeta = {
  documentTitle: "Annorent Master Terms of Service & Data Privacy Policy",
  combinedTitle: "Annorent Master Terms of Service & Data Privacy Policy",
  complianceBadge: "OHADA & BCEAO Regulatory Compliance",
  frameworkRef: "Statutory Framework No. 2025/REG-44",
  lastUpdatedLabel: "Last Updated:",
  lastUpdatedValue: "November 14, 2025",
  effectiveLabel: "Effective:",
  effectiveValue: "January 1, 2025",
  jurisdictionLabel: "Jurisdiction:",
  jurisdictionValue: "OHADA Uniform Commercial Act & BCEAO Directives",
  preambleTitle: "Institutional Notice of Contractual Adhesion",
  preambleBody:
    "This Master Instrument constitutes a binding electronic accord entered into under the provisions of the OHADA Uniform Act on General Commercial Law and Regulation No. 09/2010/CM/UEMOA of the Central Bank of West African States (BCEAO). By using the platform, registering as an Institutional Landlord, or transacting rent via our Fiduciary Escrow rails, you unconditionally adhere to each term stipulated herein.",
  dpoTitle: "DPO Certified Office",
  dpoBody:
    "Registered with ARTCI (CI) & Commission des Données Personnelles (CDP SN).",
  dpoEmail: "compliance@annorent.com",
  sealTitle: "Legal Affairs & Data Counsel",
  sealBody:
    "Annorent Africa Technologies SA • Plateau, Boulevard de la République, Abidjan",
};

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: "section-1",
    number: "01",
    title: "Scope, Definitions & Corporate Status",
    category: "tos",
    blocks: [
      {
        kind: "paragraph",
        text: 'Throughout this Document, the terms **"Annorent"**, **"Platform"**, **"We"**, and **"Us"** designate Annorent Africa Technologies SA, a corporation organized under the laws of Côte d\'Ivoire and the OHADA Uniform Commercial Code (RCCM: CI-ABJ-2023-B-14022).',
      },
      {
        kind: "definitions",
        items: [
          {
            title: "Institutional Landlord",
            body: "Any certified natural person, developer syndicate, or asset holding company holding verified freehold, leasehold, or title deed (ACD/TF) recognized by competent Cadastral Offices.",
          },
          {
            title: "Verified Tenant",
            body: "An individual or corporate body that has satisfied KYC Tier 1/2 biometric and solvability verification to contract flexible or multi-year leases.",
          },
          {
            title: "Fiduciary Custodian",
            body: "Licensed banking partner institutions governed by the Banking Commission of UEMOA holding dedicated custodial escrow reserves.",
          },
          {
            title: "Digital Inventory (EDL)",
            body: "Photogrammetric, timestamped condition surveys conducted via verified mobile hardware or certified bailiff inspection.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Annorent operates not merely as a marketplace, but as a digital registrar, escrow facilitator, and legal intermediary guaranteeing compliance across residential, commercial coworking, and serviced hospitality sectors across the WAEMU and CEMAC economic corridors.",
      },
    ],
  },
  {
    id: "section-2",
    number: "02",
    title: "BCEAO Escrow & Fiduciary Safeguards",
    category: "tos",
    blocks: [
      {
        kind: "paragraph",
        text: "All monetary transmissions, security deposits (caution locative), and advance rental sums handled by the Platform are strictly segregated from Annorent’s operational liquidity, pursuant to BCEAO Circular Letter No. 004/2021 regarding third-party payment custody.",
      },
      {
        kind: "process",
        title: "BCEAO Statutory Escrow Mechanism",
        steps: [
          {
            title: "Upfront Ingestion",
            body: "Tenant transmits rent and deposit in FCFA via secured card, bank transfer, or mobile money gateway.",
          },
          {
            title: "Ring-Fenced Vault",
            body: "Funds are isolated in tier-1 depository accounts protected from creditor claims or commercial liens.",
          },
          {
            title: "Smart Key Release",
            body: "Disbursal occurs strictly after digital check-in authentication or verified bailiff clearance.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Neither the Host nor Annorent may liquidate, encumber, or draw interest against tenant security reserves during the tenure of the underlying lease agreement. Refunds of security deposits are mandated within five (5) business days following a validated exit inspection (état des lieux de sortie).",
      },
    ],
  },
  {
    id: "section-3",
    number: "03",
    title: "Listing Verification & Notarial Title Deeds",
    category: "tos",
    blocks: [
      {
        kind: "paragraph",
        text: "To purge real estate fraud and phantom rentals from African metropolitan hubs, every asset indexed on Annorent must satisfy the Cadastral Authenticity Standard:",
      },
      {
        kind: "checklist",
        items: [
          {
            icon: "task_alt",
            title: "Title Deed Protocol:",
            body: "Submissions must incorporate an Arrêté de Concession Définitive (ACD in Côte d'Ivoire), Titre Foncier (TF in Senegal/Benin), or a valid Notarial Mandate executed before a sworn civil law notary.",
          },
          {
            icon: "view_in_ar",
            title: "Matterport 3D Digital Twin:",
            body: "Each verified residence requires an onsite photogrammetric scan conducted by an Annorent Certified Field Surveyor, preserving spatial reality and eliminating fictitious listings.",
          },
          {
            icon: "shield",
            title: "Title Guaranty & Liability Cap:",
            body: "Annorent assumes institutional secondary guarantee up to 50,000,000 FCFA for tenant losses directly arising from malicious title misrepresentations by platform-vetted developers.",
          },
        ],
      },
    ],
  },
  {
    id: "section-4",
    number: "04",
    title: "Tenant Obligations & KYC Compliance",
    category: "tos",
    blocks: [
      {
        kind: "paragraph",
        text: "Prospective tenants are subject to stratified identity validation under West African anti-money laundering (AML) and anti-terrorist financing directives (GIABA requirements).",
      },
      {
        kind: "tiers",
        items: [
          {
            title: "KYC Tier 1 (Short Stays < 30d)",
            badge: "Standard",
            tone: "primary",
            body: "Government-issued biometric ID (CNI, Cedeao Passport), verified mobile MSISDN, and single-match facial liveness scan.",
          },
          {
            title: "KYC Tier 2 (Leases > 30d)",
            badge: "Institutional",
            tone: "tertiary",
            body: "Tier 1 requirements plus three months of certified banking ledgers or employment covenants, with strict prohibition of unapproved commercial subletting.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Subletting any property without the explicit written concurrence of the deed owner and re-registering on third-party aggregation apps will trigger automatic termination without deposit restitution and summary eviction under OHADA expedited proceedings.",
      },
    ],
  },
  {
    id: "section-5",
    number: "05",
    title: "Host & Landlord Responsibilities",
    category: "tos",
    blocks: [
      {
        kind: "paragraph",
        text: "Institutional landlords and hosts affiliated with Annorent are bound by performance covenants guaranteeing habitability, uninterrupted utility service, and prompt structural maintenance:",
      },
      {
        kind: "features",
        items: [
          {
            icon: "currency_exchange",
            title: "1st-of-Month Guaranteed Disbursals",
            body: "Provided the tenant's lease is valid, Annorent’s Institutional Liquidity Pool guarantees rent transfer to host accounts on the first calendar day of each cycle, regardless of localized banking clearance delays.",
          },
          {
            icon: "power",
            title: "Continuous Habitability Standards",
            body: "Hosts must maintain compliant power (CIE/Senelec backup where generator is advertised), structural plumbing, and civil liability insurance covering third-party hazards within the private demised premises.",
          },
        ],
      },
    ],
  },
  {
    id: "section-6",
    number: "06",
    title: "Cancellation, Disputes & Sworn Bailiff Handover",
    category: "tos",
    blocks: [
      {
        kind: "paragraph",
        text: "Disputes arising out of property state, damage claims, or premature cancellations follow a strict statutory trajectory:",
      },
      {
        kind: "ordered",
        items: [
          {
            title: "Initial Digital Conciliation:",
            body: "Both parties possess 48 hours to resolve discrepancies regarding cleanliness or inventory through the Annorent dispute dashboard, supported by timestamped photo/VR evidence.",
          },
          {
            title: "Sworn Bailiff Intervention (Constat d'Huissier):",
            body: "If unaddressed, Annorent dispatches an accredited Huissier de Justice (sworn bailiff) affiliated with the National Chamber of Judicial Officers to conduct an enforceable, objective physical constatation.",
          },
          {
            title: "Binding Escrow Allocation:",
            body: "The bailiff's formal PV (Procès-Verbal) serves as unconditional legal authority for the release or refund of the disputed escrow funds.",
          },
        ],
      },
    ],
  },
  {
    id: "section-7",
    number: "07",
    title: "Data Privacy, Banking Encryption & Regional Compliance",
    category: "privacy",
    blocks: [
      {
        kind: "paragraph",
        text: "Annorent Africa Technologies SA treats personal information as an immutable fiduciary trust. We comply with **Law No. 2013-450** on Personal Data Protection (Côte d'Ivoire) and **Law No. 2008-12** (Senegal), alongside AU Convention on Cyber Security and Personal Data Protection (Malabo Convention).",
      },
      {
        kind: "security",
        items: [
          {
            icon: "lock",
            title: "256-Bit TLS & HSM",
            body: "All financial metadata is encrypted at rest via AES-256 and in transit via TLS 1.3 using dedicated Hardware Security Modules.",
          },
          {
            icon: "security",
            title: "Zero Data Monetization",
            body: "We never trade, lease, or syndicate user telemetry, identity credentials, or leasing values to third-party ad networks.",
          },
          {
            icon: "pin_drop",
            title: "Sovereign Data Storage",
            body: "Primary cloud instances and cadastral copies reside within certified regional datacenter facilities in Abidjan and Dakar.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "Data subjects possess the non-derogable right to petition the Data Protection Officer for erasure, rectification, or portable extraction of personal dossiers within thirty (30) days of notarized request.",
      },
    ],
  },
  {
    id: "section-8",
    number: "08",
    title: "Cookies & Biometric ID Retention Policies",
    category: "privacy",
    blocks: [
      {
        kind: "paragraph",
        text: "Our infrastructure uses minimal functional telemetries necessary for session authentication, anti-spoofing fraud detection, and 3D VR Matterport rendering:",
      },
      {
        kind: "bullets",
        items: [
          {
            title: "Strictly Essential Cookies:",
            body: "Authentication tokens and load-balancing parameters retained only for active sessions.",
          },
          {
            title: "Biometric ID Verification Hashes:",
            body: "Raw selfie captures and national ID scans are converted to irreversible mathematical hashes upon verification and archived in cold, write-once-read-many (WORM) storage strictly to satisfy AML 5-year statutory retention obligations.",
          },
          {
            title: "Cadastral Visual Data:",
            body: "VR spatial scans omit facial likenesses, personal diplomas, or sensitive familial portraits via automated machine-vision blurring algorithms.",
          },
        ],
      },
    ],
  },
  {
    id: "section-9",
    number: "09",
    title: "Governing Law & OHADA Arbitration Jurisdiction",
    category: "tos",
    blocks: [
      {
        kind: "paragraph",
        text: "This agreement, its construction, and any non-contractual obligations arising out of or in connection with it shall be governed by and interpreted in harmony with the **Common Court of Justice and Arbitration (CCJA)** of the Organisation pour l'Harmonisation en Afrique du Droit des Affaires (OHADA).",
      },
      {
        kind: "callout",
        title: "Institutional Arbitration Clause",
        text: "Any dispute, controversy, or claim arising out of or relating to this contract, or the breach, termination or invalidity thereof, shall be submitted to the Centre d'Arbitrage de la Cour Commune de Justice et d'Arbitrage (CCJA) in Abidjan, Côte d'Ivoire. The proceedings shall be conducted in the French or English language as chosen by the claimant, by one arbitrator appointed in accordance with the CCJA Arbitration Rules.",
      },
    ],
  },
];

export const LEGAL_VARIANT_CATEGORY: Record<LegalVariant, LegalCategory> = {
  terms: "tos",
  privacy: "privacy",
};

/**
 * Per-route <h1>. The instrument is one master document in the design, but a
 * page heading must describe the page it is on, so each route names its own
 * half. Kept in English with the body text for the same counsel-review reason.
 */
export const LEGAL_TITLES: Record<LegalVariant, string> = {
  terms: "Master Terms of Service",
  privacy: "Data Privacy Policy",
};

export function sectionsForVariant(variant: LegalVariant): LegalSection[] {
  return LEGAL_SECTIONS.filter((section) => section.category === LEGAL_VARIANT_CATEGORY[variant]);
}
