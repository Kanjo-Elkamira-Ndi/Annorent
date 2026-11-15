import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, switchLocalePath } from "@/lib/i18n";

/**
 * GET /api/locale?locale=fr&next=/en/hotels
 *
 * Stores the language preference in the `locale` cookie (read by
 * `src/proxy.ts` for unprefixed URLs) and redirects to the same page in the
 * chosen language. A plain link, so switching works without JavaScript.
 * `next` must be a same-origin path; anything else falls back to home, so this
 * can't be used as an open redirect.
 */

const ONE_YEAR = 60 * 60 * 24 * 365;

export function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("locale") ?? "";
  const locale = isLocale(requested) ? requested : defaultLocale;

  const nextParam = request.nextUrl.searchParams.get("next") ?? "/";
  const safePath =
    nextParam.startsWith("/") && !nextParam.startsWith("//") && !nextParam.includes("\\") ? nextParam : "/";
  const target = new URL(switchLocalePath(safePath, locale), request.nextUrl.origin);

  const response = NextResponse.redirect(target, 303);
  response.cookies.set("locale", locale, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
  return response;
}
