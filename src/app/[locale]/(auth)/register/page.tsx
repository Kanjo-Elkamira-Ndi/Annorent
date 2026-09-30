import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthFooterPrompt, IdentityForm, SocialAuth } from "@/components/auth/identity-form";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Create an account — `/[locale]/register`.
 *
 * Stitch reference "Sign In & Registration - Annorent", tab 2 of 3. This is the
 * individual / tenant path; professional accounts live under
 * `/register/owner` and `/register/hotel`.
 */

export const metadata: Metadata = {
  title: "Create Account",
};

export default async function RegisterPage({ params }: PageProps<"/[locale]/register">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <AuthShell locale={typed} active="register" step={{ current: 1, total: 3 }}>
      <IdentityForm locale={typed} mode="register" />
      <SocialAuth locale={typed} />
      <AuthFooterPrompt locale={typed} />
    </AuthShell>
  );
}
