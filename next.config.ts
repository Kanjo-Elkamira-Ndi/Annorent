import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The root layout lives under `[locale]` so `<html lang>` is server-rendered
    // per locale. With no single top-level layout, unmatched URLs need
    // `app/global-not-found.tsx` (node_modules/next/dist/docs/01-app/
    // 03-api-reference/03-file-conventions/not-found.md).
    globalNotFound: true,
  },
};

export default nextConfig;
