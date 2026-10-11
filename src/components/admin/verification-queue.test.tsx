import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VerificationQueue } from "@/components/admin/verification-queue";

describe("VerificationQueue", () => {
  it("renders queue identifier", () => {
    render(<VerificationQueue locale="en" />);
    expect(screen.getByText("#VERIF-CI-2025-0882")).toBeVisible();
  });
});
