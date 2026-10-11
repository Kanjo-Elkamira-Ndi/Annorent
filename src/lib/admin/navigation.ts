import type { NavItem } from "@/components/layout/role-sidebar";

export const ADMIN_NAV_BADGES = {
  verification: 14,
} as const;

export function adminNav(locale: Locale): NavItem[] {
  return [
    {
      href: `/${locale}/admin`,
      label: "Overview & Dashboard",
      icon: "grid_view",
    },
    {
      href: `/${locale}/admin/listings`,
      label: "Verification Queue",
      icon: "verified",
      badgeCount: ADMIN_NAV_BADGES.verification,
    },
    {
      href: `/${locale}/admin/users`,
      label: "User Management",
      icon: "group",
    },
    {
      href: `/${locale}/admin/transactions`,
      label: "Transactions & Escrow",
      icon: "account_balance",
    },
    {
      href: `/${locale}/admin/reports`,
      label: "Audit Logs",
      icon: "history",
    },
    {
      href: `/${locale}/admin/settings`,
      label: "Platform Settings",
      icon: "settings",
    },
  ];
}

import type { Locale } from "@/lib/i18n";
