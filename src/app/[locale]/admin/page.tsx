import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function Page(props: PageProps<"/[locale]/admin">) {
  const { locale: raw } = await props.params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return <AdminDashboard locale={locale} />;
}
