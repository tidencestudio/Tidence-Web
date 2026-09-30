import { Browsers, Database, ShieldCheck, Stack } from '@phosphor-icons/react';
import StoryThread from './StoryThread';
import Reveal from './Reveal';
import { useT } from '../prefs/hooks';

const capabilities = [
  ['front', Browsers],
  ['back', Stack],
  ['data', Database],
  ['security', ShieldCheck],
];

/**
 * Offset two-column: a spanning lead statement, then the capability list
 * pushed right of the page grid. Used once on the page.
 */
export default function Capabilities() {
  const t = useT();

  return (
    <section className="section capabilities" id="capabilities">
      <div className="container cap-grid">
        <StoryThread />
        <Reveal className="cap-lead">
          <h2 className="prewrap">{t('capabilities.title')}</h2>
          <p className="lead">{t('capabilities.lead')}</p>
        </Reveal>

        <ul className="cap-list">
          {capabilities.map(([key, Icon], i) => (
            <Reveal as="li" key={key} delay={i * 70} className="cap-item">
              <Icon size={22} weight="regular" aria-hidden="true" />
              <h3>{t(`capabilities.items.${key}.title`)}</h3>
              <p>{t(`capabilities.items.${key}.text`)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
