import Iridescence from './Iridescence';

// The shader's tint, as supplied: a sea-green just greener than Lagoon.
const SHADER_COLOR = [0.06274509803921569, 0.7254901960784313, 0.5058823529411764];

/**
 * The page background: the Iridescence shader, fixed behind every section so
 * the whole page sits in the same moving light, under an Abyss veil that
 * keeps every text pair readable (measured in MASTER.md).
 *
 * Fixed and inert, never on a scrolling container. The shader renders at
 * half resolution and is scaled up by the browser: the pattern is soft, so
 * nobody can tell, and it quarters the GPU cost of running full screen.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <Iridescence color={SHADER_COLOR} mouseReact={false} amplitude={0.1} speed={2} scale={0.5} />
    </div>
  );
}
