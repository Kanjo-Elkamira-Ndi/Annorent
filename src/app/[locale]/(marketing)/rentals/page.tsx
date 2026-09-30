import { SiteHeader } from "@/components/layout/site-header";
import { AssuranceStrip } from "@/components/marketing/assurance-strip";
import { Pagination } from "@/components/marketing/pagination";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SortSelect } from "@/components/marketing/sort-select";
import { WorkspaceCardView } from "@/components/marketing/workspace-card";
import { isLocale, t, type Locale } from "@/lib/i18n";
import {
  RENTALS_CARDS,
  RENTALS_CATEGORIES,
  RENTALS_PAGINATION,
  RENTALS_SORT_OPTIONS,
  RENTALS_VIEW_OPTIONS,
  type WorkspaceCard,
} from "@/lib/marketing/rentals";
import type { Assurance } from "@/lib/marketing/types";

/**
 * Public flexible rentals / coworking — `/[locale]/rentals`.
 *
 * Ported from the Stitch reference "Flexible Rentals & Coworking - Annorent".
 *
 * The category chips and billing toggle are drawn as real radio inputs inside
 * `fieldset`s so the single-select semantics and arrow-key navigation work
 * without a client boundary. They are inert until filtering is wired — the
 * design specifies the visual state, not the query-param contract.
 *
 * Fixed-header offset pair is the shared `pt-20` / `-mt-20` one; see
 * `context/file-structure.md` §3.
 */

const RENTALS_ASSURANCES: Assurance[] = [
  { icon: "verified_user", titleKey: "rentals.assurance.cancelTitle", bodyKey: "rentals.assurance.cancelBody" },
  { icon: "credit_card", titleKey: "rentals.assurance.payTitle", bodyKey: "rentals.assurance.payBody" },
];

export default async function RentalsPage({ params }: PageProps<"/[locale]/rentals">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const baseHref = `/${typed}/rentals`;

  return (
    <>
      <SiteHeader locale={typed} />
      <main className="w-full pt-20 bg-surface min-h-screen">
        {/* Hero with category and billing toggles */}
        <section className="w-full bg-surface-container-low/70 py-8">
          <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-[18px]">
                  hub
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  {t(typed, "marketing", "rentals.kicker")}
                </span>
              </div>
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                {t(typed, "marketing", "rentals.title")}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
                {t(typed, "marketing", "rentals.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-end">
              <fieldset>
                <legend className="font-label-md text-label-md font-semibold text-on-surface mb-2">
                  {t(typed, "marketing", "rentals.activeHubs")}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {RENTALS_CATEGORIES.map((key, i) => (
                    <label key={key} className="cursor-pointer" title={t(typed, "marketing", key)}>
                      <input
                        type="radio"
                        name="rental-category"
                        defaultChecked={i === 0}
                        className="peer sr-only"
                      />
                      <span className="inline-flex items-center px-4 py-2 rounded-lg font-label-md text-label-md transition-colors shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1 peer-checked:bg-primary peer-checked:text-on-primary peer-checked:shadow-md bg-surface-container-lowest text-on-surface-variant hover:text-on-surface">
                        {t(typed, "marketing", key)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-label-md text-label-md font-semibold text-on-surface mb-2">
                  {t(typed, "marketing", "rentals.billingLabel")}
                </legend>
                <div className="inline-flex gap-1 p-1 rounded-lg bg-surface-container-low">
                  {["rentals.billing.hourly", "rentals.billing.daily", "rentals.billing.monthly"].map(
                    (key, i) => (
                      <label key={key} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rental-billing"
                          defaultChecked={i === 1}
                          className="peer sr-only"
                        />
                        <span className="block px-4 py-1.5 rounded font-label-sm text-label-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-checked:bg-primary-container peer-checked:text-on-primary peer-checked:shadow-sm text-on-surface-variant hover:text-on-surface">
                          {t(typed, "marketing", key)}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </fieldset>
            </div>
          </div>
        </section>

        {/* Results */}
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-8 w-full flex flex-col gap-6">
          <AssuranceStrip locale={typed} assurances={RENTALS_ASSURANCES} variant="inline" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-headline-sm text-[18px] text-on-surface">
              <span className="text-primary font-bold">64</span>{" "}
              {t(typed, "marketing", "rentals.verifiedSpaces")}
            </p>
            <SortSelect
              locale={typed}
              labelKey="rentals.sortLabel"
              options={RENTALS_SORT_OPTIONS}
              id="rental-sort"
            />
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {RENTALS_CARDS.map((card: WorkspaceCard) => (
              <li key={card.id} className="flex">
                <WorkspaceCardView locale={typed} card={card} href={`${baseHref}/${card.id}`} />
              </li>
            ))}
          </ul>

          {/* Enterprise CTA */}
          <section className="rounded-xl bg-primary-container p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-on-primary text-[28px] shrink-0"
              >
                corporate_fare
              </span>
              <div>
                <h2 className="font-headline-sm text-[18px] text-on-primary">
                  {t(typed, "marketing", "rentals.enterprise.title")}
                </h2>
                <p className="font-body-sm text-body-sm text-on-primary/85 mt-1 max-w-xl">
                  {t(typed, "marketing", "rentals.enterprise.body")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm hover:opacity-95 transition-opacity"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  badge
                </span>
                {t(typed, "marketing", "rentals.enterprise.cta")}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  download
                </span>
                {t(typed, "marketing", "rentals.enterprise.pdf")}
              </a>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Pagination
              locale={typed}
              pagination={RENTALS_PAGINATION}
              range={{ from: "1", to: "6", total: "64" }}
              baseHref={baseHref}
            />
            <fieldset className="flex items-center gap-2">
              <legend className="sr-only">{t(typed, "marketing", "rentals.viewBy")}</legend>
              <span
                aria-hidden="true"
                className="font-label-sm text-label-sm text-on-surface-variant"
              >
                {t(typed, "marketing", "rentals.viewBy")}
              </span>
              {RENTALS_VIEW_OPTIONS.map((n, i) => (
                <label key={n} className="cursor-pointer">
                  <input
                    type="radio"
                    name="rental-per-page"
                    defaultChecked={i === 0}
                    className="peer sr-only"
                  />
                  <span className="block px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-checked:bg-primary peer-checked:text-on-primary text-on-surface-variant hover:bg-surface-container">
                    {n}
                  </span>
                </label>
              ))}
            </fieldset>
          </div>
        </div>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
