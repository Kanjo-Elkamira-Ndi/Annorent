"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { PasswordField, PhoneField, SubmitButton, TextField } from "./auth-fields";

/**
 * The three account-recovery forms — `/forgot-password`, `/reset-password`,
 * and `/verify-email`.
 *
 * These have no Stitch design. The docs list them as "not yet designed", and
 * rather than leave them as null stubs they are derived from the auth shell's
 * own visual language so the flow is walkable end to end: the "Forgot
 * password?" link inside the designed sign-in form lands here, and a reset link
 * would land on `/reset-password?token=…`. See context/sitemap.md.
 *
 * All three are local-state only — no mail is sent, no token is validated.
 */

/**
 * Step 1: request a reset link. Resolves to a "check your inbox" panel so the
 * user is not left on a dead form.
 */
export function ForgotPasswordForm({ locale }: { locale: Locale }) {
  const [contact, setContact] = useState("");
  const [dialCode, setDialCode] = useState("+225");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <StatusPanel
        locale={locale}
        icon="mark_email_read"
        titleKey="auth.recover.sentTitle"
        bodyKey="auth.recover.sentBody"
        action={
          <button
            type="button"
            onClick={() => setSent(false)}
            className="font-label-md text-label-md text-primary hover:underline"
          >
            {t(locale, "auth", "auth.recover.useAnother")}
          </button>
        }
      />
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
          setSent(true);
        }, 600);
      }}
    >
      <p className="font-body-md text-body-md text-on-surface-variant">
        {t(locale, "auth", "auth.recover.intro")}
      </p>

      <PhoneField
        label={t(locale, "auth", "auth.recover.contactLabel")}
        placeholder={t(locale, "auth", "auth.form.contactPlaceholder")}
        dialCodeLabel={t(locale, "auth", "auth.form.dialCodeLabel")}
        value={contact}
        onChange={setContact}
        dialCode={dialCode}
        onDialCodeChange={setDialCode}
      />

      <div className="pt-2">
        <SubmitButton
          label={t(locale, "auth", "auth.recover.submit")}
          pendingLabel={t(locale, "auth", "auth.form.submitting")}
          pending={pending}
        />
      </div>

      <p className="text-center font-body-md text-body-md text-on-surface-variant">
        {t(locale, "auth", "auth.recover.remembered")}{" "}
        <Link href={`/${locale}/login`} className="text-primary font-label-md hover:underline">
          {t(locale, "auth", "auth.tab.signin")}
        </Link>
      </p>
    </form>
  );
}

/**
 * Step 2: choose a new password. Validates that the two entries match before
 * enabling submit, and shows the strength meter. `token` is surfaced as a
 * read-only field when the page was reached through an emailed link, which is
 * the only place a real deployment would read it from.
 */
export function ResetPasswordForm({ locale, token }: { locale: Locale; token?: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = password.length >= 8 && password === confirm;

  if (done) {
    return (
      <StatusPanel
        locale={locale}
        icon="verified_user"
        titleKey="auth.recover.resetDoneTitle"
        bodyKey="auth.recover.resetDoneBody"
        action={
          <Link href={`/${locale}/login`} className="font-label-md text-label-md text-primary hover:underline">
            {t(locale, "auth", "auth.tab.signin")}
          </Link>
        }
      />
    );
  }

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        // `canSubmit` is enforced here rather than only surfaced as a hint: the
        // mismatch warning is advisory styling, and without this guard a short
        // or mismatched pair would still "submit" straight into the success
        // state.
        if (!canSubmit) return;
        setPending(true);
        window.setTimeout(() => {
          setPending(false);
          setDone(true);
        }, 600);
      }}
    >
      {token ? (
        <TextField
          name="token"
          label={t(locale, "auth", "auth.recover.tokenLabel")}
          value={token}
          onChange={() => {}}
          readOnly
          hint={t(locale, "auth", "auth.recover.tokenHint")}
        />
      ) : (
        <p className="rounded-lg bg-surface-container-low p-3 font-label-sm text-label-sm text-on-surface-variant">
          {t(locale, "auth", "auth.recover.tokenMissing")}
        </p>
      )}

      <PasswordField
        name="password"
        label={t(locale, "auth", "auth.recover.newPasswordLabel")}
        placeholder={t(locale, "auth", "auth.form.newPasswordPlaceholder")}
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

      <div>
        <PasswordField
          name="confirmPassword"
          label={t(locale, "auth", "auth.recover.confirmLabel")}
          placeholder={t(locale, "auth", "auth.form.confirmPlaceholder")}
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          strengthLabels={[
            t(locale, "auth", "auth.form.strengthWeak"),
            t(locale, "auth", "auth.form.strengthFair"),
            t(locale, "auth", "auth.form.strengthGood"),
            t(locale, "auth", "auth.form.showPassword"),
            t(locale, "auth", "auth.form.hidePassword"),
          ]}
        />
        {mismatch ? (
          <p className="mt-1.5 font-label-sm text-label-sm text-error flex items-center gap-1" role="alert">
            <span className="material-symbols-outlined text-label-sm" aria-hidden="true">
              error
            </span>
            {t(locale, "auth", "auth.recover.mismatch")}
          </p>
        ) : null}
      </div>

      <div className="pt-2">
        <SubmitButton
          label={t(locale, "auth", "auth.recover.resetSubmit")}
          pendingLabel={t(locale, "auth", "auth.form.submitting")}
          pending={pending}
        />
        {!canSubmit ? (
          <p className="mt-2 text-center font-label-sm text-label-sm text-on-surface-variant">
            {t(locale, "auth", "auth.recover.resetHint")}
          </p>
        ) : null}
      </div>
    </form>
  );
}

/**
 * Post-registration verification status. Resend is a real interaction with its
 * own pending and cooldown state; the verification itself is out of scope
 * without a mail backend.
 */
export function VerifyEmailForm({ locale, email }: { locale: Locale; email?: string }) {
  const [pending, setPending] = useState(false);
  const [resent, setResent] = useState(false);

  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-surface-container-low p-5 text-center">
        <span className="material-symbols-outlined text-headline-md text-primary" aria-hidden="true">
          mark_email_unread
        </span>
        <p className="mt-3 font-headline-sm text-headline-sm text-on-surface">
          {t(locale, "auth", "auth.verify.title")}
        </p>
        <p className="mt-1.5 font-body-md text-body-md text-on-surface-variant">
          {t(locale, "auth", "auth.verify.body")}
        </p>
        {email ? (
          <p className="mt-3 font-label-md text-label-md text-primary break-all">{email}</p>
        ) : null}
      </div>

      <button
        type="button"
        disabled={pending}
        aria-busy={pending}
        onClick={() => {
          setPending(true);
          window.setTimeout(() => {
            setPending(false);
            setResent(true);
          }, 600);
        }}
        className="w-full py-3.5 px-6 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all disabled:opacity-60"
      >
        {t(locale, "auth", "auth.verify.resend")}
        <span
          className={`material-symbols-outlined text-label-md ${pending ? "animate-spin" : ""}`}
          aria-hidden="true"
        >
          {pending ? "progress_activity" : "refresh"}
        </span>
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {resent ? t(locale, "auth", "auth.verify.resent") : ""}
      </p>

      <p className="text-center font-body-md text-body-md text-on-surface-variant">
        {t(locale, "auth", "auth.verify.wrongAddress")}{" "}
        <Link href={`/${locale}/register`} className="text-primary font-label-md hover:underline">
          {t(locale, "auth", "auth.form.createAnother")}
        </Link>
      </p>
    </div>
  );
}

function StatusPanel({
  locale,
  icon,
  titleKey,
  bodyKey,
  action,
}: {
  locale: Locale;
  icon: string;
  titleKey: string;
  bodyKey: string;
  action: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-surface-container-low p-6 text-center" role="status" aria-live="polite">
      <span className="material-symbols-outlined text-headline-md text-tertiary" aria-hidden="true">
        {icon}
      </span>
      <p className="mt-3 font-headline-sm text-headline-sm text-on-surface">
        {t(locale, "auth", titleKey)}
      </p>
      <p className="mt-1.5 font-body-md text-body-md text-on-surface-variant">
        {t(locale, "auth", bodyKey)}
      </p>
      <p className="mt-4">{action}</p>
    </div>
  );
}
