/**
 * Shapes shared by the public marketing pages.
 *
 * These describe what a real endpoint would return, so replacing the static
 * modules in this folder with `fetch` calls is a change to the data layer
 * alone and leaves every component untouched. See `context/api-reference.md`
 * before wiring anything up.
 */

/**
 * A control the design draws as a Material Symbols ligature name.
 *
 * Kept as a plain string rather than a union: the icon set is the Material
 * Symbols catalogue and the design references glyphs that are not worth
 * enumerating and keeping in sync by hand.
 */
export type IconName = string;

/** An icon + label pair rendered as a pill, spec row, or amenity chip. */
export type IconLabel = {
  icon: IconName;
  label: string;
};

/** A group of options in a filter panel: radio group, checkbox group, or chips. */
export type FilterGroup = {
  /** i18n key into the `marketing` namespace for the group heading. */
  titleKey: string;
  /** `chips` render as a single-select row, `options` as a vertical checklist. */
  control: "chips" | "options";
  options: FilterOption[];
};

export type FilterOption = {
  /** i18n key into the `marketing` namespace for the option label. */
  labelKey: string;
  /** Trailing count badge, e.g. the number of matching properties. */
  count?: number;
  /** Pre-ticked in the Stitch reference; rendered as checked. */
  defaultSelected?: boolean;
  /**
   * Optional leading glyph. Stitch gives the amenities group icons
   * (`view_in_ar`, `power`, `shield`, …) and leaves the rest bare.
   */
  icon?: IconName;
};

/** One dismissible chip in the active-filter strip. */
export type ActiveFilter = {
  labelKey: string;
  /** i18n key for the chip's remove button's accessible name. */
  removeLabelKey: string;
  /** `tertiary` marks the Annorent-verified chip, which Stitch fills in accent. */
  tone?: "neutral" | "tertiary";
};

/** A `<select>` in a results toolbar. */
export type SortOption = {
  labelKey: string;
  value: string;
};

/** The shared footer of every paginated results page. */
export type Pagination = {
  /** i18n key prefix for the "Showing X of Y" sentence. */
  showingRangeKey: string;
  /** i18n key for the total-count noun, e.g. "properties". */
  totalNounKey: string;
  page: number;
  totalPages: number;
  /** Page numbers to render between the prev/next controls. */
  pages: number[];
  /** Rendered as an ellipsis when the page list is truncated. */
  truncated: boolean;
};

/**
 * A reassurance strip of `shield`-style assurances, used under the hero of
 * every results page and again above the footer's call to action.
 */
export type Assurance = {
  icon: IconName;
  titleKey: string;
  bodyKey: string;
};
