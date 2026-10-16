import { describe, expect, it } from "vitest";
import { ADMIN_TRANSACTIONS } from "@/lib/admin/transactions";

describe("admin transactions data", () => {
  it("exists", () => {
    expect(ADMIN_TRANSACTIONS).toBeDefined();
  });
});
