import { useSyncExternalStore } from 'react';

// Google Translate (and Chrome's built-in translate) mark the root element
// with one of these while a translation is showing.
const MARKERS = ['translated-ltr', 'translated-rtl'];

const check = () => MARKERS.some((c) => document.documentElement.classList.contains(c));

const subscribe = (notify) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

/**
 * True while the browser is machine-translating the page.
 *
 * Anything that splits a sentence into one element per word has to know this:
 * the translator works sentence by sentence across inline elements, and a
 * sentence cut into fifteen spans comes back as fifteen separately translated
 * words in the wrong order.
 *
 * The server snapshot is false, so a prerendered page hydrates cleanly.
 */
export default function useMachineTranslated() {
  return useSyncExternalStore(subscribe, check, () => false);
}
