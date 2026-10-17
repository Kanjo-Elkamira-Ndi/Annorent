import type { Locale } from "@/lib/i18n";

// `locale` is part of the section's API surface (threaded by the page and the
// render test for the upcoming i18n pass); the copy here is still hard-coded.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Transactions({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col pb-16">
      <div className="px-margin-desktop py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="mb-1 flex items-center gap-2 text-label-sm text-on-surface-variant">
              <span>Operations Hub</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Treasury & Escrow</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-primary">Settlement Reports</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-headline-md text-headline-md tracking-tight text-on-surface">
                Transaction Monitoring & Settlement Reports
              </h1>
              <span className="inline-flex items-center gap-1 rounded bg-tertiary-container px-2.5 py-0.5 text-label-sm font-semibold text-on-tertiary-container">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary-fixed" aria-hidden="true" />
                BCEAO Gateway Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-4">
            <div className="relative flex flex-col justify-between rounded-xl bg-surface-container-lowest p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">Commission Earned (MTD)</span>
                <span className="rounded-lg bg-primary/10 p-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">monetization_on</span>
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md font-bold text-primary">48,250,000</span>
                <span className="text-label-md text-on-surface-variant">FCFA</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-label-sm text-on-surface-variant">
                <span className="flex items-center gap-1 font-semibold text-tertiary">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  +18.4% vs prev 30d
                </span>
                <span className="rounded bg-surface-container-low px-2 py-0.5 text-[11px]">1.5% Escrow Fee</span>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">Total Gross Volume</span>
                <span className="rounded-lg bg-surface-container-high p-1.5 text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md font-bold text-on-surface">3,216,000,000</span>
                <span className="text-label-md text-on-surface-variant">FCFA</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-label-sm text-on-surface-variant">
                <span>Across 1,842 lease events</span>
                <span className="font-semibold text-tertiary">99.4% cleared</span>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">Fiduciary Escrow Balance</span>
                <span className="rounded-lg bg-tertiary/10 p-1.5 text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">lock_clock</span>
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md font-bold text-tertiary">842,000,000</span>
                <span className="text-label-md text-on-surface-variant">FCFA</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-label-sm text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
                  BICI-CI Vault Segregated
                </span>
                <span className="font-semibold text-on-surface">324 Active Holds</span>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">Dispute Reserve (Bond Pool)</span>
                <span className="rounded-lg bg-surface-container-high p-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">gavel</span>
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md font-bold text-on-surface">12,400,000</span>
                <span className="text-label-md text-on-surface-variant">FCFA</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-label-sm text-on-surface-variant">
                <span className="font-medium text-error">4 Mediation Cases (0.38%)</span>
                <span>Avg. resolution 3.2d</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
            <div className="p-5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Live Escrow Audit Ledger</h2>
              <p className="mt-1 text-label-sm text-on-surface-variant">48 TXs in current window</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-[11px] uppercase tracking-wider text-outline">
                    <th className="px-4 py-3">TX Reference</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Payer (Tenant/Guest)</th>
                    <th className="px-4 py-3">Beneficiary (Owner/Hotel)</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-right">Gross Amount</th>
                    <th className="px-4 py-3 text-right">Fee (1.5%)</th>
                    <th className="px-4 py-3">Rail</th>
                    <th className="px-4 py-3">Escrow Status</th>
                  </tr>
                </thead>
                <tbody className="text-label-md text-on-surface">
                  <tr className="transition-colors hover:bg-surface-container-low/50">
                    <td className="px-4 py-3.5 font-mono font-semibold text-primary">#TX-2025-9921</td>
                    <td className="px-4 py-3.5 text-label-sm text-on-surface-variant">Nov 14, 2025 14:22:04</td>
                    <td className="px-4 py-3.5">Amadou Sylla</td>
                    <td className="px-4 py-3.5">Khadim Diop (SCI Teranga)</td>
                    <td className="px-4 py-3.5">
                      <span className="rounded bg-surface-container-high px-2 py-0.5 text-[11px]">Monthly Rent</span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold">1,450,000 FCFA</td>
                    <td className="px-4 py-3.5 text-right font-mono font-semibold text-tertiary">21,750 FCFA</td>
                    <td className="px-4 py-3.5">Wave SN</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-container px-2.5 py-0.5 text-label-sm font-semibold text-on-tertiary-container">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Settled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
