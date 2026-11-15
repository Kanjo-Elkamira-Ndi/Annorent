import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { buttonClasses } from "@/components/ui/button";
import { EmptyState } from "./empty-state";

/**
 * An honest placeholder for a route whose data source is not connected yet.
 * It says what will be here and why it's empty, instead of showing invented
 * listings (context/AGENT_RULES.md §7). Each is replaced in its roadmap phase.
 */
export function UnavailablePage({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: ReactNode };
}) {
  return (
    <Container className="py-6 sm:py-10">
      <EmptyState
        headingLevel="h1"
        title={title}
        body={body}
        action={
          action ? (
            <Link href={action.href} className={buttonClasses({ variant: "secondary" })}>
              {action.label}
            </Link>
          ) : undefined
        }
      />
    </Container>
  );
}
