import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/recovery-forms";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Request a password reset — `/[locale]/forgot-password`.
 *
 * **No Stitch design exists for this route.** `context/sitemap.md` lists
 * forgot-password, reset-password, and verify-email as not covered by any
 * prompt. It is built here anyway, in the auth shell's own visual language,
 * because the designed sign-in form contains a "Forgot password?" link — a
 * stub would ship that link pointing at a blank page.
 *
 * The tab bar is not shown: recovery is a side branch of sign-in, not a peer
 * account mode, so offering the mode switch here would invite the user to
 * abandon the reset. `AuthShell` hides it when `active` is omitted.
 */

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function ForgotPasswordPage({
  params,
}: PageProps<"/[locale]/forgot-password">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <AuthShell locale={typed}>
      <ForgotPasswordForm locale={typed} />
    </AuthShell>
  );
}
