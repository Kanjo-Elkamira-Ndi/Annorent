"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { Checkbox, PasswordField, PhoneField, SubmitButton, TextField } from "./auth-fields";

/**
 * The identity form shared by `/login` and `/register`.
 *
 * The design ships one field set for both modes and switches only the submit
 * label, so this component takes the copy it needs as props rather than
 * duplicating the markup per page. Every string is read here (the island is a
 * client component, but `t()` is a plain function with no server-only
 * dependency) so the call sites stay thin.
 *
 * The submit is local state only — there is no auth backend yet, so pressing it
 * resolves to a "check your inbox" style confirmation instead of a network
 * call. See context/sitemap.md.
 */

type IdentityFormProps = {
  locale: Locale;
  mode: "signin" | "register";
  /** `/register/hotel` reuses this with hotel-flavoured field copy. */
  accountLabel?: string;
  accountPlaceholder?: string;
};

export function IdentityForm({ locale, mode, accountLabel, accountPlaceholder }: IdentityFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [dialCode, setDialCode] = useState("+225");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const isSignIn = mode === "signin";

  if (done) {
    return (
      <div
        className="rounded-lg bg-surface-container-low p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="material-symbols-outlined text-headline-md text-tertiary" aria-hidden="true">
          mark_email_read
        </span>
        <p className="mt-3 font-headline-sm text-headline-sm text-on-surface">
          {t(locale, "auth", isSignIn ? "auth.form.signedInTitle" : "auth.form.checkEmailTitle")}
        </p>
        <p className="mt-1.5 font-body-md text-body-md text-on-surface-variant">
          {t(locale, "auth", isSignIn ? "auth.form.signedInBody" : "auth.form.checkEmailBody")}
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
        // No auth backend yet — resolve locally so the control is demonstrably
        // wired rather than inert. Replaced by a server action later.
        window.setTimeout(() => {
          setPending(false);
          setDone(true);
        }, 600);
      }}
    >
      <TextField
        name="name"
        label={
          accountLabel ?? t(locale, "auth", isSignIn ? "auth.form.identifierLabel" : "auth.form.nameLabel")
        }
        placeholder={accountPlaceholder ?? t(locale, "auth", "auth.form.namePlaceholder")}
        icon="badge"
        value={name}
        onChange={setName}
        autoComplete="name"
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

      <PasswordField
        name="password"
        label={t(locale, "auth", "auth.form.passwordLabel")}
        placeholder="••••••••••••"
        value={password}
        onChange={setPassword}
        autoComplete={isSignIn ? "current-password" : "new-password"}
        strengthLabels={[
          t(locale, "auth", "auth.form.strengthWeak"),
          t(locale, "auth", "auth.form.strengthFair"),
          t(locale, "auth", "auth.form.strengthGood"),
          t(locale, "auth", "auth.form.showPassword"),
          t(locale, "auth", "auth.form.hidePassword"),
        ]}
        action={
          isSignIn ? (
            <Link
              href={`/${locale}/forgot-password`}
              className="font-label-sm text-label-sm text-primary hover:underline"
            >
              {t(locale, "auth", "auth.form.forgotPassword")}
            </Link>
          ) : null
        }
      />

      <div className="flex items-center justify-between pt-1">
        <Checkbox
          name="remember"
          label={t(locale, "auth", "auth.form.rememberMe")}
          checked={remember}
          onChange={setRemember}
        />
        <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1">
          <span
            className="material-symbols-outlined text-label-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            lock
          </span>
          {t(locale, "auth", "auth.form.ssl")}
        </span>
      </div>

      <div className="pt-2">
        <SubmitButton
          label={t(locale, "auth", isSignIn ? "auth.form.submitSignIn" : "auth.form.submitRegister")}
          pendingLabel={t(locale, "auth", "auth.form.submitting")}
          pending={pending}
        />
      </div>
    </form>
  );
}

/** "Or continue with" rule plus the two identity-provider buttons. */
export function SocialAuth({ locale }: { locale: Locale }) {
  return (
    <>
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full h-px bg-surface-container-high" />
        <span className="absolute px-3 bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant">
          {t(locale, "auth", "auth.form.orContinue")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51Z"
            />
          </svg>
          {t(locale, "auth", "auth.form.google")}
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all"
        >
          <span
            className="material-symbols-outlined text-headline-sm text-tertiary"
            aria-hidden="true"
          >
            contactless
          </span>
          {t(locale, "auth", "auth.form.mobileMoney")}
        </button>
      </div>
    </>
  );
}

/** Closing prompt that cross-links the two registration modes. */
export function AuthFooterPrompt({ locale }: { locale: Locale }) {
  return (
    <p className="mt-6 text-center font-body-md text-body-md text-on-surface-variant">
      {t(locale, "auth", "auth.form.alreadyRegistered")}{" "}
      <Link href={`/${locale}/login`} className="text-primary font-label-md hover:underline">
        {t(locale, "auth", "auth.tab.signin")}
      </Link>
    </p>
  );
}
