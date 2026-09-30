import { t, type Locale } from "@/lib/i18n";

/**
 * Trust metrics bar — the reassurance row directly beneath the home hero.
 *
 * Owns: the four proof points and their icon tints. Does not own: the hero or
 * the search card.
 *
 * This is a sibling section rather than part of the hero: the Stitch reference
 * renders it on its own white surface immediately below the dark hero, so
 * keeping it separate preserves that edge instead of overlaying text on the
 * photograph.
 */

type Metric = {
  icon: string;
  titleKey: string;
  bodyKey: string;
  /** Icon tile background, per the Stitch reference. */
  tile: string;
  /** Icon foreground. */
  tint: string;
};

const METRICS: ReadonlyArray<Metric> = [
  {
    icon: "gavel",
    titleKey: "home.trust.verified.title",
    bodyKey: "home.trust.verified.body",
    tile: "bg-tertiary-container/10",
    tint: "text-tertiary-container",
  },
  {
    icon: "lock_clock",
    titleKey: "home.trust.secured.title",
    bodyKey: "home.trust.secured.body",
    tile: "bg-primary-container/10",
    tint: "text-primary",
  },
  {
    icon: "public",
    titleKey: "home.trust.metropolises.title",
    bodyKey: "home.trust.metropolises.body",
    tile: "bg-surface-container-highest",
    tint: "text-primary",
  },
  {
    icon: "support_agent",
    titleKey: "home.trust.support.title",
    bodyKey: "home.trust.support.body",
    tile: "bg-tertiary-container/10",
    tint: "text-tertiary",
  },
];

type TrustMetricsProps = {
  locale: Locale;
  className?: string;
};

export function TrustMetrics({ locale, className }: TrustMetricsProps) {
  return (
    <section
      aria-label={t(locale, "marketing", "home.trust.verified.title")}
      className={[
        "w-full bg-surface-container-lowest py-8 shadow-sm",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ul className="mx-auto grid w-full max-w-container-max grid-cols-2 gap-6 px-margin-mobile lg:grid-cols-4 lg:px-margin-desktop">
        {METRICS.map(({ icon, titleKey, bodyKey, tile, tint }) => (
          <li key={titleKey} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${tile}`}
            >
              <span className={`material-symbols-outlined text-[26px] ${tint}`}>{icon}</span>
            </span>
            <span className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                {t(locale, "marketing", titleKey)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t(locale, "marketing", bodyKey)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
