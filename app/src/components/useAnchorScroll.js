import { useEffect } from 'react';
import smoothScrollTo from './smoothScroll';

/**
 * Turns every in-page section link into a smooth scroll that leaves the URL
 * alone, so the address bar never picks up a `#section`.
 *
 * One delegated listener instead of an onClick per link: it covers the nav,
 * hero, footer, skip link and the legal pages' contents, plus anything added
 * later. `#id` links, and `/#id` links when already on that page, are taken
 * over; links to another page are left to the browser.
 */
export default function useAnchorScroll() {
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest?.('a[href*="#"]');
      if (!link || link.target === '_blank') return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      if (!id || !document.getElementById(id)) return;

      event.preventDefault();
      smoothScrollTo(id);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
