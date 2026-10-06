import { useEffect, useState } from 'react';

// Every element whose animation is driven by the hero's scroll progress. The
// nav is included even though it lives outside the hero: it has to arrive in
// lockstep with the copy.
const TARGETS = [
  '.nav',
  '.expand-media',
  '.expand-scrim',
  '.expand-brand',
  '.expand-title',
  '.expand-line-a',
  '.expand-line-b',
  '.expand-reveal',
  '.expand-cue',
  '.hero-veil',
];

// Phones get a static opening instead of the scroll sequence: the expanding
// window costs most of the first screen's scroll on a small display, and the
// reader has to work through it before reaching anything.
const SEQUENCE = '(min-width: 761px)';

const DURATION = 1000; // Nominal; currentTime is the only thing that moves.

/**
 * Drives the hero animations from the track's scroll progress.
 *
 * CSS scroll-driven animations (`animation-timeline`, `view()`) are Chromium
 * only. Firefox keeps them behind a flag, so the entire effect silently did not
 * exist there and the hero rendered finished. Rather than ship one hero to
 * Chrome and a different one to everyone else, every browser takes this path.
 *
 * The animations are declared paused in CSS; this writes `currentTime` on them.
 * That keeps one set of keyframes as the single description of the motion, and
 * leaves the interpolation to the compositor rather than recomputing styles in
 * JS. The loop runs only while the track is on screen, which is the top of the
 * page and nowhere else.
 */
export default function useScrollScrub() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(SEQUENCE);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!wide) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const track = document.querySelector('.expand-track');
    if (!track || typeof track.getAnimations !== 'function') return;

    const root = document.documentElement;
    root.classList.add('scrub');

    let animations = [];
    let complete = false;
    let frame = 0;
    let running = false;

    // Re-collect until every target has an animation.
    //
    // Caching on the first non-empty result is not enough: the elements do not
    // all get their animations in the same style pass, so an early collect can
    // return the hero's and miss the nav's, and the nav then never receives a
    // progress value at all.
    const collect = () => {
      const found = [];
      let missing = false;

      for (const selector of TARGETS) {
        const el = document.querySelector(selector);
        // Optional targets (the dither veil only exists in one media mode)
        // are skipped when absent rather than counted as missing forever.
        if (!el) continue;
        const own = el.getAnimations();
        if (own.length === 0) missing = true;
        found.push(...own);
      }

      animations = found;
      complete = !missing;
    };

    // Write the current progress once. No scheduling: this has to be callable
    // from outside the loop, because the loop does not always run.
    const apply = () => {
      // One layout read and no writes before it, so nothing thrashes.
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 1;

      if (!complete) collect();
      for (const animation of animations) animation.currentTime = progress * DURATION;
    };

    const tick = () => {
      apply();
      frame = running ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      // Leave the final state written rather than whatever the last frame
      // happened to catch.
      apply();
    };

    // Deep links land past the hero, where the track never intersects and the
    // loop would therefore never run: without this the nav and the hero copy
    // stay frozen on their hidden first frame and the page arrives with no
    // navigation at all. Two frames, so the animations exist to be written to.
    const primed = requestAnimationFrame(() => requestAnimationFrame(apply));

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '0px' }
    );
    observer.observe(track);

    return () => {
      cancelAnimationFrame(primed);
      observer.disconnect();
      stop();
      root.classList.remove('scrub');
    };
  }, [wide]);
}
