import { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, EnvelopeSimple, PaperPlaneTilt, WhatsappLogo } from '@phosphor-icons/react';
import { useT } from '../prefs/hooks';
import { EMAIL, WHATSAPP, mailtoHref, whatsappHref } from '../contact';
import HeroMedia from './HeroMedia';
import useScrollProgress from './useScrollProgress';

const NEEDS = ['website', 'crm', 'automation', 'other'];

/**
 * The opening, laid out like a product launch: one centred proposition, one
 * action, then a wide panel tilted back in perspective that straightens as it
 * scrolls into view. The panel holds the brand lockup and a real enquiry
 * form, so the "product" on show is the first step of working with the
 * studio. The moving light behind it is the page-wide Backdrop.
 *
 * The form never posts anywhere. Sending composes an email (or a WhatsApp
 * message, once a number is set in contact.js) with what the visitor typed,
 * and their own app opens with it ready to send.
 */
export default function Hero() {
  const t = useT();
  const panelRef = useRef(null);
  useScrollProgress(panelRef, { mode: 'pass' });

  return (
    <section className="hero" id="top">
      <div className="container hero-head">
        {/* Three voices in one line: a light lead-in, the subject in an
            editorial italic, and the verb set heavy so the sentence lands. */}
        <h1 className="hero-title">
          <span className="hero-lead">{t('hero.lead')}</span>{' '}
          <em className="hero-em">{t('hero.em')}</em>{' '}
          <span className="hero-strong">{t('hero.strong')}</span>
        </h1>

        <p className="hero-sub">{t('hero.sub')}</p>

        <div className="hero-actions">
          <a className="btn btn-lg" href={mailtoHref(t)}>
            <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />
            {t('hero.ctaEmail')}
          </a>
          <a className="link hero-more" href="#build">
            {t('hero.ctaMore')}
            <ArrowDown size={14} weight="regular" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="container hero-stage">
        <div className="hero-panel" ref={panelRef}>
          <figure className="hero-shot">
            <HeroMedia />
          </figure>

          <EnquiryForm />

          <nav className="hero-tiles" aria-label={t('hero.tilesLabel')}>
            <a className="hero-tile" href={mailtoHref(t)}>
              <span>{t('hero.tileEmail')}</span>
              <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
            </a>
            <a className="hero-tile" href="#build">
              <span>{t('hero.tileWork')}</span>
              <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>

      {/* Nav watches this to decide when the bar needs its backdrop. */}
      <div id="nav-sentinel" aria-hidden="true" />
    </section>
  );
}

function EnquiryForm() {
  const t = useT();
  const [need, setNeed] = useState('website');

  const compose = (form) => {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const details = String(data.get('details') || '').trim();
    const needLabel = t(`form.needs.${need}`);
    return { name, details, needLabel };
  };

  const sendEmail = (event) => {
    event.preventDefault();
    const { name, details, needLabel } = compose(event.currentTarget);
    const subject = `${t('form.subject')}: ${needLabel}${name ? ` (${name})` : ''}`;
    const body = [
      t('form.greeting'),
      '',
      `${t('form.needLine')}: ${needLabel}`,
      details ? `\n${details}` : '',
      '',
      name || '',
    ].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const sendWhatsapp = (event) => {
    const form = event.currentTarget.form;
    if (!form) return;
    const { name, details, needLabel } = compose(form);
    const text = [
      `${t('form.greeting')} ${t('form.needLine')}: ${needLabel}.`,
      details,
      name ? `${name}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(
      `https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener'
    );
  };

  return (
    <form className="hero-form" onSubmit={sendEmail} action={mailtoHref(t)}>
      <h2 className="hero-form-title">{t('form.title')}</h2>

      <div className="field">
        <label htmlFor="enq-name">{t('form.name')}</label>
        <input id="enq-name" name="name" type="text" autoComplete="name" placeholder={t('form.namePh')} />
      </div>

      <fieldset className="field hero-needs">
        <legend>{t('form.need')}</legend>
        <div className="hero-needs-row">
          {NEEDS.map((key) => (
            <label key={key} className={need === key ? 'is-on' : undefined}>
              <input
                type="radio"
                name="need"
                value={key}
                checked={need === key}
                onChange={() => setNeed(key)}
              />
              {t(`form.needs.${key}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="enq-details">{t('form.details')}</label>
        <textarea id="enq-details" name="details" rows={3} placeholder={t('form.detailsPh')} />
      </div>

      <div className="hero-form-actions">
        <button type="submit" className="btn">
          <PaperPlaneTilt size={16} weight="regular" aria-hidden="true" />
          {t('form.sendEmail')}
        </button>
        {whatsappHref(t) && (
          <button type="button" className="btn btn-ghost" onClick={sendWhatsapp}>
            <WhatsappLogo size={16} weight="regular" aria-hidden="true" />
            {t('form.sendWhatsapp')}
          </button>
        )}
      </div>
      <p className="hero-form-note">{t('form.note')}</p>
    </form>
  );
}
