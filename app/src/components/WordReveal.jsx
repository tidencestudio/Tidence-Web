import { useEffect, useRef, useState } from 'react';

/**
 * Brightens a line of prose word by word as it arrives.
 *
 * The usual build of this effect fades words up from near-zero opacity, which
 * leaves the sentence unreadable for most of its time on screen. This shifts
 * between two colours that both clear AA against the page (--fg-dim at 5.07:1,
 * --fg at 15.99:1), so the text is legible at every frame and the motion is
 * doing emphasis rather than gatekeeping the content.
 *
 * A transition stagger triggered by IntersectionObserver. The scrubbed version
 * of this used a CSS view timeline, which is Chromium only; sequencing on entry
 * reads almost identically and works in every browser. Each word carries its
 * index so the delay is arithmetic rather than a rule per word.
 */
export default function WordReveal({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el || lit) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lit]);

  return (
    <Tag ref={ref} className={`wordreveal ${lit ? 'is-lit' : ''} ${className}`.trim()}>
      {words.map((word, i) => (
        // The trailing space lives inside the span so the accessible text
        // stays one normal string and the line wraps as ordinary prose.
        <span className="wordreveal-w" style={{ '--i': i }} key={`${word}-${i}`}>
          {i < words.length - 1 ? `${word} ` : word}
        </span>
      ))}
    </Tag>
  );
}
