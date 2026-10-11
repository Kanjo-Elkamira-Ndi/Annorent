import type { Locale } from "@/lib/i18n";

export function VerificationQueue({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col pb-16">
      <section className="sticky top-16 z-30 bg-surface-container-lowest px-gutter py-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-1.5">
              <span className="material-symbols-outlined text-[20px] text-primary">verified_user</span>
              <span className="font-headline-sm text-primary">#VERIF-CI-2025-0882</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-error-container px-2.5 py-1 text-label-sm font-semibold text-on-error-container">
              <span className="h-2 w-2 animate-pulse rounded-full bg-error" aria-hidden="true" />
              Urgent (First-time lister)
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px]">location_on</span>
              Cocody Ambassades, Abidjan (CI)
            </span>
          </div>
          <div className="flex items-center gap-3 self-end xl:self-auto">
            <div className="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-1.5 text-label-sm text-on-surface-variant">
              <span className="font-semibold text-on-surface">Queue:</span>
              <span>Item 04 of 38</span>
              <span className="font-mono text-outline-variant">|</span>
              <span className="font-semibold text-tertiary">SLA: 02h 45m left</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1720px] px-gutter py-6">
        <div className="grid grid-cols-1 items-start gap-gutter xl:grid-cols-12">
          <div className="flex flex-col gap-6 xl:col-span-7">
            <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
              <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h1 className="font-headline-md text-headline-md text-on-surface">Villa Contemporaine Les Palmes</h1>
                  <p className="mt-1 text-body-md text-on-surface-variant">
                    Boulevard des Ambassades, Rue C-14, Cocody, Abidjan
                  </p>
                </div>
                <div className="rounded-lg bg-surface-container-low p-3.5 text-right">
                  <span className="block text-label-sm text-outline">Loyer Mensuel Soumis</span>
                  <span className="font-display-lg text-[28px] font-bold leading-tight text-primary">2 800 000</span>
                  <span className="ml-1 text-label-sm font-medium text-primary">FCFA / mois</span>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5">
            <div className="sticky top-24 rounded-xl bg-surface-container-lowest p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between border-b border-surface-container-high pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Grille de Conformité OHADA</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Vérification Réglementaire</h2>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-primary">3 / 5</span>
                  <span className="block text-[11px] text-outline">Validations requises</span>
                </div>
              </div>
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="h-full rounded-full bg-primary" style={{ width: "60%" }} />
              </div>
              <div className="flex flex-col gap-2.5">
                <button className="h-11 w-full rounded-lg bg-tertiary-container text-label-md font-semibold text-on-tertiary transition-all hover:scale-[1.008] hover:bg-tertiary">
                  Approve & Publish Listing (Séquestre Activé)
                </button>
                <div className="grid grid-cols-2 gap-2.5">
                  <button className="h-11 rounded-lg bg-error-container text-label-md font-semibold text-on-error-container transition-colors hover:bg-error hover:text-on-error">
                    Rejeter / Compléments
                  </button>
                  <button className="h-11 rounded-lg bg-surface-container text-label-md font-semibold text-on-surface transition-colors hover:bg-surface-container-high">
                    Escalader Conseil Légal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
