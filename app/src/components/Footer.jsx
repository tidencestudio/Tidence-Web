import Logo from './Logo';
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
          <Logo />
        </div>

        {/* Root-relative, so they also work from the legal pages; on the home
            page they are still same-document jumps. */}
        <nav className="footer-col" aria-label={t('footer.sections')}>
          <h2>{t('footer.sections')}</h2>
          <a href="/#build">{t('nav.build')}</a>
          <a href="/#process">{t('nav.process')}</a>
          <a href="/#about">{t('nav.about')}</a>
          <a href="/#contact">{t('nav.contact')}</a>
        </nav>

        <div className="footer-col">
          <h2>{t('footer.legal')}</h2>
          <a href="/privacy">{t('footer.privacy')}</a>
          <a href="/terms">{t('footer.terms')}</a>
        </div>
      </div>

      <div className="footer-wordmark" translate="no">
        <WordmarkHover text="tidence" />
      </div>

      <p className="footer-base">
        <span>
          © {new Date().getFullYear()} <span translate="no">Tidence</span>. {t('footer.rights')}
        </span>
      </p>
    </footer>
  );
}
