import { useRef } from 'react';
import useScrollProgress from './useScrollProgress';
import { useT } from '../prefs/hooks';

/**
 * Two lines of oversized type sliding against each other as the page scrolls:
 * one solid, one outlined, travelling in opposite directions. It turns the
 * list of what we build into a single typographic beat between the manifesto
 * and the detail.
 *
 * The words repeat so the line never runs out of glyphs at either end. The
 * whole thing is decorative; the same list is set as real text in the
 * services section right below, so it is hidden from assistive tech.
 */
export default function Marquee() {
  const t = useT();
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pass' });

  const words = t('marquee.words');
  const row = [...words, ...words, ...words];

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <p className="marquee-row marquee-row-a">
        {row.map((w, i) => (
          <span key={`a-${i}`}>
            {w}
            <i className="marquee-dot" />
          </span>
        ))}
      </p>
      <p className="marquee-row marquee-row-b">
        {row.map((w, i) => (
          <span key={`b-${i}`}>
            {w}
            <i className="marquee-dot" />
          </span>
        ))}
      </p>
    </div>
  );
}
