import type { Locale } from "@/lib/i18n";

// `locale` is part of the section's API surface (threaded by the page and the
// render test for the upcoming i18n pass); the copy here is still hard-coded.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AdminDashboard({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col pb-16">
      <div className="flex flex-col gap-gutter px-margin-desktop pt-base">
        <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-gutter shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="rounded bg-inverse-surface px-2 py-0.5 font-mono text-label-sm uppercase tracking-wider text-surface-container-lowest">
                SEC-OPS // LEVEL 4
              </span>
              <span className="flex items-center gap-1.5 font-mono text-label-sm text-outline">
                <span className="h-2 w-2 rounded-full bg-tertiary animate-pulse" aria-hidden="true" />
                SYS_REF: WAEMU-ESCROW-V2.4
              </span>
            </div>
            <h1 className="mt-1 font-headline-md text-headline-md tracking-tight text-on-surface">
              Directoire des Opérations Foncier & Séquestre
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-label-sm">
            <div className="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-1.5">
              <span className="material-symbols-outlined text-[16px] text-tertiary" aria-hidden="true">
                hub
              </span>
              <span className="text-on-surface">
                UINL Hub: <strong className="font-semibold text-tertiary">SYNC OK (42ms)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">
                currency_exchange
              </span>
              <span className="text-on-surface">
                BCEAO Clearing: <strong className="font-semibold text-primary">Active RTGS</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-gutter shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-label-sm uppercase tracking-wider text-outline">CADASTRE QUEUE</span>
              <span className="flex items-center gap-1 rounded bg-surface-container-high px-2 py-0.5 font-mono text-label-sm">
                <span className="h-2 w-2 rounded-full bg-error animate-pulse" aria-hidden="true" />
                URGENT
              </span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-on-surface">38</span>
                <span className="font-label-md text-label-md text-outline">dossiers</span>
              </div>
              <p className="mt-1 font-label-sm font-semibold text-error">14 revues notariées critiques (+6 adj.)</p>
            </div>
          </div>
          <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-gutter shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-label-sm uppercase tracking-wider text-outline">SÉQUESTRE / LITIGES</span>
              <span className="rounded bg-error-container px-2 py-0.5 font-mono text-label-sm font-bold text-on-error-container">7 FLAGS</span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-error">5.2M</span>
                <span className="font-mono font-label-md text-label-md text-outline">FCFA RETENU</span>
              </div>
              <p className="mt-1 font-label-sm text-on-surface-variant">2 blocages conservatoires (Bail différé)</p>
            </div>
          </div>
          <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-gutter shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-label-sm uppercase tracking-wider text-outline">FLUX COMPENSATION 24H</span>
              <span className="rounded bg-tertiary-container px-2 py-0.5 font-mono text-label-sm font-semibold text-on-tertiary-container">+18.4% 7D</span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-md font-mono font-bold text-headline-md text-on-surface">142,850,000</span>
                <span className="font-mono font-label-sm text-label-sm text-outline">FCFA</span>
              </div>
              <p className="mt-1 font-label-sm font-medium text-tertiary">248 règlements validés (RTGS OK)</p>
            </div>
          </div>
          <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-gutter shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-label-sm uppercase tracking-wider text-outline">NOTARY AUTOMATION</span>
              <span className="rounded bg-surface-container-high px-2 py-0.5 font-mono text-label-sm font-bold text-primary">IA / OCR</span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-primary">94.2%</span>
                <span className="font-label-md text-label-md text-outline">match direct</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="h-full rounded-full bg-primary" style={{ width: "94.2%" }} />
              </div>
              <p className="mt-2 font-label-sm text-on-surface-variant">Queue résiduelle manuelle: 5.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
