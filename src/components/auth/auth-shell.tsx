import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { AuthTabs } from "./auth-tabs";

/**
 * The split-screen authentication frame every auth route renders inside.
 *
 * Server component, ported from Stitch screen
 * `414cc749887a4a6fbe5acfcba6b7cfbf` ("Sign In & Registration - Annorent").
 *
 * The design is deliberately NOT wrapped in `SiteHeader` / `SiteFooter`: it
 * carries its own brand block, so it sits outside the `(marketing)` route group
 * and needs no `pt-20` fixed-header offset. Left column is the form, right
 * column is the photographic trust panel — matching the source, where the form
 * markup comes first in the DOM.
 *
 * All copy arrives through the `auth` i18n namespace; this component owns
 * layout and the brand panel only.
 */

/** The three modes the design's tab bar switches between. */
export type AuthMode = "signin" | "register" | "business";

type AuthShellProps = {
  locale: Locale;
  /**
   * Which tab reads as selected — decides `aria-current` on the tab bar.
   * Omit to hide the tab bar entirely, which the recovery routes do: a reset
   * is a side branch of sign-in, not a peer account mode.
   */
  active?: AuthMode;
  /** Stepper state. `null` hides the stepper (login and the recovery pages). */
  step?: { current: number; total: number } | null;
  children: ReactNode;
};

export function AuthShell({ locale, active, step = null, children }: AuthShellProps) {
  return (
    <main className="w-full bg-surface-container-lowest py-8 sm:py-12 px-4">
      <div className="mx-auto w-full max-w-5xl bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(23,43,77,0.08)] overflow-hidden">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-xl overflow-hidden bg-surface-container-lowest">
            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-surface-container-lowest">
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-md">
                      <span
                        className="material-symbols-outlined text-headline-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        apartment
                      </span>
                    </div>
                    <div>
                      <span className="font-headline-md text-headline-md text-primary tracking-tight block">
                        Annorent
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase block">
                        {t(locale, "auth", "auth.brand.kicker")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-surface-container-high text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    <span className="font-label-sm text-label-sm text-tertiary">
                      {t(locale, "auth", "auth.brand.badge")}
                    </span>
                  </div>
                </div>

                {active ? <AuthTabs locale={locale} active={active} /> : null}

                {step ? <Stepper locale={locale} current={step.current} total={step.total} /> : null}

                {children}
              </div>
            </div>

            <TrustPanel locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Three-step registration progress bar. Step 1 is the identity form every
 * registration route renders, so `current` is 1 across the board for now; the
 * later steps are placeholders for the verification flow.
 */
function Stepper({ locale, current, total }: { locale: Locale; current: number; total: number }) {
  const steps = ["auth.step.identity", "auth.step.role", "auth.step.verification"];
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {steps.map((key, i) => {
          const n = i + 1;
          const done = n <= current;
          return (
            <div key={key} className={done ? "flex items-center gap-2" : "flex items-center gap-2 opacity-50"}>
              <span
                className={
                  done
                    ? "w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm"
                    : "w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm"
                }
              >
                {n}
              </span>
              <span
                className={
                  done
                    ? "font-label-md text-label-md text-on-surface"
                    : "font-label-md text-label-md text-on-surface-variant hidden sm:inline"
                }
              >
                {t(locale, "auth", key)}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={t(locale, "auth", "auth.step.progressLabel")}
      >
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Photographic trust panel. The two images in the Stitch export are
 * `lh3.googleusercontent.com/aida-public` URLs that Stitch truncated to 298
 * characters, so they return HTTP 400 and are not recoverable. The villa
 * photograph reuses the already self-hosted Cocody exterior; the testimonial
 * avatar is a monogram rather than a stand-in photo of a person who does not
 * exist. Both are drop-in replaceable — see context/sitemap.md.
 */
function TrustPanel({ locale }: { locale: Locale }) {
  const points = [
    "auth.trust.point1",
    "auth.trust.point2",
    "auth.trust.point3",
  ];

  return (
    <div className="lg:col-span-6 relative min-h-[540px] lg:min-h-full flex flex-col justify-between p-8 sm:p-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/details/villa-01.jpg')" }}
        role="img"
        aria-label={t(locale, "auth", "auth.trust.backgroundAlt")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/85 to-primary/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-on-surface/90" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-on-primary">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed animate-pulse" />
          <span className="font-label-sm text-label-sm text-on-primary tracking-wide">
            {t(locale, "auth", "auth.trust.network")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary shadow-sm">
          <span className="material-symbols-outlined text-headline-sm text-tertiary-fixed">view_in_ar</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary">
            {t(locale, "auth", "auth.trust.vr")}
          </span>
        </div>
      </div>

      <div className="relative z-10 my-auto py-8">
        <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-6 sm:p-8 rounded-xl shadow-[0_4px_20px_rgba(23,43,77,0.16)] max-w-lg mx-auto">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined text-headline-md">format_quote</span>
          </div>

          <blockquote className="font-body-lg text-body-lg text-on-surface font-medium leading-snug mb-6">
            {t(locale, "auth", "auth.trust.quote")}
          </blockquote>

          <div className="flex items-center gap-3.5 mb-6">
            <div
              className="w-12 h-12 rounded-full shrink-0 shadow-sm bg-primary-container text-on-primary flex items-center justify-center font-headline-sm"
              aria-hidden="true"
            >
              KN
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                {t(locale, "auth", "auth.trust.author")}
              </div>
              <div className="font-label-sm text-label-sm text-secondary">
                {t(locale, "auth", "auth.trust.authorRole")}
              </div>
            </div>
          </div>

          <ul className="space-y-2.5 pt-4 bg-surface-container-low/70 rounded-lg p-3.5 list-none">
            {points.map((key) => (
              <li key={key} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-label-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  {t(locale, "auth", key)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-on-primary/80 font-label-sm text-label-sm pt-4">
        <span>{t(locale, "auth", "auth.trust.cities")}</span>
        <div className="flex items-center gap-1 text-tertiary-fixed">
          <span className="material-symbols-outlined text-label-md">verified_user</span>
          <span>{t(locale, "auth", "auth.trust.protocol")}</span>
        </div>
      </div>
    </div>
  );
}
