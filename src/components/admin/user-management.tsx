import type { Locale } from "@/lib/i18n";

export function UserManagement({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col pb-16">
      <div className="px-gutter py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-label-sm text-outline">
              <span>Security & Governance</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-primary">User Directory</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-mono text-on-surface-variant">SYS-IDM-WAEMU</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="font-headline-md text-headline-md tracking-tight text-on-surface">
                User Management & Access Control
              </h1>
              <span className="rounded-full bg-primary-fixed px-2.5 py-0.5 text-label-sm font-semibold uppercase tracking-wide text-on-primary-fixed">
                Institutional Tier 4
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-surface-container-lowest shadow-md">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-label-sm uppercase tracking-wider text-on-surface-variant">
                  <th className="py-3.5 pl-4 pr-2">User & Contact Matrix</th>
                  <th className="px-3 py-3.5">Assigned Role</th>
                  <th className="px-3 py-3.5">Verification / Security</th>
                  <th className="px-3 py-3.5">KYC & Escrow Tier</th>
                  <th className="px-3 py-3.5">Timeline & Telemetry</th>
                  <th className="px-3 py-3.5 text-center">Portfolio / Ops</th>
                  <th className="px-3 py-3.5 pl-3 pr-4 text-right">Row Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-md">
                <tr className="transition-colors hover:bg-surface-container-low/60">
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-high font-headline-sm font-semibold text-on-surface">
                        AD
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-headline-sm text-[15px] font-semibold text-on-surface">Amara Diallo</span>
                        <span className="truncate text-label-sm text-[12px] text-outline">a.diallo@cotedivoire-asset.ci</span>
                        <span className="font-mono text-[11px] text-on-surface-variant">+225 07 48 99 21 00 • CI-CNI-0038829</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center rounded-full bg-surface-container-highest px-2.5 py-1 text-label-sm font-semibold text-primary">Property Owner</span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-container/15 px-2.5 py-1 text-label-sm font-semibold text-tertiary">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      Verified
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      <span className="text-label-sm font-semibold text-on-surface">Tier 2 Institutional</span>
                      <span className="text-[11px] text-outline">Notarized Abidjan Desk</span>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      <span className="text-label-sm text-on-surface">Jan 14, 2024</span>
                      <span className="text-[11px] font-medium text-tertiary">Active 8m ago</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container-low px-2.5 py-1 font-mono text-label-sm font-semibold text-on-surface">
                      <span className="material-symbols-outlined text-[16px] text-primary">apartment</span>
                      14 Properties
                    </span>
                  </td>
                  <td className="px-3 py-4 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary">
                        <span className="material-symbols-outlined text-[18px]">folder_shared</span>
                      </button>
                      <button className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                      </button>
                      <button className="rounded-lg p-1.5 text-outline transition-colors hover:bg-error-container hover:text-on-error-container">
                        <span className="material-symbols-outlined text-[18px]">lock_person</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
