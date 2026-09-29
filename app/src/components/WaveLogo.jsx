/**
 * The Tidence mark. Existing brand asset, carried through the redesign
 * unchanged apart from inheriting its colour from the accent token.
 */
export default function WaveLogo({ width = 30, height = 21 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 220 150" aria-hidden="true" focusable="false">
      <path
        d="M10,40 C 45,10 75,70 110,40 C 145,10 175,70 210,40"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M10,110 C 45,80 75,140 110,110 C 145,80 175,140 210,110"
        fill="none"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
      />
    </svg>
  );
}
