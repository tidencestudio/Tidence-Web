import { useLocale, LOCALES } from '../prefs/hooks';

/**
 * A real radio group rather than a cycling button: two languages fit, and a
 * screen reader hears both options and which one is on.
 */
export default function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="switch" role="group" aria-label={t('nav.language')}>
      {LOCALES.map(([code, label]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          // The visible label is a two-letter code; the accessible name is
          // the language's own name, so it is announced in that language.
          aria-label={label}
          lang={code}
          className={locale === code ? 'is-on' : undefined}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
