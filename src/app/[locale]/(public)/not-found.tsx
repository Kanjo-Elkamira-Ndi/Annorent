"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { buttonClasses } from "@/components/ui/button";
import { defaultLocale, isLocale, t } from "@/lib/i18n";
import { localePath } from "@/lib/navigation";

/** 404 inside the public shell. not-found files receive no props, so the locale comes from the URL. */
export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <Container className="py-6 sm:py-10">
      <EmptyState
        headingLevel="h1"
        title={t(locale, "common", "notFound.title")}
        body={t(locale, "common", "notFound.body")}
        action={
          <Link href={localePath(locale, "/")} className={buttonClasses({ variant: "primary" })}>
            {t(locale, "common", "notFound.home")}
          </Link>
        }
      />
    </Container>
  );
}
