"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { t, type Locale } from "@/lib/i18n";
import { applyThemePreference, readThemePreference, type ThemePreference } from "@/lib/theme";

/**
 * System / Light / Dark.
 *
 * The source of truth is `<html data-theme-pref>`, set before paint by the
 * inline head script. This control subscribes to that attribute
 * (useSyncExternalStore), so every theme switch on the page stays in sync and
 * the server render ("system") never causes a hydration mismatch.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme-pref"] });
  return () => observer.disconnect();
}

const getServerSnapshot = (): ThemePreference => "system";

export function ThemeSwitch({ locale, hideLegend = false }: { locale: Locale; hideLegend?: boolean }) {
  const pref = useSyncExternalStore(subscribe, readThemePreference, getServerSnapshot);

  // While following the OS, re-resolve when the OS setting changes.
  useEffect(() => {
    if (pref !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemePreference("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [pref]);

  return (
    <SegmentedControl<ThemePreference>
      legend={t(locale, "common", "theme.label")}
      hideLegend={hideLegend}
      size="sm"
      value={pref}
      onChange={applyThemePreference}
      options={[
        { value: "system", label: t(locale, "common", "theme.system"), icon: <Monitor aria-hidden className="size-4" /> },
        { value: "light", label: t(locale, "common", "theme.light"), icon: <Sun aria-hidden className="size-4" /> },
        { value: "dark", label: t(locale, "common", "theme.dark"), icon: <Moon aria-hidden className="size-4" /> },
      ]}
    />
  );
}
