"use client";

import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LogoMark } from "@/components/shared/logo";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { formatMoney } from "@/lib/utils/format";

/** Every Phase 1 primitive in every state, for review in both themes. Sample values are labelled samples. */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 border-t border-border py-8">
      <h2 className="text-h2 font-semibold">{title}</h2>
      {children}
    </section>
  );
}

const SWATCHES = [
  ["canvas", "bg-canvas"],
  ["surface", "bg-surface"],
  ["sunken", "bg-sunken"],
  ["inverse", "bg-inverse"],
  ["action", "bg-action"],
  ["action-subtle", "bg-action-subtle"],
  ["success", "bg-success"],
  ["pending", "bg-pending"],
  ["danger", "bg-danger"],
  ["locked", "bg-locked"],
  ["featured", "bg-featured"],
] as const;

export function DesignPreview() {
  const toast = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mode, setMode] = useState<"rent" | "buy" | "stay">("rent");

  return (
    <Container className="pb-16">
      <header className="py-6">
        <p className="text-body-sm text-muted">Internal · not linked · not indexed</p>
        <h1 className="mt-1 text-h1 font-semibold">Design preview</h1>
        <p className="mt-2 max-w-[60ch] text-body text-secondary">
          Phase 1 primitives from design-audit/design-system-proposal.md. Switch the theme in the footer to review dark mode.
        </p>
      </header>

      <Section title="Colour tokens">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {SWATCHES.map(([name, cls]) => (
            <li key={name} className="space-y-1.5">
              <div className={`h-14 rounded-md border border-border ${cls}`} />
              <p className="text-body-sm text-secondary">{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Typography">
        <p className="text-display-fluid font-semibold">Find your next place in Cameroon</p>
        <p className="text-h1 font-semibold">Heading 1: Apartments in Bonapriso</p>
        <p className="text-h2 font-semibold">Heading 2: What&apos;s nearby</p>
        <p className="text-h3 font-semibold">Heading 3: Amenities</p>
        <p className="text-body-lg text-secondary">Body large: a lead paragraph that introduces a listing description.</p>
        <p className="text-body">Body: the default reading size for descriptions, forms and messages.</p>
        <p className="text-body-sm text-muted">Body small: supporting text and card metadata.</p>
        <p className="tnum text-price-lg font-semibold">
          {formatMoney(350000, "fr")} <span className="text-body-sm font-normal text-muted">/ mois (sample)</span>
        </p>
        <p className="wdth-condensed tnum text-body-sm">Condensed table cut: 1 250 000 · 87 500 · 4 300 000 (sample)</p>
      </Section>

      <Section title="Brand">
        <div className="flex items-center gap-4">
          <LogoMark className="size-16" title="Annorent" />
          <LogoMark className="size-10" />
          <LogoMark className="size-6" />
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Request a viewing</Button>
          <Button variant="secondary">Save search</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete listing</Button>
          <Button leadingIcon={<Plus aria-hidden className="size-4" />}>Add a property</Button>
          <Button loading>Saving</Button>
          <Button disabled>Unavailable</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Form controls">
        <div className="grid max-w-3xl gap-6 md:grid-cols-2">
          <Input label="Full name" placeholder="e.g. Ngono Marie" help="As it appears on your ID." />
          <Input label="Phone number" prefix="+237" inputMode="tel" placeholder="6 XX XX XX XX" />
          <Input label="Monthly budget" suffix="FCFA" inputMode="numeric" error="Enter an amount above 0." />
          <Input label="Listing reference" readOnly defaultValue="Sample-001" />
          <Select
            label="City"
            placeholder="Choose a city"
            options={["Douala", "Yaoundé", "Buea", "Limbe", "Kribi", "Bafoussam", "Bamenda", "Garoua"].map((c) => ({
              value: c,
              label: c,
            }))}
          />
          <Input label="Disabled" disabled placeholder="Not editable" />
          <div className="md:col-span-2">
            <Textarea label="Message to the owner" help="Say when you'd like to visit." />
          </div>
          <div>
            <Checkbox label="Furnished" description="Show only furnished places" />
            <Checkbox label="Parking" defaultChecked />
          </div>
          <RadioGroup
            legend="Rental period"
            name="period"
            defaultValue="month"
            options={[
              { value: "day", label: "Daily" },
              { value: "month", label: "Monthly" },
            ]}
          />
          <SegmentedControl
            legend="I want to"
            value={mode}
            onChange={setMode}
            options={[
              { value: "rent", label: "Rent" },
              { value: "buy", label: "Buy" },
              { value: "stay", label: "Stay" },
            ]}
          />
        </div>
      </Section>

      <Section title="Status badges">
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="success">Verified</StatusBadge>
          <StatusBadge tone="pending">Pending review</StatusBadge>
          <StatusBadge tone="danger">Payment failed</StatusBadge>
          <StatusBadge tone="locked">Cancelled</StatusBadge>
          <StatusBadge tone="featured">Featured</StatusBadge>
        </div>
      </Section>

      <Section title="Alerts">
        <div className="grid max-w-2xl gap-3">
          <Alert tone="info" title="Exact address after booking">
            The owner shares the precise location once your booking is confirmed.
          </Alert>
          <Alert tone="success" title="Viewing request sent" />
          <Alert tone="warning" title="Payment awaiting confirmation" />
          <Alert tone="danger" title="We couldn't save your changes">
            Check your connection and try again.
          </Alert>
        </div>
      </Section>

      <Section title="Card and skeleton">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <p className="text-h3 font-semibold">Card</p>
            <p className="mt-1 text-body-sm text-secondary">Surface, 1px border, radius 12, no shadow at rest.</p>
          </Card>
          <div className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </Section>

      <Section title="Overlays">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>
            Open bottom sheet
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.show({ tone: "success", title: "Search saved", body: "We'll keep it in your account." })}
          >
            Success toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.show({ tone: "error", title: "Couldn't save the search", body: "Try again in a moment." })}
          >
            Error toast
          </Button>
        </div>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Delete this listing?"
          description="It disappears from search right away. This can't be undone."
          closeLabel="Close"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Keep listing
              </Button>
              <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                Delete listing
              </Button>
            </div>
          }
        />
        <Dialog
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Filters"
          closeLabel="Close"
          variant="sheet-bottom"
          footer={
            <Button size="lg" className="w-full" onClick={() => setSheetOpen(false)}>
              Show results
            </Button>
          }
        >
          <Checkbox label="Furnished" />
          <Checkbox label="Parking" />
          <Checkbox label="Generator" />
        </Dialog>
      </Section>

      <Section title="Empty and error states">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <EmptyState
              title="No properties yet"
              body="Add your first property to start receiving enquiries."
              action={<Button>Add a property</Button>}
            />
          </Card>
          <Card>
            <ErrorState
              title="These listings didn't load"
              body="Check your connection and try again."
              action={<Button variant="secondary">Try again</Button>}
            />
          </Card>
        </div>
      </Section>
    </Container>
  );
}
