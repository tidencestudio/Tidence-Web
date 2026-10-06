import { useId, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import StoryThread from './StoryThread';
import Reveal from './Reveal';
import photo from './photo';
import { useT } from '../prefs/hooks';

/* Unsplash photographs matched to each piece: the desk the story starts at,
   two developers, code, handwritten notes. Graded in CSS like every other
   photograph on the page.
   TODO: swap for real studio photography when it exists. */
const FEATURE_SHOT = 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=1200&h=1500&q=70';

const posts = [
  { key: 'stack', shot: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=600&h=450&q=70' },
  { key: 'principles', shot: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=450&q=70' },
];

/**
 * The studio's journal: one long-form feature, the founding story, set as an
 * editorial spread, and a short index of notes about the agency beneath it.
 *
 * The feature opens in place rather than on a separate page. Its first
 * paragraph is always visible; the rest sits behind a real disclosure button,
 * so the section reads as a preview until someone chooses to read on.
 */
export default function Journal() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const [titleTop, titleRest] = t('journal.title').split('\n');

  return (
    <section className="section journal" id="about">
      <div className="container">
        <StoryThread />

        <div className="journal-head">
          <Reveal>
            <p className="eyebrow">{t('journal.eyebrow')}</p>
            {/* The second line turns to italic, so the title reads as a
                masthead rather than a sentence. */}
            <h2 className="journal-title">
              {titleTop}
              {titleRest && (
                <>
                  <br />
                  <em>{titleRest}</em>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal as="p" className="lead reveal-from-right" delay={120}>
            {t('journal.lead')}
          </Reveal>
        </div>

        <article className="feature">
          <Reveal as="figure" className="feature-shot reveal-from-left">
            <div className="feature-frame">
              <img
                {...photo(FEATURE_SHOT, [500, 800, 1200], '(max-width: 900px) 92vw, 480px')}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>{t('journal.feature.caption')}</figcaption>
          </Reveal>

          <div className="feature-text">
            <Reveal>
              <p className="feature-meta">
                <span className="feature-tag">{t('journal.feature.tag')}</span>
                <span>{t('journal.by')}</span>
                <span>{t('journal.feature.minutes')}</span>
              </p>
              <h3 className="feature-title">{t('journal.feature.title')}</h3>
              <p className="feature-dek">{t('journal.feature.dek')}</p>
            </Reveal>

            <div className="feature-body">
              <p className="feature-intro">{t('journal.feature.intro')}</p>

              <div className={`feature-more ${open ? 'is-open' : ''}`} id={bodyId}>
                {/* The grid-rows trick animates to the content's real height
                    without measuring it. `inert` keeps the collapsed text out
                    of the tab order and the accessibility tree. */}
                <div className="feature-more-inner" inert={!open}>
                  {t('journal.feature.body').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  <blockquote className="feature-quote">
                    <p>{t('journal.feature.quote')}</p>
                  </blockquote>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-ghost feature-toggle"
                aria-expanded={open}
                aria-controls={bodyId}
                onClick={() => setOpen((o) => !o)}
              >
                {open ? t('journal.close') : t('journal.read')}
                <CaretDown size={14} weight="regular" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>

        <ol className="notes">
          {posts.map((p, i) => (
            <Reveal as="li" key={p.key} delay={i * 80} className="note">
              <span className="note-index tnum" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="note-tag">{t(`journal.posts.${p.key}.tag`)}</p>
              <div className="note-copy">
                <h3 className="note-title">{t(`journal.posts.${p.key}.title`)}</h3>
                <p className="note-text">{t(`journal.posts.${p.key}.text`)}</p>
              </div>
              <div className="note-shot" aria-hidden="true">
                <img
                  {...photo(p.shot, [300, 600], '(max-width: 620px) 40vw, 300px')}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
