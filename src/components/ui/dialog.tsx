"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Dialog and sheet on the native <dialog> element.
 *
 * `showModal()` gives a real focus trap, makes the page behind it inert, and
 * closes on Esc, with no dependency (design-system-proposal §8.1). Focus
 * returns to the element that opened it. A title is required, because a dialog
 * without an accessible name is unusable with a screen reader.
 *
 * Variants:
 * - modal: centred, max 560px; becomes a bottom sheet below 640px.
 * - sheet-bottom: always a bottom sheet (mobile filters).
 * - sheet-right: full-height side panel (mobile menu).
 */

export type DialogVariant = "modal" | "sheet-bottom" | "sheet-right";

const variantClasses: Record<DialogVariant, string> = {
  modal:
    "m-0 mt-auto w-full max-w-none rounded-t-lg sm:m-auto sm:max-w-[560px] sm:rounded-lg " +
    "max-h-[90dvh]",
  "sheet-bottom": "m-0 mt-auto w-full max-w-none rounded-t-lg max-h-[90dvh]",
  "sheet-right": "m-0 ml-auto h-dvh max-h-none w-[min(100vw-3rem,380px)] max-w-none rounded-l-lg",
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  closeLabel,
  variant = "modal",
  footer,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  closeLabel: string;
  variant?: DialogVariant;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onCancel={(event) => {
        // Let React own the state: Esc asks to close, `open` decides.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> itself.
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "border border-border bg-raised p-0 text-primary shadow-e3",
        "backdrop:bg-[var(--scrim)]",
        "open:flex open:flex-col",
        variantClasses[variant],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <h2 id={titleId} className="text-h3 font-semibold">
            {title}
          </h2>
          {description ? (
            <p id={descId} className="mt-1 text-body-sm text-secondary">
              {description}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-secondary hover:bg-sunken hover:text-primary"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      {footer ? (
        <div className="border-t border-border px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">{footer}</div>
      ) : null}
    </dialog>
  );
}
