"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

/**
 * Toggles between English and French on the same page. A real link through
 * /api/locale (stores the cookie, then redirects), so it also works before
 * JavaScript loads on a slow connection.
 */
export function LanguageSwitch({ locale, variant = "pill" }: { locale: Locale; variant?: "pill" | "row" }) {
  const pathname = usePathname() ?? `/${locale}`;
  const target: Locale = locale === "en" ? "fr" : "en";
  const href = `/api/locale?locale=${target}&next=${encodeURIComponent(pathname)}`;

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={t(locale, "common", "language.switchTo")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium text-secondary transition-colors hover:bg-sunken hover:text-primary",
        variant === "pill" ? "h-9 px-3 text-body-sm" : "h-11 px-3 text-body",
      )}
    >
      <Languages aria-hidden className="size-4" />
      {variant === "pill" ? target.toUpperCase() : t(locale, "common", "language.switchTo")}
    </a>
  );
}
