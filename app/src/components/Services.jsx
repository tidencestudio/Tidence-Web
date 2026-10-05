import { useRef } from 'react';
import { AppWindow, AddressBook, GearSix, Lightning } from '@phosphor-icons/react';
import StoryThread from './StoryThread';
import Reveal from './Reveal';
import useScrollProgress from './useScrollProgress';
import { useT } from '../prefs/hooks';

/* Photos are Unsplash images served through Picsum by fixed id, so they are
   stable between loads. They are treated in CSS into the page's single teal
   duotone and only take their own colour once the card settles, which keeps
   four unrelated photographs reading as one set.

   TODO: swap for real photography or product screenshots when they exist. */
const services = [
  { key: 'web', Icon: AppWindow, shot: 'https://picsum.photos/id/2/1200/900' },
  { key: 'crm', Icon: AddressBook, shot: 'https://picsum.photos/id/1/1200/900' },
  { key: 'automation', Icon: GearSix, shot: 'https://picsum.photos/id/491/1200/900' },
  { key: 'everyday', Icon: Lightning, shot: 'https://picsum.photos/id/60/1200/900' },
];

function ServiceCard({ s, i, total }) {
  const t = useT();

  return (
    <li className="service" style={{ '--i': i, '--n': total }}>
      <article className="service-card">
        <div className="service-body">
          <p className="service-index">
            <span className="tnum">{String(i + 1).padStart(2, '0')}</span>
            <s.Icon size={18} weight="regular" aria-hidden="true" />
            {t(`services.items.${s.key}.kind`)}
          </p>
          <h3 className="service-title">{t(`services.items.${s.key}.title`)}</h3>
          <p className="service-text">{t(`services.items.${s.key}.text`)}</p>

          <ul className="service-list">
            {t(`services.items.${s.key}.examples`).map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
        </div>

        <div className="service-shot">
          <img
            src={s.shot}
            alt=""
            loading="lazy"
            decoding="async"
            width="1200"
            height="900"
          />
        </div>
      </article>
    </li>
  );
}

/**
 * What we build, as a stack of cards that pin and pile up as you scroll: each
 * offer lands on top of the last instead of sitting beside it in a grid. Four
 * cards, four kinds of work, and the order runs from the most visible (a
 * website) to the least (the automation nobody sees but everybody relies on).
 */
export default function Services() {
  const t = useT();
  // Progress is measured on the whole stack, not per card: a stuck card's
  // position never changes, so its own progress would freeze the moment it
  // pins. The stack's progress tells each card how far it has been buried.
  const stackRef = useRef(null);
  useScrollProgress(stackRef, { mode: 'pin' });

  return (
    <section className="section services" id="build">
      <div className="container">
        <StoryThread />
        <div className="services-head">
          <Reveal>
            <p className="eyebrow">{t('services.eyebrow')}</p>
            <h2 className="services-title prewrap">{t('services.title')}</h2>
          </Reveal>
          <Reveal as="p" className="lead services-lead reveal-from-right" delay={120}>
            {t('services.lead')}
          </Reveal>
        </div>

        <ol className="services-stack" ref={stackRef}>
          {services.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} total={services.length} />
          ))}
        </ol>
      </div>
    </section>
  );
}
