"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared/logo";
import { buttonClasses } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { t, type Locale } from "@/lib/i18n";
import { isActivePath, localePath, PRIMARY_NAV, SIGN_IN_PATH } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";
import { LanguageSwitch } from "./language-switch";
import { ThemeSwitch } from "./theme-switch";

/**
 * Floating pill nav (decision 019, design-system-proposal §8.3).
 *
 * - Fixed, detached from the viewport edges, aligned to the 1200px container.
 * - Solid surface + border + elevation. No glass, no blur, no transparency,
 *   so it stays legible over any photo and cheap to paint on low-end phones.
 * - Never hides or resizes on scroll; elevation steps up once content scrolls under it.
 * - Below 1024px it collapses to logo, language and a menu button.
 */
export function PillNav({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const signInHref = localePath(locale, SIGN_IN_PATH);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[var(--nav-top)] z-40 px-3 sm:px-6 xl:px-8">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-[var(--nav-height)] w-full max-w-[1200px] items-center gap-2 rounded-full border border-border bg-surface pr-1.5 pl-4 transition-shadow duration-150 dark:bg-raised",
          scrolled ? "shadow-e3" : "shadow-e2",
        )}
      >
        <Link href={localePath(locale, "/")} aria-label={t(locale, "common", "brand.home")} className="-ml-1 rounded-full p-1">
          <Logo compact />
        </Link>

        <nav aria-label={t(locale, "common", "nav.primary")} className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item) => {
              const active = isActivePath(pathname, locale, item.path);
              return (
                <li key={item.path}>
                  <Link
                    href={localePath(locale, item.path)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full px-4 text-body-sm font-medium transition-colors duration-[120ms]",
                      active ? "bg-action-subtle text-primary" : "text-secondary hover:bg-sunken hover:text-primary",
                    )}
                  >
                    {t(locale, "common", item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <LanguageSwitch locale={locale} />
          {/* Wrapper does the hiding: buttonClasses sets inline-flex, which would override `hidden`. */}
          <span className="hidden lg:block">
            <Link href={signInHref} className={buttonClasses({ variant: "secondary", size: "sm", shape: "pill" })}>
              {t(locale, "common", "nav.signIn")}
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t(locale, "common", "nav.openMenu")}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="inline-flex size-10 items-center justify-center rounded-full text-primary hover:bg-sunken lg:hidden"
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      <div className="pointer-events-auto">
        <Dialog
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          title={t(locale, "common", "nav.menuTitle")}
          closeLabel={t(locale, "common", "nav.closeMenu")}
          variant="sheet-right"
          footer={
            <Link
              href={signInHref}
              onClick={() => setMenuOpen(false)}
              className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}
            >
              {t(locale, "common", "nav.signIn")}
            </Link>
          }
        >
          <nav aria-label={t(locale, "common", "nav.primary")}>
            <ul className="flex flex-col gap-1">
              {PRIMARY_NAV.map((item) => {
                const active = isActivePath(pathname, locale, item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={localePath(locale, item.path)}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex h-12 items-center rounded-md px-3 text-body font-medium",
                        active ? "bg-action-subtle text-primary" : "text-primary hover:bg-sunken",
                      )}
                    >
                      {t(locale, "common", item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
            <ThemeSwitch locale={locale} />
            <div>
              <p className="mb-1.5 text-body-sm font-medium text-primary">{t(locale, "common", "language.label")}</p>
              <LanguageSwitch locale={locale} variant="row" />
            </div>
          </div>
        </Dialog>
      </div>
    </header>
  );
}
