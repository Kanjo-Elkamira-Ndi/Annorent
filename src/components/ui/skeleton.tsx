import { cn } from "@/lib/utils/cn";

/**
 * Loading placeholder. Size it to the final layout's exact geometry so nothing
 * shifts when content arrives. Shimmer becomes a static tint under reduced motion.
 */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("skeleton-shimmer rounded-md", className)} />;
}
