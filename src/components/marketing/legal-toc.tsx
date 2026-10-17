"use client";

import { useEffect, useState } from "react";

export type LegalTocItem = {
  id: string;
  number: string;
  title: string;
};

type LegalTocProps = {
  items: LegalTocItem[];
  /** Localised "Contents" heading, also used as the nav's accessible name. */
  heading: string;
  /** Localised plural noun, rendered as "<count> <unit>". */
  sectionUnit: string;
  dpoTitle: string;
  dpoBody: string;
  dpoEmail: string;
  dpoCopyLabel: string;
};

const ITEM_BASE =
  "toc-item flex items-start gap-2.5 px-3 py-2 rounded-lg text-label-md font-label-md leading-snug transition-colors";
const ITEM_ACTIVE = "bg-surface-container text-primary font-semibold";
const ITEM_IDLE =
  "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface";

/** Distance from the viewport top at which a section counts as "current". */
const ACTIVE_OFFSET = 150;

export function LegalToc({
  items,
  heading,
  sectionUnit,
  dpoTitle,
  dpoBody,
  dpoEmail,
  dpoCopyLabel,
}: LegalTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) current = item.id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && items.length > 0) current = items[items.length - 1]?.id ?? current;

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">
            format_list_bulleted
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{heading}</h2>
        </div>
        <span className="font-mono font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
          {items.length} {sectionUnit}
        </span>
      </div>

      <nav aria-label={heading} className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              className={`${ITEM_BASE} ${active ? ITEM_ACTIVE : ITEM_IDLE}`}
            >
              <span
                className={`font-mono text-label-sm ${active ? "text-primary" : "text-outline"}`}
              >
                {item.number}
              </span>
              <span className="min-w-0">{item.title}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-2 pt-4 bg-surface-container-low rounded-lg p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-tertiary font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            verified
          </span>
          <span>{dpoTitle}</span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
          {dpoBody}
        </p>
        <a
          href={`mailto:${dpoEmail}`}
          className="font-label-sm text-label-sm text-primary hover:underline font-medium inline-flex items-center gap-1 self-start"
        >
          <span className="sr-only">{dpoCopyLabel}: </span>
          {dpoEmail}
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            north_east
          </span>
        </a>
      </div>
    </div>
  );
}
