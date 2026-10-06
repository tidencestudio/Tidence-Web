/**
 * The page background: blurred light drifting slowly over the Abyss ground,
 * like sun through deep water.
 *
 * Pure CSS (see `.backdrop` in App.css). Each pool is a radial gradient that
 * already fades to nothing, so no `filter: blur()` is needed and the drift is
 * a transform the compositor handles alone. It replaced SonarGrid, a canvas
 * dot field that redrew every frame.
 *
 * Fixed and inert, never on a scrolling container. Under reduced motion the
 * pools hold still.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="pool pool-a" />
      <span className="pool pool-b" />
      <span className="pool pool-c" />
      <span className="pool pool-d" />
    </div>
  );
}
