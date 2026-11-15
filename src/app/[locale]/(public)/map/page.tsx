import type { Metadata } from "next";
import { UnavailablePage } from "@/components/shared/unavailable-page";
import { isLocale, t } from "@/lib/i18n";


/** Placeholder until its roadmap phase connects real data (see UnavailablePage). */

export async function generateMetadata({ params }: PageProps<"/[locale]/map">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: t(locale, "common", "nav.map") } : {};
}

export default async function Page({ params }: PageProps<"/[locale]/map">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return (
    <UnavailablePage
      title={t(locale, "common", "placeholder.map.title")}
      body={t(locale, "common", "placeholder.map.body")}
    />
  );
}
