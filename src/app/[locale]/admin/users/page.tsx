import { UserManagement } from "@/components/admin/user-management";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function Page(props: PageProps<"/[locale]/admin/users">) {
  const { locale: raw } = await props.params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return <UserManagement locale={locale} />;
}
