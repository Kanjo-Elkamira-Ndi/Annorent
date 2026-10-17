"use client";

import { useId, useState } from "react";

type PartnersYieldCalculatorProps = {
  label: string;
  /** BCP-47 tag of the active locale, used for digit grouping. */
  localeTag: string;
  unitSingular: string;
  unitPlural: string;
  portfolio: string;
  tier: string;
  sliderLabel: string;
  currency: string;
  ratePerUnit: number;
  minUnits: number;
  maxUnits: number;
  defaultUnits: number;
};

/**
 * Estimated monthly yield simulator.
 *
 * Client-only because it recomputes on every slider move. The arithmetic is a
 * transparent `units x ratePerUnit` — it is an illustration, not a quote, and
 * the rate is passed in from `lib/marketing/partners.ts`.
 */
export function PartnersYieldCalculator({
  label,
  localeTag,
  unitSingular,
  unitPlural,
  portfolio,
  tier,
  sliderLabel,
  currency,
  ratePerUnit,
  minUnits,
  maxUnits,
  defaultUnits,
}: PartnersYieldCalculatorProps) {
  const [units, setUnits] = useState(defaultUnits);
  const outputId = useId();

  const formatter = new Intl.NumberFormat(localeTag);
  const total = units * ratePerUnit;
  const unitWord = units > 1 ? unitPlural : unitSingular;

  return (
    <div className="bg-surface-container p-4 rounded-lg flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-label-md text-label-md text-on-surface font-semibold">{label}</span>
        <span
          id={outputId}
          className="font-headline-sm text-headline-sm text-primary font-bold"
          aria-live="polite"
        >
          {formatter.format(total)} {currency}
        </span>
      </div>

      <label htmlFor={`${outputId}-slider`} className="sr-only">
        {sliderLabel}
      </label>
      <input
        id={`${outputId}-slider`}
        type="range"
        min={minUnits}
        max={maxUnits}
        value={units}
        onChange={(event) => setUnits(Number(event.target.value))}
        aria-valuetext={`${units} ${unitWord} — ${formatter.format(total)} ${currency}`}
        className="w-full accent-primary-container cursor-pointer"
      />

      <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
        <span>
          {units} {unitWord} {portfolio}
        </span>
        <span>{tier}</span>
      </div>
    </div>
  );
}
