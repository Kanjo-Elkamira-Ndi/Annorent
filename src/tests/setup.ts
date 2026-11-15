import "@testing-library/jest-dom/vitest";

/*
 * jsdom does not implement HTMLDialogElement.showModal/close. This minimal
 * stand-in toggles the `open` attribute and fires `close`, which is all the
 * Dialog component relies on. Real focus trapping and inertness are browser
 * behaviour, verified in the Playwright suite, not here.
 */
if (typeof HTMLDialogElement !== "undefined" && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

/* jsdom lacks matchMedia; components only read `matches` and subscribe. */
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
