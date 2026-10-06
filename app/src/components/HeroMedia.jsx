const SIZES = [640, 960, 1600];
const srcSet = (ext) => SIZES.map((w) => `/wave-sunset-${w}.${ext} ${w}w`).join(', ');

/**
 * The hero's backdrop: the photograph, clean.
 *
 * It used to be laid under (or replaced by) a WebGL dither. That read as an
 * effect for its own sake and tinted the whole opening teal, so the image now
 * stands on its own. The only thing between it and the copy is the scrim in
 * App.css, which is there for legibility, not for colour.
 *
 * AVIF and WebP at three widths: a phone fetches about 12 KB instead of the
 * 245 KB original. Keep the srcsets in sync with the preload in index.html.
 */
export default function HeroMedia() {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes="100vw" />
      <source type="image/webp" srcSet={srcSet('webp')} sizes="100vw" />
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
