"use client";

import { useEffect, useId, useRef, useState } from "react";

type PartnersAuditDialogProps = {
  triggerLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  entityLabel: string;
  entityPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  submitLabel: string;
  closeLabel: string;
  pendingLabel: string;
  successTitle: string;
  successBody: string;
  doneLabel: string;
  requiredError: string;
  phoneError: string;
};

type FieldErrors = { entity?: string; phone?: string };

const CONTROL =
  "w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all";

/**
 * "Request Portfolio Audit" dialog.
 *
 * The reference opened a hidden `div` with an inline `onclick` and submitted
 * through `alert()`. This is a real modal dialog instead: `role="dialog"` with
 * `aria-modal`, Escape to dismiss, focus moved in on open and returned to the
 * trigger on close. There is no audit API, so submitting resolves locally.
 */
export function PartnersAuditDialog({
  triggerLabel,
  eyebrow,
  title,
  body,
  entityLabel,
  entityPlaceholder,
  phoneLabel,
  phonePlaceholder,
  submitLabel,
  closeLabel,
  pendingLabel,
  successTitle,
  successBody,
  doneLabel,
  requiredError,
  phoneError,
}: PartnersAuditDialogProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState<{ entity: boolean; phone: boolean }>({
    entity: false,
    phone: false,
  });
  const [values, setValues] = useState({ entity: "", phone: "" });
  const [errors, setErrors] = useState<FieldErrors>({});

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const entityRef = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const baseId = useId();

  const validate = (next: typeof values): FieldErrors => {
    const nextErrors: FieldErrors = {};
    if (!next.entity.trim()) nextErrors.entity = requiredError;
    if (!next.phone.trim()) nextErrors.phone = requiredError;
    else if (next.phone.replace(/[^\d]/g, "").length < 8) nextErrors.phone = phoneError;
    return nextErrors;
  };

  // Move focus into the dialog on open, and back to the trigger on close.
  useEffect(() => {
    if (open) {
      previousFocus.current = triggerRef.current;
      entityRef.current?.focus();
      return;
    }
    previousFocus.current?.focus();
    previousFocus.current = null;
  }, [open]);

  // Escape dismisses; Tab is kept inside the dialog while it is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [href], select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const blurField = (field: "entity" | "phone") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = panelRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setDone(true);
    }, 700);
  };

  const close = () => {
    setOpen(false);
    setDone(false);
  };

  const entityErrorId = `${baseId}-entity-error`;
  const phoneErrorId = `${baseId}-phone-error`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="h-12 px-6 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-primary-container font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          analytics
        </span>
        <span>{triggerLabel}</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${baseId}-title`}
            className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-8 shadow-2xl relative flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="absolute top-4 right-4 w-11 h-11 inline-flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                close
              </span>
            </button>

            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                {eyebrow}
              </span>
              <h3
                id={`${baseId}-title`}
                className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1"
              >
                {title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">{body}</p>
            </div>

            {done ? (
              <div
                role="status"
                className="bg-tertiary-fixed text-on-tertiary-fixed p-5 rounded-xl flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    verified
                  </span>
                  <p className="font-headline-sm text-headline-sm font-bold">{successTitle}</p>
                </div>
                <p className="font-label-md text-label-md">{successBody}</p>
                <button
                  type="button"
                  onClick={close}
                  className="self-start mt-2 h-11 px-5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md font-semibold"
                >
                  {doneLabel}
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor={`${baseId}-entity`}
                    className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                  >
                    {entityLabel}
                  </label>
                  <input
                    ref={entityRef}
                    id={`${baseId}-entity`}
                    name="entity"
                    type="text"
                    value={values.entity}
                    placeholder={entityPlaceholder}
                    onChange={(event) => {
                      const next = { ...values, entity: event.target.value };
                      setValues(next);
                      if (touched.entity) setErrors(validate(next));
                    }}
                    onBlur={() => blurField("entity")}
                    aria-invalid={touched.entity && Boolean(errors.entity)}
                    aria-describedby={touched.entity && errors.entity ? entityErrorId : undefined}
                    className={CONTROL}
                  />
                  {touched.entity && errors.entity ? (
                    <p
                      id={entityErrorId}
                      className="mt-1 font-label-sm text-label-sm text-error"
                      role="alert"
                    >
                      {errors.entity}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor={`${baseId}-phone`}
                    className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                  >
                    {phoneLabel}
                  </label>
                  <input
                    id={`${baseId}-phone`}
                    name="phone"
                    type="tel"
                    value={values.phone}
                    placeholder={phonePlaceholder}
                    onChange={(event) => {
                      const next = { ...values, phone: event.target.value };
                      setValues(next);
                      if (touched.phone) setErrors(validate(next));
                    }}
                    onBlur={() => blurField("phone")}
                    aria-invalid={touched.phone && Boolean(errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? phoneErrorId : undefined}
                    className={CONTROL}
                  />
                  {touched.phone && errors.phone ? (
                    <p
                      id={phoneErrorId}
                      className="mt-1 font-label-sm text-label-sm text-error"
                      role="alert"
                    >
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  aria-busy={pending}
                  className="h-12 w-full rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {pending ? pendingLabel : submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
