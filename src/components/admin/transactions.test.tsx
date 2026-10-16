import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Transactions } from "@/components/admin/transactions";

describe("Transactions", () => {
  it("renders title", () => {
    render(<Transactions locale="en" />);
    expect(
      screen.getByText("Transaction Monitoring & Settlement Reports"),
    ).toBeVisible();
  });
});
