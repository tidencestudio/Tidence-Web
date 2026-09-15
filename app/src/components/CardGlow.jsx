import { lazy, Suspense, useEffect, useRef, useState } from 'react';

// three.js is ~530kB of the bundle. Split it out so it is fetched only when a
// card actually needs the glow — never on touch screens, reduced motion, or
// while every card is still off screen.
const ShapeBlur = lazy(() => import('./ShapeBlur'));

// The effect tracks a cursor, so it has nothing to say on a touch screen —
// and would still hold a WebGL context and a render loop in order to say it.
const wantsGlow = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * ShapeBlur edge glow sized to its parent card.
 *
 * Only mounts the shader while the card is near the viewport. A page with
 * eight cards would otherwise hold eight live WebGL contexts — browsers cap
 * these per page, and the ones past the cap get dropped, which kills the
 * effect on arbitrary cards rather than the ones you cannot see.
 */
export default function CardGlow({ color = '#2E8B93' }) {
  const ref = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [enabled] = useState(wantsGlow);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="card-glow" aria-hidden="true">
      {nearViewport && (
        <Suspense fallback={null}>
        <ShapeBlur
          variation={0}
          pixelRatioProp={
            typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1
          }
          fitBounds
          shapeSize={0.98}
          roundness={0.03}
          borderSize={0.014}
          circleSize={0.35}
          circleEdge={0.3}
          color={color}
        />
        </Suspense>
      )}
    </div>
  );
}
