import { MAP_VIEWBOX } from "@/lib/marketing/map";

/**
 * The stylised vector map of Abidjan.
 *
 * Server component — pure, static SVG with no state, ported verbatim from
 * Stitch screen `1567d9d5515a48da855f69e63632b78b` ("Interactive Map Discovery
 * - Annorent"). The Ebrié Lagoon, the Pont HKB / Pont De Gaulle arteries,
 * Boulevard Lagunaire, the urban grid, and the six neighbourhood labels all
 * come straight out of the reference; nothing here is invented.
 *
 * Two deliberate details:
 *
 * - `zoom` rewrites the `viewBox` rather than applying a CSS transform, so the
 *   strokes and label text stay vector-crisp at every zoom level instead of
 *   being resampled. Zooming keeps the centre of the map fixed, which is what
 *   the zoom buttons in `map-discovery.tsx` drive.
 * - The gradient and pattern `id`s are namespaced with a prop because SVG ids
 *   are document-global. Two copies of this component on one page — or a
 *   future second map — would otherwise cross-reference each other.
 *
 * The neighbourhood names stay literal rather than going through `t()`:
 * Cocody, Le Plateau, Marcory, Biétry, Treichville, and Lagune Ébrié are
 * proper nouns that do not change between English and French.
 */
export function AbidjanMap({
  zoom = 1,
  idSuffix = "main",
}: {
  /** 1 renders the design's default framing. */
  zoom?: number;
  idSuffix?: string;
}) {
  const gradId = `lagoonWater-${idSuffix}`;
  const gridId = `urbanGrid-${idSuffix}`;

  // Shrink the viewBox about its centre to zoom in.
  const w = MAP_VIEWBOX.width / zoom;
  const h = MAP_VIEWBOX.height / zoom;
  const x = (MAP_VIEWBOX.width - w) / 2;
  const y = (MAP_VIEWBOX.height - h) / 2;

  return (
    <svg
      className="w-full h-full"
      fill="none"
      viewBox={`${x} ${y} ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Stylised map of Abidjan showing the Ébrié Lagoon, major arteries, and six districts"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#cadbff" />
          <stop offset="100%" stopColor="#b8ceff" />
        </linearGradient>
        <pattern height="40" id={gridId} patternUnits="userSpaceOnUse" width="40">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e5f2" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Base landmass */}
      <rect fill="#f4f6fc" height="900" width="1200" />
      <rect fill={`url(#${gridId})`} height="900" opacity="0.6" width="1200" />

      {/* Ébrié Lagoon waterways */}
      <path
        d="M-50 480 C 180 430, 290 530, 480 460 C 620 400, 780 450, 920 380 C 1050 320, 1150 410, 1250 360 L 1250 620 C 1100 680, 940 590, 780 670 C 620 730, 410 650, 260 720 C 120 780, 20 690, -50 710 Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M 520 280 C 580 340, 540 430, 490 470 C 460 410, 470 330, 520 280 Z"
        fill={`url(#${gradId})`}
        opacity="0.8"
      />

      {/* Major highway arteries and bridges (Pont HKB, Pont De Gaulle) */}
      <path d="M 320 200 L 420 850" stroke="#d5dbea" strokeLinecap="round" strokeWidth="8" />
      <path d="M 320 200 L 420 850" stroke="#ffffff" strokeLinecap="round" strokeWidth="4" />
      <path d="M 680 180 C 660 380, 690 540, 730 840" stroke="#d5dbea" strokeLinecap="round" strokeWidth="10" />
      <path d="M 680 180 C 660 380, 690 540, 730 840" stroke="#ffffff" strokeLinecap="round" strokeWidth="6" />

      {/* Boulevard Lagunaire and Latrille */}
      <path d="M 100 320 C 400 350, 750 260, 1150 290" stroke="#ffffff" strokeWidth="7" />
      <path d="M 120 540 C 450 560, 850 510, 1150 540" stroke="#ffffff" strokeWidth="5" />

      {/* Neighbourhood labels */}
      <g className="font-headline-sm font-bold tracking-widest fill-on-surface-variant/40 uppercase">
        <text fontSize="28" letterSpacing="0.15em" x="730" y="240">
          Cocody
        </text>
        <text fontSize="24" letterSpacing="0.15em" x="310" y="360">
          Le Plateau
        </text>
        <text fontSize="26" letterSpacing="0.15em" x="690" y="740">
          Marcory
        </text>
        <text fontSize="22" letterSpacing="0.15em" x="930" y="720">
          Biétry
        </text>
        <text fontSize="20" letterSpacing="0.15em" x="140" y="620">
          Treichville
        </text>
        <text fill="#003d9b" fontSize="16" letterSpacing="0.25em" opacity="0.35" x="520" y="550">
          Lagune Ébrié
        </text>
      </g>
    </svg>
  );
}
