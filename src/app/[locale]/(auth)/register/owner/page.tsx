import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { BusinessRegisterForm } from "@/components/auth/business-register-form";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Professional registration, landlord / owner — `/[locale]/register/owner`.
 *
 * Stitch reference "Sign In & Registration - Annorent", tab 3 of 3 ("Pro &
 * Hospitality"). The design has one Pro tab for both professional audiences,
 * so `/register/owner` and `/register/hotel` share `BusinessRegisterForm` and
 * differ only by the `role` prop — which sets the account-type link that
 * reads as current, the identity-field label, and the portfolio options.
 *
 * Deliberately no `SocialAuth` row: the design's Google / Mobile Money
 * alternatives belong to the individual sign-up and sign-in flows.
 */

export const metadata: Metadata = {
  title: "Owner Registration",
};

export default async function RegisterOwnerPage({
  params,
}: PageProps<"/[locale]/register/owner">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <AuthShell locale={typed} active="business" step={{ current: 1, total: 3 }}>
      <BusinessRegisterForm locale={typed} role="owner" />
    </AuthShell>
  );
}
