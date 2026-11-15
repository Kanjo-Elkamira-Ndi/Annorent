"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Segmented control: Rent / Buy / Stay, list / map, day / month, theme.
 *
 * Built from native radio inputs, so arrow keys move the selection and screen
 * readers announce "radio, 1 of 3" with no custom keyboard code. The visible
 * group label can be hidden with `hideLegend`, but it always exists for
 * assistive technology. Shape: radius-full, the same pill as the nav.
 */

export type SegmentedOption<V extends string> = { value: V; label: ReactNode; icon?: ReactNode };

export function SegmentedControl<V extends string>({
  legend,
  hideLegend = false,
  name,
  options,
  value,
  onChange,
  size = "md",
  className,
}: {
  legend: ReactNode;
  hideLegend?: boolean;
  name?: string;
  options: SegmentedOption<V>[];
  value: V;
  onChange: (value: V) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  const autoName = useId();
  const groupName = name ?? autoName;

  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className={hideLegend ? "sr-only" : "mb-1.5 text-body-sm font-medium text-primary"}>{legend}</legend>
      <div className="inline-flex max-w-full rounded-full bg-sunken p-1">
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full font-medium whitespace-nowrap",
                "transition-colors duration-[120ms] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                size === "sm" ? "h-8 px-3 text-body-sm" : "h-10 px-4 text-body-sm",
                checked ? "bg-surface text-primary shadow-e1 ring-1 ring-border" : "text-secondary hover:text-primary",
              )}
            >
              <input
                type="radio"
                name={groupName}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.icon}
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
