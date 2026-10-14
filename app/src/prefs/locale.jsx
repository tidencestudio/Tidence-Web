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
  // The reader's whole preference list, in order, not just the first entry:
  // someone in Spain with ['ca', 'es', 'en'] should land on Spanish.
  const wanted = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const tag of wanted) {
    const base = tag.toLowerCase().split('-')[0];
    if (base in DICTIONARIES) return base;
  }
  return 'en';
};

/** Resolves a dotted path, falling back to English before falling back to the key. */
const lookup = (dict, path) =>
  path.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);

/** `titlePath` lets a page other than the home page name its own tab. */
export function LocaleProvider({ children, titlePath = 'meta.title' }) {
  const [locale, setLocaleState] = useState(read);

  // An accurate lang is what lets the browser offer translation in the first
  // place, and what it translates from. The title and description follow so
  // the tab and share preview are in the page's language too.
  useEffect(() => {
    const dict = DICTIONARIES[locale] ?? en;
    document.documentElement.lang = locale;
    document.title = lookup(dict, titlePath) ?? lookup(en, titlePath);
    document.querySelector('meta[name="description"]')?.setAttribute('content', lookup(dict, 'meta.description'));
  }, [locale, titlePath]);

  const setLocale = useCallback((next) => {
    setLocaleState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Remembering is optional; applying is not.
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
