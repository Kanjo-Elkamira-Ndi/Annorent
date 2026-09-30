import Link from "next/link";

import { t, type Locale } from "@/lib/i18n";

/**
 * Closing call to action for property and hotel owners — the institutional
 * security pitch that ends the home page.
 */

type OwnerCtaProps = {
  locale: Locale;
};

export function OwnerCta({ locale }: OwnerCtaProps) {
  return (
    <section
      aria-labelledby="owner-cta-heading"
      className="w-full bg-surface py-16"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="rounded-xl bg-surface-container p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary font-label-sm text-label-sm mb-4">
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                shield
              </span>
              {t(locale, "marketing", "home.cta.pill")}
            </div>
            <h2
              id="owner-cta-heading"
              className="font-headline-md text-headline-md lg:text-[28px] text-on-surface font-bold mb-3"
            >
              {t(locale, "marketing", "home.cta.title")}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t(locale, "marketing", "home.cta.body")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
            <Link
              href={`/${locale}/register/owner`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-[16px] shadow-sm transition-all"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                add_business
              </span>
              {t(locale, "marketing", "home.cta.listProperty")}
            </Link>
            <Link
              href={`/${locale}/partners`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container-high font-headline-sm text-[16px] transition-all"
            >
              {t(locale, "marketing", "home.cta.investorPortal")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
