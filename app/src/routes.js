// Every page lives under its language: /en, /es, /en/privacy, /es/terms...
// English is the default. The bare / and the old unprefixed /privacy and
// /terms redirect to their /en pages (vercel.json); the dev server, which has
// no redirects, gets the same result from canonicalPath() in App.jsx.

export const LOCALE_CODES = ['en', 'es'];
export const DEFAULT_LOCALE = 'en';
export const DOCS = ['privacy', 'terms'];

const ROUTE = /^(?:\/(en|es))?(?:\/(privacy|terms))?\/?$/;

/** The language and page a path names. Unknown paths get the English home. */
export function parsePath(path = '/') {
  const match = ROUTE.exec(path);
  if (!match) return { locale: DEFAULT_LOCALE, doc: undefined };
  return { locale: match[1] ?? DEFAULT_LOCALE, doc: match[2] };
}

/** The path for a page in a language: pathFor('es', 'terms') is /es/terms. */
export const pathFor = (locale, doc) => `/${locale}${doc ? `/${doc}` : ''}`;

/** The canonical form of a path, with its language prefix and no trailing slash. */
export function canonicalPath(path = '/') {
  const { locale, doc } = parsePath(path);
  return pathFor(locale, doc);
}
