import { t, type Locale } from "@/lib/i18n";
import { SearchBar } from "./search-bar";

/**
 * Home hero — the primary marketing surface.
 *
 * Owns: the photographic background, its contrast vignette, and the copy
 * stack. Does not own: the search interaction (`search-bar.tsx` is the client
 * island) or the trust row (`trust-metrics.tsx`).
 *
 * Ported from the Stitch "Home - Annorent Marketplace" screen. One deliberate
 * deviation: Stitch's hero carries `-mt-20` to sit under a fixed site header,
 * which this project does not have yet, so the offset is dropped and the
 * original `pt-24 lg:pt-32` rhythm is preserved.
 */

type HeroProps = {
  locale: Locale;
  className?: string;
};

export function Hero({ locale, className }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className={[
        "relative w-full overflow-hidden pb-20 pt-24 lg:pb-28 lg:pt-32",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Photographic background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* Contrast vignette — keeps body copy above 7:1 against the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-on-surface/80 via-on-surface/60 to-surface"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-container-max flex-col items-center px-margin-mobile lg:px-margin-desktop">
        {/* Announcement pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-container-lowest/20 px-3.5 py-1.5 text-surface-bright shadow-sm backdrop-blur-md">
          <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-tertiary-fixed">
            verified
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider">
            {t(locale, "marketing", "home.hero.badge")}
          </span>
        </div>

        <h1
          id="hero-title"
          className="mb-4 max-w-4xl text-center font-display-lg text-display-lg-mobile text-surface-container-lowest drop-shadow-md tracking-tight lg:text-display-lg"
        >
          {t(locale, "marketing", "home.hero.title")}
        </h1>

        <p className="mb-10 max-w-2xl text-center font-body-lg text-body-lg text-surface-container-high opacity-95">
          {t(locale, "marketing", "home.hero.subtitle")}
        </p>

        <SearchBar locale={locale} />
      </div>
    </section>
  );
}
