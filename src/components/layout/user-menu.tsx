"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { t, type Locale } from "@/lib/i18n";

type User = { name: string; role: "tenant" | "owner" | "admin" } | null;

type UserMenuProps = {
  locale: Locale;
  user: User;
  onLogout?: () => void;
};

export function UserMenu({ locale, user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  if (!user) return null;

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const role = user.role;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t(locale, "common", "common.userMenu")}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary font-label-md text-label-md"
      >
        {getInitials(user.name)}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 w-56 rounded-lg bg-surface-container-lowest shadow-lg ring-1 ring-surface-container-high z-50"
        >
          <div className="p-2">
            {role === "tenant" && (
              <>
                <Link
                  href={`/${locale}/account/bookings`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    event_note
                  </span>
                  {t(locale, "common", "common.bookings")}
                </Link>
                <Link
                  href={`/${locale}/account/messages`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  {t(locale, "common", "common.messages")}
                </Link>
                <Link
                  href={`/${locale}/account/saved`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    favorite
                  </span>
                  {t(locale, "common", "common.saved")}
                </Link>
                <Link
                  href={`/${locale}/account/appointments`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    calendar_month
                  </span>
                  {t(locale, "common", "common.visits")}
                </Link>
                <Link
                  href={`/${locale}/account/profile`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    person
                  </span>
                  {t(locale, "common", "common.profile")}
                </Link>
              </>
            )}
            {role === "owner" && (
              <>
                <Link
                  href={`/${locale}/owner`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    dashboard
                  </span>
                  {t(locale, "common", "common.dashboard")}
                </Link>
                <Link
                  href={`/${locale}/owner/properties`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    apartment
                  </span>
                  {t(locale, "common", "common.myProperties")}
                </Link>
                <Link
                  href={`/${locale}/owner/messages`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  {t(locale, "common", "common.messages")}
                </Link>
                <Link
                  href={`/${locale}/owner/profile`}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    person
                  </span>
                  {t(locale, "common", "common.profile")}
                </Link>
              </>
            )}
            {role === "admin" && (
              <Link
                href={`/${locale}/admin`}
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  admin_panel_settings
                </span>
                {t(locale, "common", "common.adminConsole")}
              </Link>
            )}
            <div className="my-1 h-px bg-surface-container" />
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                if (onLogout) onLogout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-surface-container font-body-md text-body-md text-on-surface"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                logout
              </span>
              {t(locale, "common", "common.logOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
