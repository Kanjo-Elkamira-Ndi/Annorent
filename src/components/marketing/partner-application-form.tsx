"use client";

import { useId, useState } from "react";

type PartnerApplicationFormProps = {
  labels: {
    name: string;
    email: string;
    hub: string;
    partnerType: string;
    portfolio: string;
  };
  placeholders: { name: string; email: string; portfolio: string };
  hubs: string[];
  partnerTypes: string[];
  submitLabel: string;
  pendingLabel: string;
  successTitle: string;
  successBody: string;
  requiredError: string;
  emailError: string;
};

type Values = {
  name: string;
  email: string;
  hub: string;
  partnerType: string;
  portfolio: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const CONTROL =
  "w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all";

/**
 * Partner portfolio submission form.
 *
 * There is no partner API, so `onSubmit` resolves locally after a short delay
 * and swaps in an inline confirmation, mirroring the `/contact` form. Selects
 * carry their own localised option labels.
 */
export function PartnerApplicationForm({
  labels,
  placeholders,
  hubs,
  partnerTypes,
  submitLabel,
  pendingLabel,
  successTitle,
  successBody,
  requiredError,
  emailError,
}: PartnerApplicationFormProps) {
  const baseId = useId();
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    hub: hubs[0] ?? "",
    partnerType: partnerTypes[0] ?? "",
    portfolio: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (next: Values): Errors => {
    const nextErrors: Errors = {};
    if (!next.name.trim()) nextErrors.name = requiredError;
    if (!next.email.trim()) nextErrors.email = requiredError;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) nextErrors.email = emailError;
    if (!next.portfolio.trim()) nextErrors.portfolio = requiredError;
    return nextErrors;
  };

  const update = (field: keyof Values, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof Values) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, portfolio: true });

    if (Object.keys(nextErrors).length > 0) {
      // The DOM only carries aria-invalid after this render, so read the
      // field order from the form instead of querying it immediately.
      const order: (keyof Values)[] = ["name", "email", "portfolio"];
      const firstBad = order.find((field) => nextErrors[field]);
      if (firstBad) {
        document.getElementById(`${baseId}-${firstBad}`)?.focus();
      }
      return;
    }

    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="bg-tertiary-fixed text-on-tertiary-fixed p-5 rounded-xl flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            verified
          </span>
          <p className="font-headline-sm text-headline-sm font-bold">{successTitle}</p>
        </div>
        <p className="font-label-md text-label-md">{successBody}</p>
      </div>
    );
  }

  const textField = (
    field: "name" | "email" | "portfolio",
    type: "text" | "email",
    placeholder: string,
    autoComplete?: string,
  ) => {
    const error = errors[field];
    const show = Boolean(touched[field] && error);
    return (
      <div>
        <label
          htmlFor={`${baseId}-${field}`}
          className="block font-label-md text-label-md text-on-surface font-semibold mb-1"
        >
          {labels[field]}
        </label>
        <input
          id={`${baseId}-${field}`}
          name={field}
          type={type}
          value={values[field]}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => update(field, event.target.value)}
          onBlur={() => blur(field)}
          aria-invalid={show}
          aria-describedby={show ? `${baseId}-${field}-error` : undefined}
          className={CONTROL}
        />
        {show ? (
          <p
            id={`${baseId}-${field}-error`}
            role="alert"
            className="mt-1 font-label-sm text-label-sm text-error"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {textField("name", "text", placeholders.name, "name")}
        {textField("email", "email", placeholders.email, "email")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${baseId}-hub`}
            className="block font-label-md text-label-md text-on-surface font-semibold mb-1"
          >
            {labels.hub}
          </label>
          <select
            id={`${baseId}-hub`}
            name="hub"
            value={values.hub}
            onChange={(event) => update("hub", event.target.value)}
            className={CONTROL}
          >
            {hubs.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${baseId}-partnerType`}
            className="block font-label-md text-label-md text-on-surface font-semibold mb-1"
          >
            {labels.partnerType}
          </label>
          <select
            id={`${baseId}-partnerType`}
            name="partnerType"
            value={values.partnerType}
            onChange={(event) => update("partnerType", event.target.value)}
            className={CONTROL}
          >
            {partnerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {textField("portfolio", "text", placeholders.portfolio)}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="h-12 w-full mt-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{pending ? pendingLabel : submitLabel}</span>
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          verified
        </span>
      </button>
    </form>
  );
}
