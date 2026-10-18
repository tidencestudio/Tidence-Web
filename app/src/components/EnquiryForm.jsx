import { useState } from 'react';
import { CheckCircle, PaperPlaneTilt, WhatsappLogo } from '@phosphor-icons/react';
import { useLocale } from '../prefs/hooks';
import { loadRecaptcha, mailtoHref, mailtoWith, sendEnquiry, whatsappHref, whatsappWith } from '../contact';

const NEEDS = ['website', 'crm', 'automation', 'other'];

/**
 * The enquiry form. It lives in its own section right after the hero
 * (StartSection.jsx), which supplies the heading, so it is usually rendered
 * without its own title.
 *
 * It posts to our own function, /api/contact (see contact.js and
 * api/contact.js), behind an invisible reCAPTCHA v3 check, which emails it to
 * the studio inbox. If that fails for any reason, it composes the same
 * message as an email and the visitor's own app opens with it ready to send.
 * The WhatsApp button opens a chat with the message already typed.
 */
export default function EnquiryForm({ showTitle = true }) {
  const { t, locale } = useLocale();
  const [need, setNeed] = useState('website');
  // 'idle' | 'sending' | 'sent' | 'fallback'. Fallback means the service was
  // unavailable and the visitor's email app was opened instead.
  const [status, setStatus] = useState('idle');

  const compose = (form) => {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const details = String(data.get('details') || '').trim();
    const needLabel = t(`form.needs.${need}`);
    const subject = `${t('form.subject')}: ${needLabel}${name ? ` (${name})` : ''}`;
    const body = [
      t('form.greeting'),
      '',
      `${t('form.needLine')}: ${needLabel}`,
      details ? `\n${details}` : '',
      '',
      name || '',
    ].join('\n');
    return {
      name,
      email,
      details,
      needLabel,
      subject,
      body,
      honey: data.get('botcheck'),
    };
  };

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const { name, email, details, needLabel, subject, body, honey } = compose(form);
    // A filled hidden field is a bot. Pretend it worked and drop it.
    if (honey) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      await sendEnquiry({
        name,
        email,
        need,
        needLabel,
        details,
        lang: locale,
      });
      setStatus('sent');
      form.reset();
      setNeed('website');
    } catch {
      setStatus('fallback');
      window.location.href = mailtoWith(subject, body);
    }
  };

  const sendWhatsapp = (event) => {
    const form = event.currentTarget.form;
    if (!form) return;
    const { name, details, needLabel } = compose(form);
    const text = [`${t('form.greeting')} ${t('form.needLine')}: ${needLabel}.`, details, name]
      .filter(Boolean)
      .join('\n');
    window.open(whatsappWith(text), '_blank', 'noopener');
  };

  if (status === 'sent') {
    return (
      <div className="hero-form hero-form-done" role="status">
        <CheckCircle className="hero-form-done-icon" size={36} weight="regular" aria-hidden="true" />
        <h2 className="hero-form-title">{t('form.sentTitle')}</h2>
        <p className="hero-form-done-text">{t('form.sentText')}</p>
        <div className="hero-form-actions">
          <a className="btn btn-ghost" href={whatsappHref(t)} target="_blank" rel="noreferrer noopener">
            <WhatsappLogo size={16} weight="regular" aria-hidden="true" />
            {t('form.sentWhatsapp')}
          </a>
          <button type="button" className="link" onClick={() => setStatus('idle')}>
            {t('form.again')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="hero-form"
      onSubmit={submit}
      // reCAPTCHA loads once someone starts on the form, not with the page.
      onFocus={() => loadRecaptcha(locale).catch(() => {})}
      action={mailtoHref(t)}
      noValidate={false}
    >
      {showTitle && <h2 className="hero-form-title">{t('form.title')}</h2>}

      <div className="hero-form-row">
        <div className="field">
          <label htmlFor="enq-name">{t('form.name')}</label>
          <input id="enq-name" name="name" type="text" autoComplete="name" placeholder={t('form.namePh')} required />
        </div>
        <div className="field">
          <label htmlFor="enq-email">{t('form.email')}</label>
          <input
            id="enq-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t('form.emailPh')}
            required
          />
        </div>
      </div>

      {/* Honeypot: hidden from people, filled by bots. submit() above drops any
          submission where it has a value, and so does the server. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hero-form-honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <fieldset className="field hero-needs">
        <legend>{t('form.need')}</legend>
        <div className="hero-needs-row">
          {NEEDS.map((key) => (
            <label key={key} className={need === key ? 'is-on' : undefined}>
              <input type="radio" name="need" value={key} checked={need === key} onChange={() => setNeed(key)} />
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
        <button type="submit" className="btn" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          <PaperPlaneTilt size={16} weight="regular" aria-hidden="true" />
          {status === 'sending' ? t('form.sending') : t('form.send')}
        </button>
        <button type="button" className="btn btn-ghost" onClick={sendWhatsapp}>
          <WhatsappLogo size={16} weight="regular" aria-hidden="true" />
          {t('form.sendWhatsapp')}
        </button>
      </div>
      <p className="hero-form-note" aria-live="polite">
        {status === 'fallback' ? t('form.fallback') : t('form.note')}
      </p>
      {/* reCAPTCHA's own badge is hidden (App.css), so Google requires this
          line in its place. */}
      <p className="hero-form-legal">
        {t('form.recaptchaA')}{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">
          {t('form.recaptchaPrivacy')}
        </a>{' '}
        {t('form.recaptchaAnd')}{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer noopener">
          {t('form.recaptchaTerms')}
        </a>{' '}
        {t('form.recaptchaB')}
      </p>
    </form>
  );
}
