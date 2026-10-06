import { useEffect, useRef, useState } from 'react';
import useScrollProgress from './useScrollProgress';
import { useLocale } from '../prefs/hooks';

/* One Unsplash photograph per stage, picked to show the stage itself: a
   conversation over coffee, a plan written down, wireframes, code, a payment
   on a phone, a phone being tested, a developer at work after launch. Revealed by a wipe
   as each stage arrives.
   TODO: replace with real studio photography when there is some. */
const stages = [
  { key: 'listen', shot: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?auto=format&fit=crop&w=900&h=1100&q=70' },
  { key: 'map', shot: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?auto=format&fit=crop&w=900&h=1100&q=70' },
  { key: 'design', shot: 'https://images.unsplash.com/photo-1600132806608-231446b2e7af?auto=format&fit=crop&w=900&h=1100&q=70' },
  { key: 'build', shot: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?auto=format&fit=crop&w=900&h=1100&q=70' },
  { key: 'connect', shot: 'https://images.unsplash.com/photo-1556742521-9713bf272865?auto=format&fit=crop&w=900&h=1100&q=70' },
  { key: 'launch', shot: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?auto=format&fit=crop&w=900&h=1100&q=70' },
  { key: 'support', shot: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?auto=format&fit=crop&w=900&h=1100&q=70' },
];

const TOTAL = stages.length;

// Below this width, or with reduced motion, the journey is a plain vertical
// sequence. Sideways travel on a phone fights the thumb.
const PIN_QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

/**
 * The process as a single trip. The section pins, and scrolling down carries
 * the reader sideways through seven stages, from the first conversation to
 * the system running a year later. A tide line draws along the bottom as the
 * stages pass, and the counter keeps the reader oriented.
 *
 * The horizontal distance is measured, not guessed: the rail's overflow is
 * written to `--shift` in pixels, and the track's height is set from it so one
 * pixel of scroll moves the rail one pixel. Without that the travel speed
 * would change with every viewport width.
 */
export default function Journey() {
  const { locale, t } = useLocale();
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const counterRef = useRef(null);
  const [pinned, setPinned] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PIN_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Measure the rail's overflow and size the track to match.
  useEffect(() => {
    const track = trackRef.current;
    const rail = railRef.current;
    if (!track || !rail) return;

    if (!pinned) {
      track.style.removeProperty('--shift');
      track.style.removeProperty('height');
      return;
    }

    const measure = () => {
      const vw = window.innerWidth;
      const shift = Math.max(rail.scrollWidth - vw, 0);
      track.style.setProperty('--shift', `${shift}px`);
      track.style.height = `${shift + window.innerHeight}px`;

      // Where along the trip each stage arrives, as a progress value: `--at`
      // is the moment its left edge crosses 85% of the viewport, and `--span`
      // is how much progress it takes to travel the next 45%. CSS turns the
      // two into a per-stage 0 to 1 that drives its reveal.
      if (shift > 0) {
        rail.querySelectorAll('.stage').forEach((stage) => {
          stage.style.setProperty('--at', ((stage.offsetLeft - vw * 0.85) / shift).toFixed(4));
          stage.style.setProperty('--span', ((vw * 0.45) / shift).toFixed(4));
        });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    window.addEventListener('resize', measure);
    // Webfonts change the width of every panel's headline.
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned, locale]);

  // The counter is the one value that has to exist as text, so it is written
  // directly rather than through state: a re-render per scroll frame would
  // rebuild seven panels for the sake of two digits.
  const lastStage = useRef(-1);
  useScrollProgress(trackRef, {
    mode: 'pin',
    onProgress: (p) => {
      const stage = Math.min(Math.floor(p * TOTAL), TOTAL - 1);
      if (stage === lastStage.current || !counterRef.current) return;
      lastStage.current = stage;
      counterRef.current.textContent = String(stage + 1).padStart(2, '0');
    },
  });

  return (
    <section className={`journey ${pinned ? 'is-pinned' : 'is-stacked'}`} id="journey">
      <div className="journey-track" ref={trackRef}>
        <div className="journey-stage">
          <div className="journey-rail" ref={railRef}>
            <header className="journey-intro">
              <p className="eyebrow">{t('journey.eyebrow')}</p>
              <h2 className="journey-title prewrap">{t('journey.title')}</h2>
              <p className="lead">{t('journey.lead')}</p>
              {pinned && (
                <p className="journey-hint" aria-hidden="true">
                  {t('journey.hint')}
                  <span className="journey-hint-arrow" />
                </p>
              )}
            </header>

            <ol className="journey-list">
              {stages.map((s, i) => (
                <li className="stage" key={s.key} style={{ '--i': i, '--n': TOTAL }}>
                  <span className="stage-num tnum" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <figure className="stage-shot">
                    <img
                      src={s.shot}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width="900"
                      height="1100"
                    />
                  </figure>

                  <div className="stage-copy">
                    <p className="stage-kicker">
                      <span className="sr-only">
                        {t('journey.stageLabel')
                          .replace('{n}', i + 1)
                          .replace('{total}', TOTAL)}
                      </span>
                      <span aria-hidden="true">{t(`journey.stages.${s.key}.kicker`)}</span>
                    </p>
                    <h3 className="stage-title">{t(`journey.stages.${s.key}.title`)}</h3>
                    <p className="stage-text">{t(`journey.stages.${s.key}.text`)}</p>
                    <ul className="stage-out">
                      {t(`journey.stages.${s.key}.out`).map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {pinned && (
            <div className="journey-hud" aria-hidden="true">
              <p className="journey-count">
                <span ref={counterRef} className="tnum">
                  01
                </span>
                <span className="journey-count-total tnum">
                  /&nbsp;{String(TOTAL).padStart(2, '0')}
                </span>
              </p>
              {/* The tide line: a wave drawn left to right as the stages pass. */}
              <svg className="journey-tide" viewBox="0 0 1200 40" preserveAspectRatio="none">
                <path
                  className="journey-tide-base"
                  d="M0 20 Q 50 2 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
                  pathLength="1"
                />
                <path
                  className="journey-tide-live"
                  d="M0 20 Q 50 2 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20"
                  pathLength="1"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
