"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { defaultLocale, isLocale, t } from "@/lib/i18n";

/**
 * Error boundary for public pages. Renders inside the public shell, names the
 * failure and offers a retry. Never shows the raw error to the visitor.
 */
export default function PublicError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  useEffect(() => {
    // Logged with its digest only; no request data or user content.
    console.error("Public page error", error.digest ?? error.name);
  }, [error]);

  return (
    <Container className="py-6 sm:py-10">
      <ErrorState
        headingLevel="h1"
        title={t(locale, "common", "error.title")}
        body={t(locale, "common", "error.body")}
        action={<Button onClick={reset}>{t(locale, "common", "state.retry")}</Button>}
      />
    </Container>
  );
}
