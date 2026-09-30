import { Hero } from "@/components/marketing/hero";
import { TrustMetrics } from "@/components/marketing/trust-metrics";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Home page.
 *
 * Composition only (rule 11): it arranges marketing components and holds no
 * presentation logic. The locale is validated here and threaded to the
 * components that need it, rather than each component re-deriving it.
 */

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <>
      <Hero locale={typed} />
      <TrustMetrics locale={typed} />
    </>
  );
}
