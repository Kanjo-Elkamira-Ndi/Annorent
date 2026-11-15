import { LoaderCircle } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Button (design-system-proposal §8.1).
 *
 * - primary: the only filled-blue control; one per view where possible.
 * - secondary: surface + strong border. ghost: no border. destructive: red.
 * - Touch targets are ≥44px on touch devices, even for `sm` (expanded hit area).
 * - `loading` keeps the label, adds a spinner, sets aria-busy and blocks
 *   repeat submits without changing the button's width.
 *
 * `buttonClasses()` styles a link the same way (`<Link className={buttonClasses()}>`).
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium " +
  "transition-colors duration-[120ms] ease-out " +
  "disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 " +
  // Expand the hit area of small buttons to 44px on coarse pointers.
  "before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-action text-on-action hover:bg-action-hover",
  secondary: "border border-border-strong bg-surface text-primary hover:bg-sunken",
  ghost: "text-primary hover:bg-sunken",
  destructive: "bg-danger text-on-action hover:opacity-90 dark:text-canvas",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-body-sm",
  md: "h-10 px-4 text-body-sm",
  lg: "h-12 px-5 text-body",
};

/**
 * `shape="pill"` is for controls that sit inside the floating pill nav, so they
 * share its shape. It is a prop, not a className override, because `cn()` does
 * not resolve conflicting utilities (no tailwind-merge, by design).
 */
export type ButtonShape = "default" | "pill";

export function buttonClasses({
  variant = "primary",
  size = "md",
  shape = "default",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; shape?: ButtonShape; className?: string } = {}): string {
  return cn(base, shape === "pill" ? "rounded-full" : "rounded-md", variants[variant], sizes[size], className);
}

type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  loading?: boolean;
  leadingIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  shape = "default",
  loading = false,
  leadingIcon,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, shape, className })}
      {...rest}
    >
      {loading ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : leadingIcon}
      {children}
    </button>
  );
}
