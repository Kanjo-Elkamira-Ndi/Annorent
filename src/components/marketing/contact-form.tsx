"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
/**
 * The contact desk form — the one interactive island on `/[locale]/contact`.
 *
 * Ported from the Stitch reference "Contact Us - Annorent", which ships an
 * inline `onsubmit` handler that reveals a success modal. The behaviour is
 * kept; three things are improved:
 *
 * 1. Validation runs on blur rather than only on submit, and errors are
 *    associated through `aria-describedby` / `aria-invalid` so a screen
 *    reader announces them against the right field.
 * 2. The submit button has a pending state. The reference jumps straight to
 *    the modal, which reads as instant success for an action that in reality
 *    needs to reach a server.
 * 3. The modal is a real dialog: labelled, focus-moved on open, dismissed
 *    with Escape, and focus-returned to the trigger.
 *
 * There is no contact API in this workspace, so `onSubmit` awaits a short
 * timer and then reports success. That timer is the single seam to remove
 * when a real endpoint lands; nothing else in this file talks to the network.
 *
 * All copy arrives as resolved strings from the server so the island never
 * calls `t()` and never ships a translation table to the browser.
 */

export type ContactFormStrings = {
  fullName: string;
  email: string;
  phone: string;
  phoneRegion: string;
  category: string;
  categoryPlaceholder: string;
  reference: string;
  optional: string;
  message: string;
  consentPrefix: string;
  privacyPolicy: string;
  consentSuffix: string;
  submit: string;
  submitting: string;
  slaNote: string;
  /* Validation copy. */
  required: string;
  emailInvalid: string;
  phoneInvalid: string;
  messageTooShort: string;
  consentRequired: string;
  /* Success dialog. */
  successTitle: string;
  successBody: string;
  successReferenceLabel: string;
  successDone: string;
  placeholders: {
    fullName: string;
    email: string;
    phone: string;
    reference: string;
    message: string;
  };
  /** Server-resolved, so the island never receives a raw key. */
  categories: readonly { value: string; label: string }[];
  countries: readonly { value: string; label: string }[];
  privacyHref: string;
  /** Stable-looking reference echoed in the success dialog. */
  referenceCode: string;
};

type FieldName =
  | "fullName"
  | "email"
  | "phone"
  | "category"
  | "reference"
  | "message"
  | "consent";

type Errors = Partial<Record<FieldName, string>>;

const inputClass =
  "w-full py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md " +
  "placeholder:text-on-surface-variant/70 transition-colors " +
  "focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary";

/** Leading icon sits inside the control, so fields get left padding. */
const inputWithIconClass = `pl-10 pr-4 ${inputClass}`;

const labelClass = "font-label-md text-label-md text-on-surface font-semibold";

const FIELD_TEXT: Record<string, string> = {
  "contact.form.required": "This field is required.",
  "contact.form.error.email": "Enter a valid email address.",
  "contact.form.error.phone": "Enter a valid phone number.",
  "contact.form.error.message": "Please add a little more detail.",
  "contact.form.error.consent": "Please accept the privacy terms to continue.",
};

export function ContactForm({ s }: { s: ContactFormStrings }) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    reference: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const validate = useCallback(
    (name: FieldName, next: typeof values): string | undefined => {
      switch (name) {
        case "fullName":
          return next.fullName.trim().length < 2 ? FIELD_TEXT["contact.form.required"] : undefined;
        case "email":
          if (!next.email.trim()) return FIELD_TEXT["contact.form.required"];
          // Deliberately loose: the only authority on deliverability is the
          // confirmation mail, and a strict regex rejects valid addresses.
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(next.email.trim())
            ? undefined
            : FIELD_TEXT["contact.form.error.email"];
        case "phone":
          if (!next.phone.trim()) return FIELD_TEXT["contact.form.required"];
          return next.phone.replace(/\D/g, "").length >= 6
            ? undefined
            : FIELD_TEXT["contact.form.error.phone"];
        case "category":
          return next.category ? undefined : FIELD_TEXT["contact.form.required"];
        case "message":
          if (!next.message.trim()) return FIELD_TEXT["contact.form.required"];
          return next.message.trim().length >= 10 ? undefined : FIELD_TEXT["contact.form.error.message"];
        case "consent":
          return next.consent ? undefined : FIELD_TEXT["contact.form.error.consent"];
        case "reference":
          return undefined;
      }
    },
    [],
  );

  const setField = useCallback(
    (name: FieldName, value: string | boolean) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value } as typeof prev;
        // Only re-validate a field the user has already left once, so typing
        // does not shout at someone who is still on their first character.
        if (touched[name] || name === "consent") {
          setErrors((e) => ({ ...e, [name]: validate(name, next) }));
        }
        return next;
      });
    },
    [touched, validate],
  );

  const handleBlur = useCallback(
    (name: FieldName) => {
      setTouched((t) => ({ ...t, [name]: true }));
      setErrors((e) => ({ ...e, [name]: validate(name, values) }));
    },
    [values, validate],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const names: FieldName[] = ["fullName", "email", "phone", "category", "message", "consent"];
      const found: Errors = {};
      for (const name of names) {
        const message = validate(name, values);
        if (message) found[name] = message;
      }
      setErrors(found);
      setTouched((t) => ({ ...t, ...Object.fromEntries(names.map((n) => [n, true])) }));

      if (Object.keys(found).length > 0) {
        // Move focus to the first bad control so keyboard and screen-reader
        // users are not left guessing at the top of a long form.
        const first = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]');
        first?.focus();
        return;
      }

      setPending(true);
      // Stand-in for the POST. Replace with the real request.
      window.setTimeout(() => {
        setPending(false);
        setSubmitted(true);
      }, 700);
    },
    [values, validate],
  );

  const closeDialog = useCallback(() => {
    setSubmitted(false);
    setValues({ fullName: "", email: "", phone: "", category: "", reference: "", message: "", consent: false });
    setErrors({});
    setTouched({});
    previousFocus.current?.focus();
  }, []);

  // Move focus into the dialog, trap Escape, and restore focus on close.
  useEffect(() => {
    if (!submitted) return;
    previousFocus.current = submitRef.current;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [submitted, closeDialog]);

  const describedBy = (name: FieldName) => (errors[name] ? `${name}-error` : undefined);

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        {/* Name and email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
          <div className="flex flex-col gap-2">
            <label className={labelClass} htmlFor="fullName">
              {s.fullName}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" aria-hidden="true">
                person
              </span>
              <input
                className={inputWithIconClass}
                id="fullName"
                name="fullName"
                type="text"
                value={values.fullName}
                placeholder={s.placeholders.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={describedBy("fullName")}
                aria-required="true"
              />
            </div>
            {errors.fullName && (
              <p id="fullName-error" role="alert" className="font-label-sm text-label-sm text-error">
                {errors.fullName}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass} htmlFor="email">
              {s.email}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" aria-hidden="true">
                mail
              </span>
              <input
                className={inputWithIconClass}
                id="email"
                name="email"
                type="email"
                value={values.email}
                placeholder={s.placeholders.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy("email")}
                aria-required="true"
              />
            </div>
            {errors.email && (
              <p id="email-error" role="alert" className="font-label-sm text-label-sm text-error">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone with regional prefix */}
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="phone">
            {s.phone}
          </label>
          <div className="flex gap-2">
            <select
              className="w-32 shrink-0 px-3 py-3 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md cursor-pointer transition-colors focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary"
              id="countryCode"
              name="countryCode"
              defaultValue={s.countries[0]?.value}
              aria-label={s.phoneRegion}
            >
              {s.countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" aria-hidden="true">
                call
              </span>
              <input
                className={inputWithIconClass}
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                placeholder={s.placeholders.phone}
                onChange={(e) => setField("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={describedBy("phone")}
                aria-required="true"
              />
            </div>
          </div>
          {errors.phone && (
            <p id="phone-error" role="alert" className="font-label-sm text-label-sm text-error">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Inquiry category */}
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="category">
            {s.category}
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" aria-hidden="true">
              category
            </span>
            <select
              className={`appearance-none pr-10 ${inputWithIconClass} cursor-pointer`}
              id="category"
              name="category"
              value={values.category}
              onChange={(e) => setField("category", e.target.value)}
              onBlur={() => handleBlur("category")}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={describedBy("category")}
              aria-required="true"
            >
              <option value="" disabled>
                {s.categoryPlaceholder}
              </option>
              {s.categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" aria-hidden="true">
              expand_more
            </span>
          </div>
          {errors.category && (
            <p id="category-error" role="alert" className="font-label-sm text-label-sm text-error">
              {errors.category}
            </p>
          )}
        </div>

        {/* Reference, optional */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <label className={labelClass} htmlFor="reference">
              {s.reference}
            </label>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{s.optional}</span>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" aria-hidden="true">
              tag
            </span>
            <input
              className={inputWithIconClass}
              id="reference"
              name="reference"
              type="text"
              value={values.reference}
              placeholder={s.placeholders.reference}
              onChange={(e) => setField("reference", e.target.value)}
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="message">
            {s.message}
          </label>
          <textarea
            className={`resize-y p-4 ${inputClass}`}
            id="message"
            name="message"
            rows={5}
            value={values.message}
            placeholder={s.placeholders.message}
            onChange={(e) => setField("message", e.target.value)}
            onBlur={() => handleBlur("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            aria-required="true"
          />
          {errors.message && (
            <p id="message-error" role="alert" className="font-label-sm text-label-sm text-error">
              {errors.message}
            </p>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/50">
          <input
            className="mt-1 w-4 h-4 rounded text-primary focus:ring-2 focus:ring-primary shrink-0 cursor-pointer"
            id="privacyConsent"
            name="privacyConsent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => setField("consent", e.target.checked)}
            onBlur={() => handleBlur("consent")}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            aria-required="true"
          />
          <label className="font-label-sm text-label-sm text-on-surface-variant cursor-pointer leading-relaxed" htmlFor="privacyConsent">
            {s.consentPrefix}{" "}
            <Link className="text-primary underline font-semibold hover:text-on-surface" href={s.privacyHref}>
              {s.privacyPolicy}
            </Link>{" "}
            {s.consentSuffix}
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" role="alert" className="font-label-sm text-label-sm text-error -mt-4">
            {errors.consent}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <button
            className="w-full h-12 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-progress"
            type="submit"
            ref={submitRef}
            disabled={pending}
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              {pending ? "progress_activity" : "lock"}
            </span>
            <span>{pending ? s.submitting : s.submit}</span>
          </button>
          <p className="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px] text-tertiary-container" aria-hidden="true">
              schedule
            </span>
            {s.slaNote}
          </p>
        </div>
      </form>

      {/* Success dialog */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center gap-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-body"
            ref={dialogRef}
          >
            <div className="w-16 h-16 rounded-full bg-tertiary-container/20 text-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]" aria-hidden="true">
                check_circle
              </span>
            </div>
            <h2 id="contact-success-title" className="font-headline-md text-headline-md text-on-surface font-bold">
              {s.successTitle}
            </h2>
            <p id="contact-success-body" className="font-body-md text-body-md text-on-surface-variant">
              {s.successBody}
            </p>
            <p className="p-3 w-full rounded-lg bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">
              {s.successReferenceLabel}{" "}
              <span className="font-semibold text-primary">{s.referenceCode}</span>
            </p>
            <button
              className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors"
              type="button"
              onClick={closeDialog}
            >
              {s.successDone}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
