/**
 * Conditional className joiner.
 *
 * Owns: flattening conditional class values into a single class string.
 * Does not own: Tailwind conflict resolution (no `tailwind-merge` — the token
 * scale in `globals.css` is authored so conflicting utilities are not emitted
 * in the same rule).
 */

export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function collect(value: ClassValue, out: string[]): void {
  if (!value && value !== 0) return;

  if (typeof value === "string" || typeof value === "number") {
    out.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collect(item, out);
    return;
  }

  for (const [key, enabled] of Object.entries(value)) {
    if (enabled) out.push(key);
  }
}

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) collect(value, out);
  return out.join(" ");
}
