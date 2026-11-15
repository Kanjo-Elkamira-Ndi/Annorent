// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET } from "./route";

const call = (query: string) => GET(new NextRequest(`https://annorent.test/api/locale?${query}`));

describe("GET /api/locale", () => {
  it("stores the choice and returns to the same page in the new language", () => {
    const response = call("locale=fr&next=%2Fen%2Fhotels");
    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("https://annorent.test/fr/hotels");
    expect(response.headers.get("set-cookie")).toContain("locale=fr");
  });

  it("falls back to English for an unsupported locale", () => {
    const response = call("locale=pt&next=%2Ffr");
    expect(response.headers.get("location")).toBe("https://annorent.test/en");
  });

  it("refuses to redirect off-site", () => {
    for (const next of ["https://evil.example", "//evil.example", "/\\evil.example"]) {
      const response = call(`locale=en&next=${encodeURIComponent(next)}`);
      expect(new URL(response.headers.get("location") ?? "").origin).toBe("https://annorent.test");
    }
  });
});
