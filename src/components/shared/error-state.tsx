import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Error state: names the failure and the recovery, never apologises. */
export function ErrorState({
  title,
  body,
  action,
  headingLevel = "h2",
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  headingLevel?: "h1" | "h2";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <div role="alert" className={cn("flex flex-col items-start gap-4 py-10 sm:py-14", className)}>
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-danger-bg">
        <CircleAlert aria-hidden className="size-6 text-danger" />
      </span>
      <div className="max-w-[46ch] space-y-2">
        <Heading className="text-h2 font-semibold text-primary">{title}</Heading>
        {body ? <p className="text-body text-secondary">{body}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
