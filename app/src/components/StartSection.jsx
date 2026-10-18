import EnquiryForm from './EnquiryForm';
import { useT } from '../prefs/hooks';

/**
 * The second section: start a project, right after the hero. This is the
 * section the hero's panel grows into from behind the wordmark (the panel
 * and this section share the mint --tide-panel ground), so the first thing a
 * visitor lands on after the brand is the way to begin working together.
 */
export default function StartSection() {
  const t = useT();

  return (
    <section className="section start" id="start" aria-labelledby="start-title">
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
