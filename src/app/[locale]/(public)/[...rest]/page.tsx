import { notFound } from "next/navigation";

/**
 * Any unknown path under a locale renders `(public)/not-found.tsx` inside the
 * public shell, so a broken link still leaves the visitor with navigation.
 */
export default function CatchAll() {
  notFound();
}
