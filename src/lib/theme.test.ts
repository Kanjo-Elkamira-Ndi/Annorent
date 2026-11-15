import { afterEach, describe, expect, it } from "vitest";
import { applyThemePreference, isThemePreference, readThemePreference, resolveTheme, themeScript } from "@/lib/theme";

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-pref");
  document.cookie = "theme=; path=/; max-age=0";
});

describe("theme preference", () => {
  it("resolves system to the OS preference", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
  });

  it("validates stored values", () => {
    expect(isThemePreference("dark")).toBe(true);
    expect(isThemePreference("sepia")).toBe(false);
  });

  it("applies, persists and reads back a choice", () => {
    applyThemePreference("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.cookie).toContain("theme=dark");
    expect(readThemePreference()).toBe("dark");
  });

  it("head script applies the cookie before React runs", () => {
    document.cookie = "theme=dark; path=/";
    new Function(themeScript)();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme-pref")).toBe("dark");
  });

  it("head script ignores an invalid cookie and follows the system", () => {
    document.cookie = "theme=<script>; path=/";
    new Function(themeScript)();
    expect(document.documentElement.getAttribute("data-theme-pref")).toBe("system");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
