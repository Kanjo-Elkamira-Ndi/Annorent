import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyEmailForm } from "@/components/auth/recovery-forms";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Email verification status — `/[locale]/verify-email`.
 *
 * **No Stitch design exists for this route** — see `context/sitemap.md`. It is
 * the confirmation step after registration, reached from the link in the
 * verification email.
 *
 * `?email=` lets a caller show which address the link was sent to. It is
 * display-only and untrusted — it must never be treated as proof of ownership,
 * which is what actually happens when the user opens the signed link.
 */

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function VerifyEmailPage({
  params,
  searchParams,
}: PageProps<"/[locale]/verify-email">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const query = await searchParams;
  const raw = query?.email;
  const email = typeof raw === "string" && raw.length > 0 ? raw : undefined;

  return (
    <AuthShell locale={typed}>
      <VerifyEmailForm locale={typed} email={email} />
    </AuthShell>
  );
}
