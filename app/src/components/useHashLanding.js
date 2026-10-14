import { useEffect } from 'react';

// The landing is corrected a few times over roughly half a second. Images and
// webfonts settle after first paint and change the height of everything above
// the target, so a single jump lands short or long.
const CORRECTIONS = [0, 120, 320, 600];

/**
 * Scrolls to the element named by the URL hash once React has rendered it.
 *
 * The browser resolves a hash at parse time, when the root element is still
 * empty, so a shared deep link such as /#process otherwise lands at the top of
 * the page.
 */
export default function useHashLanding() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    const timers = [];
    let frame = 0;

    // 'instant' rather than 'auto': `auto` defers to the computed
    // scroll-behavior, which is smooth here, and a smooth landing scroll
    // races the layout still settling above the target.
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });

    const schedule = () => {
      CORRECTIONS.forEach((delay) => timers.push(window.setTimeout(jump, delay)));
    };

    frame = requestAnimationFrame(() => requestAnimationFrame(jump));

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    // Webfont swap reflows every heading on the page, which moves the target
    // again after `load` has already fired.
    document.fonts?.ready.then(jump).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.removeEventListener('load', schedule);
    };
  }, []);
}
