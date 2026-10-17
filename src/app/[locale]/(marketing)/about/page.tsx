import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { isLocale, t, type Locale } from "@/lib/i18n";
import {
  ABOUT_CTA,
  ABOUT_HERO,
  ABOUT_INSTITUTIONS,
  ABOUT_LEADERS,
  ABOUT_MICRO_BADGES,
  ABOUT_ORIGIN,
  ABOUT_PROTOCOL,
  ABOUT_SHOWCASE,
  ABOUT_STATS,
  ABOUT_VALUES,
  ICON_FILL_STYLE,
  type AboutIcon,
} from "@/lib/marketing/about";

/**
 * About — `/[locale]/about`.
 *
 * Ported from the Stitch reference "About Annorent". The page is entirely
 * static server markup: no client island, because nothing on it is
 * interactive. The only in-page link ("Read Institutional Charter") targets a
 * real `#origin-narrative` anchor, and the two marketplace calls to action point
 * at live routes rather than the reference's `href="#"`.
 *
 * Image substitutions and the leadership monogram treatment are recorded in
 * `lib/marketing/about.ts`.
 *
 * Fixed-header offset pair is the shared `pt-20` / `-mt-20` one; see
 * `context/file-structure.md` §3.
 */

const TONE_TEXT = {
  primary: "text-primary",
  tertiary: "text-tertiary-container",
} as const;

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const tr = (key: string) => t(typed, "marketing", key);

  const glyph = (icon: AboutIcon, className: string, style?: object) => (
    <span className={`material-symbols-outlined ${className}`} style={style} aria-hidden="true">
      {icon}
    </span>
  );

  const origin = ABOUT_ORIGIN;

  return (
    <>
      <SiteHeader locale={typed} activeHref="/about" />
      <main className="w-full pt-20 bg-surface flex-1">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs & context bar */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-4 bg-surface-container-low">
            <div className="max-w-container-max mx-auto flex flex-wrap items-center justify-between gap-base">
              <nav
                aria-label={tr("about.breadcrumbLabel")}
                className="flex items-center gap-2"
              >
                <Link
                  href={`/${typed}`}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                >
                  {glyph("home", "material-symbols-outlined text-[16px]")}
                  <span>{tr("about.breadcrumbHome")}</span>
                </Link>
                <span
                  className="material-symbols-outlined text-[14px] text-outline"
                  aria-hidden="true"
                >
                  chevron_right
                </span>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  {tr("about.breadcrumbCurrent")}
                </span>
              </nav>
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold text-[11px] uppercase tracking-wider">
                  {tr("about.certifiedBadge")}
                </span>
                <span className="text-outline" aria-hidden="true">
                  •
                </span>
                <span>{tr("about.complianceLine")}</span>
              </div>
            </div>
          </section>

          {/* Mission hero */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-12 lg:py-16">
            <div className="max-w-container-max mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                <div className="lg:col-span-7 flex flex-col gap-base">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed w-fit">
                    {glyph("verified_user", "material-symbols-outlined text-[16px] text-primary")}
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                      {tr(ABOUT_HERO.eyebrowKey)}
                    </span>
                  </div>
                  <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface font-bold tracking-tight mt-2">
                    {tr(ABOUT_HERO.titleKey)}
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2">
                    {ABOUT_HERO.body}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <Link
                      href={`/${typed}/properties`}
                      className="h-12 px-6 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <span>{tr(ABOUT_HERO.primaryCtaKey)}</span>
                      {glyph("arrow_forward", "material-symbols-outlined text-[18px]")}
                    </Link>
                    <a
                      href={`#${origin.id}`}
                      className="h-12 px-6 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center transition-all"
                    >
                      {tr(ABOUT_HERO.secondaryCtaKey)}
                    </a>
                  </div>

                  <div className="flex items-center gap-6 mt-6 pt-4 text-on-surface-variant">
                    {ABOUT_MICRO_BADGES.map((badge) => (
                      <div key={badge.labelKey} className="flex items-center gap-2">
                        {glyph(
                          badge.icon,
                          "material-symbols-outlined text-tertiary-container text-[20px]",
                          ICON_FILL_STYLE,
                        )}
                        <span className="font-label-sm text-label-sm">
                          {tr(badge.labelKey)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-xl overflow-hidden shadow-xl bg-surface-container">
                    <Image
                      src={ABOUT_HERO.image}
                      alt={ABOUT_HERO.imageAlt}
                      width={1024}
                      height={768}
                      className="w-full h-[420px] object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex flex-col justify-end p-6">
                      <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-widest font-semibold mb-1">
                        {tr(ABOUT_HERO.captionLabelKey)}
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold">
                        {tr(ABOUT_HERO.captionTitleKey)}
                      </h2>
                      <p className="font-body-md text-body-md text-surface-container-highest mt-1">
                        {ABOUT_HERO.captionBody}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-4 rounded-xl shadow-xl hidden sm:flex items-center gap-4 max-w-xs">
                    <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary flex-shrink-0">
                      {glyph("verified", "material-symbols-outlined text-[24px]")}
                    </div>
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">
                        {tr(ABOUT_HERO.overlayTitleKey)}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {ABOUT_HERO.overlayBody}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust & impact stats */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-8">
            <div className="max-w-container-max mx-auto bg-surface-container-lowest rounded-xl shadow-md p-8 lg:p-12">
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0">
                {ABOUT_STATS.map((stat) => (
                  <div key={stat.labelKey} className="flex flex-col gap-1 sm:px-4">
                    <div className="flex items-center gap-2">
                      {glyph(
                        stat.icon,
                        `material-symbols-outlined ${TONE_TEXT[stat.tone]} text-[28px]`,
                      )}
                      <dd className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight sr-only">
                        {stat.value}
                      </dd>
                      <span
                        className={`font-display-lg text-display-lg font-bold tracking-tight ${TONE_TEXT[stat.tone]}`}
                        aria-hidden="true"
                      >
                        {stat.value}
                      </span>
                    </div>
                    <dt className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {tr(stat.labelKey)}
                    </dt>
                    <dd className="m-0 font-body-md text-body-md text-on-surface-variant">
                      {stat.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Origin & vision narrative */}
          <section
            id={origin.id}
            className="w-full px-margin-mobile lg:px-margin-desktop py-16 bg-surface scroll-mt-24"
          >
            <div className="max-w-container-max mx-auto">
              <div className="flex flex-col mb-12">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                  {tr(origin.eyebrowKey)}
                </span>
                <h2 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface font-bold tracking-tight mt-2">
                  {tr(origin.titleKey)}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-3">
                  {origin.body}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {[origin.friction, origin.solution].map((column) => (
                  <div
                    key={column.headingKey}
                    className="bg-surface-container-low p-8 lg:p-10 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden"
                  >
                    <div className="flex flex-col gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          column.tone === "error"
                            ? "bg-error-container text-on-error-container"
                            : "bg-tertiary-container text-on-tertiary"
                        }`}
                      >
                        {glyph(column.icon, "material-symbols-outlined text-[26px]")}
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                        {tr(column.headingKey)}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {column.intro}
                      </p>
                      <ul className="flex flex-col gap-3 mt-2 list-none p-0">
                        {column.items.map((item) => (
                          <li key={item.title} className="flex items-start gap-3">
                            {glyph(
                              column.tone === "error" ? "cancel" : "check_circle",
                              `material-symbols-outlined text-[20px] mt-0.5 flex-shrink-0 ${
                                column.tone === "error"
                                  ? "text-error"
                                  : "text-tertiary-container"
                              }`,
                              column.tone === "error" ? undefined : ICON_FILL_STYLE,
                            )}
                            <span className="font-body-md text-body-md text-on-surface-variant">
                              <strong className="text-on-surface">{item.title}</strong> {item.body}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`mt-8 pt-4 rounded-lg flex items-center gap-3 ${
                        column.tone === "error" ? "bg-surface-container p-4" : "bg-surface-container-low p-4"
                      }`}
                    >
                      {glyph(
                        column.footnoteIcon,
                        `material-symbols-outlined text-[22px] ${
                          column.tone === "error" ? "text-outline" : "text-primary"
                        }`,
                      )}
                      {"footnote" in column ? (
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {column.footnote}
                        </span>
                      ) : (
                        <span className="font-label-md text-label-md font-semibold text-primary">
                          {tr(column.footnoteKey)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* City showcase strip */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-6">
            <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {ABOUT_SHOWCASE.map((item) => (
                <div
                  key={item.placeKey}
                  className="relative rounded-xl overflow-hidden h-64 shadow-sm group"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1024}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex flex-col justify-end p-5">
                    <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold uppercase tracking-wider">
                      {tr(item.countryLabelKey)}
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-primary font-bold">
                      {tr(item.placeKey)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Core values */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-16 bg-surface-container-low">
            <div className="max-w-container-max mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                  {tr(ABOUT_VALUES.eyebrowKey)}
                </span>
                <h2 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface font-bold tracking-tight mt-2">
                  {tr(ABOUT_VALUES.titleKey)}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  {ABOUT_VALUES.body}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {ABOUT_VALUES.items.map((value) => (
                  <div
                    key={value.titleKey}
                    className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                  >
                    <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      {glyph(value.icon, "material-symbols-outlined text-[32px]")}
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      {tr(value.titleKey)}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {value.body}
                    </p>
                    <div
                      className={`flex items-center gap-2 mt-auto pt-2 font-label-md text-label-md font-semibold ${
                        value.footnoteTone === "primary" ? "text-primary" : "text-tertiary-container"
                      }`}
                    >
                      <span>{tr(value.footnoteKey)}</span>
                      {glyph(value.footnoteIcon, "material-symbols-outlined text-[18px]")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Verification protocol */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-16 bg-surface">
            <div className="max-w-container-max mx-auto">
              <div className="bg-surface-container-lowest rounded-xl p-8 lg:p-12 shadow-md">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                      {tr(ABOUT_PROTOCOL.eyebrowKey)}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                      {tr(ABOUT_PROTOCOL.titleKey)}
                    </h3>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {tr(ABOUT_PROTOCOL.captionKey)}
                  </span>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative list-none p-0">
                  {ABOUT_PROTOCOL.stages.map((stage) => (
                    <li
                      key={stage.stage}
                      className="flex flex-col gap-2 p-4 bg-surface-container-low rounded-lg relative"
                    >
                      <span
                        className={`font-label-sm text-label-sm font-bold ${TONE_TEXT[stage.tone]}`}
                      >
                        {stage.stage}
                      </span>
                      <div className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {glyph(stage.icon, `material-symbols-outlined text-[20px] ${TONE_TEXT[stage.tone]}`)}
                        <span>{tr(stage.titleKey)}</span>
                      </div>
                      <p className="font-label-md text-label-md text-on-surface-variant">
                        {stage.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-16 bg-surface-container-low">
            <div className="max-w-container-max mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                    {tr("about.leadership.eyebrow")}
                  </span>
                  <h2 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface font-bold tracking-tight mt-2">
                    {tr("about.leadership.title")}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                    {tr("about.leadership.body")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-tertiary-container" aria-hidden="true" />
                  <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
                    {tr("about.leadership.hubsOperational")}
                  </span>
                </div>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-3 gap-gutter list-none p-0">
                {ABOUT_LEADERS.map((leader) => (
                  <li
                    key={leader.name}
                    className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative h-72 w-full bg-surface-container flex items-center justify-center">
                      <span
                        className="font-display-lg text-display-lg font-bold text-primary tracking-tight"
                        aria-hidden="true"
                      >
                        {leader.initials}
                      </span>
                      <span className="sr-only">{leader.name}</span>
                      <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <span
                          className="w-2 h-2 rounded-full bg-tertiary-container"
                          aria-hidden="true"
                        />
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">
                          {leader.city}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {leader.name}
                      </h3>
                      <span className="font-label-md text-label-md text-primary font-semibold mt-0.5">
                        {tr(leader.roleKey)}
                      </span>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-3 flex-1">
                        {leader.bio}
                      </p>
                      <div className="flex items-center gap-2 mt-4 pt-4 bg-surface-container-low px-3 py-2 rounded-lg">
                        {glyph(leader.affiliationIcon, "material-symbols-outlined text-[18px] text-outline")}
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {leader.affiliation}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Institutional partners */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-12 bg-surface">
            <div className="max-w-container-max mx-auto">
              <div className="flex flex-col items-center text-center mb-8">
                <span className="font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider">
                  {tr(ABOUT_INSTITUTIONS.eyebrowKey)}
                </span>
              </div>
              <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-70 list-none p-0">
                {ABOUT_INSTITUTIONS.partners.map((partner) => (
                  <li
                    key={partner.label}
                    className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface-variant font-bold"
                  >
                    {glyph(partner.icon, "material-symbols-outlined text-primary text-[28px]")}
                    <span>{partner.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="w-full px-margin-mobile lg:px-margin-desktop py-16 bg-surface">
            <div className="max-w-container-max mx-auto">
              <div className="relative bg-primary-container text-on-primary rounded-xl overflow-hidden p-8 lg:p-14 shadow-xl">
                <div
                  className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-primary blur-3xl opacity-50 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="max-w-2xl flex flex-col gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-primary/10 text-on-primary text-label-sm font-label-sm w-fit">
                      <span
                        className="w-2 h-2 rounded-full bg-tertiary-fixed"
                        aria-hidden="true"
                      />
                      <span>{tr(ABOUT_CTA.badgeKey)}</span>
                    </span>
                    <h2 className="font-display-lg text-display-lg-mobile lg:text-display-lg font-bold tracking-tight text-on-primary">
                      {tr(ABOUT_CTA.titleKey)}
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-primary-container">
                      {ABOUT_CTA.body}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
                    <Link
                      href={`/${typed}/properties`}
                      className="h-12 px-6 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container-low font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      {glyph("search", "material-symbols-outlined text-[20px]")}
                      <span>{tr(ABOUT_CTA.primaryKey)}</span>
                    </Link>
                    <Link
                      href={`/${typed}/partners`}
                      className="h-12 px-6 rounded-lg bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {glyph("handshake", "material-symbols-outlined text-[20px]")}
                      <span>{tr(ABOUT_CTA.secondaryKey)}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter locale={typed} />
    </>
  );
}
