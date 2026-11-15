import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Shared label / help / error frame for every form control.
 *
 * The label is always visible (never placeholder-as-label). An error replaces
 * the help text and is announced through `aria-describedby`; it is shown with
 * an icon-free text prefix so colour is never the only signal.
 */

export type FieldIds = { inputId: string; helpId?: string; errorId?: string };

export function describedBy(ids: FieldIds, hasHelp: boolean, hasError: boolean): string | undefined {
  const parts = [hasError ? ids.errorId : undefined, !hasError && hasHelp ? ids.helpId : undefined].filter(Boolean);
  return parts.length ? parts.join(" ") : undefined;
}

export function Field({
  ids,
  label,
  help,
  error,
  required,
  className,
  children,
}: {
  ids: FieldIds;
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={ids.inputId} className="text-body-sm font-medium text-primary">
        {label}
        {required ? (
          <span aria-hidden className="text-muted">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={ids.errorId} className="text-body-sm text-danger">
          {error}
        </p>
      ) : help ? (
        <p id={ids.helpId} className="text-body-sm text-muted">
          {help}
        </p>
      ) : null}
    </div>
  );
}

/** Shared visual frame for text-like controls (input, select, textarea). */
export const controlClasses =
  "w-full rounded-md border bg-surface text-body text-primary placeholder:text-muted " +
  "transition-colors duration-[120ms] " +
  "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus " +
  "disabled:cursor-not-allowed disabled:bg-sunken disabled:text-muted " +
  "read-only:bg-sunken";

export function controlBorder(invalid: boolean): string {
  return invalid ? "border-danger" : "border-border-strong hover:border-primary";
}
