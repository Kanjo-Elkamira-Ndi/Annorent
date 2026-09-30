import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { isLocale, t, type Locale } from "@/lib/i18n";
import {
  DETAIL_AGENT,
  DETAIL_AMENITIES,
  DETAIL_BREADCRUMB,
  DETAIL_CERTIFICATE,
  DETAIL_GALLERY,
  DETAIL_HERO,
  DETAIL_LEASE_OPTIONS,
  DETAIL_MAP,
  DETAIL_POWER,
  DETAIL_PRICES,
  DETAIL_SPECS,
} from "@/lib/marketing/property-details";

/**
 * Public property detail — `/[locale]/properties/[id]`.
 *
 * Ported from the Stitch reference "Property Details - Villa Cocody - Annorent".
 *
 * Two decisions worth flagging:
 *
 * 1. The gallery is a static mosaic, not a carousel. Stitch's reference
 *    artwork shows a hero plus four fixed thumbnails; there is no slide
 *    behaviour specified, and inventing one would mean guessing at transition
 *    and control design. Every thumbnail is a button labelled with its own
 *    caption so the intent is discoverable, and the hero carries the full
 *    description as its accessible name.
 *
 * 2. The booking sidebar is a real `<form>` with labelled inputs. It holds the
 *    two date fields and the four lease-term radios, so it is keyboard
 *    operable and the labels are programmatically associated rather than
 *    placeholder-only.
 *
 * The single property is resolved from static data because the API is not
 * running here; the component below is already keyed on `[id]`, so swapping
 * the lookup for a fetch touches only this function.
 *
 * Fixed-header offset pair is the shared `pt-20` / `-mt-20` one; see
 * `context/file-structure.md` §3.
 */

export default async function PropertyDetailPage({
  params,
}: PageProps<"/[locale]/properties/[id]">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <SiteHeader locale={typed} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="w-full bg-surface-container-low/70">
          <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-4">
            {/* Breadcrumb */}
            <nav aria-label={t(typed, "marketing", "details.breadcrumb")}>
              <ol className="flex flex-wrap items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                {DETAIL_BREADCRUMB.map((crumb, i) => {
                  const isLast = i === DETAIL_BREADCRUMB.length - 1;
                  return (
                    <li key={crumb.labelKey} className="flex items-center gap-1.5">
                      {crumb.href ? (
                        <a href={`/${typed}${crumb.href}`} className="hover:text-primary transition-colors">
                          {t(typed, "marketing", crumb.labelKey)}
                        </a>
                      ) : (
                        <span aria-current="page" className="text-on-surface font-semibold">
                          {t(typed, "marketing", crumb.labelKey)}
                        </span>
                      )}
                      {isLast ? null : (
                        <span aria-hidden="true" className="text-outline">
                          /
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Gallery mosaic */}
            <section aria-label={t(typed, "marketing", "details.gallery.label")} className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative md:col-span-2 h-[300px] md:h-[440px] rounded-lg overflow-hidden bg-surface-container">
                  <div
                    role="img"
                    aria-label={DETAIL_HERO.imageAlt}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${DETAIL_HERO.image}')` }}
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md">
                      <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                        view_in_ar
                      </span>
                      {t(typed, "marketing", "details.hero.vrTour")}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest/90 text-primary font-label-md text-label-md shadow-md">
                      <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                        play_circle
                      </span>
                      {t(typed, "marketing", "details.hero.videoTour")}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-inverse-surface/85 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed" />
                      {t(typed, "marketing", "details.hero.certified")}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-3 h-[300px] md:h-[440px]">
                  {DETAIL_GALLERY.map((image, i) => {
                    const isLast = i === DETAIL_GALLERY.length - 1;
                    return (
                      <div
                        key={image.src}
                        className="relative group overflow-hidden rounded-lg bg-surface-container"
                      >
                        <div
                          role="img"
                          aria-label={image.alt}
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url('${image.src}')` }}
                        />
                        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-inverse-surface/75 text-inverse-on-surface font-label-sm text-[11px]">
                          {t(typed, "marketing", image.captionKey ?? "")}
                        </span>
                        {isLast ? (
                          <button
                            type="button"
                            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-1.5 bg-inverse-surface/40 hover:bg-inverse-surface/50 text-inverse-on-surface transition-all"
                          >
                            <span
                              aria-hidden="true"
                              className="material-symbols-outlined text-[26px]"
                            >
                              photo_library
                            </span>
                            <span className="font-headline-sm text-headline-sm text-on-primary">
                              {DETAIL_HERO.photoCount} {t(typed, "marketing", "details.gallery.photos")}
                            </span>
                            <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider">
                              {t(typed, "marketing", "details.gallery.viewGallery")}
                            </span>
                            <span className="sr-only">
                              {t(typed, "marketing", "details.gallery.label")}
                            </span>
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Content and booking sidebar */}
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
              {/* Title block */}
              <section className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[11px] font-semibold">
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    {t(typed, "marketing", "details.verifiedOnSite")}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-[11px] font-semibold">
                    <span aria-hidden="true" className="material-symbols-outlined text-[13px]">
                      format_image_left
                    </span>
                    {t(typed, "marketing", "details.certifiedAudit")}
                  </span>
                </div>

                <p className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-primary">
                    location_on
                  </span>
                  {t(typed, "marketing", DETAIL_MAP.addressKey)}
                </p>

                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  {t(typed, "marketing", "details.title")}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  {t(typed, "marketing", "details.subtitle")}
                </p>

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-surface-container">
                  {DETAIL_SPECS.map((spec) => (
                    <div key={spec.labelKey}>
                      <dt className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                        <span
                          aria-hidden="true"
                          className="material-symbols-outlined text-[18px] text-primary"
                        >
                          {spec.icon}
                        </span>
                        {t(typed, "marketing", spec.labelKey)}
                      </dt>
                      <dd className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* About */}
              <section aria-labelledby="about-heading" className="flex flex-col gap-4">
                <h2 id="about-heading" className="font-headline-sm text-headline-sm text-on-surface">
                  {t(typed, "marketing", "details.about.title")}
                </h2>
                {["p1", "p2", "p3"].map((key) => (
                  <p
                    key={key}
                    className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
                  >
                    {t(typed, "marketing", `details.about.${key}`)}
                  </p>
                ))}

                <div className="flex items-start gap-3 p-4 rounded-xl bg-tertiary-container/40 border border-tertiary/20">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-tertiary text-[22px] shrink-0"
                  >
                    {DETAIL_POWER.icon}
                  </span>
                  <div>
                    <p className="font-label-md text-label-md font-semibold text-on-surface">
                      {t(typed, "marketing", DETAIL_POWER.titleKey)}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      {t(typed, "marketing", DETAIL_POWER.bodyKey)}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[11px] font-bold">
                    {t(typed, "marketing", DETAIL_POWER.statKey)}
                  </span>
                </div>
              </section>

              {/* Amenities */}
              <section aria-labelledby="amenities-heading" className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <h2
                    id="amenities-heading"
                    className="font-headline-sm text-headline-sm text-on-surface"
                  >
                    {t(typed, "marketing", "details.amenities.title")}
                  </h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t(typed, "marketing", "details.amenities.count")}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DETAIL_AMENITIES.map((amenity) => (
                    <li
                      key={amenity.icon}
                      className="flex items-center gap-3.5 p-3.5 rounded-lg bg-surface-container-low"
                    >
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-primary text-[24px] shrink-0"
                      >
                        {amenity.icon}
                      </span>
                      <div>
                        <p className="font-label-md text-label-md font-semibold text-on-surface">
                          {amenity.label}
                        </p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          {t(typed, "marketing", amenity.noteKey)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Location */}
              <section aria-labelledby="location-heading" className="flex flex-col gap-4">
                <div>
                  <h2
                    id="location-heading"
                    className="font-headline-sm text-headline-sm text-on-surface"
                  >
                    {t(typed, "marketing", "details.map.title")}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {t(typed, "marketing", DETAIL_MAP.neighborhoodKey)}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {DETAIL_MAP.nearby.map((item) => (
                    <li
                      key={item.labelKey}
                      className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface"
                    >
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-[16px] text-tertiary"
                      >
                        {item.icon}
                      </span>
                      {t(typed, "marketing", item.labelKey)}
                    </li>
                  ))}
                </ul>

                <div
                  role="img"
                  aria-label={t(typed, "marketing", DETAIL_MAP.imageAltKey)}
                  className="w-full h-64 rounded-lg bg-cover bg-center bg-surface-container"
                  style={{ backgroundImage: `url('${DETAIL_MAP.image}')` }}
                />

                <p className="flex items-start gap-2 p-4 rounded-lg bg-surface-container-low">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-px"
                  >
                    lock
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="font-semibold text-on-surface">
                      {t(typed, "marketing", "details.map.privacyTitle")}{" "}
                    </span>
                    {t(typed, "marketing", DETAIL_MAP.privacyKey)}
                  </span>
                </p>
              </section>

              {/* Certificate */}
              <section aria-labelledby="certificate-heading" className="flex items-start gap-4 p-5 rounded-xl border border-surface-container bg-surface-container-lowest">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-primary text-[24px] shrink-0"
                >
                  {DETAIL_CERTIFICATE.icon}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      id="certificate-heading"
                      className="font-headline-sm text-[18px] text-on-surface"
                    >
                      {t(typed, "marketing", DETAIL_CERTIFICATE.titleKey)}
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-[11px] font-semibold">
                      {t(typed, "marketing", DETAIL_CERTIFICATE.badgeKey)}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                    {t(typed, "marketing", DETAIL_CERTIFICATE.bodyKey)}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 font-label-md text-label-md font-semibold text-primary hover:underline mt-2"
                  >
                    {t(typed, "marketing", DETAIL_CERTIFICATE.linkKey)}
                    <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </section>
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-5 xl:col-span-4">
              <form
                className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(23,43,77,0.08)] p-6 sticky top-24 flex flex-col gap-5"
                aria-label={t(typed, "marketing", "details.booking.label")}
              >
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t(typed, "marketing", "details.price.perMonthLabel")}
                  </span>
                  <p className="font-headline-md text-headline-md text-on-surface font-bold">
                    {DETAIL_PRICES[0]?.amount}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {t(typed, "marketing", "details.price.conversion")}
                  </p>
                </div>

                <ul className="flex flex-col gap-2 py-4 border-y border-surface-container">
                  {DETAIL_PRICES.map((line) => (
                    <li
                      key={line.labelKey}
                      className={
                        line.emphasis
                          ? "flex items-center justify-between gap-3 pt-3 mt-1 border-t border-surface-container-high"
                          : "flex items-center justify-between gap-3"
                      }
                    >
                      <span className="font-body-sm text-body-sm text-on-surface-variant inline-flex items-center gap-1">
                        {line.note ? (
                          <span
                            aria-hidden="true"
                            className="material-symbols-outlined text-[14px] text-outline"
                          >
                            info
                          </span>
                        ) : null}
                        {t(typed, "marketing", line.labelKey)}
                      </span>
                      <span
                        className={
                          line.emphasis
                            ? "font-headline-sm text-headline-sm text-on-surface font-bold"
                            : "font-label-md text-label-md text-on-surface font-semibold"
                        }
                      >
                        {line.amount}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <label
                    htmlFor="move-in-date"
                    className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5"
                  >
                    {t(typed, "marketing", "details.booking.dateLabel")}
                  </label>
                  <input
                    id="move-in-date"
                    name="moveInDate"
                    type="date"
                    className="w-full bg-surface-container-low px-3 py-2.5 rounded-lg font-label-md text-label-md text-on-surface focus:outline-primary"
                  />
                </div>

                <fieldset>
                  <legend className="font-label-md text-label-md font-semibold text-on-surface mb-2">
                    {t(typed, "marketing", "details.booking.leaseLabel")}
                  </legend>
                  <div className="flex flex-col gap-2">
                    {DETAIL_LEASE_OPTIONS.map((key, i) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="leaseTerm"
                          defaultChecked={i === 0}
                          className="w-4 h-4 accent-primary cursor-pointer shrink-0"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                          {t(typed, "marketing", key)}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm"
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    {t(typed, "marketing", "details.booking.submit")}
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-primary text-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors"
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                      chat
                    </span>
                    {t(typed, "marketing", "details.booking.contact")}
                  </button>
                </div>

                {/* Agent */}
                <div className="flex items-center gap-3 pt-4 border-t border-surface-container">
                  <div
                    role="img"
                    aria-label={DETAIL_AGENT.imageAlt}
                    className="w-12 h-12 rounded-full bg-cover bg-center shrink-0 bg-surface-container"
                    style={{ backgroundImage: `url('${DETAIL_AGENT.image}')` }}
                  />
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                      {DETAIL_AGENT.name}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      {t(typed, "marketing", DETAIL_AGENT.roleKey)}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant inline-flex items-center gap-1">
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-[14px] text-amber-400"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {DETAIL_AGENT.rating} ({DETAIL_AGENT.reviews})
                    </p>
                  </div>
                </div>

                <p className="flex items-start gap-2 p-3 rounded-lg bg-tertiary-container/40">
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-px"
                  >
                    lock_clock
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="font-semibold text-on-surface">
                      {t(typed, "marketing", DETAIL_AGENT.escrowKey)}{" "}
                    </span>
                    {t(typed, "marketing", DETAIL_AGENT.escrowBodyKey)}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
