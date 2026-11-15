import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Inline alert: a 4px rule in the status colour on the subtle background.
 * Not a filled block (the legacy sage boxes failed contrast). Danger uses
 * role="alert"; the others are role="status" so they don't interrupt.
 */

export type AlertTone = "info" | "success" | "warning" | "danger";

const tones: Record<AlertTone, { box: string; icon: ReactNode }> = {
  info: { box: "border-l-action bg-action-subtle", icon: <Info aria-hidden className="size-5 text-link" /> },
  success: { box: "border-l-success bg-success-bg", icon: <CircleCheck aria-hidden className="size-5 text-success" /> },
  warning: { box: "border-l-pending bg-pending-bg", icon: <TriangleAlert aria-hidden className="size-5 text-pending" /> },
  danger: { box: "border-l-danger bg-danger-bg", icon: <CircleAlert aria-hidden className="size-5 text-danger" /> },
};

export function Alert({
  tone = "info",
  title,
  children,
  action,
  className,
}: {
  tone?: AlertTone;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const { box, icon } = tones[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("flex gap-3 rounded-md border-l-4 p-4", box, className)}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-body-sm font-semibold text-primary">{title}</p>
        {children ? <div className="text-body-sm text-secondary">{children}</div> : null}
        {action ? <div className="mt-2">{action}</div> : null}
      </div>
    </div>
  );
}
