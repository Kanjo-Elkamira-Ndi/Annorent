import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { IdentityForm, SocialAuth } from "@/components/auth/identity-form";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Sign in — `/[locale]/login`.
 *
 * Ported from the Stitch reference "Sign In & Registration - Annorent"
 * (screen `414cc749887a4a6fbe5acfcba6b7cfbf`), tab 1 of 3.
 *
 * The design draws one field set for all three modes and varies only the
 * submit label, so the identity form is shared with `/register`; `mode` selects
 * the copy. No stepper here — the design shows the stepper only on the
 * registration modes.
 */

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function LoginPage({ params }: PageProps<"/[locale]/login">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <AuthShell locale={typed} active="signin">
      <IdentityForm locale={typed} mode="signin" />
      <SocialAuth locale={typed} />
    </AuthShell>
  );
}
