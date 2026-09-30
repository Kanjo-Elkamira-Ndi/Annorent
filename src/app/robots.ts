import type { MetadataRoute } from "next";

/**
 * Robots directives. Placeholder until the production host is known — see
 * `context/architecture.md` for the deployment target.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
  };
}
