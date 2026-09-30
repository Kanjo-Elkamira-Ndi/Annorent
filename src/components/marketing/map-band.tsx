import Link from "next/link";

import { t, type Locale } from "@/lib/i18n";
import { MAP_BAND } from "@/lib/marketing-data";
import { cn } from "@/lib/utils/cn";

/**
 * The dark "explore by neighborhood" band.
 *
 * The Stitch reference draws a static photograph behind a left-to-right
 * gradient with the copy and buttons over it — there is no embedded map, no
 * marker layer, and no map provider in the source. This stays a static image
 * until a real provider is chosen; the `Explore on map` action is a normal link
 * so it degrades to a page transition rather than a dead control.
 */

type MapBandProps = {
  locale: Locale;
};

export function MapBand({ locale }: MapBandProps) {
  return (
    <section
      aria-labelledby="map-band-heading"
      className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-12"
    >
      <div className="relative w-full rounded-xl overflow-hidden bg-on-surface text-surface-container-lowest p-6 lg:p-10 shadow-lg">
        <div
          role="img"
          aria-label={MAP_BAND.imageAlt}
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('${MAP_BAND.image}')` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-on-surface via-on-surface/90 to-transparent"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/40 backdrop-blur-md font-label-sm text-label-sm text-primary-fixed mb-3">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping" />
              {t(locale, "marketing", "home.map.pill")}
            </div>
            <h2
              id="map-band-heading"
              className="font-headline-md text-headline-md lg:text-[32px] text-surface-container-lowest mb-2 font-bold"
            >
              {t(locale, "marketing", "home.map.title")}
            </h2>
            <p className="font-body-md text-body-md text-surface-container-high opacity-90">
              {t(locale, "marketing", "home.map.body")}
            </p>

            <div className="flex items-center gap-6 mt-4">
              {MAP_BAND.stats.map((stat) => (
                <div key={stat.value} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-display-lg text-display-lg-mobile font-bold",
                      stat.value.startsWith("+")
                        ? "text-tertiary-fixed"
                        : "text-primary-fixed-dim",
                    )}
                  >
                    {stat.value}
                  </span>
                  <span className="font-label-sm text-label-sm text-surface-container">
                    {t(locale, "marketing", stat.labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href={`/${locale}/map`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-[16px] shadow-md transition-all"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                explore
              </span>
              {t(locale, "marketing", "home.map.explore")}
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-md text-surface-container-lowest font-headline-sm text-[16px] transition-all"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                radar
              </span>
              {t(locale, "marketing", "home.map.zone")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
