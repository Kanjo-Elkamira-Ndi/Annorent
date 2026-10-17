import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactForm, type ContactFormStrings } from "@/components/marketing/contact-form";
import { SiteFooter } from "@/components/marketing/site-footer";
import { isLocale, t, type Locale } from "@/lib/i18n";
import {
  CONTACT_ASSURANCES,
  CONTACT_BREADCRUMB,
  CONTACT_CHANNELS,
  CONTACT_COUNTRIES,
  CONTACT_HEADQUARTERS,
  CONTACT_HUBS,
  CONTACT_INERT_LINKS,
  CONTACT_INQUIRY_CATEGORIES,
  CONTACT_METRICS,
  CONTACT_WHATSAPP_HREF,
} from "@/lib/marketing/contact";

/**
 * Contact and support — `/[locale]/contact`.
 *
 * Ported from the Stitch reference "Contact Us - Annorent".
 *
 * The reference is a single long page with a two-column body: a seven-column
 * form card on the left, and a five-column rail carrying the direct channels,
 * the headquarters map card, and the secondary hubs. That split is kept
 * verbatim, and the trust ribbon and the dark self-service banner below it are
 * both preserved.
 *
 * Only the form is a client island. Everything else — the ribbon, the channel
 * links, the hub list, the assurance strip — is static server markup, so the
 * page ships almost no JavaScript.
 *
 * Two deliberate deviations, both also recorded in `lib/marketing/contact.ts`:
 * the "Browse Help Center" action has no route, so it renders as a disabled
 * button with an explanatory tooltip rather than a dead `href="#"`; and the
 * country picker drops its flag emoji for the dial code plus ISO code, since
 * the reference used emoji as decoration next to a name that already says it.
 *
 * Fixed-header offset pair is the shared `pt-20` / `-mt-20` one; see
 * `context/file-structure.md` §3.
 */

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const tr = (key: string) => t(typed, "marketing", key);

  const formStrings: ContactFormStrings = {
    fullName: tr("contact.form.fullName"),
    email: tr("contact.form.email"),
    phone: tr("contact.form.phone"),
    phoneRegion: tr("contact.form.phoneRegion"),
    category: tr("contact.form.category"),
    categoryPlaceholder: tr("contact.form.categoryPlaceholder"),
    reference: tr("contact.form.reference"),
    optional: tr("contact.form.optional"),
    message: tr("contact.form.message"),
    consentPrefix: tr("contact.form.consentPrefix"),
    privacyPolicy: tr("contact.form.privacyPolicy"),
    consentSuffix: tr("contact.form.consentSuffix"),
    submit: tr("contact.form.submit"),
    submitting: tr("contact.form.submitting"),
    slaNote: tr("contact.form.slaNote"),
    required: tr("contact.form.required"),
    emailInvalid: tr("contact.form.error.email"),
    phoneInvalid: tr("contact.form.error.phone"),
    messageTooShort: tr("contact.form.error.message"),
    consentRequired: tr("contact.form.error.consent"),
    successTitle: tr("contact.form.success.title"),
    successBody: tr("contact.form.success.body"),
    successReferenceLabel: tr("contact.form.success.referenceLabel"),
    successDone: tr("contact.form.success.done"),
    placeholders: {
      fullName: tr("contact.form.placeholder.fullName"),
      email: tr("contact.form.placeholder.email"),
      phone: tr("contact.form.placeholder.phone"),
      reference: tr("contact.form.placeholder.reference"),
      message: tr("contact.form.placeholder.message"),
    },
    categories: CONTACT_INQUIRY_CATEGORIES.map((option) => ({
      value: option.value,
      label: tr(option.labelKey),
    })),
    countries: CONTACT_COUNTRIES,
    privacyHref: `/${typed}/legal/privacy`,
    referenceCode: tr("contact.form.success.referenceCode"),
  };

  return (
    <>
      <SiteHeader locale={typed} activeHref="/contact" />
      <main className="w-full pt-20 bg-surface flex-1">
        <div className="flex flex-col w-full">
          {/* Ambient glow and heading */}
          <section className="relative w-full pt-8 pb-12 overflow-hidden">
            <div
              className="absolute -top-32 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute top-12 left-1/12 w-64 h-64 bg-tertiary-container/5 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <nav aria-label={tr("contact.breadcrumb.label")} className="flex items-center gap-2 mb-6 text-on-surface-variant font-label-md text-label-md">
                {CONTACT_BREADCRUMB.map((crumb, index) => (
                  <span key={crumb.labelKey} className="flex items-center gap-2">
                    {index > 0 && (
                      <span className="material-symbols-outlined text-[14px] text-outline" aria-hidden="true">
                        chevron_right
                      </span>
                    )}
                    {crumb.href ? (
                      <Link
                        href={`${crumb.href}${typed}`}
                        className="hover:text-primary transition-colors flex items-center gap-1"
                      >
                        {index === 0 && (
                          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                            home
                          </span>
                        )}
                        <span>{tr(crumb.labelKey)}</span>
                      </Link>
                    ) : (
                      <span className="text-on-surface font-semibold" aria-current="page">
                        {tr(crumb.labelKey)}
                      </span>
                    )}
                  </span>
                ))}
              </nav>

              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container motion-safe:animate-pulse" aria-hidden="true" />
                  {tr("contact.badge")}
                </p>
                <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface tracking-tight mb-4">
                  {tr("contact.title")}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-prose">
                  {tr("contact.subtitle")}
                </p>
              </div>

              {/* Trust metrics ribbon */}
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-gutter mt-10 p-6 rounded-xl bg-surface-container-lowest shadow-sm list-none">
                {CONTACT_METRICS.map((metric) => (
                  <li key={metric.valueKey} className="flex items-center gap-3">
                    <span
                      className={`w-10 h-10 shrink-0 rounded-lg bg-surface-container flex items-center justify-center ${metric.iconClass}`}
                      aria-hidden="true"
                    >
                      <span className="material-symbols-outlined">{metric.icon}</span>
                    </span>
                    <span className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        {tr(metric.valueKey)}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {tr(metric.labelKey)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Form and direct channels */}
          <section className="w-full pb-20">
            <div className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                {/* Form */}
                <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 sm:p-10 shadow-md">
                  <div className="flex items-center justify-between gap-4 pb-6 mb-8 bg-surface-container-low -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 p-6 sm:p-10 rounded-t-xl">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                        {tr("contact.form.eyebrow")}
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        {tr("contact.form.heading")}
                      </h2>
                    </div>
                    <span
                      className="w-12 h-12 shrink-0 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm"
                      aria-hidden="true"
                    >
                      <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
                    </span>
                  </div>
                  <ContactForm s={formStrings} />
                </div>

                {/* Direct channels rail */}
                <div className="lg:col-span-5 flex flex-col gap-gutter">
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-md flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 shrink-0 rounded-lg bg-primary-container text-on-primary flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="material-symbols-outlined">headset_mic</span>
                      </span>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {tr("contact.channels.heading")}
                        </h2>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          {tr("contact.channels.subheading")}
                        </p>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-3 list-none">
                      {CONTACT_CHANNELS.map((channel) => (
                        <li key={channel.href}>
                          <a
                            className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group min-h-11"
                            href={channel.href}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${channel.iconClass}`}
                                aria-hidden="true"
                              >
                                <span className="material-symbols-outlined text-[18px]">{channel.icon}</span>
                              </span>
                              <span className="flex flex-col">
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  {tr(channel.labelKey)}
                                </span>
                                <span className="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors">
                                  {channel.value}
                                </span>
                              </span>
                            </span>
                            {channel.trailing === "badge" && channel.badgeKey ? (
                              <span className="shrink-0 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-container/15 text-tertiary-container font-semibold">
                                {tr(channel.badgeKey)}
                              </span>
                            ) : (
                              <span
                                className="material-symbols-outlined text-outline text-[18px] shrink-0 group-hover:translate-x-1 motion-safe:transition-transform"
                                aria-hidden="true"
                              >
                                arrow_forward
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Headquarters */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-md flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="flex items-center gap-2 font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface">
                        <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-tertiary-container" aria-hidden="true" />
                        {tr(CONTACT_HEADQUARTERS.badgeKey)}
                      </h3>
                      <span className="shrink-0 font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">
                        {tr(CONTACT_HEADQUARTERS.cityKey)}
                      </span>
                    </div>
                    <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-inner group">
                      {/* Decorative backdrop behind the written address. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover motion-safe:transition-transform duration-500 group-hover:scale-105"
                        src={CONTACT_HEADQUARTERS.mapImage}
                        alt={tr(CONTACT_HEADQUARTERS.mapAltKey)}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex flex-col justify-end p-4">
                        <p className="flex items-center gap-2 text-on-primary font-label-md text-label-md font-bold">
                          <span className="material-symbols-outlined text-tertiary-fixed text-[20px]" aria-hidden="true">
                            location_on
                          </span>
                          {tr(CONTACT_HEADQUARTERS.addressLine1Key)}
                        </p>
                        <span className="font-label-sm text-label-sm text-surface-container-highest">
                          {tr(CONTACT_HEADQUARTERS.addressLine2Key)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col gap-2">
                      <p className="flex items-center gap-2 text-on-surface font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
                          schedule
                        </span>
                        {tr(CONTACT_HEADQUARTERS.hoursTitleKey)}
                      </p>
                      <dl className="grid grid-cols-2 gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        {CONTACT_HEADQUARTERS.hours.map((row) => (
                          <div key={row.dayKey}>
                            <dt className="inline font-semibold text-on-surface">{tr(row.dayKey)}:</dt>{" "}
                            <dd className="inline">{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>

                  {/* Secondary hubs */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-md flex flex-col gap-4">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {tr("contact.hubs.heading")}
                    </h3>
                    <ul className="flex flex-col gap-3 list-none">
                      {CONTACT_HUBS.map((hub) => (
                        <li key={hub.cityKey} className="p-3.5 rounded-lg bg-surface-container-low flex items-start gap-3">
                          <span
                            className="w-8 h-8 shrink-0 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <span className="material-symbols-outlined text-[18px]">apartment</span>
                          </span>
                          <span className="flex flex-col">
                            <span className="flex items-center gap-2">
                              <span className="font-label-md text-label-md font-bold text-on-surface">
                                {tr(hub.cityKey)}
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                {tr(hub.countryKey)}
                              </span>
                            </span>
                            <span className="font-body-md text-body-md text-on-surface-variant">
                              {tr(hub.addressKey)}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cadastral and escrow assurances */}
          <section className="w-full bg-surface-container-low py-12 mb-16">
            <div className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-center list-none">
                {CONTACT_ASSURANCES.map((assurance) => (
                  <li key={assurance.titleKey} className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest shadow-sm">
                    <span
                      className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${assurance.iconClass}`}
                      aria-hidden="true"
                    >
                      <span className="material-symbols-outlined text-[28px]">{assurance.icon}</span>
                    </span>
                    <span>
                      <h4 className="font-label-md text-label-md font-bold text-on-surface">{tr(assurance.titleKey)}</h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{tr(assurance.bodyKey)}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Self-service banner */}
          <section className="w-full pb-16">
            <div className="w-full max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
              <div className="relative overflow-hidden rounded-2xl bg-inverse-surface text-inverse-on-surface p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="relative z-10 flex items-center gap-4">
                  <span
                    className="w-14 h-14 shrink-0 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="material-symbols-outlined text-[32px]">contact_support</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed font-bold">
                      {tr("contact.banner.eyebrow")}
                    </span>
                    <h2 className="font-headline-md text-headline-md font-bold max-w-prose">
                      {tr("contact.banner.heading")}
                    </h2>
                  </span>
                </div>
                <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
                  {CONTACT_INERT_LINKS.map((link) => (
                    <button
                      key={link.labelKey}
                      type="button"
                      disabled
                      title={tr(link.titleKey)}
                      className="px-5 py-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold flex items-center gap-2 opacity-70 cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        {link.icon}
                      </span>
                      {tr(link.labelKey)}
                    </button>
                  ))}
                  <a
                    className="px-5 py-3 rounded-lg bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-md text-label-md font-semibold transition-colors flex items-center gap-2 shadow-sm min-h-11"
                    href={CONTACT_WHATSAPP_HREF}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      chat
                    </span>
                    {tr("contact.banner.whatsapp")}
                  </a>
                </div>
                <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-primary/20 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="absolute left-1/3 top-0 w-40 h-40 bg-tertiary-container/10 rounded-full blur-xl pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
