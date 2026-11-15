import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Dialog } from "./dialog";
import { Input } from "./input";
import { RadioGroup } from "./radio-group";
import { SegmentedControl } from "./segmented-control";
import { Select } from "./select";
import { StatusBadge } from "./status-badge";
import { ToastProvider, useToast } from "./toast";

describe("Button", () => {
  it("is a real button that defaults to type=button", () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole("button", { name: "Save changes" })).toHaveAttribute("type", "button");
  });

  it("blocks clicks and announces busy while loading", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Input", () => {
  it("has a visible, associated label and help text", () => {
    render(<Input label="Full name" help="As on your ID." />);
    const input = screen.getByLabelText("Full name");
    expect(input).toHaveAccessibleDescription("As on your ID.");
  });

  it("marks errors as invalid and describes them instead of the help", () => {
    render(<Input label="Budget" help="Monthly" error="Enter an amount above 0." />);
    const input = screen.getByLabelText("Budget");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter an amount above 0.");
    expect(screen.queryByText("Monthly")).not.toBeInTheDocument();
  });

  it("shows prefix adornments", () => {
    render(<Input label="Phone" prefix="+237" />);
    expect(screen.getByText("+237")).toBeInTheDocument();
  });
});

describe("Select", () => {
  it("is a native, labelled select", async () => {
    render(<Select label="City" options={[{ value: "douala", label: "Douala" }, { value: "buea", label: "Buea" }]} />);
    const select = screen.getByLabelText("City");
    await userEvent.selectOptions(select, "buea");
    expect(select).toHaveValue("buea");
  });
});

describe("Checkbox and RadioGroup", () => {
  it("toggles a labelled checkbox", async () => {
    render(<Checkbox label="Furnished" />);
    const box = screen.getByRole("checkbox", { name: "Furnished" });
    await userEvent.click(box);
    expect(box).toBeChecked();
  });

  it("groups radios under a legend", () => {
    render(
      <RadioGroup
        legend="Rental period"
        name="period"
        defaultValue="month"
        options={[
          { value: "day", label: "Daily" },
          { value: "month", label: "Monthly" },
        ]}
      />,
    );
    expect(screen.getByRole("group", { name: "Rental period" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Monthly" })).toBeChecked();
  });
});

describe("SegmentedControl", () => {
  function Harness() {
    const [value, setValue] = useState<"rent" | "buy">("rent");
    return (
      <SegmentedControl
        legend="I want to"
        value={value}
        onChange={setValue}
        options={[
          { value: "rent", label: "Rent" },
          { value: "buy", label: "Buy" },
        ]}
      />
    );
  }

  it("is a named radio group that changes on click", async () => {
    render(<Harness />);
    expect(screen.getByRole("group", { name: "I want to" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "Buy" }));
    expect(screen.getByRole("radio", { name: "Buy" })).toBeChecked();
  });

  it("moves with arrow keys, like any radio group", async () => {
    render(<Harness />);
    screen.getByRole("radio", { name: "Rent" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "Buy" })).toBeChecked();
  });
});

describe("StatusBadge", () => {
  it("always shows its text label, not just a colour", () => {
    render(<StatusBadge tone="pending">Pending review</StatusBadge>);
    expect(screen.getByText("Pending review")).toBeVisible();
  });
});

describe("Dialog", () => {
  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Open
        </button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Delete listing?" closeLabel="Close">
          Body
        </Dialog>
      </>
    );
  }

  it("opens with an accessible name and closes from its close button", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Delete listing?" });
    expect(dialog).toHaveAttribute("open");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(dialog).not.toHaveAttribute("open");
  });
});

describe("Toast", () => {
  function Trigger({ tone }: { tone: "success" | "error" }) {
    const toast = useToast();
    return (
      <button type="button" onClick={() => toast.show({ tone, title: tone === "error" ? "Couldn't save" : "Saved" })}>
        Fire
      </button>
    );
  }

  it("announces success politely", async () => {
    render(
      <ToastProvider closeLabel="Dismiss">
        <Trigger tone="success" />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Fire" }));
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });

  it("announces errors assertively and keeps them until dismissed", async () => {
    render(
      <ToastProvider closeLabel="Dismiss">
        <Trigger tone="error" />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Fire" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Couldn't save");
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
