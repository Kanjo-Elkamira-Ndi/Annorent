import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/recovery-forms";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Choose a new password — `/[locale]/reset-password`.
 *
 * **No Stitch design exists for this route** — see `context/sitemap.md`. It is
 * the second half of the flow that starts at `/forgot-password`, and is
 * reached in production from the link in the reset email, i.e.
 * `/reset-password?token=…`.
 *
 * The token is read from `searchParams` and echoed back in a read-only field so
 * the state is visible, but nothing validates it: there is no auth backend to
 * verify a signature against. A real deployment must check the token server-side
 * before honouring the update.
 */

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage({
  params,
  searchParams,
}: PageProps<"/[locale]/reset-password">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const query = await searchParams;
  const raw = query?.token;
  const token = typeof raw === "string" && raw.length > 0 ? raw : undefined;

  return (
    <AuthShell locale={typed}>
      <ResetPasswordForm locale={typed} token={token} />
    </AuthShell>
  );
}
