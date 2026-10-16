import { describe, expect, it } from "vitest";
import { ADMIN_DASHBOARD } from "@/lib/admin/dashboard";

describe("admin dashboard data", () => {
  it("exists", () => {
    expect(ADMIN_DASHBOARD).toBeDefined();
  });
});
