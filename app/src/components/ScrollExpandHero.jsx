import { ArrowDown } from '@phosphor-icons/react';
import { useT } from '../prefs/hooks';
import useScrollScrub from './useScrollScrub';
import HeroMedia from './HeroMedia';
import smoothScrollTo from './smoothScroll';

/**
 * Cinematic opening: a small plate of media that opens to full bleed as the
 * reader scrolls, with the headline parting around it.
 *
 * Ported from a scroll-hijacking implementation that called preventDefault()
 * on wheel and touchmove and forced window.scrollTo(0, 0) on every scroll
 * event, taking the page away from the reader. This uses a tall track and a
 * sticky stage instead: native scrolling is untouched and the timeline is
 * driven by CSS off the main thread.
 */
export default function ScrollExpandHero() {
  const t = useT();

  useScrollScrub();

  // A real link (it still works without JS and can be opened in a new tab),
  // upgraded to a paced scroll so the hero sequence plays out on the way down.
  const toStart = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    smoothScrollTo('start');
  };

  return (
    <section className="expand" id="top">
      <div className="expand-track">
        <div className="expand-stage">
          <div className="expand-media" aria-hidden="true">
            <HeroMedia />
          </div>
          <div className="expand-scrim" aria-hidden="true" />

          <div className="expand-copy">
            {/* Decorative, and aria-hidden on purpose: the h1 below is the real
                heading and stays in the accessibility tree the whole time, so a
                screen reader gets the proposition rather than the brand name.
                This layer only exists while the window is closed. */}
            <div className="expand-brand" aria-hidden="true" translate="no">
              <span className="logo-word">Tidence</span>
            </div>

            <h1 className="expand-title">
              <span className="expand-line expand-line-a">{t('hero.lead')}</span>
              <span className="expand-line expand-line-b">
                <span className="hero-em">{t('hero.em')}</span>.
              </span>
            </h1>

            <div className="expand-reveal">
              <p className="expand-sub">{t('hero.sub')}</p>

              <a className="btn btn-lg" href="#start" onClick={toStart}>
                {t('hero.cta')}
                <ArrowDown size={16} weight="regular" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Tells first-time readers the page continues below. It fades as
              the sequence starts, so it is only there while it is needed. */}
          <a className="expand-cue" href="#start" onClick={toStart}>
            <span className="expand-cue-text">{t('hero.scroll')}</span>
            <span className="expand-cue-line" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div id="nav-sentinel" aria-hidden="true" />
    </section>
  );
}
