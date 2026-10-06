import { ArrowDown, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react';
import { useT } from '../prefs/hooks';
import { mailtoHref, whatsappHref } from '../contact';
import HeroMedia from './HeroMedia';
import smoothScrollTo from './smoothScroll';

/**
 * The opening. A split layout: the proposition and every way to act on it on
 * the left, the sunset wave framed on the right.
 *
 * It replaced a scroll-expand sequence that held the headline and the CTA
 * back until the reader had scrolled through a 280vh track. Now the first
 * screen says what the studio does and offers a direct line to it: an email
 * already written, and a WhatsApp chat already typed once a number is set in
 * contact.js.
 */
export default function Hero() {
  const t = useT();
  const whatsapp = whatsappHref(t);

  // A real anchor (works without JS, opens in a new tab), upgraded to a paced
  // glide to the next section.
  const toStart = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    smoothScrollTo('start');
  };

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{t('hero.eyebrow')}</p>

          <h1 className="hero-title">
            {t('hero.lead')} <span className="hero-em">{t('hero.em')}</span>.
          </h1>

          <p className="hero-sub">{t('hero.sub')}</p>

          <div className="hero-actions">
            <a className="btn btn-lg" href={mailtoHref(t)}>
              <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />
              {t('hero.ctaEmail')}
            </a>

            {whatsapp && (
              <a className="btn btn-lg btn-ghost" href={whatsapp} target="_blank" rel="noreferrer noopener">
                <WhatsappLogo size={18} weight="regular" aria-hidden="true" />
                {t('hero.ctaWhatsapp')}
                <span className="sr-only">{t('meta.openOutside')}</span>
              </a>
            )}

            <a className="link hero-more" href="#start" onClick={toStart}>
              {t('hero.ctaMore')}
              <ArrowDown size={14} weight="regular" aria-hidden="true" />
            </a>
          </div>

          <p className="hero-note">{t('hero.note')}</p>
        </div>

        <figure className="hero-figure">
          <div className="hero-frame">
            <HeroMedia />
          </div>
          <figcaption>{t('hero.caption')}</figcaption>
        </figure>
      </div>

      {/* Nav watches this to decide when the bar needs its backdrop. */}
      <div id="nav-sentinel" aria-hidden="true" />
    </section>
  );
}
