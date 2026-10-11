import { describe, expect, it } from "vitest";
import { adminNav, ADMIN_NAV_BADGES } from "@/lib/admin/navigation";

describe("admin navigation", () => {
  it("includes four built items", () => {
    const items = adminNav("en");
    expect(items.length).toBeGreaterThanOrEqual(4);
  });

  it("has verification badge", () => {
    expect(ADMIN_NAV_BADGES.verification).toBe(14);
  });
});
