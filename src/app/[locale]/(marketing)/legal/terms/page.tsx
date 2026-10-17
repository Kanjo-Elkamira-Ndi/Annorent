import { SiteHeader } from "@/components/layout/site-header";
import { buildLegalChrome, LegalDocument } from "@/components/marketing/legal-document";
import { SiteFooter } from "@/components/marketing/site-footer";
import { isLocale, t, type Locale } from "@/lib/i18n";

/**
 * Terms of Service — `/[locale]/legal/terms`.
 *
 * Renders sections 01-06 and 09 of the master instrument from the Stitch
 * reference. The instrument body is English-only data in `lib/marketing/legal.ts`
 * so counsel reviews a single canonical text; only chrome is localised.
 */
export default async function LegalTermsPage({ params }: PageProps<"/[locale]/legal/terms">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const tr = (key: string) => t(typed, "marketing", key);

  return (
    <>
      <SiteHeader locale={typed} activeHref="/legal/terms" />
      <LegalDocument
        variant="terms"
        homeHref={`/${typed}`}
        termsHref={`/${typed}/legal/terms`}
        privacyHref={`/${typed}/legal/privacy`}
        chrome={buildLegalChrome(tr, "terms")}
      />
      <SiteFooter locale={typed} />
    </>
  );
}
