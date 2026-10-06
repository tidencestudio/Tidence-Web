import { useRef } from 'react';
import { AppWindow, AddressBook, GearSix, Lightning } from '@phosphor-icons/react';
import StoryThread from './StoryThread';
import Reveal from './Reveal';
import photo from './photo';
import useScrollProgress from './useScrollProgress';
import { useT } from '../prefs/hooks';

/* Unsplash photographs (free licence) chosen to show what each card is about:
   a site on a laptop, a team around shared screens, a spreadsheet being
   worked, a dashboard. Fixed ids and crops, so they are stable between loads;
   the shared grade lives in App.css.

   TODO: swap for real photography or product screenshots when they exist. */
const services = [
  { key: 'web', Icon: AppWindow, shot: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=900&q=70' },
  { key: 'crm', Icon: AddressBook, shot: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=900&q=70' },
  { key: 'automation', Icon: GearSix, shot: 'https://images.unsplash.com/photo-1759752393975-7ca7b302fcc6?auto=format&fit=crop&w=1200&h=900&q=70' },
  { key: 'everyday', Icon: Lightning, shot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=900&q=70' },
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
            {...photo(s.shot, [480, 800, 1200], '(max-width: 900px) 92vw, 640px')}
            alt=""
            loading="lazy"
            decoding="async"
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
