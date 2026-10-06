const SIZES = [640, 960, 1600];
const srcSet = SIZES.map((w) => `/lockup-${w}.webp ${w}w`).join(', ');

/**
 * The panel's picture: the brand lockup (mark and wordmark) on the icon
 * gradient, at 16:10. The logo shapes are taken pixel for pixel from the
 * guideline deck's lockup export; only the canvas was widened to fit the
 * panel. Source file: brand/lockup-16x10.png.
 *
 * About 640px wide on desktop and full width on phones; keep `sizes` in step
 * with the panel grid and with the preload in index.html.
 */
export default function HeroMedia() {
  return (
    <img
      src="/lockup-960.webp"
      srcSet={srcSet}
      sizes="(min-width: 1200px) 640px, (min-width: 900px) 55vw, 100vw"
      alt="Tidence"
      width="1600"
      height="1000"
      fetchPriority="high"
      decoding="async"
    />
  );
}
