// Native `scroll-behavior: smooth` gives the browser the duration, and over a
// long distance (the hero track alone is ~280vh) Chrome compresses it into a
// near-jump. This drives the scroll itself, with a duration that grows with
// the distance and an ease that settles rather than stops.

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let cancelCurrent = null;

/**
 * Scrolls to the element with `id`, clearing the sticky nav the same way the
 * CSS `scroll-padding-top` does. Any wheel, touch or key input from the reader
 * cancels it on the spot: they are never fighting the page for the scroll.
 */
export default function smoothScrollTo(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + start - offset;
  const distance = end - start;

  const settle = () => {
    // Hand focus to the section for keyboard and screen-reader users, without
    // a second jump. The URL is left alone: the address bar stays the plain
    // page address however the reader moves around it.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance) < 2) {
    window.scrollTo({ top: end, behavior: 'instant' });
    settle();
    return;
  }

  cancelCurrent?.();

  // About 0.9s from the hero's button, up to 1.8s for the longest jumps.
  const duration = Math.min(1800, Math.max(900, Math.abs(distance) * 0.5));
  let frame = 0;
  let begun = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
    cancelCurrent = null;
  };

  const step = (now) => {
    if (!begun) begun = now;
    const t = Math.min(1, (now - begun) / duration);
    window.scrollTo({ top: start + distance * ease(t), behavior: 'instant' });
    if (t < 1) frame = requestAnimationFrame(step);
    else {
      stop();
      settle();
    }
  };

  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('keydown', stop);
  cancelCurrent = stop;
  frame = requestAnimationFrame(step);
}
