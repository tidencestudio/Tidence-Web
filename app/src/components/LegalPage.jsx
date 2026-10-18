import { ArrowLeft } from '@phosphor-icons/react';
import Logo from './Logo';
import LanguageSwitch from './LanguageSwitch';
import Footer from './Footer';
import { useT } from '../prefs/hooks';

import { EMAIL } from '../contact';

/**
 * Privacy policy and terms of service. One template for both: a contents rail
 * on the left that stays put while the numbered sections run down the right.
 *
 * Deliberately quiet next to the home page: no sonar field, no scroll
 * choreography. Someone reading terms wants the words and nothing else.
 */
export default function LegalPage({ doc }) {
  const t = useT();
  const sections = t(`legal.${doc}.sections`);

  return (
    <>
      <a className="skip" href="#main">
        {t('meta.skip')}
      </a>

      <header className="nav is-lifted legal-bar">
        <a className="nav-brand" href="/" aria-label="Tidence">
          <Logo />
        </a>
        <div className="nav-prefs">
          <LanguageSwitch />
          <a className="link legal-back" href="/">
            <ArrowLeft size={15} weight="regular" aria-hidden="true" />
            {t('legal.back')}
          </a>
        </div>
      </header>

      <main id="main" className="legal">
        <div className="container legal-grid">
          <header className="legal-head">
            <p className="eyebrow">{t(`legal.${doc}.eyebrow`)}</p>
            <h1 className="legal-title">{t(`legal.${doc}.title`)}</h1>
            <p className="legal-updated">
              {t('legal.updated')} <time dateTime="2026-10-18">{t('legal.date')}</time>
            </p>
            <p className="lead legal-intro">{t(`legal.${doc}.intro`)}</p>
          </header>

          <nav className="legal-toc" aria-label={t('legal.contents')}>
            <p className="legal-toc-label">{t('legal.contents')}</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="tnum" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="legal-body">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal-section">
                <h2>
                  <span className="legal-num tnum" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.heading}
                </h2>
                {s.body.map((block, j) =>
                  typeof block === 'string' ? (
                    <p key={j}>{block}</p>
                  ) : (
                    <ul key={j}>
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )
                )}
              </section>
            ))}

            <p className="legal-contact">
              {t('legal.questions')}{' '}
              <a href={`mailto:${EMAIL}`} translate="no">
                {EMAIL}
              </a>
            </p>
          </article>
        </div>
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
