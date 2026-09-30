"use client";

import { useId, useState } from "react";

/**
 * The labelled form controls every auth form is assembled from.
 *
 * Client component because each control owns one piece of local interaction
 * state: the password reveal toggle, the confirm-password match state, and the
 * strength meter. Keeping them here rather than inlining per form means the
 * four registration and three recovery routes share one accessible
 * implementation instead of four near-copies.
 *
 * Every control gets its label programmatically associated — `useId` feeds both
 * `htmlFor` and `aria-describedby` — so there is no dependence on wrapping or
 * on the placeholder being read out.
 */

/** West/Central African dialling codes, from the design's country selector. */
export const DIAL_CODES = [
  { value: "+225", label: "CI (+225)" },
  { value: "+221", label: "SN (+221)" },
  { value: "+237", label: "CM (+237)" },
  { value: "+229", label: "BJ (+229)" },
  { value: "+228", label: "TG (+228)" },
  { value: "+241", label: "GA (+241)" },
] as const;

const FIELD =
  "w-full py-3 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-outline";

/** Leading icon slot — purely decorative, so hidden from assistive tech. */
function LeadIcon({ name }: { name: string }) {
  return (
    <div
      className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary"
      aria-hidden="true"
    >
      <span className="material-symbols-outlined text-headline-sm">{name}</span>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
  type?: "text" | "email";
  name: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
  readOnly?: boolean;
};

/** Single-line text/email input with a leading icon and optional hint. */
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  name,
  autoComplete,
  required,
  hint,
  readOnly = false,
}: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="block font-label-md text-label-md text-on-surface mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon ? <LeadIcon name={icon} /> : null}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          readOnly={readOnly}
          aria-describedby={hint ? hintId : undefined}
          className={icon ? `${FIELD} pl-11 pr-4` : `${FIELD} px-4`}
        />
      </div>
      {hint ? (
        <p id={hintId} className="mt-1.5 font-label-sm text-label-sm text-on-surface-variant">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type PhoneFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  dialCode: string;
  onDialCodeChange: (value: string) => void;
  placeholder?: string;
  dialCodeLabel: string;
};

/**
 * Phone-or-email input paired with the design's country-code `<select>`.
 *
 * The two controls are grouped in a `<div role="group">` with the field's label
 * as the accessible group name, so a screen reader announces the pair as one
 * unit rather than two unlabelled boxes.
 */
export function PhoneField({
  label,
  value,
  onChange,
  dialCode,
  onDialCodeChange,
  placeholder,
  dialCodeLabel,
}: PhoneFieldProps) {
  const id = useId();
  const selectId = `${id}-dial`;

  return (
    <div role="group" aria-label={label}>
      <span className="block font-label-md text-label-md text-on-surface mb-1.5">{label}</span>
      <div className="flex gap-2">
        <div className="relative w-36 shrink-0">
          <select
            id={selectId}
            name="dialCode"
            value={dialCode}
            onChange={(e) => onDialCodeChange(e.target.value)}
            aria-label={dialCodeLabel}
            className={`${FIELD} pl-3 pr-8 font-label-md text-label-md appearance-none cursor-pointer h-full`}
          >
            {DIAL_CODES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <div
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-secondary"
            aria-hidden="true"
          >
            <span className="material-symbols-outlined text-headline-sm">expand_more</span>
          </div>
        </div>
        <div className="relative flex-1">
          <input
            id={id}
            name="contact"
            type="text"
            inputMode="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete="email"
            className={`${FIELD} px-4`}
          />
        </div>
      </div>
    </div>
  );
}

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
  autoComplete?: string;
  /** Rendered on the same row as the label — the design's "Forgot password?". */
  action?: React.ReactNode;
  showStrength?: boolean;
  /** [weak, fair, good, strong] plus the reveal-toggle label at index 3. */
  strengthLabels: [string, string, string, string, string];
};

/**
 * Password input with a working reveal toggle.
 *
 * The toggle is a `<button type="button">` with `aria-pressed` and a label
 * that states what it will do, so it is operable by keyboard and announced
 * meaningfully rather than as an unlabelled icon.
 */
export function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  name,
  autoComplete = "current-password",
  action,
  showStrength = false,
  strengthLabels,
}: PasswordFieldProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const meterId = `${id}-strength`;
  const score = scorePassword(value);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="font-label-md text-label-md text-on-surface">
          {label}
        </label>
        {action}
      </div>
      <div className="relative">
        <LeadIcon name="lock" />
        <input
          id={id}
          name={name}
          type={revealed ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={showStrength && value ? meterId : undefined}
          className={`${FIELD} pl-11 pr-11`}
        />
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          aria-pressed={revealed}
          aria-controls={id}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-secondary hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">
            {revealed ? "visibility_off" : "visibility"}
          </span>
          <span className="sr-only">
            {revealed ? strengthLabels[4] : strengthLabels[3]}
          </span>
        </button>
      </div>

      {showStrength && value ? (
        <div id={meterId} className="mt-2">
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((score + 1) / 4) * 100}%`,
                backgroundColor: ["tertiary", "tertiary", "secondary", "error"][score],
              }}
            />
          </div>
          <p className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
            {strengthLabels[score]}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/**
 * 0–3 strength score. Length dominates, with bonuses for character-class
 * variety — deliberately simple, and only ever rendered as an advisory meter.
 */
function scorePassword(value: string): number {
  if (!value) return -1;
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value) && /[^\w\s]/.test(value)) score += 1;
  return Math.min(score, 3);
}

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
};

export function Checkbox({ label, checked, onChange, name }: CheckboxProps) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded bg-surface-container-high text-primary focus:ring-primary focus:ring-offset-0 border-0"
      />
      <span className="font-label-sm text-label-sm text-on-surface-variant">{label}</span>
    </label>
  );
}

type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
  pending: boolean;
};

/** Submit button that swaps its label while "submitting". */
export function SubmitButton({ label, pendingLabel, pending }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="w-full py-3.5 px-6 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60"
    >
      <span>{pending ? pendingLabel : label}</span>
      <span
        className={`material-symbols-outlined text-label-md ${pending ? "animate-spin" : ""}`}
        aria-hidden="true"
      >
        {pending ? "progress_activity" : "arrow_forward"}
      </span>
    </button>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  options: readonly { value: string; label: string }[];
};

/** Labelled native select with the design's chevron affordance. */
export function SelectField({ label, value, onChange, name, options }: SelectFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-label-md text-label-md text-on-surface mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${FIELD} pl-4 pr-10 font-label-md text-label-md appearance-none cursor-pointer h-full`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary"
          aria-hidden="true"
        >
          <span className="material-symbols-outlined text-headline-sm">expand_more</span>
        </div>
      </div>
    </div>
  );
}
