import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatMoney,
  formatNumber,
  formatRelativeTime,
  formatShortDate,
} from "@/lib/utils/format";

/** Digits and grouping marks only, so symbol placement and space flavour don't matter. */
function digits(formatted: string): string {
  return formatted.replace(/[^\d,.]/g, "");
}

describe("formatMoney", () => {
  it("uses the Central African franc label, not the West African one", () => {
    // XAF renders as "FCFA" for the Cameroonian locales; XOF would render "F CFA".
    expect(formatMoney(350000, "en")).toContain("FCFA");
    expect(formatMoney(350000, "fr")).toContain("FCFA");
  });

  it("never shows minor units", () => {
    expect(digits(formatMoney(450000, "en"))).toBe("450,000");
  });

  it("groups per locale", () => {
    // en groups with a comma, fr with a (narrow) no-break space.
    expect(digits(formatMoney(1250000, "en"))).toBe("1,250,000");
    expect(digits(formatMoney(1250000, "fr"))).toBe("1250000");
  });

  it("puts the currency after the amount in French", () => {
    expect(formatMoney(350000, "fr").trim().endsWith("FCFA")).toBe(true);
  });

  it("keeps zero and negative values intact", () => {
    expect(digits(formatMoney(0, "en"))).toBe("0");
    expect(formatMoney(-50000, "en")).toContain("-");
  });
});

describe("formatNumber", () => {
  it("formats a plain count", () => {
    expect(formatNumber(4, "en")).toBe("4");
    expect(formatNumber(1234, "en").replace(/,/g, "")).toBe("1234");
  });
});

describe("formatDate", () => {
  it("renders a stable ISO date", () => {
    expect(formatDate("2026-03-14T09:00:00.000Z", "en")).toContain("2026");
    expect(formatDate("2026-03-14T09:00:00.000Z", "fr")).toContain("2026");
  });

  it("returns the input for an invalid date", () => {
    expect(formatDate("not-a-date", "en")).toBe("not-a-date");
  });
});

describe("formatShortDate", () => {
  it("puts the day first, as Cameroon does in both languages", () => {
    expect(formatShortDate("2026-03-04T00:00:00.000Z", "en")).toBe("04/03/2026");
    expect(formatShortDate("2026-03-04T00:00:00.000Z", "fr")).toBe("04/03/2026");
  });
});

describe("formatRelativeTime", () => {
  const now = new Date("2026-03-14T12:00:00.000Z");

  it("describes recent instants in the past", () => {
    const twoHoursAgo = new Date("2026-03-14T10:00:00.000Z").toISOString();
    expect(formatRelativeTime(twoHoursAgo, "en", now)).toContain("2");
  });

  it("is locale-dependent", () => {
    const twoHoursAgo = new Date("2026-03-14T10:00:00.000Z").toISOString();
    expect(formatRelativeTime(twoHoursAgo, "fr", now)).not.toBe(
      formatRelativeTime(twoHoursAgo, "en", now),
    );
  });

  it("reports days for distant instants", () => {
    const threeDaysAgo = new Date("2026-03-11T12:00:00.000Z").toISOString();
    expect(formatRelativeTime(threeDaysAgo, "en", now)).toContain("3");
  });
});
