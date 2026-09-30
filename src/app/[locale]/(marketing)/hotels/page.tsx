import { SiteHeader } from "@/components/layout/site-header";
import { AssuranceStrip } from "@/components/marketing/assurance-strip";
import { HotelCardView } from "@/components/marketing/hotel-card";
import { Pagination } from "@/components/marketing/pagination";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SortSelect } from "@/components/marketing/sort-select";
import { isLocale, t, type Locale } from "@/lib/i18n";
import {
  HOTEL_ASSURANCES,
  HOTEL_CARDS,
  HOTEL_DESTINATIONS,
  HOTEL_GUARANTEE,
  HOTEL_PAGINATION,
  HOTEL_QUICK_FILTERS,
  HOTEL_SORT_OPTIONS,
  type HotelCard,
} from "@/lib/marketing/hotels";

/**
 * Public hotels and residences — `/[locale]/hotels`.
 *
 * Ported from the Stitch reference "Hotels & Residences - Annorent".
 *
 * The search panel is the one place on this page that needs real form
 * semantics: the destination picker, the stay-date field, and the guest field
 * are labelled native controls inside a `<form>`, and the quick filters are a
 * checkbox group. Nothing is wired to a backend yet, so the form has no
 * action and the submit button is `type="submit"` only to stay keyboard-
 * reachable with an accessible name.
 *
 * Fixed-header offset pair is the shared `pt-20` / `-mt-20` one; see
 * `context/file-structure.md` §3.
 */

export default async function HotelsPage({ params }: PageProps<"/[locale]/hotels">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const baseHref = `/${typed}/hotels`;

  return (
    <>
      <SiteHeader locale={typed} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <section className="w-full bg-surface-container-low/70 py-8">
          <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-1"
              >
                shield
              </span>
              <div>
                <p className="font-label-md text-label-md font-semibold text-tertiary">
                  {t(typed, "marketing", "hotels.escrowBadge")}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 max-w-3xl">
                  {t(typed, "marketing", "hotels.subtitle")}
                </p>
              </div>
            </div>

            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight -mt-2">
              {t(typed, "marketing", "hotels.title")}
            </h1>

            {/* Search panel */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] gap-3 bg-surface-container-lowest rounded-xl p-3 shadow-sm"
              aria-label={t(typed, "marketing", "hotels.searchPanel")}
            >
              <div>
                <label
                  htmlFor="hotel-destination"
                  className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant mb-1"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                    location_city
                  </span>
                  {t(typed, "marketing", "hotels.destinationLabel")}
                </label>
                <div className="relative">
                  <select
                    id="hotel-destination"
                    name="destination"
                    defaultValue={HOTEL_DESTINATIONS[0]}
                    className="w-full appearance-none bg-surface-container-low px-3 py-2.5 pr-9 rounded-lg font-label-md text-label-md text-on-surface focus:outline-primary cursor-pointer"
                  >
                    {HOTEL_DESTINATIONS.map((key) => (
                      <option key={key} value={key}>
                        {t(typed, "marketing", key)}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]"
                  >
                    expand_more
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="hotel-dates"
                  className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant mb-1"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                    calendar_month
                  </span>
                  {t(typed, "marketing", "hotels.datesLabel")}
                </label>
                <input
                  id="hotel-dates"
                  name="dates"
                  type="text"
                  readOnly
                  value={t(typed, "marketing", "hotels.datesValue")}
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-lg font-label-md text-label-md text-on-surface focus:outline-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="hotel-guests"
                  className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant mb-1"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                    group
                  </span>
                  {t(typed, "marketing", "hotels.guestsLabel")}
                </label>
                <input
                  id="hotel-guests"
                  name="guests"
                  type="text"
                  readOnly
                  value={t(typed, "marketing", "hotels.guestsValue")}
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-lg font-label-md text-label-md text-on-surface focus:outline-primary"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    search
                  </span>
                  {t(typed, "marketing", "hotels.searchAction")}
                </button>
              </div>
            </form>

            <AssuranceStrip locale={typed} assurances={HOTEL_ASSURANCES} />

            {/* Quick filters and sort */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <fieldset>
                <legend className="sr-only">{t(typed, "marketing", "hotels.quickFilters")}</legend>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium mr-1">
                    {t(typed, "marketing", "hotels.quickFilters")}
                  </span>
                  {HOTEL_QUICK_FILTERS.map((filter) => (
                    <label key={filter.labelKey} className="cursor-pointer">
                      <input type="checkbox" name="amenity" className="peer sr-only" />
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface transition-colors shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-checked:bg-primary-container peer-checked:text-on-primary peer-checked:font-semibold">
                        {filter.icon ? (
                          <span
                            aria-hidden="true"
                            className="material-symbols-outlined text-[16px] text-primary peer-checked:text-on-primary"
                          >
                            {filter.icon}
                          </span>
                        ) : null}
                        {t(typed, "marketing", filter.labelKey)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <SortSelect
                locale={typed}
                labelKey="hotels.sortLabel"
                options={HOTEL_SORT_OPTIONS}
                id="hotel-sort"
              />
            </div>
          </div>
        </section>

        {/* Results */}
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-8 w-full flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              <span className="text-primary font-bold">38</span>{" "}
              {t(typed, "marketing", "hotels.staysAvailable")}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t(typed, "marketing", "hotels.negotiatedRates")}
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {HOTEL_CARDS.map((card: HotelCard) => (
              <li key={card.id} className="flex">
                <HotelCardView locale={typed} card={card} href={`${baseHref}/${card.id}`} />
              </li>
            ))}
          </ul>

          {/* Escrow guarantee */}
          <section className="rounded-xl border border-tertiary/25 bg-tertiary-container/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-tertiary text-[28px] shrink-0"
              >
                {HOTEL_GUARANTEE.icon}
              </span>
              <div>
                <h2 className="font-headline-sm text-[18px] text-on-surface">
                  {t(typed, "marketing", HOTEL_GUARANTEE.titleKey)}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xl">
                  {t(typed, "marketing", HOTEL_GUARANTEE.bodyKey)}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                  {HOTEL_GUARANTEE.perks.map((perk) => (
                    <li
                      key={perk.icon}
                      className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface"
                    >
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-[16px] text-tertiary"
                      >
                        {perk.icon}
                      </span>
                      {t(typed, "marketing", perk.labelKey)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <Pagination
            locale={typed}
            pagination={HOTEL_PAGINATION}
            range={{ from: "1", to: "3", total: "38" }}
            baseHref={baseHref}
          />
        </div>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
