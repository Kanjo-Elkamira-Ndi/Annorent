"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { t, type Locale } from "@/lib/i18n";

/**
 * Floating search card — the interactive island inside the home hero.
 *
 * Owns: which category tab is active. Does not own: routing, fetching, or
 * result rendering — submitting is a plain GET so the query is shareable and
 * the form still works before hydration.
 *
 * Layout, spacing, and colour utilities are ported verbatim from the Stitch
 * "Home - Annorent Marketplace" screen (screens/53edc501418847e6ba5066b915f3b3da).
 *
 * Deviation from `context/file-structure.md` rule 16, noted per
 * `context/code-standards.md`: this imports the `t()` lookup directly rather
 * than an `I18nProvider`, because no provider exists yet and messages are a
 * static module. Swap to the provider once the first authenticated feature
 * introduces it.
 */

type TabKey = "rent" | "buy" | "flex" | "hotels";

const TABS: ReadonlyArray<{ value: TabKey; icon: string; labelKey: string; section: string }> = [
  { value: "rent", icon: "key", labelKey: "home.search.tab.rent", section: "rentals" },
  { value: "buy", icon: "real_estate_agent", labelKey: "home.search.tab.buy", section: "properties" },
  { value: "flex", icon: "desk", labelKey: "home.search.tab.flex", section: "rentals" },
  { value: "hotels", icon: "hotel", labelKey: "home.search.tab.hotels", section: "hotels" },
];

const PROPERTY_TYPES = [
  "home.search.type.villa",
  "home.search.type.penthouse",
  "home.search.type.office",
  "home.search.type.hotelSuite",
] as const;

const TRENDING = [
  "Villas with pool Cocody",
  "Offices Le Plateau Abidjan",
  "Studios Almadies Dakar",
  "Hotels Bonapriso Douala",
] as const;

/** Material Symbols ligature class, defined in `globals.css`. */
function Symbol({ name, className }: { name: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("material-symbols-outlined", className)}>
      {name}
    </span>
  );
}

type SearchBarProps = {
  locale: Locale;
  className?: string;
  defaultTab?: TabKey;
};

export function SearchBar({ locale, className, defaultTab = "rent" }: SearchBarProps) {
  const [tab, setTab] = useState<TabKey>(defaultTab);
  const section = TABS.find((entry) => entry.value === tab)?.section ?? "rentals";
  const label = (key: string) => t(locale, "marketing", key);

  return (
    <div
      className={cn(
        "w-full max-w-5xl rounded-xl bg-surface-container-lowest p-4 shadow-xl transition-all lg:p-6",
        className,
      )}
    >
      {/* Category switcher */}
      <div className="flex flex-wrap items-center gap-2 pb-5" role="tablist">
        {TABS.map(({ value, icon, labelKey }) => {
          const active = value === tab;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(value)}
              className={cn(
                "rounded-lg px-5 py-2.5 font-label-md text-label-md font-semibold transition-all",
                active
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Symbol name={icon} className="text-[18px]" />
                {label(labelKey)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <form
        action={`/${locale}/${section}`}
        method="get"
        className="grid grid-cols-1 items-center gap-3 md:grid-cols-2 lg:grid-cols-12"
      >
        <Field
          className="lg:col-span-4"
          icon="location_on"
          label={label("home.search.destination")}
        >
          <input
            name="destination"
            type="text"
            defaultValue="Abidjan, Côte d'Ivoire"
            placeholder={label("home.search.destinationPlaceholder")}
            aria-label={label("home.search.destination")}
            className="w-full bg-transparent font-headline-sm text-[15px] font-semibold text-on-surface placeholder:text-outline focus:outline-none"
          />
        </Field>

        <Field
          className="lg:col-span-3"
          icon="apartment"
          label={label("home.search.propertyType")}
        >
          <select
            name="type"
            defaultValue={PROPERTY_TYPES[0]}
            aria-label={label("home.search.propertyType")}
            className="w-full cursor-pointer bg-transparent font-headline-sm text-[15px] font-semibold text-on-surface focus:outline-none"
          >
            {PROPERTY_TYPES.map((key) => (
              <option key={key} value={key}>
                {label(key)}
              </option>
            ))}
          </select>
        </Field>

        <Field
          className="lg:col-span-3"
          icon="payments"
          label={label("home.search.budget")}
        >
          <input
            name="budget"
            type="text"
            defaultValue="800 000 - 3 500 000 FCFA"
            placeholder={label("home.search.budgetPlaceholder")}
            aria-label={label("home.search.budget")}
            className="w-full bg-transparent font-headline-sm text-[15px] font-semibold text-on-surface placeholder:text-outline focus:outline-none"
          />
        </Field>

        <div className="flex w-full lg:col-span-2">
          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary font-headline-sm text-[16px] text-on-primary shadow-md transition-all hover:bg-primary-container hover:shadow-lg"
          >
            <Symbol name="search" className="text-[20px]" />
            {label("home.search.submit")}
          </button>
        </div>
      </form>

      {/* Trending quick-searches */}
      <div className="mt-2 flex flex-wrap items-center gap-2 pt-4">
        <span className="flex items-center gap-1 font-label-sm text-label-sm text-outline">
          <Symbol name="trending_up" className="text-[14px]" />
          {label("home.search.trending")}
        </span>
        {TRENDING.map((tag) => (
          <button
            key={tag}
            type="button"
            className="rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

/** One labelled filter cell — icon, label, and control share a soft surface. */
function Field({
  className,
  icon,
  label,
  children,
}: {
  className?: string;
  icon: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-surface-container-low p-3 transition-colors hover:bg-surface-container",
        className,
      )}
    >
      <span className="mb-1 flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
        <Symbol name={icon} className="text-[16px] text-primary" />
        {label}
      </span>
      {children}
    </div>
  );
}
