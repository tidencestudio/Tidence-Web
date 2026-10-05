import { useEffect, useRef } from 'react';

/**
 * Writes a section's scroll progress to `--p` (0 to 1) on the element itself,
 * for CSS to turn into motion.
 *
 * Two ways of measuring it:
 *   'pin'  - progress through a tall track whose child is sticky. 0 when the
 *            track's top reaches the top of the viewport, 1 when its bottom
 *            reaches the bottom. For pinned scenes.
 *   'pass' - progress of an ordinary element across the viewport. 0 as its
 *            top enters at the bottom, 1 as its bottom leaves at the top.
 *
 * Same shape as useScrollScrub: one layout read per frame, and the loop only
 * runs while the element is on screen. React never re-renders per frame; the
 * optional `onProgress` callback is for the rare reader that needs the value
 * in JS, and it is expected to bail out cheaply when nothing changed.
 *
 * Readers who asked for reduced motion get `--p: 1`, the finished state.
 */
export default function useScrollProgress(ref, { mode = 'pass', onProgress } = {}) {
  // Read live from a ref so a new callback each render does not restart the loop.
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      callback.current?.(1);
      return;
    }

    let frame = 0;
    let running = false;

    const apply = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let progress;

      if (mode === 'pin') {
        const span = rect.height - vh;
        progress = span > 0 ? -rect.top / span : 1;
      } else {
        progress = (vh - rect.top) / (vh + rect.height);
      }

      progress = Math.min(Math.max(progress, 0), 1);
      el.style.setProperty('--p', progress.toFixed(4));
      callback.current?.(progress);
    };

    const tick = () => {
      apply();
      frame = running ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
        frame = 0;
        // Settle on the true end state rather than the last frame caught.
        apply();
      }
    });
    observer.observe(el);

    // Deep links and restored scroll positions land without the element ever
    // crossing into view, so write the starting value once regardless.
    const primed = requestAnimationFrame(apply);

    return () => {
      cancelAnimationFrame(primed);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ref, mode]);
}
