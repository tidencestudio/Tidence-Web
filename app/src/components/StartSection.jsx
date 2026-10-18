import EnquiryForm from './EnquiryForm';
import { useT } from '../prefs/hooks';

/**
 * The second section: start a project. It sits right behind the hero, held
 * in place with it (Hero.jsx), and is what shows through the hole that opens
 * in the hero as you scroll; once the hole has uncovered it fully it scrolls
 * on with the page. data-scroll-flush="end" makes links to it land at that
 * moment (see scrollTargetY in smoothScroll.js).
 */
export default function StartSection() {
  const t = useT();

  return (
    <section className="section start" id="start" aria-labelledby="start-title" data-scroll-flush="end">
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
