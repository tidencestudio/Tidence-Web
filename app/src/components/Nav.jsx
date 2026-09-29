import { useEffect, useState } from 'react';
import { ArrowUpRight, MoonStars, Sun } from '@phosphor-icons/react';
import WaveLogo from './WaveLogo';
import { useTheme } from '../prefs/hooks';
import { useLocale, LOCALES } from '../prefs/hooks';

const sections = [
  ['work', 'nav.work'],
  ['studio', 'nav.studio'],
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
  const [current, setCurrent] = useState('');
  const { theme, toggle } = useTheme();
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLifted(!entry.isIntersecting),
      { threshold: 0 }
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

  const next = theme === 'light' ? 'dark' : 'light';

  return (
    <header className={`nav ${lifted ? 'is-lifted' : ''}`}>
      <a className="nav-brand" href="#top">
        <span className="nav-mark">
          <WaveLogo />
        </span>
        Tidence
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
        {/* A real radio group rather than a cycling button: two languages fit,
            and a screen reader hears both options and which one is on. */}
        <div className="switch" role="group" aria-label={t('nav.language')}>
          {LOCALES.map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={locale === code}
              // The visible label is a two-letter code; the accessible name is
              // the language's own name, so it is announced in that language.
              aria-label={label}
              lang={code}
              className={locale === code ? 'is-on' : undefined}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="iconbtn"
          onClick={toggle}
          aria-label={next === 'light' ? t('nav.themeToLight') : t('nav.themeToDark')}
        >
          {theme === 'light' ? (
            <MoonStars size={19} weight="regular" aria-hidden="true" />
          ) : (
            <Sun size={19} weight="regular" aria-hidden="true" />
          )}
        </button>

        <a className="btn btn-sm nav-cta" href="#contact">
          {t('nav.cta')}
          <ArrowUpRight size={15} weight="regular" aria-hidden="true" />
        </a>
      </div>

    </header>
  );
}
