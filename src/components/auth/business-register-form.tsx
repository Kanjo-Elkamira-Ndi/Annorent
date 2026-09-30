"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { PasswordField, PhoneField, SelectField, SubmitButton, TextField } from "./auth-fields";

/**
 * The "Pro & Hospitality" form behind `/register/owner` and `/register/hotel`.
 *
 * The design has a single Pro & Hospitality tab covering both audiences, so
 * this is one form parameterised by `role` rather than two near-identical
 * pages. The only differences are the account-type default, the identity-field
 * label, and the trading-name line — which is why the design's own field label
 * reads "Full name or Hotel establishment".
 *
 * As with the identity form, submit resolves to local state; there is no
 * onboarding backend yet.
 */

export type BusinessRole = "owner" | "hotel";

type BusinessRegisterFormProps = {
  locale: Locale;
  role: BusinessRole;
};

/** Portfolio options, tailored per audience. */
/** The two audiences, as a link pair rather than a select that cannot change. */
const ACCOUNT_TYPES = [
  { value: "owner", key: "auth.form.accountTypeOwner" },
  { value: "hotel", key: "auth.form.accountTypeHotel" },
] as const;

const OWNER_PORTFOLIO = [
  { value: "1-2", label: "1 – 2 units" },
  { value: "3-10", label: "3 – 10 units" },
  { value: "11-50", label: "11 – 50 units" },
  { value: "50+", label: "50+ units" },
] as const;

const HOTEL_PORTFOLIO = [
  { value: "serviced", label: "Serviced apartments" },
  { value: "hotel", label: "Hotel" },
  { value: "residence", label: "Residential residence" },
  { value: "mixed", label: "Mixed hospitality" },
] as const;

export function BusinessRegisterForm({ locale, role }: BusinessRegisterFormProps) {
  const isHotel = role === "hotel";
  const [businessName, setBusinessName] = useState("");
  const [contact, setContact] = useState("");
  const [dialCode, setDialCode] = useState("+225");
  const [portfolio, setPortfolio] = useState<string>(isHotel ? "hotel" : "1-2");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-lg bg-surface-container-low p-6 text-center" role="status" aria-live="polite">
        <span className="material-symbols-outlined text-headline-md text-tertiary" aria-hidden="true">
          workspace_premium
        </span>
        <p className="mt-3 font-headline-sm text-headline-sm text-on-surface">
          {t(locale, "auth", "auth.form.submittedTitle")}
        </p>
        <p className="mt-1.5 font-body-md text-body-md text-on-surface-variant">
          {t(locale, "auth", "auth.form.submittedBody")}
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setPending(true);
        window.setTimeout(() => {
          setPending(false);
          setDone(true);
        }, 600);
      }}
    >
      <fieldset>
        <legend className="block font-label-md text-label-md text-on-surface mb-1.5">
          {t(locale, "auth", "auth.form.accountTypeLabel")}
        </legend>
        <div className="bg-surface-container-low p-1.5 rounded-lg flex items-center gap-1">
          {ACCOUNT_TYPES.map((opt) => {
            const isActive = opt.value === role;
            return (
              <Link
                key={opt.value}
                href={`/${locale}/register/${opt.value}`}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "flex-1 py-2 px-3 text-center rounded-lg font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm"
                    : "flex-1 py-2 px-3 text-center rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                }
              >
                {t(locale, "auth", opt.key)}
              </Link>
            );
          })}
        </div>
      </fieldset>

      <TextField
        name="businessName"
        label={
          isHotel
            ? t(locale, "auth", "auth.form.hotelNameLabel")
            : t(locale, "auth", "auth.form.ownerNameLabel")
        }
        placeholder={t(locale, "auth", "auth.form.businessPlaceholder")}
        icon="domain"
        value={businessName}
        onChange={setBusinessName}
        autoComplete="organization"
        required
      />

      <PhoneField
        label={t(locale, "auth", "auth.form.contactLabel")}
        placeholder={t(locale, "auth", "auth.form.contactPlaceholder")}
        dialCodeLabel={t(locale, "auth", "auth.form.dialCodeLabel")}
        value={contact}
        onChange={setContact}
        dialCode={dialCode}
        onDialCodeChange={setDialCode}
      />

      <SelectField
        name="portfolio"
        label={t(locale, "auth", "auth.form.portfolioLabel")}
        value={portfolio}
        onChange={setPortfolio}
        options={isHotel ? [...HOTEL_PORTFOLIO] : [...OWNER_PORTFOLIO]}
      />

      <PasswordField
        name="password"
        label={t(locale, "auth", "auth.form.passwordLabel")}
        placeholder="••••••••••••"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        showStrength
        strengthLabels={[
          t(locale, "auth", "auth.form.strengthWeak"),
          t(locale, "auth", "auth.form.strengthFair"),
          t(locale, "auth", "auth.form.strengthGood"),
          t(locale, "auth", "auth.form.showPassword"),
          t(locale, "auth", "auth.form.hidePassword"),
        ]}
      />

      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="terms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded bg-surface-container-high text-primary focus:ring-primary focus:ring-offset-0 border-0 shrink-0"
          />
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {t(locale, "auth", "auth.form.termsPrefix")}{" "}
            <Link href={`/${locale}/terms`} className="text-primary hover:underline">
              {t(locale, "auth", "auth.form.termsLink")}
            </Link>{" "}
            {t(locale, "auth", "auth.form.privacyPrefix")}{" "}
            <Link href={`/${locale}/terms`} className="text-primary hover:underline">
              {t(locale, "auth", "auth.form.privacyLink")}
            </Link>
          </span>
        </label>
      </div>

      <div className="pt-2">
        <SubmitButton
          label={t(locale, "auth", "auth.form.submitBusiness")}
          pendingLabel={t(locale, "auth", "auth.form.submitting")}
          pending={pending}
        />
      </div>
    </form>
  );
}
