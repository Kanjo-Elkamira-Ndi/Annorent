import { describe, expect, it } from "vitest";
import { ADMIN_USERS } from "@/lib/admin/users";

describe("admin users data", () => {
  it("exists", () => {
    expect(ADMIN_USERS).toBeDefined();
  });
});
