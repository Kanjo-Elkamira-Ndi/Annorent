import type { Metadata } from "next";
import { UnavailablePage } from "@/components/shared/unavailable-page";
import { isLocale, t } from "@/lib/i18n";
import { localePath } from "@/lib/navigation";

/** Placeholder until its roadmap phase connects real data (see UnavailablePage). */

export async function generateMetadata({ params }: PageProps<"/[locale]/saved">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: t(locale, "common", "nav.saved") } : {};
}

export default async function Page({ params }: PageProps<"/[locale]/saved">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return (
    <UnavailablePage
      title={t(locale, "common", "placeholder.saved.title")}
      body={t(locale, "common", "placeholder.saved.body")}
      action={{ href: localePath(locale, "/login"), label: t(locale, "common", "nav.signIn") }}
    />
  );
}
