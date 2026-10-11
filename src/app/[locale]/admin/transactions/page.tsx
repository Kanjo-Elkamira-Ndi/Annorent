import { Transactions } from "@/components/admin/transactions";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function Page(props: PageProps<"/[locale]/admin/transactions">) {
  const { locale: raw } = await props.params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return <Transactions locale={locale} />;
}
