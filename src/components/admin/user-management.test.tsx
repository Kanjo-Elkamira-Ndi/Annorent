import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UserManagement } from "@/components/admin/user-management";

describe("UserManagement", () => {
  it("renders title", () => {
    render(<UserManagement locale="en" />);
    expect(screen.getByText("User Management & Access Control")).toBeVisible();
  });
});
