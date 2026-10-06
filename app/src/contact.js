// Every way to reach the studio, in one place. The hero CTAs and the contact
// section both build their links from here.

export const EMAIL = 'tidencestudio@gmail.com';

// Digits only, with the country code (e.g. '5917xxxxxxx'). While this is
// empty, every WhatsApp button stays hidden or reads "coming soon", so
// nothing on the page links to a wrong number.
export const WHATSAPP = '';

export const INSTAGRAM = 'tidence.dev';

/**
 * A mailto link with the subject and body already written, in the reader's
 * language, so an enquiry is one tap and a send. `t` is the locale lookup.
 */
export const mailtoHref = (t) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(t('enquiry.subject'))}&body=${encodeURIComponent(t('enquiry.body'))}`;

/**
 * A wa.me link that opens a chat with the studio with a message already
 * typed. WhatsApp never sends on its own: the visitor taps send, which is
 * what keeps this from being spam.
 */
export const whatsappHref = (t) =>
  WHATSAPP
    ? `https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(t('enquiry.whatsapp'))}`
    : '';

export const instagramHref = () => `https://www.instagram.com/${INSTAGRAM.replace(/^@/, '')}/`;
