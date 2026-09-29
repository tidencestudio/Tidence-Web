import Reveal from './Reveal';
import StoryThread from './StoryThread';
import WordReveal from './WordReveal';
import { useT } from '../prefs/hooks';

const keys = ['both', 'scope', 'ships'];

/**
 * Full-width stacked statements. One hairline above the group and one between
 * rows; no row carries both.
 */
export default function Approach() {
  const t = useT();

  return (
    <section className="section approach">
      <div className="container">
          <StoryThread />
        <Reveal>
          <h2 className="approach-head">{t('approach.title')}</h2>
        </Reveal>

        <dl className="approach-list">
          {keys.map((key) => (
            // No Reveal wrapper here: fading the whole row in while the words
            // are also brightening reads as two effects fighting.
            <div className="approach-row" key={key}>
              <dt>{t(`approach.items.${key}.k`)}</dt>
              <dd>
                {/* Keyed on locale so the word spans rebuild when the language
                    changes; otherwise React keeps the old words in place. */}
                <WordReveal as="span" key={key} text={t(`approach.items.${key}.v`)} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
