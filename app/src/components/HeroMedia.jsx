const POSTER = '/wave-sunset.jpg';

/**
 * The hero's backdrop: the photograph, clean.
 *
 * It used to be laid under (or replaced by) a WebGL dither. That read as an
 * effect for its own sake and tinted the whole opening teal, so the image now
 * stands on its own. The only thing between it and the copy is the scrim in
 * App.css, which is there for legibility, not for colour.
 */
export default function HeroMedia() {
  return <img src={POSTER} alt="" width="1600" height="900" fetchPriority="high" decoding="async" />;
}
