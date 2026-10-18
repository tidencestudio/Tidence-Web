import { useCallback, useEffect, useRef } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useT } from '../prefs/hooks';
import { whatsappHref } from '../contact';
import useScrollProgress from './useScrollProgress';
import { REDUCED_MOTION } from './useMedia';

// Where each phase sits in the pinned scroll, 0 to 1 (pin: 150svh, see .hero
// in App.css). The window expansion runs to the very end of the pin, so the
// moment it fills the screen the stage lets go and the section seen through
// it simply carries on scrolling as part of the page.
const PHASES = { cubesEnd: 0.36, expandStart: 0.4, expandEnd: 1 };

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const NAV_H = 76;

// The wordmark as its two halves (they split apart as the window opens).
// FRONT lists the letters, by position in "tidence", that are drawn a second
// time above the cubes, so the anchor reads as woven through the word instead
// of pasted over it: the t in front of the CRM cube, the d in front of the
// anchor's left arm and bar end, the last e in front of the BOTS cube. The
// stem and the rest of the bar stay in front, so the T still reads.
const HALVES = [
  ['hero-word-a', 'tide'],
  ['hero-word-b', 'nce'],
];
const FRONT = new Set([0, 2, 6]);

function Letters({ front = false }) {
  let i = 0;
  return HALVES.map(([cls, text]) => (
    <span key={cls} className={cls}>
      {[...text].map((ch) => {
        const at = i++;
        return (
          <span key={at} className={front && !FRONT.has(at) ? 'is-back' : undefined}>
            {ch}
          </span>
        );
      })}
    </span>
  ));
}
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * The opening, built from the brand banner (brand/whatsapp/banner-3d.html):
 * the wordmark set as large as the screen allows, and the anchor T rebuilt
 * from cubes standing in front of it, with three loose cubes floating around
 * the word.
 *
 * The section is a tall track with a sticky stage. Its pinned scroll runs in
 * two phases (PHASES below):
 *   1. cubes: the mark bursts apart and every cube leaves the screen, while
 *      the text around the word falls away, leaving the wordmark alone;
 *   2. window expansion, after the 21st.dev "scroll expansion hero"
 *      (ScrollExpandMedia): a window opens behind the word at 300 x 400 and
 *      grows to fill the screen, while the word splits in two ("tide" and
 *      "nce") and each half slides off its own side. What shows through the
 *      window is not a picture but the next section itself (the enquiry
 *      form): during the pin it is held still at the top of the screen and
 *      clipped to the window, so its content appears as if behind glass.
 *      When the window fills the screen the clip is lifted and the section
 *      carries on scrolling as ordinary page content.
 * Unlike the original, nothing hijacks the wheel or touch: the phases come
 * from ordinary scroll, so the nav links, keyboard and deep links still work.
 * They go to CSS as --pc and --pm, written straight onto the stage, and the
 * window is written as inline styles on the frame and the section, so React
 * never re-renders while scrolling.
 *
 * Everything but the cubes is plain markup, so the prerendered page shows
 * the word, the line under it and the button before any script runs. The 3D layer
 * is a separate chunk loaded after mount.
 */
export default function Hero() {
  const t = useT();
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const wordRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const progressRef = useRef(0);
  const lastCubes = useRef(-1);
  const frameRef = useRef(null);

  // The window: the next section, held at the top of the screen while the
  // stage is pinned and clipped to a rectangle that grows from 300 x 400
  // (centred under the bar) to the whole screen. The frame in the stage draws
  // its outline just outside that rectangle.
  const windowTo = useCallback((pm) => {
    const track = trackRef.current;
    const next = track?.nextElementSibling;
    const frame = frameRef.current;
    if (!track?.classList.contains('is-staged') || !next || !frame) return;

    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    // How far the section's own position is below the top of the screen:
    // it sits right after the pin, so this reaches 0 as the pin ends.
    const lift = Math.min(0, vh - track.getBoundingClientRect().bottom);
    next.style.transform = lift ? `translate3d(0, ${lift.toFixed(1)}px, 0)` : '';

    if (pm <= 0) {
      next.style.visibility = 'hidden';
      frame.style.opacity = '0';
      return;
    }
    next.style.visibility = '';

    if (pm >= 1) {
      next.style.clipPath = '';
      frame.style.opacity = '0';
      return;
    }

    const w = lerp(Math.min(300, vw * 0.7), vw, pm);
    const h = lerp(400, vh, pm);
    const top = lerp(NAV_H / 2 + vh / 2, vh / 2, pm) - h / 2;
    const left = (vw - w) / 2;
    const below = next.offsetHeight - top - h;
    next.style.clipPath = `inset(${top.toFixed(1)}px ${left.toFixed(1)}px ${below.toFixed(1)}px ${left.toFixed(1)}px)`;
    Object.assign(frame.style, {
      opacity: '1',
      left: `${left.toFixed(1)}px`,
      top: `${top.toFixed(1)}px`,
      width: `${w.toFixed(1)}px`,
      height: `${h.toFixed(1)}px`,
    });
  }, []);

  // Called every frame while the hero is on screen.
  const onProgress = useCallback((p) => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia(REDUCED_MOTION).matches) return;

    const pc = clamp01(p / PHASES.cubesEnd);
    // Linear, like the original: the card grows in step with the scroll.
    const pm = clamp01((p - PHASES.expandStart) / (PHASES.expandEnd - PHASES.expandStart));
    stage.style.setProperty('--pc', pc.toFixed(4));
    stage.style.setProperty('--pm', pm.toFixed(4));
    windowTo(pm);

    progressRef.current = pc;
    // Once every cube has left, there is nothing more to draw.
    if (pc < 1 || lastCubes.current < 1) sceneRef.current?.render(pc);
    lastCubes.current = pc;
  }, [windowTo]);
  useScrollProgress(trackRef, { mode: 'pin', onProgress });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const word = wordRef.current;
    if (!canvas || !stage || !word) return;

    let alive = true;
    let observer;
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    // Only a scripted, full-motion page stages the window; without it the
    // sections simply follow one another.
    const track = trackRef.current;
    const next = track?.nextElementSibling;
    if (!reduced) track?.classList.add('is-staged');

    const measure = () => {
      const box = stage.getBoundingClientRect();
      const w = word.getBoundingClientRect();
      sceneRef.current?.resize(box.width, box.height, {
        left: w.left - box.left,
        top: w.top - box.top,
        width: w.width,
        height: w.height,
      });
      sceneRef.current?.render(progressRef.current);
    };

    (async () => {
      try {
        // Face labels are drawn into canvases; the mono face has to be ready.
        await document.fonts?.load('500 54px "DM Mono"');
        const { createHeroScene } = await import('./heroScene');
        if (!alive) return;
        sceneRef.current = createHeroScene(canvas, { reduced });
        measure();
        stage.classList.add('has-scene');
        observer = new ResizeObserver(measure);
        observer.observe(stage);
      } catch {
        // No WebGL: the word and the links stand on their own.
      }
    })();

    return () => {
      alive = false;
      track?.classList.remove('is-staged');
      if (next) {
        next.style.transform = '';
        next.style.clipPath = '';
        next.style.visibility = '';
      }
      observer?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <section className="hero" id="top" ref={trackRef}>
      {/* Nav watches this to decide when the bar needs its backdrop. */}
      <div id="nav-sentinel" aria-hidden="true" />

      <div className="hero-stage" ref={stageRef}>
        <div className="hero-orb hero-orb-a" aria-hidden="true" />

        {/* The outline of the window the next section is seen through. */}
        <div className="hero-window" ref={frameRef} aria-hidden="true" />

        {/* The word splits in two as the window grows: "tide", where the name
            comes from, slides off left and "nce" off right. */}
        <h1 className="hero-word">
          <span ref={wordRef} aria-hidden="true" translate="no">
            <Letters />
          </span>
          <span className="sr-only">
            Tidence. {t('hero.lead')} {t('hero.em')} {t('hero.strong')}
          </span>
        </h1>

        <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />

        {/* The same word again, above the cubes, showing only the FRONT
            letters. Same box and type as the word below, so they line up. */}
        <div className="hero-word hero-word-front" aria-hidden="true" translate="no">
          <span>
            <Letters front />
          </span>
        </div>

        <div className="hero-orb hero-orb-b" aria-hidden="true" />
        <div className="hero-orb hero-orb-c" aria-hidden="true" />

        <div className="hero-foot">
          <p className="hero-sub">{t('hero.sub')}</p>
          <a className="btn btn-lg hero-cta" href="#start">
            {t('nav.cta')}
          </a>
        </div>

        <a className="hero-news" href={whatsappHref(t)} target="_blank" rel="noreferrer noopener">
          <i aria-hidden="true" />
          <b>{t('hero.newsTag')}</b>
          <span>{t('hero.news')}</span>
          <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
          <span className="sr-only">{t('meta.openOutside')}</span>
        </a>
      </div>
    </section>
  );
}
