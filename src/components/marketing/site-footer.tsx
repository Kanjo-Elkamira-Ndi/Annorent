import Link from "next/link";

import { t, type Locale } from "@/lib/i18n";

/**
 * Public site footer — the link grid and legal bar that close every marketing
 * page.
 *
 * Owns: the brand lockup and blurb, the four link columns, the preference
 * toggles, and the legal row.
 * Does not own: the locale and currency switchers. The reference design draws
 * them as toggles, but switching is owned by `proxy.ts` and a currency store
 * that do not exist yet, so they are rendered as inert state indicators rather
 * than buttons that would not do anything.
 *
 * Server component — the whole footer is static markup.
 */

type LinkColumn = {
  headingKey: string;
  links: ReadonlyArray<{ labelKey: string; href: string }>;
};

const COLUMNS: ReadonlyArray<LinkColumn> = [
  {
    headingKey: "home.footer.metropolises",
    links: [
      { labelKey: "home.footer.city.abidjan", href: "/map?city=abidjan" },
      { labelKey: "home.footer.city.dakar", href: "/map?city=dakar" },
      { labelKey: "home.footer.city.douala", href: "/map?city=douala" },
      { labelKey: "home.footer.city.kigali", href: "/map?city=kigali" },
      { labelKey: "home.footer.city.nairobi", href: "/map?city=nairobi" },
      { labelKey: "home.footer.city.cotonou", href: "/map?city=cotonou" },
    ],
  },
  {
    headingKey: "home.footer.platform",
    links: [
      { labelKey: "home.footer.link.buyRent", href: "/properties" },
      { labelKey: "home.footer.link.coworking", href: "/rentals" },
      { labelKey: "home.footer.link.hotels", href: "/hotels" },
      { labelKey: "home.footer.link.map", href: "/map" },
      { labelKey: "home.footer.link.tours", href: "/properties?tour=vr" },
    ],
  },
  {
    headingKey: "home.footer.owners",
    links: [
      { labelKey: "home.footer.link.post", href: "/register/owner" },
      { labelKey: "home.footer.link.guarantee", href: "/legal/terms" },
      { labelKey: "home.footer.link.b2b", href: "/partners" },
      { labelKey: "home.footer.link.valuation", href: "/properties?valuation=1" },
    ],
  },
];

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  return (
    <footer className="w-full bg-surface-container-low mt-16">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter pb-12">
          <div className="col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4 w-fit">
              <span className="flex w-8 h-8 items-center justify-center rounded-lg bg-primary">
                <span aria-hidden="true" className="material-symbols-outlined text-on-primary text-[20px]">
                  apartment
                </span>
              </span>
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                ANNORENT
              </span>
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6">
              {t(locale, "marketing", "home.footer.blurb")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm">
                <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                  verified
                </span>
                {t(locale, "marketing", "home.footer.badgeVerified")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm">
                <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                  view_in_ar
                </span>
                {t(locale, "marketing", "home.footer.badgeVr")}
              </span>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.headingKey} aria-label={t(locale, "marketing", column.headingKey)}>
              <h4 className="font-headline-sm text-[16px] text-on-surface mb-4">
                {t(locale, "marketing", column.headingKey)}
              </h4>
              <ul className="space-y-2 font-body-md text-body-md text-on-surface-variant">
                {column.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="hover:text-primary transition-colors"
                    >
                      {t(locale, "marketing", link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h4 className="font-headline-sm text-[16px] text-on-surface mb-4">
              {t(locale, "marketing", "home.footer.preferences")}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container text-on-surface-variant">
                <span className="font-label-sm text-label-sm">
                  {t(locale, "marketing", "home.footer.language")}
                </span>
                <div className="flex gap-1" aria-hidden="true">
                  <span className="px-2 py-0.5 rounded text-on-surface-variant font-label-sm text-label-sm">
                    FR
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm">
                    {locale.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container text-on-surface-variant">
                <span className="font-label-sm text-label-sm">
                  {t(locale, "marketing", "home.footer.currency")}
                </span>
                <div className="flex gap-1" aria-hidden="true">
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm">
                    FCFA
                  </span>
                  <span className="px-2 py-0.5 rounded text-on-surface-variant font-label-sm text-label-sm">
                    USD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {t(locale, "marketing", "home.footer.copyright")}
          </p>
          <div className="flex flex-wrap items-center gap-6 font-label-sm text-label-sm text-on-surface-variant">
            {(
              [
                ["home.footer.legal.terms", "/legal/terms"],
                ["home.footer.legal.privacy", "/legal/privacy"],
                ["home.footer.legal.notice", "/legal/privacy"],
                ["home.footer.legal.compliance", "/legal/terms"],
              ] as const
            ).map(([labelKey, href]) => (
              <Link
                key={labelKey}
                href={`/${locale}${href}`}
                className="hover:text-primary transition-colors"
              >
                {t(locale, "marketing", labelKey)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
