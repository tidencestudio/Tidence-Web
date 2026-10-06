import { AppWindow, AddressBook, GearSix, Lightning } from '@phosphor-icons/react';
import Reveal from './Reveal';
import { useT } from '../prefs/hooks';

const services = [
  { key: 'web', Icon: AppWindow },
  { key: 'crm', Icon: AddressBook },
  { key: 'automation', Icon: GearSix },
  { key: 'tools', Icon: Lightning },
];

/**
 * What we do: four offers, one sentence each. A plain grid that reads in
 * order and scrolls normally; no pinning, no photographs to wait for.
 */
export default function Services() {
  const t = useT();

  return (
    <section className="section services" id="build">
      <div className="container">
        <h2 className="section-title">{t('services.title')}</h2>

        <ul className="simple-grid">
          {services.map(({ key, Icon }, i) => (
            <Reveal as="li" key={key} delay={i * 60} className="simple-card">
              <Icon size={28} weight="regular" aria-hidden="true" />
              <h3>{t(`services.items.${key}.title`)}</h3>
              <p>{t(`services.items.${key}.text`)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
