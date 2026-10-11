import { VerificationQueue } from "@/components/admin/verification-queue";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function Page(props: PageProps<"/[locale]/admin/listings">) {
  const { locale: raw } = await props.params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return <VerificationQueue locale={locale} />;
}
