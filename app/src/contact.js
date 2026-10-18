// Every way to reach the studio, in one place. The enquiry form and the
// contact section build their links from here.

export const EMAIL = 'tidencestudio@gmail.com';

// Digits only, with the country code. Dominican Republic is +1 (829).
export const WHATSAPP = '18297314605';

// How the number reads on the page. The wa.me link uses the digits above.
export const WHATSAPP_SHOWN = '+1 (829) 731-4605';

export const INSTAGRAM = 'tidence.dev';

/**
 * The enquiry form posts to our own serverless function, /api/contact (see
 * api/contact.js), which checks a reCAPTCHA v3 token and emails the enquiry
 * to EMAIL with Nodemailer. reCAPTCHA v3 is invisible: no puzzle, Google
 * scores the visit in the background. Its script is loaded only once someone
 * starts filling in the form, so a visitor who never touches it never loads
 * anything from Google.
 *
 * The site key is public by design (the secret lives only in the function's
 * environment). VITE_RECAPTCHA_SITE_KEY, set in Vercel, provides it.
 */
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
const CAPTCHA_TIMEOUT = 10000;

let recaptchaReady = null;

/** Loads Google's reCAPTCHA v3 script once; safe to call repeatedly. */
export function loadRecaptcha(lang = 'en') {
  if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') return Promise.reject(new Error('no-key'));
  if (recaptchaReady) return recaptchaReady;
  recaptchaReady = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}&hl=${lang}`;
    script.async = true;
    script.onload = () => window.grecaptcha.ready(() => resolve(window.grecaptcha));
    script.onerror = () => {
      recaptchaReady = null;
      reject(new Error('captcha-load'));
    };
    document.head.append(script);
  });
  return recaptchaReady;
}

const withTimeout = (promise, ms) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('captcha-timeout')), ms))]);

async function captchaToken(lang) {
  const grecaptcha = await withTimeout(loadRecaptcha(lang), CAPTCHA_TIMEOUT);
  return withTimeout(grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'enquiry' }), CAPTCHA_TIMEOUT);
}

/**
 * Sends an enquiry through /api/contact. Resolves on success, throws on any
 * failure (no key, reCAPTCHA unreachable or refused, network or mail error)
 * so the caller can fall back to opening the visitor's email app.
 */
export async function sendEnquiry({ name, email, need, needLabel, details, lang }) {
  const token = await captchaToken(lang);
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name, email, need, needLabel, details, lang, token }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || `http-${res.status}`);
  return data;
}

/**
 * A mailto link with the subject and body already written, in the reader's
 * language, so an enquiry is one tap and a send. `t` is the locale lookup.
 */
export const mailtoHref = (t) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(t('enquiry.subject'))}&body=${encodeURIComponent(t('enquiry.body'))}`;

/** A mailto link carrying a specific subject and body. */
export const mailtoWith = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/**
 * A wa.me link that opens a chat with the studio with a message already
 * typed. WhatsApp never sends on its own: the visitor taps send, which is
 * what keeps this from being spam.
 */
export const whatsappHref = (t) => whatsappWith(t('enquiry.whatsapp'));

/** A wa.me link carrying a specific message. */
export const whatsappWith = (text) =>
  WHATSAPP ? `https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(text)}` : '';

export const instagramHref = () => `https://www.instagram.com/${INSTAGRAM.replace(/^@/, '')}/`;
