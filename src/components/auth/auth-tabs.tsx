import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { AuthMode } from "./auth-shell";

/**
 * The three-way mode switch above every auth form.
 *
 * Rendered as links, not buttons with client-side state: the design draws a
 * tab bar, but each tab is a different page in this app, and a link means the
 * mode is addressable, survives a reload, and works before hydration. The
 * active tab carries `aria-current="page"`; the others are ordinary links.
 *
 * Server component — nothing here needs to be interactive.
 */

type AuthTabsProps = {
  locale: Locale;
  active: AuthMode;
};

/**
 * `business` covers two routes. The design has a single "Pro & Hospitality"
 * tab, so `/register/owner` is its canonical target and `/register/hotel`
 * renders the same tab bar with the same tab marked current — the two pages
 * differ only in the form's `role` prop, not in navigation.
 */
const TABS: { mode: AuthMode; href: string; key: string }[] = [
  { mode: "signin", href: "/login", key: "auth.tab.signin" },
  { mode: "register", href: "/register", key: "auth.tab.register" },
  { mode: "business", href: "/register/owner", key: "auth.tab.business" },
];

export function AuthTabs({ locale, active }: AuthTabsProps) {
  return (
    <nav aria-label={t(locale, "auth", "auth.tabs.label")} className="mb-8">
      <div className="bg-surface-container-low p-1.5 rounded-lg flex items-center gap-1">
        {TABS.map((tab) => {
          const isActive = tab.mode === active;
          return (
            <Link
              key={tab.mode}
              href={`/${locale}${tab.href}`}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "flex-1 py-2 px-3 text-center rounded-lg font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm"
                  : "flex-1 py-2 px-3 text-center rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
              }
            >
              {t(locale, "auth", tab.key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
