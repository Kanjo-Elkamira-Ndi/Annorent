import Link from "next/link";

import { LegalActions } from "@/components/marketing/legal-actions";
import { RichText } from "@/components/marketing/rich-text";
import { LegalToc } from "@/components/marketing/legal-toc";
import {
  LEGAL_META,
  LEGAL_TITLES,
  sectionsForVariant,
  type LegalBlock,
  type LegalIcon,
  type LegalVariant,
} from "@/lib/marketing/legal";

/**
 * Localised chrome for the legal instrument. The substantive body text lives in
 * `src/lib/marketing/legal.ts` (English, counsel-reviewable) and is not passed
 * through here.
 */
export type LegalChrome = {
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbLegal: string;
  breadcrumbCurrent: string;
  contentsHeading: string;
  sectionUnit: string;
  variantNavLabel: string;
  tabTerms: string;
  tabPrivacy: string;
  printLabel: string;
  downloadLabel: string;
  downloadPendingTitle: string;
  contactDpoLabel: string;
  submitRequestLabel: string;
  submitRequestTitle: string;
  dpoCopyLabel: string;
};

type LegalDocumentProps = {
  variant: LegalVariant;
  homeHref: string;
  termsHref: string;
  privacyHref: string;
  chrome: LegalChrome;
};

/**
 * Builds the localised chrome for a legal route. The document body is not part
 * of this — it stays in `lib/marketing/legal.ts` as one English text.
 */
export function buildLegalChrome(
  tr: (key: string) => string,
  variant: LegalVariant,
): LegalChrome {
  return {
    breadcrumbLabel: tr("legal.breadcrumbLabel"),
    breadcrumbHome: tr("legal.breadcrumbHome"),
    breadcrumbLegal: tr("legal.breadcrumbLegal"),
    breadcrumbCurrent: variant === "terms" ? tr("legal.tabTerms") : tr("legal.tabPrivacy"),
    contentsHeading: tr("legal.contentsHeading"),
    sectionUnit: tr("legal.sectionUnit"),
    variantNavLabel: tr("legal.variantNavLabel"),
    tabTerms: tr("legal.tabTerms"),
    tabPrivacy: tr("legal.tabPrivacy"),
    printLabel: tr("legal.printLabel"),
    downloadLabel: tr("legal.downloadLabel"),
    downloadPendingTitle: tr("legal.downloadPendingTitle"),
    contactDpoLabel: tr("legal.contactDpoLabel"),
    submitRequestLabel: tr("legal.submitRequestLabel"),
    submitRequestTitle: tr("legal.submitRequestTitle"),
    dpoCopyLabel: tr("legal.dpoCopyLabel"),
  };
}

function Icon({ name, className }: { name: LegalIcon; className: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

const CHECK_ITEM =
  "flex items-start gap-3 bg-surface-container-low p-3.5 rounded-lg text-label-md";
const BADGE_TONE = {
  primary: "bg-primary text-on-primary",
  tertiary: "bg-tertiary-container text-on-tertiary",
} as const;

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );

    case "definitions":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1.5"
            >
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                {item.title}
              </span>
              <p className="font-label-md text-label-md text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      );

    case "process":
      return (
        <div className="bg-surface-container-low rounded-xl p-5 my-2">
          <h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]" aria-hidden="true">
              account_balance_wallet
            </span>
            {block.title}
          </h4>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0">
            {block.steps.map((step, index) => (
              <li
                key={step.title}
                className="bg-surface-container-lowest p-4 rounded-lg flex flex-col gap-2 shadow-sm"
              >
                <span
                  className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary font-mono text-label-sm"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  {step.title}
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "checklist":
      return (
        <ul className="space-y-2 list-none p-0">
          {block.items.map((item) => (
            <li key={item.title} className={CHECK_ITEM}>
              <Icon name={item.icon} className="text-primary text-[20px] shrink-0" />
              <span>
                <strong className="text-on-surface font-semibold">{item.title}</strong> {item.body}
              </span>
            </li>
          ))}
        </ul>
      );

    case "tiers":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="bg-surface-container p-4 rounded-lg flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  {item.title}
                </span>
                <span
                  className={`font-label-sm text-label-sm px-2 py-0.5 rounded shrink-0 ${BADGE_TONE[item.tone]}`}
                >
                  {item.badge}
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      );

    case "features":
      return (
        <div className="space-y-3">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 bg-surface-container-low p-4 rounded-lg"
            >
              <Icon name={item.icon} className="text-primary text-[20px] mt-0.5 shrink-0" />
              <div>
                <h5 className="font-label-md text-label-md font-bold text-on-surface">
                  {item.title}
                </h5>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case "ordered":
      return (
        <ol className="space-y-3 list-decimal pl-5">
          {block.items.map((item) => (
            <li key={item.title}>
              <strong className="text-on-surface">{item.title}</strong> {item.body}
            </li>
          ))}
        </ol>
      );

    case "bullets":
      return (
        <ul className="space-y-2 list-disc pl-5">
          {block.items.map((item) => (
            <li key={item.title}>
              <strong className="text-on-surface">{item.title}</strong> {item.body}
            </li>
          ))}
        </ul>
      );

    case "security":
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-2"
            >
              <Icon name={item.icon} className="text-primary text-[24px]" />
              <h5 className="font-label-md text-label-md font-bold text-on-surface">
                {item.title}
              </h5>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <div className="bg-surface-container-low p-5 rounded-xl border-s-4 border-e-4 border-s-primary border-e-primary">
          <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">
            {block.title}
          </h4>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {block.text}
          </p>
        </div>
      );
  }
}

const SEG_ACTIVE =
  "px-5 min-h-11 inline-flex items-center rounded-lg font-label-md text-label-md font-semibold bg-primary-container text-on-primary shadow-sm transition-all";
const SEG_IDLE =
  "px-5 min-h-11 inline-flex items-center rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all";

export function LegalDocument({
  variant,
  homeHref,
  termsHref,
  privacyHref,
  chrome,
}: LegalDocumentProps) {
  const sections = sectionsForVariant(variant);
  const meta = LEGAL_META;

  return (
    <main className="w-full pt-20 bg-surface flex-1">
      <div className="w-full bg-surface-container-low py-4 px-margin-mobile lg:px-margin-desktop">
        <nav
          aria-label={chrome.breadcrumbLabel}
          className="font-label-sm text-label-sm text-on-surface-variant"
        >
          <ol className="flex items-center gap-2 list-none p-0 m-0">
            <li>
              <Link href={homeHref} className="hover:text-on-surface transition-colors">
                {chrome.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </li>
            <li>
              <Link
                href={termsHref}
                className="hover:text-on-surface transition-colors"
                aria-current={variant === "terms" ? "page" : undefined}
              >
                {chrome.breadcrumbLegal}
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </li>
            <li>
              <span className="text-on-surface font-semibold" aria-current="page">
                {chrome.breadcrumbCurrent}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-margin-mobile lg:px-margin-desktop py-8">
        <div className="flex flex-col w-full">
          {/* Document master header */}
          <section className="w-full bg-surface-container-low rounded-xl p-6 lg:p-10 mb-8 shadow-sm relative overflow-hidden print:shadow-none">
            <div
              className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    verified_user
                  </span>
                  {meta.complianceBadge}
                </span>
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    gavel
                  </span>
                  {meta.frameworkRef}
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight max-w-4xl">
                {LEGAL_TITLES[variant]}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-on-surface-variant font-label-md text-label-md py-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-primary"
                    aria-hidden="true"
                  >
                    calendar_today
                  </span>
                  <span>
                    {meta.lastUpdatedLabel}{" "}
                    <strong className="text-on-surface font-semibold">
                      {meta.lastUpdatedValue}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-primary"
                    aria-hidden="true"
                  >
                    schedule
                  </span>
                  <span>
                    {meta.effectiveLabel}{" "}
                    <strong className="text-on-surface font-semibold">{meta.effectiveValue}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-primary"
                    aria-hidden="true"
                  >
                    account_balance
                  </span>
                  <span>
                    {meta.jurisdictionLabel}{" "}
                    <strong className="text-on-surface font-semibold">
                      {meta.jurisdictionValue}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Document switcher: real routes, not in-page tabs.
                  The design's third "Combined View" tab is dropped because the
                  split-route model has no combined destination. */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2">
                <nav
                  aria-label={chrome.variantNavLabel}
                  className="inline-flex p-1.5 bg-surface-container rounded-xl shadow-inner"
                >
                  <Link
                    href={termsHref}
                    aria-current={variant === "terms" ? "page" : undefined}
                    className={variant === "terms" ? SEG_ACTIVE : SEG_IDLE}
                  >
                    {chrome.tabTerms}
                  </Link>
                  <Link
                    href={privacyHref}
                    aria-current={variant === "privacy" ? "page" : undefined}
                    className={variant === "privacy" ? SEG_ACTIVE : SEG_IDLE}
                  >
                    {chrome.tabPrivacy}
                  </Link>
                </nav>
                <LegalActions
                  printLabel={chrome.printLabel}
                  downloadLabel={chrome.downloadLabel}
                  downloadPendingTitle={chrome.downloadPendingTitle}
                />
              </div>
            </div>
          </section>

          {/* Two-column legal reading layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <aside className="lg:col-span-4 xl:col-span-3 sticky top-24 z-20 print:hidden">
              <LegalToc
                items={sections.map((section) => ({
                  id: section.id,
                  number: section.number,
                  title: section.title,
                }))}
                heading={chrome.contentsHeading}
                sectionUnit={chrome.sectionUnit}
                dpoTitle={meta.dpoTitle}
                dpoBody={meta.dpoBody}
                dpoEmail={meta.dpoEmail}
                dpoCopyLabel={chrome.dpoCopyLabel}
              />
            </aside>

            <article className="lg:col-span-8 xl:col-span-9 bg-surface-container-lowest rounded-xl p-6 lg:p-10 shadow-sm flex flex-col gap-10 text-on-surface print:shadow-none">
              <div className="bg-surface-container-low p-6 rounded-xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    policy
                  </span>
                  <h2>{meta.preambleTitle}</h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {meta.preambleBody}
                </p>
              </div>

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="doc-section flex flex-col gap-5 pt-2 scroll-mt-28"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-headline-md text-primary font-bold">
                      {section.number}.
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {section.blocks.map((block, index) => (
                      <Block key={`${section.id}-${index}`} block={block} />
                    ))}
                  </div>
                </section>
              ))}

              {/* Certified regulatory seal */}
              <div className="bg-surface-container rounded-xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-2">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[32px]" aria-hidden="true">
                      balance
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {meta.sealTitle}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      {meta.sealBody}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={`mailto:dpo@annorent.com`}
                    className="px-5 min-h-11 inline-flex items-center rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors shadow-sm print:hidden"
                  >
                    {chrome.contactDpoLabel}
                  </a>
                  <button
                    type="button"
                    disabled
                    title={chrome.submitRequestTitle}
                    className="px-5 min-h-11 inline-flex items-center rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold opacity-45 cursor-not-allowed print:hidden"
                  >
                    {chrome.submitRequestLabel}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
