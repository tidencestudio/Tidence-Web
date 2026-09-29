import { useRef, useState } from 'react';
import { ArrowUpRight, CircleNotch, Warning } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { useT } from '../prefs/hooks';

const STUDIO_EMAIL = 'alexrosstrabajo@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Takes `t` so the messages follow the active language. Validation returns
// dictionary paths' resolved strings, not keys, because they are rendered
// straight into the field and into the summary.
function validate({ name, email, brief }, t) {
  const errors = {};
  if (!name.trim()) errors.name = t('contact.errors.name');
  if (!email.trim()) errors.email = t('contact.errors.emailMissing');
  else if (!EMAIL_RE.test(email.trim())) errors.email = t('contact.errors.emailInvalid');
  if (!brief.trim()) errors.brief = t('contact.errors.briefMissing');
  else if (brief.trim().length < 20) errors.brief = t('contact.errors.briefShort');
  return errors;
}

/**
 * Full-width closing CTA with a real form. There is no backend, so a valid
 * submission hands off to the reader's mail client with the message already
 * written. Validation runs on blur and again on submit; errors sit below their
 * field and are announced.
 */
export default function Contact() {
  const t = useT();
  const [values, setValues] = useState({ name: '', email: '', brief: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const summaryRef = useRef(null);

  const set = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next, t));
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values, t));
  };

  const submit = (event) => {
    event.preventDefault();
    const found = validate(values, t);
    setErrors(found);
    setTouched({ name: true, email: true, brief: true });

    if (Object.keys(found).length > 0) {
      // More than one error needs a summary to land on; a single error sends
      // focus straight to the field that caused it.
      requestAnimationFrame(() => {
        if (Object.keys(found).length > 1) summaryRef.current?.focus();
        else document.getElementById(Object.keys(found)[0])?.focus();
      });
      return;
    }

    setStatus('sending');
    const subject = encodeURIComponent(
      t('contact.subject').replace('{name}', values.name.trim())
    );
    const body = encodeURIComponent(`${values.brief.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setStatus('sent'), 600);
  };

  const errorList = Object.entries(errors);
  const showSummary = errorList.length > 1 && touched.name && touched.email && touched.brief;

  return (
    <section className="section contact" id="contact">
      <div className="container contact-inner">
        <Reveal>
          <h2 className="contact-head">{t('contact.title')}</h2>
          <p className="lead contact-lead">{t('contact.lead')}</p>
        </Reveal>

        <Reveal as="div" delay={90} className="contact-form-wrap">
          {status === 'sent' ? (
            <div className="form-done" role="status">
              <h3>{t('contact.doneTitle')}</h3>
              <p>
                {t('contact.doneText')}{' '}
                <a className="link" href={`mailto:${STUDIO_EMAIL}`}>
                  {STUDIO_EMAIL}
                </a>
                .
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setStatus('idle');
                  setValues({ name: '', email: '', brief: '' });
                  setTouched({});
                  setErrors({});
                }}
              >
                {t('contact.again')}
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              {showSummary && (
                <div
                  className="form-summary"
                  role="alert"
                  tabIndex={-1}
                  ref={summaryRef}
                >
                  <Warning size={16} weight="regular" aria-hidden="true" />
                  <div>
                    <p>{t('contact.summary').replace('{count}', errorList.length)}</p>
                    <ul>
                      {errorList.map(([field, message]) => (
                        <li key={field}>
                          <a href={`#${field}`}>{message}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">
                    {t('contact.name')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={set('name')}
                    onBlur={blur('name')}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <p className="field-error" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">
                    {t('contact.email')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={set('email')}
                    onBlur={blur('email')}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <p className="field-error" id="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="brief">
                  {t('contact.brief')} <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  rows={5}
                  required
                  value={values.brief}
                  onChange={set('brief')}
                  onBlur={blur('brief')}
                  aria-invalid={touched.brief && !!errors.brief}
                  aria-describedby={
                    touched.brief && errors.brief ? 'brief-error brief-help' : 'brief-help'
                  }
                />
                <p className="field-help" id="brief-help">
                  {t('contact.briefHelp')}
                </p>
                {touched.brief && errors.brief && (
                  <p className="field-error" id="brief-error">
                    {errors.brief}
                  </p>
                )}
              </div>

              <button className="btn btn-lg" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <CircleNotch size={16} weight="regular" className="spin" aria-hidden="true" />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.submit')}
                    <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
