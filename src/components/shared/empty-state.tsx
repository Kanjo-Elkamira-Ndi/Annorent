import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Empty state: says what is missing, what to do, and offers one action.
 *
 * The visual sits in the "doorway" frame (radius-door), the Open Door
 * direction's one signature shape, used only here, the home hero and the
 * auth panel (visual-direction.md §2B).
 */
export function EmptyState({
  title,
  body,
  action,
  visual,
  headingLevel = "h2",
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  visual?: ReactNode;
  headingLevel?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <div className={cn("flex flex-col items-start gap-4 py-10 sm:py-14", className)}>
      <div
        aria-hidden
        className="flex h-28 w-24 items-end justify-center overflow-hidden rounded-door border border-border bg-action-subtle pb-4"
      >
        {visual ?? (
          // The keyhole from the logo: a circle over a flared slot.
          <svg viewBox="0 0 40 56" className="h-12 w-9 text-action">
            <circle cx="20" cy="16" r="12" fill="currentColor" />
            <path d="M14 22h12l5 30H9z" fill="currentColor" />
          </svg>
        )}
      </div>
      <div className="max-w-[46ch] space-y-2">
        <Heading className="text-h2 font-semibold text-primary">{title}</Heading>
        {body ? <p className="text-body text-secondary">{body}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
