import { useEffect, useRef, useState } from 'react';
import useMedia, { REDUCED_MOTION } from './useMedia';

/**
 * Reveals its children the first time they scroll into view.
 *
 * IntersectionObserver rather than a scroll listener: a scroll handler runs on
 * every frame and re-renders React with it. Readers who asked for reduced
 * motion start in the shown state, so nothing animates and nothing can be
 * left stranded invisible.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const calm = useMedia(REDUCED_MOTION);
  const [seen, setSeen] = useState(false);
  const shown = calm || seen;

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(el);

    // A hash link or a restored scroll position lands before React mounts, so
    // the observer's first pass can run against pre-scroll geometry and never
    // fire again until the reader moves. Re-check once layout has settled.
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setSeen(true);
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
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
