"use client";

type LegalActionsProps = {
  printLabel: string;
  downloadLabel: string;
  /** Explains, on hover and to assistive tech, why the PDF is unavailable. */
  downloadPendingTitle: string;
  className?: string;
};

/**
 * Header action row for the legal instrument.
 *
 * "Print Act" is fully functional. The official PDF has no asset behind it
 * yet, so it ships as a genuinely disabled control rather than a link to
 * nowhere — consistent with the inert Help Center control on /contact.
 */
export function LegalActions({
  printLabel,
  downloadLabel,
  downloadPendingTitle,
  className,
}: LegalActionsProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-4 min-h-11 py-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shadow-sm transition-colors print:hidden"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          print
        </span>
        <span>{printLabel}</span>
      </button>

      <button
        type="button"
        disabled
        title={downloadPendingTitle}
        className="inline-flex items-center gap-2 px-5 min-h-11 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold opacity-45 cursor-not-allowed print:hidden"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          picture_as_pdf
        </span>
        <span>{downloadLabel}</span>
      </button>
    </div>
  );
}
