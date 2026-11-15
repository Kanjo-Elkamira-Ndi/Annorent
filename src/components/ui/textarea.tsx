import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { controlBorder, controlClasses, describedBy, Field } from "./field";

type TextareaProps = ComponentPropsWithRef<"textarea"> & {
  label: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
};

export function Textarea({ label, help, error, id, required, rows = 4, className, ...rest }: TextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const ids = { inputId, helpId: `${inputId}-help`, errorId: `${inputId}-error` };
  const invalid = Boolean(error);

  return (
    <Field ids={ids} label={label} help={help} error={error} required={required}>
      <textarea
        id={inputId}
        rows={rows}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(ids, Boolean(help), invalid)}
        className={cn(controlClasses, controlBorder(invalid), "min-h-24 px-3 py-2.5", className)}
        {...rest}
      />
    </Field>
  );
}
