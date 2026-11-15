import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Page container with the standard gutter (16 / 24 / 32px).
 * Widths: reading 680 (prose) · content 1200 (marketing, detail) · wide 1440 (results + map).
 */
const widths = { reading: "max-w-[680px]", content: "max-w-[1200px]", wide: "max-w-[1440px]" } as const;

export function Container({
  width = "content",
  className,
  ...rest
}: ComponentPropsWithRef<"div"> & { width?: keyof typeof widths }) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 xl:px-8", widths[width], className)} {...rest} />;
}
