"use client";

import { CircleUserRound, Heart, Map, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { t, type Locale } from "@/lib/i18n";
import { BOTTOM_NAV, isActivePath, localePath, type BottomNavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";

/**
 * Floating pill tab bar for phones (below 768px), matching the top pill.
 * Sits 12px above the bottom edge plus the safe-area inset, with icons and labels.
 */

const icons: Record<BottomNavItem["icon"], ReactNode> = {
  search: <Search aria-hidden className="size-5" />,
  map: <Map aria-hidden className="size-5" />,
  saved: <Heart aria-hidden className="size-5" />,
  account: <CircleUserRound aria-hidden className="size-5" />,
};

export function BottomNav({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <nav
      aria-label={t(locale, "common", "nav.mobile")}
      className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-40 md:hidden"
    >
      <ul className="mx-auto grid h-[var(--bottom-nav-height)] max-w-md grid-cols-4 items-center rounded-full border border-border bg-surface px-2 shadow-e2 dark:bg-raised">
        {BOTTOM_NAV.map((item) => {
          const active = isActivePath(pathname, locale, item.path);
          return (
            <li key={item.key} className="flex justify-center">
              <Link
                href={localePath(locale, item.path)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-full px-2 text-caption font-medium",
                  active ? "text-link" : "text-secondary hover:text-primary",
                )}
              >
                {icons[item.icon]}
                {t(locale, "common", item.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
