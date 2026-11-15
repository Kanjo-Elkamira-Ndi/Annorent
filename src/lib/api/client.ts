import { ApiError, extractMessage, kindForStatus } from "./errors";

/**
 * The single HTTP boundary to the Annorent Core API.
 *
 * Owns: base URL, JSON serialisation, timeouts/cancellation and error
 * normalisation (context/FRONTEND_ARCHITECTURE.md §9).
 * Does not own: any endpoint, DTO or auth scheme. None are verified yet
 * (decision D-4), so no feature code calls this until a contract is
 * documented. Features add typed functions on top of `apiRequest`, e.g.
 * `features/properties/api.ts`.
 *
 * Auth is deliberately absent: credentials will be attached server-side by
 * the BFF once the backend's session mechanism is known. Never put a token in
 * browser storage (context/SECURITY_AND_PRIVACY.md §3).
 */

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
  /** Injected for tests; defaults to global fetch. */
  fetchImpl?: typeof fetch;
  baseUrl?: string;
};

const DEFAULT_TIMEOUT_MS = 15_000;

export function apiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!value) {
    throw new ApiError("unexpected", "NEXT_PUBLIC_API_BASE_URL is not configured");
  }
  return value.replace(/\/+$/, "");
}

export function buildUrl(baseUrl: string, path: string, query?: ApiRequestOptions["query"]): string {
  const url = new URL(`${baseUrl}/${path.replace(/^\/+/, "")}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    body,
    query,
    headers,
    signal,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    fetchImpl = fetch,
    baseUrl = apiBaseUrl(),
  } = options;

  const timeout = AbortSignal.timeout(timeoutMs);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;

  let response: Response;
  try {
    response = await fetchImpl(buildUrl(baseUrl, path, query), {
      method,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: combined,
    });
  } catch (error) {
    if (timeout.aborted) throw new ApiError("timeout", "The request took too long");
    if (signal?.aborted) throw error; // caller cancelled: not an error to present
    throw new ApiError("network", "The server could not be reached");
  }

  const text = await response.text();
  let parsed: unknown = undefined;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      if (response.ok) throw new ApiError("unexpected", "The server returned an unreadable response", response.status);
    }
  }

  if (!response.ok) {
    throw new ApiError(
      kindForStatus(response.status),
      extractMessage(parsed) ?? `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return parsed as T;
}
