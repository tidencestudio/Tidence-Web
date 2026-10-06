import WaveLogo from './WaveLogo';
import WordmarkHover from './WordmarkHover';
import { useT } from '../prefs/hooks';

export default function Footer() {
  const t = useT();

  return (
    <footer className="footer">
      {/* Marks where the footer meets the bar. Nav watches it and retracts:
          the footer is taller than a laptop viewport, so at the foot of the
          page its first row would otherwise sit under the sticky bar for
          good, with no scroll left to free it. */}
      <div id="footer-sentinel" aria-hidden="true" />

      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="nav-mark">
            <WaveLogo />
          </span>
          <span translate="no">Tidence</span>
        </div>

        <nav className="footer-col" aria-label={t('footer.sections')}>
          <h2>{t('footer.sections')}</h2>
          <a href="#build">{t('nav.build')}</a>
          <a href="#journey">{t('nav.journey')}</a>
          <a href="#story">{t('nav.story')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>

        <div className="footer-col">
          <h2>{t('footer.elsewhere')}</h2>
          <a
            href="https://github.com/alexrosstrabajo-design"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('footer.github')}
          </a>
          <a href="mailto:alexrosstrabajo@gmail.com">{t('footer.email')}</a>
        </div>

        <div className="footer-col">
          <h2>{t('footer.legal')}</h2>
          <a href="/privacy">{t('footer.privacy')}</a>
          <a href="/terms">{t('footer.terms')}</a>
        </div>
      </div>

      <div className="footer-wordmark" translate="no">
        <WordmarkHover text="TIDENCE" />
      </div>

      <p className="footer-base">
        <span><span translate="no">Tidence</span>, {new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}
