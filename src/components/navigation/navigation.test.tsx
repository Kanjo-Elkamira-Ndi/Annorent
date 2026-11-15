import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BottomNav } from "./bottom-nav";
import { LanguageSwitch } from "./language-switch";
import { PillNav } from "./pill-nav";

const { pathnameMock } = vi.hoisted(() => ({ pathnameMock: vi.fn(() => "/en/hotels") }));

vi.mock("next/navigation", () => ({ usePathname: () => pathnameMock() }));

beforeEach(() => {
  pathnameMock.mockReturnValue("/en/hotels");
});

describe("PillNav", () => {
  it("marks only the current section with aria-current", () => {
    render(<PillNav locale="en" />);
    const nav = screen.getAllByRole("navigation", { name: "Main navigation" })[0];
    expect(within(nav).getByRole("link", { name: "Hotels" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Properties" })).not.toHaveAttribute("aria-current");
  });

  it("links to locale-prefixed routes and the home page", () => {
    render(<PillNav locale="fr" />);
    expect(screen.getAllByRole("link", { name: "Biens" })[0]).toHaveAttribute("href", "/fr/properties");
    expect(screen.getByRole("link", { name: "Accueil Annorent" })).toHaveAttribute("href", "/fr");
  });

  it("opens the menu sheet from the menu button", async () => {
    render(<PillNav locale="en" />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Menu" })).toHaveAttribute("open");
  });
});

describe("BottomNav", () => {
  it("has four labelled destinations and marks the current one", () => {
    pathnameMock.mockReturnValue("/en/map");
    render(<BottomNav locale="en" />);
    const nav = screen.getByRole("navigation", { name: "Quick navigation" });
    expect(within(nav).getAllByRole("link")).toHaveLength(4);
    expect(within(nav).getByRole("link", { name: "Map" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Search" })).not.toHaveAttribute("aria-current");
  });
});

describe("LanguageSwitch", () => {
  it("links to the other language for the same page, without JavaScript", () => {
    render(<LanguageSwitch locale="en" />);
    const link = screen.getByRole("link", { name: "Passer en français" });
    expect(link).toHaveAttribute("href", "/api/locale?locale=fr&next=%2Fen%2Fhotels");
    expect(link).toHaveAttribute("hreflang", "fr");
  });
});
