import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Native radio group inside a fieldset/legend, so the group has a name. */
export function RadioGroup({
  legend,
  name,
  options,
  defaultValue,
  error,
  className,
}: {
  legend: ReactNode;
  name: string;
  options: { value: string; label: ReactNode; description?: ReactNode }[];
  defaultValue?: string;
  error?: ReactNode;
  className?: string;
}) {
  const baseId = useId();
  const errorId = `${baseId}-error`;

  return (
    <fieldset className={cn("flex flex-col", className)} aria-describedby={error ? errorId : undefined}>
      <legend className="mb-1 text-body-sm font-medium text-primary">{legend}</legend>
      {options.map((option, index) => {
        const id = `${baseId}-${index}`;
        return (
          <label key={option.value} htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 py-2.5">
            <input
              id={id}
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--action)]"
            />
            <span className="flex flex-col">
              <span className="text-body text-primary">{option.label}</span>
              {option.description ? <span className="text-body-sm text-muted">{option.description}</span> : null}
            </span>
          </label>
        );
      })}
      {error ? (
        <p id={errorId} className="text-body-sm text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
