import WaveLogo from './WaveLogo';
import WordmarkHover from './WordmarkHover';
import { useT } from '../prefs/hooks';

export default function Footer() {
  const t = useT();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="nav-mark">
            <WaveLogo />
          </span>
          Tidence
        </div>

        <nav className="footer-col" aria-label={t('footer.sections')}>
          <h2>{t('footer.sections')}</h2>
          <a href="#work">{t('nav.work')}</a>
          <a href="#studio">{t('nav.studio')}</a>
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

      <div className="footer-wordmark">
        <WordmarkHover text="TIDENCE" />
      </div>

      <p className="footer-base">
        <span>Tidence, {new Date().getFullYear()}</span>
        <span>{t('footer.built')}</span>
      </p>
    </footer>
  );
}
