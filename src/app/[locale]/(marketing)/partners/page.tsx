import Image from "next/image";

import { SiteHeader } from "@/components/layout/site-header";
import { PartnerApplicationForm } from "@/components/marketing/partner-application-form";
import { PartnersAuditDialog } from "@/components/marketing/partners-audit-dialog";
import { PartnersYieldCalculator } from "@/components/marketing/partners-yield-calculator";
import { RichText } from "@/components/marketing/rich-text";
import { SiteFooter } from "@/components/marketing/site-footer";
import { isLocale, localeTags, t, type Locale } from "@/lib/i18n";
import {
  PARTNERS_ADVANTAGE,
  PARTNERS_AUDIT,
  PARTNERS_CTA,
  PARTNERS_FAQ,
  PARTNERS_HERO,
  PARTNERS_METRICS,
  PARTNERS_ONBOARDING,
  PARTNERS_PROOF,
  PARTNERS_VAULT,
  type PartnerIcon,
} from "@/lib/marketing/partners";

/**
 * Partner network — `/[locale]/partners`.
 *
 * Ported from the Stitch reference "Partner With Us". Three client islands
 * carry everything the reference drove with inline `onclick`/`oninput`:
 * the yield simulator, the audit dialog, and the portfolio form. The FAQ uses
 * native `<details>`, so it needs no JavaScript.
 *
 * The reference's audit dialog was a hidden `div` toggled by class name that
 * submitted via `alert()`. It is a real modal dialog here — `aria-modal`,
 * Escape to dismiss, focus moved in and returned. See
 * `components/marketing/partners-audit-dialog.tsx`.
 *
 * Fixed-header offset pair is the shared `pt-20` / `-mt-20` one; see
 * `context/file-structure.md` §3.
 */

const SHELL = "max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop";

export default async function PartnersPage({ params }: PageProps<"/[locale]/partners">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const tr = (key: string) => t(typed, "marketing", key);

  const glyph = (icon: PartnerIcon, className: string) => (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {icon}
    </span>
  );

  const form = PARTNERS_CTA;
  const audit = PARTNERS_AUDIT;

  return (
    <>
      <SiteHeader locale={typed} activeHref="/partners" />
      <main className="w-full pt-20 bg-surface flex-1">
        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/40 via-surface to-surface pb-20 pt-10 lg:pt-16">
          <div className={SHELL}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-surface-container-highest shadow-sm">
                  <span
                    className="w-2 h-2 rounded-full bg-tertiary-container motion-safe:animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
                    {tr(PARTNERS_HERO.eyebrowKey)}
                  </span>
                </div>

                <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface font-extrabold tracking-tight">
                  {tr(PARTNERS_HERO.titleLeadKey)}{" "}
                  <span className="text-primary-container">
                    {tr(PARTNERS_HERO.titleAccentKey)}
                  </span>{" "}
                  {tr(PARTNERS_HERO.titleTailKey)}
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  {PARTNERS_HERO.body}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <a
                    href={`#${form.id}`}
                    className="h-12 px-6 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    {glyph("add_business", "material-symbols-outlined text-[20px]")}
                    <span>{tr(PARTNERS_HERO.primaryCtaKey)}</span>
                  </a>
                  <PartnersAuditDialog
                    triggerLabel={tr(PARTNERS_HERO.secondaryCtaKey)}
                    eyebrow={tr(audit.eyebrowKey)}
                    title={tr(audit.titleKey)}
                    body={audit.body}
                    entityLabel={tr(audit.entityLabelKey)}
                    entityPlaceholder={tr(audit.entityPlaceholderKey)}
                    phoneLabel={tr(audit.phoneLabelKey)}
                    phonePlaceholder={tr(audit.phonePlaceholderKey)}
                    submitLabel={tr(audit.submitKey)}
                    closeLabel={tr(audit.closeLabelKey)}
                    pendingLabel={tr(audit.pendingKey)}
                    successTitle={tr(audit.successTitleKey)}
                    successBody={tr(audit.successBodyKey)}
                    doneLabel={tr(audit.doneKey)}
                    requiredError={tr(audit.errorRequired)}
                    phoneError={tr(audit.errorPhone)}
                  />
                </div>

                <div className="pt-6">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold block mb-3">
                    {tr(PARTNERS_HERO.segmentsLabelKey)}
                  </span>
                  <ul className="flex flex-wrap gap-2 list-none p-0">
                    {PARTNERS_HERO.segments.map((segment) => (
                      <li
                        key={segment.labelKey}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-sm"
                      >
                        {glyph(segment.icon, "material-symbols-outlined text-primary text-[18px]")}
                        <span className="font-label-md text-label-md text-on-surface">
                          {tr(segment.labelKey)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Escrow vault card */}
              <div className="lg:col-span-5 relative">
                <div
                  className="absolute -top-10 -right-10 w-72 h-72 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-surface-container">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                        {tr(PARTNERS_VAULT.monitorLabelKey)}
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {tr(PARTNERS_VAULT.titleKey)}
                      </h2>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                      {glyph("lock", "material-symbols-outlined text-[16px]")}
                      {tr(PARTNERS_VAULT.badgeKey)}
                    </span>
                  </div>

                  <dl className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-surface-container-low flex flex-col">
                      <dt className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        {tr(PARTNERS_VAULT.defaultRiskLabelKey)}
                      </dt>
                      <dd className="m-0 font-headline-md text-headline-md text-tertiary-container font-extrabold mt-1">
                        {PARTNERS_VAULT.defaultRiskValue}
                      </dd>
                      <dd className="m-0 font-label-sm text-label-sm text-on-surface-variant mt-1">
                        {tr(PARTNERS_VAULT.defaultRiskNoteKey)}
                      </dd>
                    </div>
                    <div className="p-4 rounded-lg bg-surface-container-low flex flex-col">
                      <dt className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        {tr(PARTNERS_VAULT.payoutLabelKey)}
                      </dt>
                      <dd className="m-0 font-headline-md text-headline-md text-primary font-extrabold mt-1">
                        {tr(PARTNERS_VAULT.payoutValueKey)}
                      </dd>
                      <dd className="m-0 font-label-sm text-label-sm text-on-surface-variant mt-1">
                        {tr(PARTNERS_VAULT.payoutNoteKey)}
                      </dd>
                    </div>
                  </dl>

                  <div className="relative rounded-lg overflow-hidden h-48 group">
                    <Image
                      src={PARTNERS_VAULT.image}
                      alt={PARTNERS_VAULT.imageAlt}
                      width={1024}
                      height={768}
                      className="w-full h-full object-cover group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-4">
                      <div className="flex items-center justify-between gap-2 w-full text-on-primary">
                        <div className="flex items-center gap-2">
                          {glyph("view_in_ar", "material-symbols-outlined text-[18px]")}
                          <span className="font-label-sm text-label-sm font-semibold">
                            {tr(PARTNERS_VAULT.imageCaptionKey)}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm bg-surface-tint/80 px-2 py-0.5 rounded text-on-primary font-bold">
                          {tr(PARTNERS_VAULT.imageTagKey)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <PartnersYieldCalculator
                    label={tr(PARTNERS_VAULT.calculatorLabelKey)}
                    localeTag={localeTags[typed]}
                    unitSingular={tr(PARTNERS_VAULT.unitSingularKey)}
                    unitPlural={tr(PARTNERS_VAULT.unitPluralKey)}
                    portfolio={tr(PARTNERS_VAULT.portfolioKey)}
                    tier={tr(PARTNERS_VAULT.tierKey)}
                    sliderLabel={tr(PARTNERS_VAULT.sliderLabelKey)}
                    currency={PARTNERS_VAULT.currency}
                    ratePerUnit={PARTNERS_VAULT.ratePerUnit}
                    minUnits={PARTNERS_VAULT.minUnits}
                    maxUnits={PARTNERS_VAULT.maxUnits}
                    defaultUnits={PARTNERS_VAULT.defaultUnits}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust metrics */}
        <section className="w-full bg-primary-container text-on-primary py-12 relative shadow-lg">
          <div className={SHELL}>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {PARTNERS_METRICS.map((metric) => (
                <div key={metric.labelKey} className="flex flex-col items-center sm:items-start">
                  <dd className="m-0 flex items-baseline gap-1">
                    <span className="font-display-lg text-display-lg font-black tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-tertiary-fixed text-headline-md font-bold">
                      {metric.suffix}
                    </span>
                  </dd>
                  <dt className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider mt-1 font-semibold">
                    {tr(metric.labelKey)}
                  </dt>
                  <dd className="m-0 font-label-sm text-label-sm text-on-primary/70 mt-0.5">
                    {tr(metric.noteKey)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Benefit pillars */}
        <section className="w-full py-20 bg-surface">
          <div className={SHELL}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="flex flex-col gap-2 max-w-2xl">
                <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                  {tr(PARTNERS_ADVANTAGE.eyebrowKey)}
                </span>
                <h2 className="font-display-lg text-display-lg-mobile lg:text-headline-md lg:font-bold text-on-surface">
                  {tr(PARTNERS_ADVANTAGE.titleKey)}
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                {PARTNERS_ADVANTAGE.body}
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter list-none p-0">
              {PARTNERS_ADVANTAGE.pillars.map((pillar) => (
                <li
                  key={pillar.titleKey}
                  className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                      {glyph(pillar.icon, "material-symbols-outlined text-[28px]")}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {tr(pillar.titleKey)}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {pillar.body}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-2 text-primary font-label-md text-label-md font-semibold">
                    <span>{tr(pillar.footnoteKey)}</span>
                    {glyph("arrow_forward", "material-symbols-outlined text-[16px]")}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Onboarding steps */}
        <section className="w-full py-20 bg-surface-container-low">
          <div className={SHELL}>
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                {tr(PARTNERS_ONBOARDING.eyebrowKey)}
              </span>
              <h2 className="font-display-lg text-display-lg-mobile lg:text-headline-md font-bold text-on-surface">
                {tr(PARTNERS_ONBOARDING.titleKey)}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {PARTNERS_ONBOARDING.body}
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter relative list-none p-0">
              {PARTNERS_ONBOARDING.steps.map((step) => (
                <li
                  key={step.number}
                  className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-display-lg text-display-lg text-surface-container-highest font-black"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      {glyph(step.icon, "material-symbols-outlined text-[22px]")}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
                    {tr(step.titleKey)}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Case studies */}
        <section className="w-full py-20 bg-surface">
          <div className={SHELL}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                  {tr(PARTNERS_PROOF.eyebrowKey)}
                </span>
                <h2 className="font-display-lg text-display-lg-mobile lg:text-headline-md font-bold text-on-surface mt-2">
                  {tr(PARTNERS_PROOF.titleKey)}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {tr(PARTNERS_PROOF.citiesLabelKey)}
                </span>
                {["Abidjan", "Dakar", "Douala"].map((city) => (
                  <span
                    key={city}
                    className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-container font-semibold"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-gutter list-none p-0">
              {PARTNERS_PROOF.cases.map((item) => (
                <li
                  key={item.company}
                  className="bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-label-sm text-label-sm font-semibold text-primary uppercase">
                        {item.company}
                      </span>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface shrink-0">
                        {item.city}
                      </span>
                    </div>
                    <blockquote className="m-0 font-body-md text-body-md text-on-surface italic">
                      {`“${item.quote}”`}
                    </blockquote>
                  </div>
                  <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary shrink-0"
                      aria-hidden="true"
                    >
                      {item.initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        {item.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {tr(item.roleKey)}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-20 bg-surface-container-low">
          <div className="max-w-[960px] mx-auto px-margin-mobile lg:px-margin-desktop">
            <div className="text-center mb-16 flex flex-col gap-3">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                {tr(PARTNERS_FAQ.eyebrowKey)}
              </span>
              <h2 className="font-display-lg text-display-lg-mobile lg:text-headline-md font-bold text-on-surface">
                {tr(PARTNERS_FAQ.titleKey)}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {PARTNERS_FAQ.body}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {PARTNERS_FAQ.items.map((item) => (
                <details
                  key={item.questionKey}
                  className="bg-surface-container-lowest rounded-xl p-6 shadow-sm group cursor-pointer"
                >
                  <summary className="flex items-center justify-between gap-3 font-headline-sm text-headline-sm text-on-surface font-semibold list-none">
                    <span>{tr(item.questionKey)}</span>
                    <span
                      className="material-symbols-outlined text-primary group-open:rotate-180 motion-safe:transition-transform shrink-0"
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </summary>
                  <RichText
                    text={item.answer}
                    className="block pt-4 font-body-md text-body-md text-on-surface-variant border-t border-surface-container mt-4"
                  />
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Conversion banner + submission form */}
        <section id={form.id} className="w-full py-20 bg-surface scroll-mt-24">
          <div className={SHELL}>
            <div className="bg-inverse-surface rounded-2xl text-on-primary overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 sm:p-12 lg:p-16 items-center">
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold uppercase tracking-wider">
                    {tr(form.eyebrowKey)}
                  </span>
                  <h2 className="font-display-lg text-display-lg-mobile lg:text-headline-md font-bold text-on-primary">
                    {tr(form.titleKey)}
                  </h2>
                  <p className="font-body-lg text-body-lg text-surface-container-highest">
                    {form.body}
                  </p>
                  <ul className="flex items-center gap-6 pt-4 list-none p-0">
                    {form.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        {glyph("check_circle", "material-symbols-outlined text-tertiary-fixed text-[20px]")}
                        <span className="font-label-md text-label-md text-surface-container-highest">
                          {tr(perk)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-8 text-on-surface shadow-lg">
                  <PartnerApplicationForm
                    labels={{
                      name: tr(form.labels.name),
                      email: tr(form.labels.email),
                      hub: tr(form.labels.hub),
                      partnerType: tr(form.labels.partnerType),
                      portfolio: tr(form.labels.portfolio),
                    }}
                    placeholders={{
                      name: tr(form.placeholders.name),
                      email: tr(form.placeholders.email),
                      portfolio: tr(form.placeholders.portfolio),
                    }}
                    hubs={form.hubs}
                    partnerTypes={form.partnerTypes.map((key) => tr(key))}
                    submitLabel={tr(form.submitKey)}
                    pendingLabel={tr(form.successPendingKey)}
                    successTitle={tr(form.successTitleKey)}
                    successBody={tr(form.successBodyKey)}
                    requiredError={tr(form.errors.required)}
                    emailError={tr(form.errors.email)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
