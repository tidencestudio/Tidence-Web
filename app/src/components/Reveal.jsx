import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades and lifts its children in the first time they scroll into view.
 * Readers who asked for reduced motion start in the shown state, so nothing
 * animates and nothing can leave content stuck invisible.
 */
export default function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);

    // A hash link or a restored scroll position is applied before React
    // mounts, which can leave the observer's first computation working from
    // pre-scroll geometry — nothing then re-triggers it until the reader
    // scrolls, so the section renders blank. Re-check once the browser has
    // settled on a scroll position.
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShown(true);
          observer.disconnect();
        }
      })
    );

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [shown]);

  return (
    <div
      ref={ref}
      className={shown ? 'reveal reveal-in' : 'reveal'}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
