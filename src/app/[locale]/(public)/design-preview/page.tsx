import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignPreview } from "./design-preview";

/**
 * Internal design-system preview (roadmap Phase 1 acceptance).
 *
 * Available in development. In production it 404s unless the server is
 * started with ENABLE_DESIGN_PREVIEW=1, it is never linked from the product,
 * and it is excluded from search engines. Its copy is English-only on
 * purpose: it is a developer tool, not a user-facing page.
 */

// Rendered per request so ENABLE_DESIGN_PREVIEW is read at runtime, not baked in at build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Design preview",
  robots: { index: false, follow: false },
};

export default function DesignPreviewPage() {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_DESIGN_PREVIEW !== "1") notFound();
  return <DesignPreview />;
}
