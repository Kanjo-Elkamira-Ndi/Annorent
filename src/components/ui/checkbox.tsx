import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Native checkbox: a 20px box inside a ≥44px label hit area. */
export function Checkbox({
  label,
  description,
  id,
  className,
  ...rest
}: Omit<ComponentPropsWithRef<"input">, "type"> & { label: ReactNode; description?: ReactNode }) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;

  return (
    <label htmlFor={inputId} className={cn("flex min-h-11 cursor-pointer items-start gap-3 py-2.5", className)}>
      <input
        id={inputId}
        type="checkbox"
        aria-describedby={descId}
        className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm border-border-strong accent-[var(--action)]"
        {...rest}
      />
      <span className="flex flex-col">
        <span className="text-body text-primary">{label}</span>
        {description ? (
          <span id={descId} className="text-body-sm text-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
