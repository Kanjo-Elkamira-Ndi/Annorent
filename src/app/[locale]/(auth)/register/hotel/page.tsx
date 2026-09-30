import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { BusinessRegisterForm } from "@/components/auth/business-register-form";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Professional registration, hotel / hospitality — `/[locale]/register/hotel`.
 *
 * Same Stitch screen and same `BusinessRegisterForm` as `/register/owner`; see
 * that page for why the two are one component. This route is the hotel
 * audience: the identity field asks for the establishment rather than a person,
 * and the portfolio options are hospitality categories.
 */

export const metadata: Metadata = {
  title: "Hotel Registration",
};

export default async function RegisterHotelPage({
  params,
}: PageProps<"/[locale]/register/hotel">) {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";

  return (
    <AuthShell locale={typed} active="business" step={{ current: 1, total: 3 }}>
      <BusinessRegisterForm locale={typed} role="hotel" />
    </AuthShell>
  );
}
