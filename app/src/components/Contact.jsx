import { useRef } from 'react';
import {
  ArrowUpRight,
  EnvelopeSimple,
  InstagramLogo,
  WhatsappLogo,
} from '@phosphor-icons/react';
import Reveal from './Reveal';
import EnquiryForm from './EnquiryForm';
import useScrollProgress from './useScrollProgress';
import { useT } from '../prefs/hooks';
import { EMAIL, INSTAGRAM, WHATSAPP, WHATSAPP_SHOWN, mailtoHref, whatsappHref, instagramHref } from '../contact';

/* Handles live in contact.js. An empty value renders the row as "coming
   soon" with no link, so nothing here points anywhere false. Email and
   WhatsApp open with an enquiry already written. */
const CHANNELS = [
  { key: 'whatsapp', Icon: WhatsappLogo, value: WHATSAPP, href: whatsappHref },
  { key: 'instagram', Icon: InstagramLogo, value: INSTAGRAM, href: instagramHref },
  { key: 'email', Icon: EnvelopeSimple, value: EMAIL, href: mailtoHref },
];

const shown = (key, value) => {
  if (key === 'instagram') return `@${value.replace(/^@/, '')}`;
  if (key === 'whatsapp') return WHATSAPP_SHOWN;
  return value;
};

/**
 * The close of the journey: the slogan, set as large as the page allows and
 * filled with the tide, then every way to reach the studio as one list.
 *
 * Each channel row is a direct line out to that app. Beside them sits the
 * enquiry form, for anyone who would rather write it all down once; it moved
 * here when the hero became the 3D wordmark.
 */
export default function Contact() {
  const t = useT();
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pass' });

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="contact-glow" aria-hidden="true" />

      <div className="container">
        <h2 className="slogan">
          <span className="slogan-line slogan-a">{t('contact.sloganA')}</span>
          <span className="slogan-line slogan-b">{t('contact.sloganB')}</span>
        </h2>

        <div className="contact-grid">
          <Reveal as="p" className="lead contact-lead">
            {t('contact.lead')}
          </Reveal>

          <ul className="channels">
            {CHANNELS.map(({ key, Icon, value, href }, i) => {
              const label = t(`contact.channels.${key}`);
              const external = key !== 'email';

              return (
                <Reveal as="li" key={key} delay={i * 60} className="channel-item">
                  {value ? (
                    <a
                      className="channel"
                      href={href(t)}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                    >
                      <Icon className="channel-icon" size={22} weight="regular" aria-hidden="true" />
                      <span className="channel-name">{label}</span>
                      <span className="channel-value" translate="no">{shown(key, value)}</span>
                      <ArrowUpRight className="channel-arrow" size={20} weight="regular" aria-hidden="true" />
                      {external && <span className="sr-only">{t('meta.openOutside')}</span>}
                    </a>
                  ) : (
                    <div className="channel is-soon">
                      <Icon className="channel-icon" size={22} weight="regular" aria-hidden="true" />
                      <span className="channel-name">{label}</span>
                      <span className="channel-value">{t('contact.soon')}</span>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal className="contact-form">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
