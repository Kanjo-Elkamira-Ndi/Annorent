import { Instrument_Sans } from "next/font/google";

/**
 * The single Annorent typeface (design-system-proposal §3).
 *
 * Instrument Sans is variable on weight (400–700) and width (75–100). The width
 * axis drives the condensed cut used in dense tables (`.wdth-condensed`).
 * It ships tabular figures and full French coverage (verified with fontTools,
 * design-audit/tooling/fontcheck.py). `next/font` self-hosts and subsets it,
 * so no request goes to Google at runtime.
 */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-instrument",
});
