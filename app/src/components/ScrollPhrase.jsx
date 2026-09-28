import { useRef } from 'react';
import useScrollEffect from './useScrollEffect';

/**
 * A full-width line that drifts through the viewport at its own pace as the
 * page scrolls, fading in and back out at either end. Used to introduce the
 * section that follows it.
 */
export default function ScrollPhrase({ eyebrow, children, drift = 130 }) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useScrollEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // 0 as the block enters from below, 0.5 when centred, 1 as it leaves.
    const progress = Math.max(
      0,
      Math.min(1, (vh - rect.top) / (vh + rect.height))
    );

    const offset = (0.5 - progress) * drift;

    // Hold full opacity across the middle of the pass and fade only at the
    // ends, so the line is readable for most of the time it is on screen
    // rather than only at the exact centre.
    const fromCentre = Math.abs(progress - 0.5);
    const fade = Math.max(0, Math.min(1, 1 - (fromCentre - 0.2) * 3.4));

    inner.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    inner.style.opacity = fade.toFixed(3);
  });

  return (
    <section className="phrase" ref={ref}>
      <div className="phrase-inner" ref={innerRef}>
        {eyebrow && <div className="phrase-eyebrow">{eyebrow}</div>}
        <p className="phrase-text">{children}</p>
      </div>
    </section>
  );
}
