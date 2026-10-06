const SIZES = [640, 960, 1600];
const srcSet = (ext) => SIZES.map((w) => `/wave-sunset-${w}.${ext} ${w}w`).join(', ');

/**
 * The hero's photograph, clean: the sunset wave in its own colour, framed in
 * the right-hand column of the hero. Laid out at about 42vw on desktop and
 * full width on phones; keep `sizes` in step with the hero grid.
 *
 * AVIF and WebP at three widths: a phone fetches about 12 KB instead of the
 * 245 KB original. Keep the srcsets in sync with the preload in index.html.
 */
export default function HeroMedia() {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes="(min-width: 900px) 42vw, 100vw" />
      <source type="image/webp" srcSet={srcSet('webp')} sizes="(min-width: 900px) 42vw, 100vw" />
      <img
        src="/wave-sunset-960.webp"
        alt=""
        width="1600"
        height="900"
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );
}
