import Image from "next/image";
import Link from "next/link";

import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

/**
 * Public site header — the fixed bar above every marketing page.
 *
 * Owns: the brand lockup and the primary navigation for the public experience.
 * The marketing page should be clean, low-noise, and focused on discoverability.
 */

const RENTAL_DROPDOWN = [
  { label: "Buy & Rent", href: "/properties" },
  { label: "Flexible Rentals", href: "/rentals" },
  { label: "Hotels & Residences", href: "/hotels" },
  { label: "Map Discovery", href: "/map" },
] as const;

const PUBLIC_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Legal", href: "/legal/terms" },
  { label: "Partners", href: "/partners" },
] as const;

type SiteHeaderProps = {
  locale: Locale;
  /** Currently active nav href, for the highlighted state. */
  activeHref?: string;
};

export function SiteHeader({ locale, activeHref }: SiteHeaderProps) {
  const dropdownActive = RENTAL_DROPDOWN.some((item) => activeHref === item.href);

  return (
    <header className="fixed top-0 z-50 w-full bg-surface-container-lowest/90 shadow-[0_1px_8px_rgba(4,27,60,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-container-max items-center justify-between gap-gutter px-margin-mobile lg:px-margin-desktop">
        <div className="flex items-center gap-gutter">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-primary/15 bg-surface-container-low shadow-sm">
              <Image
                src="/logo.jpg"
                alt="Annorent logo"
                width={44}
                height={44}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary">
                ANNORENT
              </span>
            </div>
          </Link>
        </div>

        <nav
          aria-label={t(locale, "marketing", "home.nav.label")}
          className="hidden items-center gap-2 lg:flex"
        >
          <div className="group relative">
            <button
              type="button"
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 font-label-md text-label-md transition-colors",
                dropdownActive
                  ? "bg-primary-container text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              )}
            >
              <span>Available Rentals</span>
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </button>

            <div className="invisible absolute left-0 top-full z-20 mt-2 min-w-[220px] translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-outline-variant/70 bg-surface-container-lowest shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
                {RENTAL_DROPDOWN.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={`/${locale}${item.href}`}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors",
                        isActive
                          ? "bg-primary-container text-on-primary"
                          : "text-on-surface hover:bg-surface-container hover:text-on-surface",
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {PUBLIC_LINKS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 font-label-md text-label-md transition-colors",
                  isActive
                    ? "bg-primary-container text-on-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/login`}
            className="inline-flex items-center justify-center rounded-lg px-3 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            {t(locale, "marketing", "home.header.login")}
          </Link>
        </div>
      </div>
    </header>
  );
}
