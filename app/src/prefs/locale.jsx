import { useCallback, useEffect, useMemo, useState } from 'react';
import { LocaleContext } from './context';
import en from './en';
import es from './es';

const KEY = 'tidence-lang';
const DICTIONARIES = { en, es };

const read = () => {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored in DICTIONARIES) return stored;
  } catch {
    // Private mode denies localStorage; fall through to the browser language.
  }
  return (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
};

/** Resolves a dotted path, falling back to English before falling back to the key. */
const lookup = (dict, path) =>
  path.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(read);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Same as the theme: remembering is optional, applying is not.
    }
  }, []);

  const value = useMemo(() => {
    const dict = DICTIONARIES[locale] ?? en;
    // A missing Spanish string falls back to English rather than printing a
    // raw key at someone. The key is the last resort, and it is a bug signal.
    const t = (path) => lookup(dict, path) ?? lookup(en, path) ?? path;
    return { locale, setLocale, t };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
