import { Container } from "@/components/layout/container";
import { isLocale, t } from "@/lib/i18n";

/**
 * Home: shell-stage placeholder. The real page (hero search, doorway image,
 * city shortcuts, category rows) is roadmap Phase 3.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <Container className="py-10 sm:py-16">
      <div className="max-w-[22ch]">
        <h1 className="text-display-fluid font-semibold text-primary">{t(locale, "common", "home.title")}</h1>
      </div>
      <p className="mt-4 max-w-[52ch] text-body-lg text-secondary">{t(locale, "common", "home.body")}</p>
    </Container>
  );
}
