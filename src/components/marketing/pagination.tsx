import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { Pagination as PaginationModel } from "@/lib/marketing/types";

/**
 * The "Showing 1 - 6 of 248 …" footer every results page shares.
 *
 * Server component: the page numbers are links, so a client island would only
 * add weight. Disabled prev/next are rendered as `<span>` with
 * `aria-disabled` rather than `<button disabled>` so they keep their box in the
 * flex row — a `disabled` button drops its pointer events and reads as dead
 * space to a screen reader.
 */

type PaginationProps = {
  locale: Locale;
  pagination: PaginationModel;
  /** i18n keys for the numeric bounds and total, e.g. "1", "6", "248". */
  range: { from: string; to: string; total: string };
  /** Route the links point at, already locale-prefixed, e.g. "/en/properties". */
  baseHref: string;
};

export function Pagination({ locale, pagination, range, baseHref }: PaginationProps) {
  const { page, totalPages, pages, truncated } = pagination;
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const linkBase = `${baseHref}?page=`;

  return (
    <nav
      aria-label={t(locale, "marketing", "common.pagination")}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4"
    >
      <p className="font-body-md text-body-md text-on-surface-variant">
        {t(locale, "marketing", pagination.showingRangeKey)}{" "}
        <span className="font-semibold text-on-surface">
          {range.from} - {range.to}
        </span>{" "}
        {t(locale, "marketing", "common.of")}{" "}
        <span className="font-semibold text-on-surface">{range.total}</span>{" "}
        {t(locale, "marketing", pagination.totalNounKey)}
      </p>

      <ul className="flex items-center gap-1">
        {isFirst ? (
          <li>
            <span
              aria-disabled="true"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-outline"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                chevron_left
              </span>
              <span className="sr-only">{t(locale, "marketing", "common.previous")}</span>
            </span>
          </li>
        ) : (
          <li>
            <a
              href={`${linkBase}${page - 1}`}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                chevron_left
              </span>
              <span className="sr-only">{t(locale, "marketing", "common.previous")}</span>
            </a>
          </li>
        )}

        {pages.map((n) => (
          <li key={n}>
            <a
              href={`${linkBase}${n}`}
              aria-current={n === page ? "page" : undefined}
              className={
                n === page
                  ? "flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold"
                  : "flex items-center justify-center w-9 h-9 rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md"
              }
            >
              {n}
            </a>
          </li>
        ))}

        {truncated ? (
          <li>
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-9 h-9 font-label-md text-label-md text-outline"
            >
              …
            </span>
          </li>
        ) : null}

        <li>
          <a
            href={`${linkBase}${totalPages}`}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md"
          >
            {totalPages}
          </a>
        </li>

        {isLast ? (
          <li>
            <span
              aria-disabled="true"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-outline"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                chevron_right
              </span>
              <span className="sr-only">{t(locale, "marketing", "common.next")}</span>
            </span>
          </li>
        ) : (
          <li>
            <a
              href={`${linkBase}${page + 1}`}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                chevron_right
              </span>
              <span className="sr-only">{t(locale, "marketing", "common.next")}</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
