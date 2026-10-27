// Every way to reach the studio, in one place. The hero form, the hero tiles
// and the contact section all build their links from here.

export const EMAIL = 'tidencestudio@gmail.com';

// Digits only, with the country code. Dominican Republic is +1 (829).
export const WHATSAPP = '18297314605';

// How the number reads on the page. The wa.me link uses the digits above.
export const WHATSAPP_SHOWN = '+1 (829) 731-4605';

export const INSTAGRAM = 'tidence.dev';

/**
 * The enquiry form posts to Web3Forms (https://web3forms.com), which relays
 * each submission to EMAIL. The access key is public by design: it only
 * identifies the inbox, and Web3Forms rate-limits and spam-filters on its
 * side, so it lives here in the code. VITE_WEB3FORMS_KEY (Vercel project or
 * a local .env) overrides it, for pointing a preview at another inbox. If
 * sending fails the form falls back to opening the visitor's email app with
 * the message written, so nothing on the page is a dead end.
 */
const STUDIO_KEY = '18a5487a-6392-4c04-9368-d8ec2c0f5bfc';
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || STUDIO_KEY;
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/**
 * Sends an enquiry through Web3Forms. Resolves on success, throws on any
 * failure (no key, network error, or a rejected submission) so the caller
 * can fall back to mailto.
 */
export async function sendEnquiry({ name, email, need, details, subject, lang }) {
  if (!WEB3FORMS_KEY) throw new Error('no-key');

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject,
      from_name: name || 'Tidence website',
      name,
      email,
      need,
      message: details,
      language: lang,
      // Web3Forms replies to this address when the studio answers from its inbox.
      replyto: email,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || `http-${res.status}`);
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
