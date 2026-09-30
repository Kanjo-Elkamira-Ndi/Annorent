import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/**
 * Request proxy — Next.js 16's replacement for the deprecated `middleware.ts`
 * convention (see `context/file-structure.md` §3).
 *
 * Owns locale negotiation only: it redirects an unprefixed request to its
 * `/[locale]/...` equivalent, preferring an explicit `locale` cookie, then
 * `Accept-Language`, then the default locale. RBAC guards are a separate
 * concern (rule 12) and are not implemented here yet.
 */

const COOKIE = "locale";

function negotiate(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(COOKIE)?.value;
  if (fromCookie && (locales as readonly string[]).includes(fromCookie)) {
    return fromCookie as Locale;
  }

  const header = request.headers.get("accept-language");
  if (header) {
    // Ordered by descending q-value, which is what browsers send.
    const ranked = header
      .split(",")
      .map((part) => {
        const [tag, ...params] = part.trim().split(";");
        const q = params
          .map((p) => p.trim())
          .find((p) => p.startsWith("q="))
          ?.slice(2);
        return { tag: tag.trim(), q: q ? Number.parseFloat(q) : 1 };
      })
      .filter((entry) => Number.isFinite(entry.q))
      .sort((a, b) => b.q - a.q);

    for (const { tag } of ranked) {
      // Match on the primary subtag so `fr-CA` resolves to `fr`.
      const base = tag.split("-")[0].toLowerCase();
      if ((locales as readonly string[]).includes(base)) return base as Locale;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = negotiate(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, API routes, and files with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
