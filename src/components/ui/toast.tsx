"use client";

import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Toasts (design-system-proposal §8.1).
 *
 * - Success and info are polite (`role="status"`) and leave after 5s.
 * - Errors are assertive (`role="alert"`) and stay until dismissed.
 * - Bottom-centre on mobile (above the floating bottom nav), bottom-right on desktop.
 *
 * Rule for callers: never toast a booking, payment or sign-in success that the
 * backend has not confirmed.
 */

export type ToastTone = "success" | "info" | "error";
type Toast = { id: number; tone: ToastTone; title: string; body?: string };
type ToastApi = { show: (toast: Omit<Toast, "id">) => void; dismiss: (id: number) => void };

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error("useToast must be used inside <ToastProvider>");
  return api;
}

const icons: Record<ToastTone, ReactNode> = {
  success: <CircleCheck aria-hidden className="size-5 text-success" />,
  info: <Info aria-hidden className="size-5 text-link" />,
  error: <CircleAlert aria-hidden className="size-5 text-danger" />,
};

export function ToastProvider({ children, closeLabel }: { children: ReactNode; closeLabel: string }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = nextId.current++;
      setToasts((current) => [...current.slice(-2), { ...toast, id }]);
      if (toast.tone !== "error") window.setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 z-[70] flex flex-col items-center gap-2 px-4",
          "bottom-[calc(var(--bottom-nav-height)+24px+env(safe-area-inset-bottom))] md:bottom-6 md:items-end md:px-6",
        )}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-border bg-raised p-4 shadow-e2"
          >
            <span className="mt-0.5 shrink-0">{icons[toast.tone]}</span>
            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-semibold text-primary">{toast.title}</p>
              {toast.body ? <p className="mt-0.5 text-body-sm text-secondary">{toast.body}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label={closeLabel}
              className="-m-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-sunken hover:text-primary"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
