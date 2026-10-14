/**
 * The page background: Abyss with a faint, desaturated light from above, a
 * softer glow in the far corner, and a fine grid that fades out from the top.
 *
 * Static CSS (see `.backdrop` in App.css): no canvas, no WebGL, no
 * animation, so it costs nothing while the page scrolls. It replaced the
 * Iridescence shader, which redrew the whole screen every frame and read as
 * heavy and over-saturated.
 */
export default function Backdrop() {
  return <div className="backdrop" aria-hidden="true" />;
}
