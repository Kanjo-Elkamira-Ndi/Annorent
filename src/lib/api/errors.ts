/**
 * Normalised API errors.
 *
 * Owns: mapping any failed request to one of a closed set of kinds the UI
 * knows how to present (context/API_INTEGRATION.md §7).
 * Does not own: the backend's error envelope. It is NOT verified yet, so this
 * classifies by HTTP status and only reads a top-level `message` string if
 * one happens to be present. Update `extractMessage` once the contract is known.
 */

export type ApiErrorKind =
  | "network"
  | "timeout"
  | "validation"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "rate_limited"
  | "server"
  | "unexpected";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

export function kindForStatus(status: number): ApiErrorKind {
  if (status === 400 || status === 422) return "validation";
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status === 409) return "conflict";
  if (status === 429) return "rate_limited";
  if (status >= 500) return "server";
  return "unexpected";
}

/** Reads a safe, short message from an unknown error body, if any. */
export function extractMessage(body: unknown): string | undefined {
  if (body && typeof body === "object") {
    const candidate =
      (body as { message?: unknown }).message ?? (body as { error?: { message?: unknown } }).error?.message;
    if (typeof candidate === "string" && candidate.length <= 300) return candidate;
  }
  return undefined;
}
