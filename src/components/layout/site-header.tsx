import Link from "next/link";

import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

/**
 * Public site header — the fixed bar above every marketing page.
 *
 * Owns: the brand lockup, primary navigation, the city search affordance, the
 * language/currency chip, and the sign-in / post-listing actions.
 * Does not own: the mobile drawer, the locale switcher behaviour, or the ⌘K
 * command palette — the design draws those controls but they are not wired yet,
 * and inventing handlers would be dead code.
 *
 * Server component. It renders no interactive widget of its own: the search
 * affordance and the currency chip are non-functional affordances in the
 * reference design, so they are rendered as inert elements rather than fake
 * buttons that do nothing when pressed.
 *
 * Fixed positioning means the page content must reserve its height. Stitch
 * does this with `pt-20` on the `<main>` wrapper plus `-mt-20` on the hero, so
 * the hero still bleeds to the very top of the viewport while everything below
 * it clears the bar.
 */

const NAV: ReadonlyArray<{ labelKey: string; href: string }> = [
  { labelKey: "home.nav.buyRent", href: "/properties" },
  { labelKey: "home.nav.flex", href: "/rentals" },
  { labelKey: "home.nav.hotels", href: "/hotels" },
  { labelKey: "home.nav.map", href: "/map" },
];

type SiteHeaderProps = {
  locale: Locale;
  /** Currently active nav href, for the highlighted state. */
  activeHref?: string;
};

export function SiteHeader({ locale, activeHref }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(4,27,60,0.06)]">
      <div className="h-20 w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-gutter">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="flex w-9 h-9 items-center justify-center rounded-lg bg-primary">
              <span aria-hidden="true" className="material-symbols-outlined text-on-primary text-[22px]">
                apartment
              </span>
            </span>
            <span className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                ANNORENT
              </span>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant -mt-1">
                {t(locale, "marketing", "home.header.tagline")}
              </span>
            </span>
          </Link>

          {/* Drawn as a static affordance rather than a button: the command
              palette it stands in for is not built yet. */}
          <div
            aria-hidden="true"
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span className="font-label-md text-label-md">
              {t(locale, "marketing", "home.header.searchPlaceholder")}
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest font-label-sm text-label-sm text-outline">
              ⌘K
            </kbd>
          </div>
        </div>

        <nav aria-label={t(locale, "marketing", "home.nav.label")} className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-3 py-2 rounded-lg font-label-md text-label-md transition-colors",
                  isActive
                    ? "bg-primary-container text-on-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                )}
              >
                {t(locale, "marketing", item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language/currency chip: display-only until the switchers exist. */}
          <div
            aria-hidden="true"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span className="font-label-sm text-label-sm font-semibold">
              {locale.toUpperCase()}
            </span>
            <span className="text-outline-variant">|</span>
            <span className="font-label-sm text-label-sm">FCFA</span>
          </div>

          <Link
            href={`/${locale}/login`}
            className="hidden md:inline-flex font-label-md text-label-md text-on-surface-variant hover:text-primary px-3 py-2 transition-colors"
          >
            {t(locale, "marketing", "home.header.login")}
          </Link>
          <Link
            href={`/${locale}/register/owner`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container hover:text-on-primary transition-all"
          >
            {t(locale, "marketing", "home.header.postListing")}
          </Link>
          <span
            aria-hidden="true"
            className="flex w-8 h-8 items-center justify-center rounded-full bg-primary"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
