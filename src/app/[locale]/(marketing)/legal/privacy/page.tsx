import { SiteHeader } from "@/components/layout/site-header";
import { buildLegalChrome, LegalDocument } from "@/components/marketing/legal-document";
import { SiteFooter } from "@/components/marketing/site-footer";
import { isLocale, t, type Locale } from "@/lib/i18n";

/**
 * Data Privacy Policy — `/[locale]/legal/privacy`.
 *
 * Renders sections 07-08 of the master instrument from the Stitch reference.
 * Shares the document shell, table of contents, and print action with
 * `/legal/terms`; only the section set differs.
 */
export default async function LegalPrivacyPage({
  params,
}: PageProps<"/[locale]/legal/privacy">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const tr = (key: string) => t(typed, "marketing", key);

  return (
    <>
      <SiteHeader locale={typed} activeHref="/legal/privacy" />
      <LegalDocument
        variant="privacy"
        homeHref={`/${typed}`}
        termsHref={`/${typed}/legal/terms`}
        privacyHref={`/${typed}/legal/privacy`}
        chrome={buildLegalChrome(tr, "privacy")}
      />
      <SiteFooter locale={typed} />
    </>
  );
}
