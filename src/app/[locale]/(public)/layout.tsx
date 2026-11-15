import { PublicShell } from "@/components/layout/public-shell";
import { isLocale } from "@/lib/i18n";

export default async function PublicLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  // The root layout already 404s unknown locales; this narrows the type.
  if (!isLocale(locale)) return null;
  return <PublicShell locale={locale}>{children}</PublicShell>;
}
