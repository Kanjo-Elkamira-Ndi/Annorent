import { BadgeCheck, CircleAlert, Clock, Lock, Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * The one status badge (design-system-proposal §8.1).
 *
 * Tones are a closed set mapped to fixed meanings. Each badge pairs colour
 * with an icon and a text label, so colour is never the only signal.
 * The label text comes from the caller (i18n), because the backend's
 * status vocabulary is not verified yet; once it is, the caller maps each
 * backend enum value to exactly one tone.
 */

export type StatusTone = "success" | "pending" | "danger" | "locked" | "featured";

const tones: Record<StatusTone, { className: string; icon: ReactNode }> = {
  success: { className: "bg-success-bg text-success", icon: <BadgeCheck aria-hidden className="size-3.5" /> },
  pending: { className: "bg-pending-bg text-pending", icon: <Clock aria-hidden className="size-3.5" /> },
  danger: { className: "bg-danger-bg text-danger", icon: <CircleAlert aria-hidden className="size-3.5" /> },
  locked: { className: "bg-locked-bg text-locked", icon: <Lock aria-hidden className="size-3.5" /> },
  // Taxi yellow is a fill only, always with ink text (white on it is 1.56:1).
  featured: { className: "bg-featured text-on-featured", icon: <Star aria-hidden className="size-3.5" /> },
};

export function StatusBadge({ tone, children, className }: { tone: StatusTone; children: ReactNode; className?: string }) {
  const { className: toneClass, icon } = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-sm px-2 text-caption font-medium whitespace-nowrap",
        toneClass,
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
