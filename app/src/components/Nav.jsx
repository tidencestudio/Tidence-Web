import { useEffect, useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import Logo from './Logo';
import LanguageSwitch from './LanguageSwitch';
import { useT } from '../prefs/hooks';

// Matches the .nav height in App.css; the observer needs it as a number.
const NAV_H = 76;

const sections = [
  ['build', 'nav.build'],
  ['process', 'nav.process'],
  ['about', 'nav.about'],
  ['contact', 'nav.contact'],
];

/**
 * Sticky bar, one line at every width, 68px tall.
 *
 * Two IntersectionObservers and no scroll listener: one watches a sentinel in
 * the hero to decide when the bar needs a backdrop, the other marks whichever
 * section currently owns the viewport.
 */
export default function Nav() {
  const [lifted, setLifted] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [current, setCurrent] = useState('');
  const t = useT();

  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setLifted(!entry.isIntersecting);
        // Back at the very top no section is being read, so no link is
        // marked; otherwise the last one visited stays underlined.
        if (entry.isIntersecting) setCurrent('');
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // The footer is taller than a laptop viewport, so once the page bottoms out
  // its first row -- brand, all three headings, their first links -- is parked
  // under the bar with no scroll left to clear it. Padding cannot help: growing
  // the footer moves that row up by exactly as much. So the bar gets out of the
  // way instead. Same sentinel-and-observer shape as above, still no scroll
  // listener. The links are not lost: the footer carries the same three.
  useEffect(() => {
    const sentinel = document.getElementById('footer-sentinel');
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      // Not-intersecting alone would also fire with the footer still below the
      // fold, which is most of the page; the top check keeps it to the case
      // where the sentinel has actually travelled up behind the bar.
      ([entry]) => setAtEnd(!entry.isIntersecting && entry.boundingClientRect.top < NAV_H),
      { rootMargin: `-${NAV_H}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = sections.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (nodes.length === 0) return;

    // A band across the upper middle of the viewport: whichever section
    // crosses it is the one being read. Without narrowing the root, two
    // adjacent sections are "visible" at once and the marker flickers.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`nav ${lifted ? 'is-lifted' : ''} ${atEnd ? 'is-retracted' : ''}`}>
      <a className="nav-brand" href="#top" aria-label="Tidence">
        <Logo />
      </a>

      <nav className="nav-links" aria-label={t('nav.label')}>
        {sections.map(([id, key]) => (
          <a
            key={id}
            href={`#${id}`}
            className={current === id ? 'is-current' : undefined}
            aria-current={current === id ? 'true' : undefined}
          >
            {t(key)}
          </a>
        ))}
      </nav>

      <div className="nav-prefs">
        <LanguageSwitch />

        <a className="btn btn-sm nav-cta" href="#start">
          {t('nav.cta')}
          <ArrowUpRight size={15} weight="regular" aria-hidden="true" />
        </a>
      </div>

    </header>
  );
}
