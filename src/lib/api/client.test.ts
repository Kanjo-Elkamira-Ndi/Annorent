import { describe, expect, it, vi } from "vitest";
import { apiRequest, buildUrl } from "@/lib/api/client";
import { ApiError, kindForStatus } from "@/lib/api/errors";

const BASE = "https://api.example.test/v1";

/** Awaits a request that must fail and returns its ApiError. */
async function failure(promise: Promise<unknown>): Promise<ApiError> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof ApiError) return error;
    throw error;
  }
  throw new Error("expected the request to fail");
}

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

describe("buildUrl", () => {
  it("joins paths and drops undefined query values", () => {
    expect(buildUrl(BASE, "/properties", { page: 2, city: undefined })).toBe(
      "https://api.example.test/v1/properties?page=2",
    );
  });
});

describe("kindForStatus", () => {
  it.each([
    [400, "validation"],
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "not_found"],
    [409, "conflict"],
    [429, "rate_limited"],
    [503, "server"],
    [418, "unexpected"],
  ])("%i → %s", (status, kind) => {
    expect(kindForStatus(status)).toBe(kind);
  });
});

describe("apiRequest", () => {
  it("returns parsed JSON on success", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(200, { ok: true }));
    await expect(apiRequest("/ping", { baseUrl: BASE, fetchImpl })).resolves.toEqual({ ok: true });
  });

  it("sends JSON bodies", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(201, {}));
    await apiRequest("/things", { baseUrl: BASE, fetchImpl, method: "POST", body: { a: 1 } });
    const [, init] = fetchImpl.mock.calls[0];
    expect(init.body).toBe('{"a":1}');
    expect(init.headers["Content-Type"]).toBe("application/json");
  });

  it("normalises HTTP errors and keeps a safe message", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(404, { message: "Listing not found" }));
    const error = await failure(apiRequest("/x", { baseUrl: BASE, fetchImpl }));
    expect(error.kind).toBe("not_found");
    expect(error.status).toBe(404);
    expect(error.message).toBe("Listing not found");
  });

  it("maps a failed connection to a network error", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError("fetch failed"));
    const error = await failure(apiRequest("/x", { baseUrl: BASE, fetchImpl }));
    expect(error.kind).toBe("network");
  });

  it("flags an unreadable success body", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response("<html>", { status: 200 }));
    const error = await failure(apiRequest("/x", { baseUrl: BASE, fetchImpl }));
    expect(error.kind).toBe("unexpected");
  });
});
