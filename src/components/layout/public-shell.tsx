import type { ReactNode } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { PillNav } from "@/components/navigation/pill-nav";
import type { Locale } from "@/lib/i18n";
import { SiteFooter } from "./site-footer";

/**
 * Public marketplace chrome: floating pill nav, main region, footer and the
 * phone bottom tab bar.
 *
 * `main` reserves room for both floating pills, so content never starts under
 * the top pill and the last line is never hidden behind the bottom one.
 */
export function PublicShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <>
      <PillNav locale={locale} />
      <main
        id="main"
        tabIndex={-1}
        className="min-h-[60dvh] pt-[calc(var(--nav-top)+var(--nav-height)+var(--nav-gap))] outline-none"
      >
        {children}
      </main>
      <div className="pb-[calc(var(--bottom-nav-height)+24px+env(safe-area-inset-bottom))] md:pb-0">
        <SiteFooter locale={locale} />
      </div>
      <BottomNav locale={locale} />
    </>
  );
}
