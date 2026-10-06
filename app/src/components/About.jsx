import Reveal from './Reveal';
import { useT } from '../prefs/hooks';

/** Who we are, in two sentences. */
export default function About() {
  const t = useT();

  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <Reveal as="p" className="about-text">
          {t('about.text')}
        </Reveal>
      </div>
    </section>
  );
}
