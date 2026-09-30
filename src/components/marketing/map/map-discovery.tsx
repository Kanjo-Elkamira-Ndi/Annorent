"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AbidjanMap } from "./abidjan-map";
import { MAP_RENT, MAP_ZOOM, type MapCategory, type MapListing } from "@/lib/marketing/map";

/**
 * The interactive map discovery surface.
 *
 * One client island owning all of the page's state: the active listing, the
 * category pill, the price ceiling, the search query, and the zoom level. The
 * page itself stays a server component and resolves every string before passing
 * data down, so this file never imports i18n and the translated copy is not
 * duplicated into the client bundle as lookup tables.
 *
 * Ported from Stitch screen `1567d9d5515a48da855f69e63632b78b`. The reference's
 * own script does four things — highlight a card's pin, highlight a pin's card,
 * open a popup, close it — and those are reproduced here in React state, plus
 * working filters, working search, and working zoom. The controls that have
 * nothing to act on (see `MAP_INERT_CONTROLS`) are rendered explicitly disabled.
 *
 * Two deliberate deviations from the reference:
 *
 * - Its script only opens a popup for `pin-2`, because it is a static prototype
 *   with one authored popup. Here any pin opens its own listing's popup, which
 *   is what the interaction implies.
 * - Its price filter is a slider with no handler. Here the slider, the category
 *   pills, and the search field all narrow the list *and* the pins together, so
 *   the two columns cannot disagree.
 */

/**
 * A `MapListing` with every i18n key already resolved by the page. `specs` is
 * rebuilt rather than extended, so the island reads `label` while the data
 * module keeps `labelKey`.
 */
export type ResolvedMapListing = Omit<MapListing, "specs"> & {
  name: string;
  area: string;
  address: string;
  categoryLabel: string;
  specs: { icon: string; label: string }[];
  priceUnit: string;
  badge: string | null;
  ribbon: string | null;
  popupBadge: string | null;
  imageAlt: string;
};

export type MapDiscoveryProps = {
  locale: string;
  listings: ResolvedMapListing[];
  categories: { value: MapCategory; label: string }[];
  clusters: { count: number; top: string; left: string; sizeClass: string; label: string }[];
  districtLabels: string[];
  total: number;
  strings: {
    searchPlaceholder: string;
    maxRentLabel: string;
    reset: string;
    counter: string;
    filteredCounter: string;
    sort: string;
    sortInert: string;
    areaSummary: string;
    zoomIn: string;
    zoomOut: string;
    layers: string;
    layersInert: string;
    locate: string;
    locateInert: string;
    view3d: string;
    view3dInert: string;
    searchAsIMove: string;
    searchAsIMoveInert: string;
    viewport: string;
    closePopup: string;
    viewProperty: string;
    verified: string;
    noResults: string;
  };
};

/** Groups digits with thin spaces, matching the hand-formatted rates elsewhere. */
function formatFcfa(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function MapDiscovery({
  locale,
  listings,
  categories,
  clusters,
  districtLabels,
  total,
  strings,
}: MapDiscoveryProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [popupId, setPopupId] = useState<string | null>(null);
  const [category, setCategory] = useState<MapCategory>("all");
  const [maxRent, setMaxRent] = useState<number>(MAP_RENT.defaultMax);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (l.priceValue > maxRent) return false;
      if (!q) return true;
      // The search field is a free-text location query with no geocoder behind
      // it, so it matches against the copy the user can actually see.
      return [l.name, l.area, l.address, l.categoryLabel]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [listings, category, maxRent, query]);

  /**
   * Changing any filter clears the selection, so a listing that just left the
   * result set can never stay highlighted or keep its popup open. Done in the
   * handlers rather than in an effect on `visible` — an effect would setState
   * on every filter change and cause a cascading render, and deriving it would
   * let a stale popup reappear when the filter is undone.
   */
  const changeFilters = useCallback(
    (apply: () => void) => {
      apply();
      setActiveId(null);
      setPopupId(null);
    },
    [],
  );

  const openPin = useCallback((id: string) => {
    setActiveId(id);
    setPopupId(id);
  }, []);

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) => {
      const next = Math.round((z + delta) * 100) / 100;
      return Math.min(MAP_ZOOM.max, Math.max(MAP_ZOOM.min, next));
    });
  }, []);

  // Escape closes the popup, matching the close button.
  useEffect(() => {
    if (!popupId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopupId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popupId]);

  const resetFilters = useCallback(
    () =>
      changeFilters(() => {
        setCategory("all");
        setMaxRent(MAP_RENT.defaultMax);
        setQuery("");
      }),
    [changeFilters],
  );

  const filtersActive = category !== "all" || maxRent !== MAP_RENT.defaultMax || query !== "";
  const popup = popupId ? visible.find((l) => l.id === popupId) : undefined;

  return (
    <div className="flex flex-col w-full">
      {/* ── Pinned multi-filter bar ── */}
      <div className="sticky top-20 z-40 w-full bg-surface-container-lowest shadow-sm">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-80">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-[20px]"
              >
                location_on
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => changeFilters(() => setQuery(e.target.value))}
                placeholder={strings.searchPlaceholder}
                aria-label={strings.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:bg-surface-container-lowest focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {categories.map((c) => {
                const isActive = c.value === category;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => changeFilters(() => setCategory(c.value))}
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? "px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all"
                        : "px-3.5 py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors"
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-lg">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {strings.maxRentLabel}
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {formatFcfa(maxRent)} FCFA
                </span>
              </div>
              <input
                type="range"
                min={MAP_RENT.min}
                max={MAP_RENT.max}
                step={MAP_RENT.step}
                value={maxRent}
                onChange={(e) => changeFilters(() => setMaxRent(Number(e.target.value)))}
                aria-label={strings.maxRentLabel}
                aria-valuetext={`${formatFcfa(maxRent)} FCFA`}
                className="w-28 sm:w-32 accent-primary cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={resetFilters}
              disabled={!filtersActive}
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-error px-2 py-1.5 rounded font-label-md text-label-md transition-colors disabled:opacity-40 disabled:hover:text-on-surface-variant disabled:cursor-default"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                restart_alt
              </span>
              <span className="hidden sm:inline">{strings.reset}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Viewport split ── */}
      <div className="w-full flex flex-col lg:flex-row h-[calc(100vh-8.5rem)] min-h-[560px] overflow-hidden">
        {/* Left: results */}
        <div className="w-full lg:w-[38%] xl:w-[35%] h-full flex flex-col bg-surface-container-low overflow-hidden">
          <div className="px-6 py-4 bg-surface-container-lowest flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"
                />
                <h1
                  className="font-headline-sm text-headline-sm text-on-surface"
                  role="status"
                  aria-live="polite"
                >
                  {filtersActive
                    ? strings.filteredCounter.replace("{n}", String(visible.length))
                    : strings.counter.replace("{n}", String(total))}
                </h1>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                {strings.areaSummary}
              </p>
            </div>
            <InertButton
              className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant"
              icon="swap_vert"
              label={strings.sort}
              hint={strings.sortInert}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
            {visible.length === 0 ? (
              <div className="rounded-xl bg-surface-container-lowest p-8 text-center">
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-headline-md text-on-surface-variant"
                >
                  search_off
                </span>
                <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                  {strings.noResults}
                </p>
              </div>
            ) : (
              visible.map((l) => (
                <MapCard
                  key={l.id}
                  listing={l}
                  active={activeId === l.id}
                  verifiedLabel={strings.verified}
                  onHover={setActiveId}
                />
              ))
            )}
          </div>
        </div>

        {/* Right: the map */}
        <div className="w-full lg:w-[62%] xl:w-[65%] h-full relative bg-surface-container overflow-hidden select-none">
          <AbidjanMap zoom={zoom} />

          {/* Pins, positioned over the SVG */}
          <div className="absolute inset-0 pointer-events-none">
            {visible.map((l) => (
              <MapPin
                key={l.id}
                listing={l}
                active={activeId === l.id}
                popupOpen={popupId === l.id}
                onSelect={openPin}
              />
            ))}

            {/* Decorative density clusters — see MAP_CLUSTERS */}
            {clusters.map((c) => (
              <div
                key={c.count}
                title={c.label}
                className={`absolute ${c.sizeClass} rounded-full bg-inverse-surface text-inverse-on-surface font-headline-sm text-headline-sm flex items-center justify-center shadow-lg ring-4 ring-inverse-surface/20 -translate-x-1/2 -translate-y-1/2`}
                style={{ top: c.top, left: c.left }}
              >
                +{c.count}
              </div>
            ))}
          </div>

          {popup ? (
            <MapPopup
              listing={popup}
              locale={locale}
              onClose={() => setPopupId(null)}
              closeLabel={strings.closePopup}
              viewPropertyLabel={strings.viewProperty}
            />
          ) : null}

          {/* "Search as I move the map" — inert, see MAP_INERT_CONTROLS */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <label
              title={strings.searchAsIMoveInert}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-md text-on-surface select-none opacity-70 cursor-not-allowed"
            >
              <input type="checkbox" checked readOnly disabled className="w-4 h-4 accent-primary" />
              <span className="font-label-md text-label-md">{strings.searchAsIMove}</span>
            </label>
          </div>

          {/* Map utilities */}
          <div className="absolute right-5 bottom-8 z-20 flex flex-col gap-3">
            <InertButton
              className="w-11 h-11 rounded-xl bg-surface-container-lowest shadow-md text-on-surface-variant"
              icon="layers"
              label={strings.layers}
              hint={strings.layersInert}
            />
            <InertButton
              className="w-11 h-11 rounded-xl bg-surface-container-lowest shadow-md text-on-surface-variant"
              icon="my_location"
              label={strings.locate}
              hint={strings.locateInert}
            />

            <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-md overflow-hidden">
              <button
                type="button"
                onClick={() => zoomBy(MAP_ZOOM.step)}
                disabled={zoom >= MAP_ZOOM.max}
                aria-label={strings.zoomIn}
                className="w-11 h-11 text-on-surface-variant hover:text-primary hover:bg-surface-container-low flex items-center justify-center transition-colors disabled:opacity-35 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-on-surface-variant"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                  add
                </span>
              </button>
              <div className="w-full h-px bg-surface-container-high" />
              <button
                type="button"
                onClick={() => zoomBy(-MAP_ZOOM.step)}
                disabled={zoom <= MAP_ZOOM.min}
                aria-label={strings.zoomOut}
                className="w-11 h-11 text-on-surface-variant hover:text-primary hover:bg-surface-container-low flex items-center justify-center transition-colors disabled:opacity-35 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-on-surface-variant"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                  remove
                </span>
              </button>
            </div>

            <InertButton
              className="w-11 h-11 rounded-xl bg-surface-container-lowest shadow-md text-on-surface-variant"
              icon="navigation"
              label={strings.view3d}
              hint={strings.view3dInert}
            />
          </div>

          {/* Viewport label and district chips */}
          <div className="absolute left-5 bottom-5 z-10 flex flex-col gap-2 items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
              {strings.viewport}
            </span>
            <ul className="flex flex-wrap gap-1.5 list-none">
              {districtLabels.map((d) => (
                <li
                  key={d}
                  className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest/80 backdrop-blur px-2.5 py-1 rounded-full"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── pieces ───────────────────────────── */

function MapCard({
  listing,
  active,
  verifiedLabel,
  onHover,
}: {
  listing: ResolvedMapListing;
  active: boolean;
  verifiedLabel: string;
  onHover: (id: string | null) => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(listing.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(listing.id)}
      onBlur={() => onHover(null)}
      onClick={() => onHover(listing.id)}
      aria-pressed={active}
      className={
        active
          ? "group relative bg-surface-container-lowest rounded-xl p-3 shadow-[0px_4px_20px_rgba(0,61,155,0.12)] ring-2 ring-primary transition-all flex gap-3.5 text-left w-full"
          : "group relative bg-surface-container-lowest rounded-xl p-3 shadow-[0px_4px_20px_rgba(4,27,60,0.06)] hover:shadow-md transition-all flex gap-3.5 text-left w-full"
      }
    >
      <div className="relative w-36 sm:w-44 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
        {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail
            inside a fixed-size card tile; next/image would add a wrapper that
            breaks the absolutely-positioned corner badges. */}
        <img
          src={listing.image}
          alt={listing.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {listing.badge ? (
          <span className="absolute top-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-on-surface/75 backdrop-blur-md text-surface-container-lowest font-label-sm text-[10px]">
            {listing.badgeIcon ? (
              <span aria-hidden="true" className="material-symbols-outlined text-[12px] text-tertiary-fixed">
                {listing.badgeIcon}
              </span>
            ) : null}
            {listing.badge}
          </span>
        ) : null}
        {listing.ribbon ? (
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-primary text-on-primary font-label-sm text-[10px] font-bold uppercase">
            {listing.ribbon}
          </span>
        ) : null}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px] uppercase tracking-wider truncate">
              {listing.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold whitespace-nowrap">
              <span
                aria-hidden="true"
                style={{ fontVariationSettings: "'FILL' 1" }}
                className="material-symbols-outlined text-[15px] text-tertiary"
              >
                verified
              </span>
              {verifiedLabel}
            </span>
          </div>
          <h2
            className={
              active
                ? "font-headline-sm text-[16px] text-primary truncate"
                : "font-headline-sm text-[16px] text-on-surface truncate group-hover:text-primary transition-colors"
            }
          >
            {listing.name}
          </h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
            <span aria-hidden="true" className="material-symbols-outlined text-[15px] text-outline">
              explore
            </span>
            {listing.area}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <span className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
            {listing.specs.map((spec, i) => (
              <span key={spec.label} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">•</span> : null}
                <span className="flex items-center gap-1">
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
                    {spec.icon}
                  </span>
                  {spec.label}
                </span>
              </span>
            ))}
          </span>
          <span className="font-headline-sm text-[17px] font-bold text-primary whitespace-nowrap">
            {listing.price}{" "}
            <span className="font-label-sm text-[11px] font-normal text-on-surface-variant">
              {listing.priceUnit}
            </span>
          </span>
        </div>
      </div>
    </button>
  );
}

function MapPin({
  listing,
  active,
  popupOpen,
  onSelect,
}: {
  listing: ResolvedMapListing;
  active: boolean;
  popupOpen: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${
        popupOpen ? "z-30" : "z-10"
      }`}
      style={{ top: listing.top, left: listing.left }}
    >
      <button
        type="button"
        onClick={() => onSelect(listing.id)}
        aria-expanded={popupOpen}
        aria-label={`${listing.name} — ${listing.price} ${listing.priceUnit}`}
        className="block cursor-pointer transition-transform duration-200 hover:scale-110"
      >
        <div className="relative flex flex-col items-center">
          <div
            className={
              active
                ? "px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary font-headline-sm text-[15px] font-bold shadow-xl ring-4 ring-primary/20 flex items-center gap-1.5"
                : "px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0px_4px_16px_rgba(0,61,155,0.35)] flex items-center gap-1"
            }
          >
            {active ? (
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                {listing.icon}
              </span>
            ) : null}
            <span>{listing.pinLabel}</span>
          </div>
          <div
            className={
              active
                ? "w-2.5 h-2.5 bg-primary-container rotate-45 -mt-1"
                : "w-2 h-2 bg-primary rotate-45 mx-auto -mt-1 rounded-xs"
            }
          />
        </div>
      </button>
    </div>
  );
}

function MapPopup({
  listing,
  locale,
  onClose,
  closeLabel,
  viewPropertyLabel,
}: {
  listing: ResolvedMapListing;
  locale: string;
  onClose: () => void;
  closeLabel: string;
  viewPropertyLabel: string;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  // Move focus into the dialog so keyboard and screen-reader users land on it
  // rather than staying on the pin behind it.
  useEffect(() => {
    innerRef.current?.focus();
  }, []);

  return (
    <div
      className="absolute z-40 w-72 max-w-[calc(100vw-2.5rem)]"
      style={{
        top: listing.top,
        left: listing.left,
        transform: "translate(-50%, calc(-100% - 2.75rem))",
      }}
    >
      <div
        ref={innerRef}
        role="dialog"
        aria-label={listing.name}
        tabIndex={-1}
        className="bg-surface-container-lowest rounded-xl shadow-2xl p-3 outline-none"
      >
        <div className="relative h-32 rounded-lg overflow-hidden mb-2.5 bg-surface-container">
          {/* eslint-disable-next-line @next/next/no-img-element -- see MapCard */}
          <img
            src={listing.image}
            alt={listing.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {listing.popupBadge ? (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-[11px] font-semibold">
              {listing.popupBadge}
            </span>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-on-surface/60 hover:bg-on-surface text-surface-container-lowest flex items-center justify-center transition-colors"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
              close
            </span>
          </button>
        </div>

        <h3 className="font-headline-sm text-[15px] text-on-surface font-semibold truncate">
          {listing.name}
        </h3>
        <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mb-2">
          <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-primary">
            location_on
          </span>
          {listing.address}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className="font-headline-sm text-headline-sm font-bold text-primary whitespace-nowrap">
            {listing.price}{" "}
            <span className="font-label-sm text-[11px] font-normal text-on-surface-variant">
              {listing.priceUnit}
            </span>
          </span>
          <Link
            href={`/${locale}/properties/${listing.id}`}
            className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-medium hover:bg-primary-container transition-colors inline-flex items-center gap-1 whitespace-nowrap"
          >
            {viewPropertyLabel}
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * A control the reference draws but that has nothing to act on — the sort
 * select, the satellite toggle, geolocation, 3D. Rendered as a real `<button>`
 * and explicitly disabled with an explanatory tooltip, rather than left looking
 * clickable.
 */
function InertButton({
  className,
  icon,
  label,
  hint,
}: {
  className: string;
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      disabled
      title={hint}
      aria-label={`${label} — ${hint}`}
      className={`${className} opacity-60 flex items-center justify-center cursor-not-allowed`}
    >
      <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
        {icon}
      </span>
    </button>
  );
}
