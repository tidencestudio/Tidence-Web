import EnquiryForm from './EnquiryForm';
import { useT } from '../prefs/hooks';

/**
 * The second section: start a project, right after the hero. It is what the
 * hero's window opens onto (Hero.jsx): while the hero is pinned this section
 * is held at the top of the screen and clipped to the growing window, so the
 * first thing a visitor sees through the brand is the way to begin working
 * together. data-scroll-flush lands links to it at the very top, which is
 * exactly where the window has finished opening.
 */
export default function StartSection() {
  const t = useT();

  return (
    <section className="section start" id="start" aria-labelledby="start-title" data-scroll-flush>
      <div className="container start-grid">
        <div className="start-head">
          <h2 className="start-title" id="start-title">
            {t('form.title')}
          </h2>
          <p className="lead start-lead">{t('start.lead')}</p>
        </div>

        <EnquiryForm showTitle={false} />
      </div>
    </section>
  );
}
