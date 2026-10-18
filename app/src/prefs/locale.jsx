import { useCallback, useEffect, useMemo, useState } from 'react';
import { LOCALE_CODES } from '../routes';
import { LocaleContext } from './context';
import en from './en';
import es from './es';

const DICTIONARIES = { en, es };

/** Resolves a dotted path, falling back to English before falling back to the key. */
const lookup = (dict, path) =>
  path.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);

/**
 * The language comes from the URL (/en or /es, read in App.jsx) and is passed
 * in as initialLocale, so the server render and the first client render agree.
 * Switching language swaps the prefix in the address bar in place: no reload,
 * the reader keeps their scroll position, and the new URL is shareable.
 * `titlePath` lets a page other than the home page name its own tab.
 */
export function LocaleProvider({ children, initialLocale = 'en', titlePath = 'meta.title' }) {
  const [locale, setLocaleState] = useState(initialLocale);

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
    if (!LOCALE_CODES.includes(next)) return;
    setLocaleState(next);
    const { pathname, search, hash } = window.location;
    const swapped = /^\/(en|es)(?=\/|$)/.test(pathname)
      ? pathname.replace(/^\/(en|es)(?=\/|$)/, `/${next}`)
      : `/${next}${pathname === '/' ? '' : pathname}`;
    history.replaceState(history.state, '', swapped + search + hash);
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
