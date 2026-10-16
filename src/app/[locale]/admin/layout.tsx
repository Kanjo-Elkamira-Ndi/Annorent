import { AppShell } from "@/components/layout/app-shell";
import { requireRole } from "@/lib/auth/guards";
import { adminNav } from "@/lib/admin/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[locale]/admin">) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  requireRole(locale, "admin");

  return (
    <AppShell
      locale={locale}
      items={adminNav(locale)}
      sectionLabel="Ops Console"
      heading="CI/SN / Node Live 99.98% / v2.4.1"
      footer={
        <div className="flex flex-col gap-base rounded-xl bg-surface-container-low p-gutter shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-base">
            <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-tertiary">
              verified
            </span>
            <span className="font-label-sm text-label-sm text-tertiary">Admin Desk</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-semibold text-on-surface">
              Super Admin
            </span>
          </div>
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
