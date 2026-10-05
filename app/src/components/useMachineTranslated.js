import { useEffect, useState } from 'react';

// Google Translate (and Chrome's built-in translate) mark the root element
// with one of these while a translation is showing.
const MARKERS = ['translated-ltr', 'translated-rtl'];

const check = () =>
  typeof document !== 'undefined' &&
  MARKERS.some((c) => document.documentElement.classList.contains(c));

/**
 * True while the browser is machine-translating the page.
 *
 * Anything that splits a sentence into one element per word has to know this:
 * the translator works sentence by sentence across inline elements, and a
 * sentence cut into fifteen spans comes back as fifteen separately translated
 * words in the wrong order.
 */
export default function useMachineTranslated() {
  const [translated, setTranslated] = useState(check);

  useEffect(() => {
    const observer = new MutationObserver(() => setTranslated(check()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return translated;
}
