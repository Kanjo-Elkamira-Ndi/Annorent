import { ChevronDown } from "lucide-react";
import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { controlBorder, controlClasses, describedBy, Field } from "./field";

/**
 * Single select, built on the native element on purpose: on low-end Android
 * it opens the OS picker, which is faster and more familiar than a custom
 * listbox (design-system-proposal §8.1).
 */

type SelectProps = ComponentPropsWithRef<"select"> & {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function Select({
  label,
  help,
  error,
  options,
  placeholder,
  id,
  required,
  className,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const ids = { inputId, helpId: `${inputId}-help`, errorId: `${inputId}-error` };
  const invalid = Boolean(error);

  return (
    <Field ids={ids} label={label} help={help} error={error} required={required}>
      <div className="relative">
        <select
          id={inputId}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy(ids, Boolean(help), invalid)}
          className={cn(controlClasses, controlBorder(invalid), "h-12 appearance-none pr-10 pl-3 lg:h-10", className)}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
      </div>
    </Field>
  );
}
