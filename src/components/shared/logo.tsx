import { cn } from "@/lib/utils/cn";

/**
 * The Annorent keyhole mark, vector-traced from `public/logo.jpg` (98.4% pixel
 * match). One logo everywhere: the legacy UI's generic building glyph is gone
 * (design-audit/current-frontend-audit.md §2).
 */

const MARK_PATH =
  "M315.1 773.2A324 324 0 1 1 764.9 773.2L739.0 677.8A242 242 0 1 0 341.0 677.8ZM418 660A171 171 0 1 1 662 660L702 815A290 290 0 0 1 378 815ZM492 615A89 89 0 1 1 588 615Q574 628 575 652L605 772Q540 789 475 772L505 652Q506 628 492 615Z";

/** Brand tile: white keyhole on logo blue. Decorative by default. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 1080 1080"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="1080" height="1080" rx="240" fill="#024BFF" />
      <path fill="#FFFFFF" fillRule="evenodd" d={MARK_PATH} />
    </svg>
  );
}

/** Mark + wordmark, used in the nav and footer. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={compact ? "size-7" : "size-8"} />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-primary">Annorent</span>
    </span>
  );
}
