import { describe, expect, it } from "vitest";
import { isActivePath, localePath } from "@/lib/navigation";

describe("localePath", () => {
  it("prefixes the locale", () => {
    expect(localePath("fr", "/hotels")).toBe("/fr/hotels");
    expect(localePath("en", "/")).toBe("/en");
  });
});

describe("isActivePath", () => {
  it("matches a section and its children", () => {
    expect(isActivePath("/en/hotels", "en", "/hotels")).toBe(true);
    expect(isActivePath("/en/hotels/abc", "en", "/hotels")).toBe(true);
  });

  it("does not match a sibling that shares a prefix", () => {
    expect(isActivePath("/en/hotels-guide", "en", "/hotels")).toBe(false);
  });

  it("matches home only exactly", () => {
    expect(isActivePath("/en", "en", "/")).toBe(true);
    expect(isActivePath("/en/map", "en", "/")).toBe(false);
  });
});
