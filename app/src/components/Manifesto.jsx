import Reveal from './Reveal';
import StoryThread from './StoryThread';
import WordReveal from './WordReveal';
import { useLocale } from '../prefs/hooks';

/**
 * The argument the rest of the page rests on, given its own beat.
 *
 * Typographically it is a claim resolved by a rebuttal: the setup runs left
 * across most of the measure, the answer hangs right and alone. No other
 * section on the page is built this way, which is the point.
 */
export default function Manifesto() {
  const { locale, t } = useLocale();

  return (
    <section className="section manifesto">
      <div className="container">
        <StoryThread />
        <p className="manifesto-lead">
          {/* Keyed on locale so the word spans rebuild when the language changes. */}
          <WordReveal as="span" key={locale} text={t('manifesto.lead')} />
        </p>

        <Reveal as="p" className="manifesto-resolve reveal-from-right" delay={120}>
          {t('manifesto.resolve')}
        </Reveal>

        <Reveal as="p" className="manifesto-support reveal-from-right" delay={200}>
          {t('manifesto.support')}
        </Reveal>
      </div>
    </section>
  );
}
