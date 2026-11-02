"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";
import { t } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const switchLocale = (next: Locale) => {
    // Replace locale prefix in pathname
    const parts = pathname.split("/");
    if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
      parts[1] = next;
      router.push(parts.join("/") || `/${next}`);
    } else {
      router.push(`/${next}${pathname}`);
    }
    // Persist via cookie
    if (typeof document !== "undefined") {
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t(locale, "common", "common.language")}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
      >
        <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
          language
        </span>
        <span className="font-label-sm text-label-sm font-semibold">
          {locale.toUpperCase()} · FCFA
        </span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-label={t(locale, "common", "common.language")}
          className="absolute end-0 mt-2 w-56 rounded-lg bg-surface-container-lowest shadow-lg ring-1 ring-surface-container-high z-50"
        >
          <div className="p-2">
            <div className="px-2 py-1 font-label-sm text-label-sm text-on-surface-variant">
              {t(locale, "common", "common.language")}
            </div>
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchLocale(l)}
                className={cn(
                  "w-full text-start px-3 py-2 rounded-md font-body-md text-body-md",
                  l === locale
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface hover:bg-surface-container",
                )}
              >
                {localeLabels[l]}
              </button>
            ))}
            <div className="my-1 h-px bg-surface-container" />
            <div className="px-2 py-1 font-label-sm text-label-sm text-on-surface-variant">
              {t(locale, "common", "common.currency")}
            </div>
            <div className="px-3 py-2 font-body-md text-body-md text-on-surface">FCFA (XAF)</div>
          </div>
        </div>
      )}
    </div>
  );
}
