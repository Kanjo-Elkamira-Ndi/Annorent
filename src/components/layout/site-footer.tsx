import Link from "next/link";
import { LanguageSwitch } from "@/components/navigation/language-switch";
import { ThemeSwitch } from "@/components/navigation/theme-switch";
import { Logo } from "@/components/shared/logo";
import { t, type Locale } from "@/lib/i18n";
import { localePath, PRIMARY_NAV } from "@/lib/navigation";
import { Container } from "./container";

/**
 * Public footer. Only links to pages that exist: Company and Legal groups are
 * added when those pages are written (no dead links). No currency switcher
 * until more than one currency is real (design-system-proposal §8.3).
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-[34ch] text-body-sm text-secondary">{t(locale, "common", "footer.tagline")}</p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="mb-3 text-body-sm font-semibold text-primary">
            {t(locale, "common", "footer.explore")}
          </h2>
          <ul className="space-y-1">
            {PRIMARY_NAV.map((item) => (
              <li key={item.path}>
                <Link
                  href={localePath(locale, item.path)}
                  className="inline-flex min-h-9 items-center text-body-sm text-secondary hover:text-primary hover:underline hover:underline-offset-4"
                >
                  {t(locale, "common", item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-body-sm font-semibold text-primary">{t(locale, "common", "footer.preferences")}</h2>
          <div className="flex flex-col items-start gap-4">
            <ThemeSwitch locale={locale} />
            <div>
              <p className="mb-1.5 text-body-sm font-medium text-primary">{t(locale, "common", "language.label")}</p>
              <LanguageSwitch locale={locale} variant="row" />
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="py-5">
          <p className="text-body-sm text-muted">{t(locale, "common", "footer.copyright", { year })}</p>
        </Container>
      </div>
    </footer>
  );
}
