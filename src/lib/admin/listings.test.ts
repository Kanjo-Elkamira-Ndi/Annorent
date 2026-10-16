import { describe, expect, it } from "vitest";
import { ADMIN_LISTINGS } from "@/lib/admin/listings";

describe("admin listings data", () => {
  it("exists", () => {
    expect(ADMIN_LISTINGS).toBeDefined();
  });
});
