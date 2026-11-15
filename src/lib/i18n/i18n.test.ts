import { describe, expect, it } from "vitest";
import { catalogs, isLocale, switchLocalePath, t } from "@/lib/i18n";

describe("message catalogues", () => {
  it("ship every English key in French, and no extras", () => {
    for (const [name, tables] of Object.entries(catalogs)) {
      const en = Object.keys(tables.en).sort();
      const fr = Object.keys(tables.fr).sort();
      expect(fr, `namespace ${name}`).toEqual(en);
    }
  });

  it("have no empty strings", () => {
    for (const tables of Object.values(catalogs)) {
      for (const table of Object.values(tables)) {
        for (const [key, value] of Object.entries(table)) {
          expect(value.trim(), key).not.toBe("");
        }
      }
    }
  });
});

describe("t()", () => {
  it("returns the requested locale", () => {
    expect(t("fr", "common", "nav.hotels")).toBe("Hôtels");
    expect(t("en", "common", "nav.hotels")).toBe("Hotels");
  });

  it("fills placeholders", () => {
    expect(t("en", "common", "footer.copyright", { year: 2026 })).toContain("2026");
  });

  it("leaves unknown placeholders visible", () => {
    expect(t("en", "common", "footer.copyright")).toContain("{year}");
  });
});

describe("locales", () => {
  it("accepts only English and French", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("pt")).toBe(false);
  });

  it("switches the locale segment and keeps the rest of the path", () => {
    expect(switchLocalePath("/en/hotels", "fr")).toBe("/fr/hotels");
    expect(switchLocalePath("/fr", "en")).toBe("/en");
    expect(switchLocalePath("/en/properties/abc", "fr")).toBe("/fr/properties/abc");
  });
});
