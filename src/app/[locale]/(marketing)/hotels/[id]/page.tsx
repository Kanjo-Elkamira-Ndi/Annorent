import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { HOTEL_CARDS } from "@/lib/marketing/hotels";

function getHotel(id: string) {
  return HOTEL_CARDS.find((h) => h.id === id) ?? null;
}

export default async function HotelDetailPage({
  params,
}: PageProps<"/[locale]/hotels/[id]">) {
  const { locale, id } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const hotel = getHotel(id);

  if (!hotel) {
    return (
      <>
        <SiteHeader locale={typed} />
        <main className="w-full pt-20 bg-surface min-h-screen">
          <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-12">
            <h1 className="font-headline-md text-headline-md text-on-surface">
              {t(typed, "marketing", "hotels.notFound")}
            </h1>
            <Link
              href={`/${typed}/hotels`}
              className="mt-4 inline-flex items-center gap-2 font-label-md text-label-md text-primary"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              {t(typed, "marketing", "hotels.backTo")}
            </Link>
          </div>
        </main>
        <SiteFooter locale={typed} />
      </>
    );
  }

  return (
    <>
      <SiteHeader locale={typed} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="w-full bg-surface-container-low/70">
          <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-4">
            <nav aria-label={t(typed, "marketing", "details.breadcrumb")}>
              <ol className="flex flex-wrap items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <li className="flex items-center gap-1.5">
                  <Link href={`/${typed}`} className="hover:text-primary transition-colors">
                    {t(typed, "marketing", "details.breadcrumb.home")}
                  </Link>
                  <span aria-hidden="true" className="text-outline">
                    /
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Link href={`/${typed}/hotels`} className="hover:text-primary transition-colors">
                    {t(typed, "marketing", "details.breadcrumb.hotels")}
                  </Link>
                  <span aria-hidden="true" className="text-outline">
                    /
                  </span>
                </li>
                <li>
                  <span aria-current="page" className="text-on-surface font-semibold">
                    {t(typed, "marketing", hotel.nameKey)}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="relative rounded-lg overflow-hidden h-[320px] md:h-[420px] bg-surface-container">
                <div
                  role="img"
                  aria-label={hotel.imageAlt}
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${hotel.image}')` }}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-md">
                    {hotel.stars} ★ {t(typed, "marketing", hotel.categoryKey)}
                  </span>
                  {hotel.verified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 text-primary font-label-md text-label-md shadow-md">
                      <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                        verified
                      </span>
                      {t(typed, "marketing", "hotels.verified")}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    location_on
                  </span>
                  <span className="font-body-md text-body-md">
                    {t(typed, "marketing", hotel.locationKey)}
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  {t(typed, "marketing", hotel.nameKey)}
                </h1>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-label-sm">
                    {hotel.rating} {t(typed, "marketing", hotel.ratingLabelKey)}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {hotel.reviews} {t(typed, "marketing", hotel.reviewsLabelKey)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-surface-container-low p-5">
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">
                  {t(typed, "marketing", "hotels.detail.perks")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hotel.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span aria-hidden="true" className="material-symbols-outlined text-primary text-[20px]">
                        {perk.icon}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface">{perk.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg bg-surface-container-lowest shadow-lg ring-1 ring-surface-container-high p-5 flex flex-col gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md text-headline-md text-primary">
                      {hotel.price}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {t(typed, "marketing", hotel.priceSuffixKey)}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {t(typed, "marketing", hotel.priceNoteKey)}
                  </p>
                  <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded bg-tertiary-fixed-dim/20 text-on-surface-variant font-label-sm text-label-sm">
                    {t(typed, "marketing", hotel.promoKey)}
                  </span>
                </div>
                <div className="h-px bg-surface-container" />
                <Link
                  href={`/${typed}/login`}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container hover:text-on-primary transition-all"
                >
                  {t(typed, "marketing", hotel.ctaKey)}
                </Link>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
                  {t(typed, "marketing", hotel.ctaSubKey)}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
