import Reveal from './Reveal';
import { useT } from '../prefs/hooks';

const steps = ['talk', 'plan', 'build', 'launch'];

/**
 * How we work: four steps in a numbered list, one sentence each. A real <ol>,
 * so screen readers announce "step 1 of 4" without any extra work.
 */
export default function Process() {
  const t = useT();

  return (
    <section className="section process" id="process">
      <div className="container">
        <h2 className="section-title">{t('process.title')}</h2>

        <ol className="steps">
          {steps.map((key, i) => (
            <Reveal as="li" key={key} delay={i * 60} className="step">
              <span className="step-num tnum" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{t(`process.steps.${key}.title`)}</h3>
              <p>{t(`process.steps.${key}.text`)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
