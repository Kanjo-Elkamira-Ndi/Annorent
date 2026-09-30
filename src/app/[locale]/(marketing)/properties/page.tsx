import { SiteHeader } from "@/components/layout/site-header";
import { ActiveFilterChips } from "@/components/marketing/active-filter-chips";
import { AssuranceStrip } from "@/components/marketing/assurance-strip";
import { FilterPanel } from "@/components/marketing/filter-panel";
import { Pagination } from "@/components/marketing/pagination";
import { SearchResultCard } from "@/components/marketing/search-result-card";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SortSelect } from "@/components/marketing/sort-select";
import { isLocale, t, type Locale } from "@/lib/i18n";
import {
  SEARCH_ACTIVE_FILTERS,
  SEARCH_ASSURANCES,
  SEARCH_CARDS,
  SEARCH_DISTRICT_MAP,
  SEARCH_FILTER_GROUPS,
  SEARCH_PAGINATION,
  SEARCH_SORT_OPTIONS,
} from "@/lib/marketing/property-search";

/**
 * Public property search — `/[locale]/properties`.
 *
 * Ported from the Stitch reference "Property Search - Annorent". Composition
 * only (rule 11): the toolbar, sidebar, grid, and footer are separate
 * components; this file only arranges them and threads the locale through.
 *
 * The fixed header offset pair is the same one the home page uses — `pt-20` on
 * `<main>` to reserve the bar, with the context bar pulling back under it.
 * See `context/file-structure.md` §3.
 */

const RESULT_COUNT = "248";

export default async function PropertiesPage({ params }: PageProps<"/[locale]/properties">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const baseHref = `/${typed}/properties`;

  return (
    <>
      <SiteHeader locale={typed} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        {/* Context bar: title, result count, alert and map actions */}
        <section className="w-full bg-surface-container-low/70 py-6">
          <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-tertiary" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                    {t(typed, "marketing", "search.kicker")}
                  </span>
                </div>
                <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight flex flex-wrap items-center gap-3">
                  <span>{t(typed, "marketing", "search.title")}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                    {t(typed, "marketing", "search.realTime")}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <button
                  type="button"
                  className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors font-label-md text-label-md"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    notifications_active
                  </span>
                  {t(typed, "marketing", "search.createAlert")}
                </button>
                <a
                  href={`/${typed}/map`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:opacity-95 transition-all"
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                    map
                  </span>
                  <span className="font-semibold">{t(typed, "marketing", "search.viewOnMap")}</span>
                </a>
              </div>
            </div>

            {/* Active filters and sorting */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <ActiveFilterChips
                locale={typed}
                filters={SEARCH_ACTIVE_FILTERS}
                baseHref={baseHref}
              />
              <SortSelect
                locale={typed}
                labelKey="search.sortLabel"
                options={SEARCH_SORT_OPTIONS}
                id="property-sort"
              />
            </div>
          </div>
        </section>

        {/* Filters and results */}
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <FilterPanel
              locale={typed}
              groups={SEARCH_FILTER_GROUPS}
              resultCount={RESULT_COUNT}
            />

            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
              <AssuranceStrip
                locale={typed}
                assurances={SEARCH_ASSURANCES}
                variant="bar"
              />

              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {SEARCH_CARDS.map((card) => (
                  <li key={card.id} className="flex">
                    <SearchResultCard
                      locale={typed}
                      card={card}
                      href={`${baseHref}/${card.id}`}
                    />
                  </li>
                ))}
              </ul>

              {/* District preview */}
              <section
                aria-labelledby="district-map-title"
                className="rounded-xl overflow-hidden border border-surface-container bg-surface-container-lowest"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
                  <div>
                    <h2
                      id="district-map-title"
                      className="font-headline-sm text-[18px] text-on-surface"
                    >
                      {t(typed, "marketing", "search.map.title")}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      {t(typed, "marketing", "search.map.body")}
                    </p>
                  </div>
                  <a
                    href={`/${typed}/map`}
                    className="inline-flex items-center gap-1.5 font-label-md text-label-md font-semibold text-primary hover:underline"
                  >
                    {t(typed, "marketing", "search.map.openFull")}
                    <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                      open_in_new
                    </span>
                  </a>
                </div>

                <div className="relative">
                  <div
                    role="img"
                    aria-label={t(typed, "marketing", SEARCH_DISTRICT_MAP.imageAltKey)}
                    className="w-full h-64 md:h-80 bg-cover bg-center"
                    style={{ backgroundImage: `url('${SEARCH_DISTRICT_MAP.image}')` }}
                  />
                  <ul className="absolute inset-0 flex flex-col sm:flex-row items-center sm:justify-around gap-2 p-4">
                    {SEARCH_DISTRICT_MAP.pins.map((pin) => (
                      <li
                        key={pin.labelKey}
                        className="px-3 py-1.5 rounded-full bg-surface-container-lowest/95 shadow-sm backdrop-blur-sm font-label-sm text-label-sm text-on-surface"
                      >
                        <span className="font-semibold text-primary">{pin.count}</span>{" "}
                        {t(typed, "marketing", pin.labelKey)}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <Pagination
                locale={typed}
                pagination={SEARCH_PAGINATION}
                range={{ from: "1", to: "6", total: RESULT_COUNT }}
                baseHref={baseHref}
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
