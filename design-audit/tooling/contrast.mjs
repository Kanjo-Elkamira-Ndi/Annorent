// WCAG 2.x contrast ratios for the proposed Annorent palettes.
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const check = (label, fg, bg, need = 4.5) => {
  const r = ratio(fg, bg);
  console.log(`${r >= need ? "PASS" : "FAIL"} ${r.toFixed(2).padStart(5)}:1 (need ${need})  ${label}  ${fg} on ${bg}`);
};

console.log("--- Existing / documented colours");
check("white on logo blue", "#FFFFFF", "#024BFF");
check("logo blue text on white", "#024BFF", "#FFFFFF");
check("white on documented primary", "#FFFFFF", "#0052CC");
check("documented tertiary green text on white", "#36B373", "#FFFFFF");
check("documented neutral text on secondary", "#172B4D", "#F4F5F7");
check("logo blue on secondary", "#024BFF", "#F4F5F7");

console.log("--- Recommended direction: light theme");
const L = { canvas: "#F4F5F7", surface: "#FFFFFF", sunken: "#ECEEF2", ink: "#172B4D", ink2: "#44546F", muted: "#5E6C84",
  action: "#024BFF", actionHover: "#003BD1", actionText: "#0040E0", border: "#DCDFE6", borderStrong: "#8993A4",
  success: "#1C7A4F", successBg: "#E6F4EC", pending: "#8A5A00", pendingBg: "#FDF3DC", danger: "#C42B1C", dangerBg: "#FCEBE8",
  locked: "#5F6470", featured: "#FFC72C", focus: "#024BFF" };
for (const bg of ["surface", "canvas", "sunken"]) {
  check(`ink on ${bg}`, L.ink, L[bg]); check(`ink2 on ${bg}`, L.ink2, L[bg]); check(`muted on ${bg}`, L.muted, L[bg]);
  check(`actionText on ${bg}`, L.actionText, L[bg]);
}
check("white on action", "#FFFFFF", L.action); check("white on actionHover", "#FFFFFF", L.actionHover);
check("success text on successBg", L.success, L.successBg); check("pending on pendingBg", L.pending, L.pendingBg);
check("danger on dangerBg", L.danger, L.dangerBg); check("danger on surface", L.danger, L.surface);
check("locked on surface", L.locked, L.surface); check("ink on featured fill", L.ink, L.featured);
check("borderStrong (input edge) vs surface", L.borderStrong, L.surface, 3);
check("focus ring vs surface", L.focus, L.surface, 3); check("focus ring vs canvas", L.focus, L.canvas, 3);
check("white on ink (dark band)", "#FFFFFF", L.ink);

console.log("--- Recommended direction: dark theme");
const D = { canvas: "#0B1424", surface: "#111D33", raised: "#18263F", ink: "#E9EDF5", ink2: "#B3BED1", muted: "#8E9AB0",
  actionText: "#8CB0FF", action: "#024BFF", border: "#26354F", borderStrong: "#5B6B87", success: "#5CC98F", pending: "#F2B84B", danger: "#FF8A7A", focus: "#8CB0FF" };
for (const bg of ["canvas", "surface", "raised"]) {
  check(`ink on ${bg}`, D.ink, D[bg]); check(`ink2 on ${bg}`, D.ink2, D[bg]); check(`muted on ${bg}`, D.muted, D[bg]);
  check(`actionText on ${bg}`, D.actionText, D[bg]); check(`success on ${bg}`, D.success, D[bg]);
  check(`pending on ${bg}`, D.pending, D[bg]); check(`danger on ${bg}`, D.danger, D[bg]);
}
check("white on action (dark)", "#FFFFFF", D.action);
check("borderStrong vs surface (dark)", D.borderStrong, D.surface, 3);
check("focus vs canvas (dark)", D.focus, D.canvas, 3);
for (const t of ["ink", "ink2", "muted", "actionText"]) check(`${t} on sunken (dark #0E1829)`, D[t], "#0E1829");

console.log("--- Alternative directions, key pairs");
check("D1 ink on paper", "#14213D", "#FAFAF7"); check("D1 brass accent text", "#8A6A2B", "#FAFAF7");
check("D3 ink on taxi yellow", "#111827", "#FFC72C"); check("D3 white on taxi yellow", "#FFFFFF", "#FFC72C");
check("D3 basalt text on white", "#1F2421", "#FFFFFF");

console.log("--- Phase 1 additions: tinted badge/alert backgrounds and nav active state");
check("light: ink on action-subtle (active nav, info alert)", "#172B4D", "#EEF3FF");
check("light: secondary on action-subtle", "#44546F", "#EEF3FF");
check("light: locked on locked-bg", "#5F6470", "#ECEEF2");
check("dark: success on success-bg", "#5CC98F", "#12301F");
check("dark: pending on pending-bg", "#F2B84B", "#2E240C");
check("dark: danger on danger-bg", "#FF8A7A", "#3A1714");
check("dark: locked on locked-bg", "#B3BED1", "#18263F");
check("dark: ink on action-subtle", "#E9EDF5", "#18263F");
check("dark: secondary on alert tints (worst: success-bg)", "#B3BED1", "#12301F");
check("dark: secondary on danger-bg", "#B3BED1", "#3A1714");
check("dark: canvas text on danger fill (destructive button)", "#0B1424", "#FF8A7A");
check("light: white on danger fill (destructive button)", "#FFFFFF", "#C42B1C");
check("dark: link on surface (bottom nav active)", "#8CB0FF", "#18263F");
check("light: link on surface (bottom nav active)", "#0040E0", "#FFFFFF");
