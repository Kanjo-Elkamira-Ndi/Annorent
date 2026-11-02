"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { t, type Locale } from "@/lib/i18n";
import { COMPANY_LINKS, PRIMARY_NAV, localeHref } from "@/lib/utils/navigation";

type User = { name: string; role: "tenant" | "owner" | "admin" } | null;

type MobileNavProps = {
  locale: Locale;
  user: User;
  onLogout?: () => void;
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ locale, user, onLogout, open, onClose }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Focus first focusable element
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-nav-title"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={drawerRef}
        className="absolute inset-y-0 start-0 w-full max-w-sm bg-surface-container-lowest shadow-xl flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-surface-container">
          <h2 id="mobile-nav-title" className="font-headline-sm text-headline-sm text-on-surface">
            {t(locale, "common", "common.menu")}
          </h2>
          <button
            ref={firstFocusRef}
            type="button"
            onClick={onClose}
            aria-label={t(locale, "common", "common.close")}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-container"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[24px] text-on-surface">
              close
            </span>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-1">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={localeHref(locale, item.href)}
                onClick={onClose}
                className="px-3 py-3 rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container"
              >
                {t(locale, "common", item.key)}
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-surface-container">
            <div className="px-3 py-2 font-label-md text-label-md text-on-surface-variant">
              {t(locale, "common", "nav.company")}
            </div>
            <div className="flex flex-col gap-1">
              {COMPANY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={localeHref(locale, item.href)}
                  onClick={onClose}
                  className="px-3 py-3 rounded-lg font-body-md text-body-md text-on-surface hover:bg-surface-container ps-6"
                >
                  {t(locale, "common", item.key)}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-surface-container">
            <div className="px-3 py-2 font-label-md text-label-md text-on-surface-variant">
              {t(locale, "common", "common.language")}
            </div>
            <div className="px-3 py-2 font-body-md text-body-md text-on-surface">EN · FR · PT · SW · FCFA (XAF)</div>
          </div>
        </nav>
        <div className="p-4 border-t border-surface-container flex flex-col gap-2">
          {!user ? (
            <>
              <Link
                href={localeHref(locale, "/login")}
                onClick={onClose}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container"
              >
                {t(locale, "common", "common.login")}
              </Link>
              <Link
                href={localeHref(locale, "/register/owner")}
                onClick={onClose}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md"
              >
                {t(locale, "common", "common.listYourProperty")}
              </Link>
            </>
          ) : (
            <>
              {user.role === "tenant" && (
                <>
                  <Link href={localeHref(locale, "/account/messages")} onClick={onClose} className="px-3 py-2 font-body-md text-body-md text-on-surface">
                    {t(locale, "common", "common.messages")}
                  </Link>
                  <Link href={localeHref(locale, "/account/notifications")} onClick={onClose} className="px-3 py-2 font-body-md text-body-md text-on-surface">
                    {t(locale, "common", "common.notifications")}
                  </Link>
                </>
              )}
              {user.role === "owner" && (
                <>
                  <Link href={localeHref(locale, "/owner")} onClick={onClose} className="px-3 py-2 font-body-md text-body-md text-on-surface">
                    {t(locale, "common", "common.dashboard")}
                  </Link>
                  <Link href={localeHref(locale, "/owner/properties/new")} onClick={onClose} className="px-3 py-2 font-body-md text-body-md text-on-surface">
                    {t(locale, "common", "common.addProperty")}
                  </Link>
                </>
              )}
              {user.role === "admin" && (
                <Link href={localeHref(locale, "/admin")} onClick={onClose} className="px-3 py-2 font-body-md text-body-md text-on-surface">
                  {t(locale, "common", "common.adminConsole")}
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  if (onLogout) onLogout();
                  onClose();
                }}
                className="px-3 py-2 text-start font-body-md text-body-md text-on-surface"
              >
                {t(locale, "common", "common.logOut")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
