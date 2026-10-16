import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

describe("AdminDashboard", () => {
  it("renders heading", () => {
    render(<AdminDashboard locale="en" />);
    expect(
      screen.getByText("Directoire des Opérations Foncier & Séquestre"),
    ).toBeVisible();
  });
});
