import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Card container: surface, 1px border, radius-lg, no shadow at rest.
 * Domain cards (property, hotel, space) compose it; it carries no layout opinions.
 */
export function Card({
  padding = "md",
  className,
  ...rest
}: ComponentPropsWithRef<"div"> & { padding?: "none" | "sm" | "md" }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface",
        padding === "sm" && "p-4",
        padding === "md" && "p-4 sm:p-5",
        className,
      )}
      {...rest}
    />
  );
}
