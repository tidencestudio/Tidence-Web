import { useEffect, useRef, useState } from 'react';
import useMedia, { REDUCED_MOTION } from './useMedia';

/**
 * One segment of the line that runs down the page through the story.
 *
 * Each section owns its own segment and draws it as the section arrives, so
 * the rail appears to extend downward as you read. Segment-by-segment rather
 * than scrubbed against page scroll: it reads almost identically, costs one
 * IntersectionObserver instead of a permanent rAF loop, and needs no
 * scroll-driven animation support.
 *
 * Purely decorative. It carries no information the headings do not.
 */
export default function StoryThread({ label }) {
  const ref = useRef(null);
  const calm = useMedia(REDUCED_MOTION);
  const [seen, setSeen] = useState(false);
  const drawn = calm || seen;

  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [drawn]);

  return (
    <div ref={ref} className={`thread ${drawn ? 'is-drawn' : ''}`} aria-hidden="true">
      <span className="thread-node" />
      <span className="thread-line" />
      {label && <span className="thread-label">{label}</span>}
    </div>
  );
}
