import { useEffect, useRef } from 'react';

/**
 * Runs `fn` on scroll and resize, coalesced to one call per animation frame.
 * The callback is held in a ref, so passing an inline function does not
 * resubscribe the listeners on every render.
 *
 * Does nothing for readers who asked for reduced motion.
 */
export default function useScrollEffect(fn) {
  const fnRef = useRef(fn);

  // Kept current after every render rather than during it, so the subscription
  // below can own an empty dependency list without ever calling a stale fn.
  useEffect(() => {
    fnRef.current = fn;
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const run = () => {
      frame = 0;
      fnRef.current();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };

    run();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
