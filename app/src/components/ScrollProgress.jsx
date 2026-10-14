import { useEffect, useRef } from 'react';

/**
 * A slim accent line down the right edge that fills as the page is read.
 *
 * It stands in for the native scrollbar, which is hidden (see index.css): the
 * grey OS bar cut a strip off the right of every section, but without it a
 * reader loses the sense of how far down they are. This keeps that cue at a
 * fraction of the width. Decorative; scrolling itself is untouched.
 *
 * One passive scroll listener batched into a frame, writing a transform only.
 */
export default function ScrollProgress() {
  const fillRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const apply = () => {
      frame = 0;
      const root = document.documentElement;
      const span = root.scrollHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(Math.max(window.scrollY / span, 0), 1) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress-fill" ref={fillRef} />
    </div>
  );
}
