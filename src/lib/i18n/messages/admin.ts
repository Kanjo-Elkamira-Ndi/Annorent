/**
 * Admin (Ops Console) surface copy.
 *
 * English only. Mirrors the institutional/WAEMU tone from the Stitch reference screens.
 */
export const admin = {
  en: {
    "admin.nav.overview": "Overview & Dashboard",
    "admin.nav.verificationQueue": "Verification Queue",
    "admin.nav.users": "User Management",
    "admin.nav.transactions": "Transactions & Escrow",
    "admin.nav.auditLogs": "Audit Logs",
    "admin.nav.platformSettings": "Platform Settings",
    "admin.dashboard.title": "Directoire des Opérations Foncier & Séquestre",
    "admin.dashboard.secOps": "SEC-OPS // LEVEL 4",
    "admin.dashboard.sysRef": "WAEMU-ESCROW-V2.4",
    "admin.users.title": "User Management & Access Control",
    "admin.users.subtitle": "Institutional Tier 4",
    "admin.users.breadcrumb": "Security & Governance",
    "admin.users.breadcrumbDir": "User Directory",
    "admin.listings.title": "Listing Verification",
    "admin.transactions.title": "Transaction Monitoring & Settlement Reports",
  },
} as const;

export type AdminKey = keyof (typeof admin)["en"];
