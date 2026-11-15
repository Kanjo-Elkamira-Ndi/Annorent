import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { controlBorder, controlClasses, describedBy, Field } from "./field";

/**
 * Text input with a visible label, help or error text, and optional
 * prefix/suffix adornments ("+237", "FCFA", "m²").
 * 48px tall on mobile, 40px from 1024px (design-system-proposal §8.1).
 */

type InputProps = Omit<ComponentPropsWithRef<"input">, "prefix"> & {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  fieldClassName?: string;
};

export function Input({
  label,
  help,
  error,
  prefix,
  suffix,
  id,
  required,
  className,
  fieldClassName,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const ids = { inputId, helpId: `${inputId}-help`, errorId: `${inputId}-error` };
  const invalid = Boolean(error);

  return (
    <Field ids={ids} label={label} help={help} error={error} required={required} className={fieldClassName}>
      <div className="relative flex items-center">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 text-body-sm text-muted">{prefix}</span>
        ) : null}
        <input
          id={inputId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy(ids, Boolean(help), invalid)}
          className={cn(
            controlClasses,
            controlBorder(invalid),
            "h-12 px-3 lg:h-10",
            prefix ? "pl-14" : undefined,
            suffix ? "pr-16" : undefined,
            className,
          )}
          {...rest}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 text-body-sm text-muted">{suffix}</span>
        ) : null}
      </div>
    </Field>
  );
}
