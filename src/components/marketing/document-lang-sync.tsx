"use client";

import { useEffect } from "react";

/**
 * Mirrors the locale subtree's `lang` and `dir` onto the document element.
 *
 * Next.js allows exactly one layout to own `<html>`, and the root layout
 * (`src/app/layout.tsx`) sits *above* the `[locale]` segment, so it is handed
 * `params = {}` and cannot know the active locale — verified against Next
 * 16.3.6, not assumed. The locale is therefore applied to a wrapper element in
 * `src/app/[locale]/layout.tsx`, which is correct for CSS and for assistive
 * technology walking the tree, but leaves `<html lang>` saying `en` on every
 * locale.
 *
 * That matters for anything reading the document language directly: screen
 * reader pronunciation heuristics, hyphenation, and search engines. This
 * component copies both attributes up from the subtree on mount so the document
 * element is never left lying about its language.
 *
 * Kept tiny and dependency-free: it renders nothing and holds no state.
 */
export function DocumentLangSync({
  lang,
  dir,
}: {
  lang: string;
  dir: "ltr" | "rtl";
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
  }, [lang, dir]);

  return null;
}
