import type { Metadata } from "next";
import { UnavailablePage } from "@/components/shared/unavailable-page";
import { isLocale, t } from "@/lib/i18n";
import { localePath } from "@/lib/navigation";

/** Placeholder until its roadmap phase connects real data (see UnavailablePage). */

export async function generateMetadata({ params }: PageProps<"/[locale]/login">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: t(locale, "common", "nav.signIn") } : {};
}

export default async function Page({ params }: PageProps<"/[locale]/login">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return (
    <UnavailablePage
      title={t(locale, "common", "placeholder.signIn.title")}
      body={t(locale, "common", "placeholder.signIn.body")}
      action={{ href: localePath(locale, "/properties"), label: t(locale, "common", "placeholder.browse") }}
    />
  );
}
