import { useCallback, useEffect, useRef } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useT } from '../prefs/hooks';
import { whatsappHref } from '../contact';
import useScrollProgress from './useScrollProgress';
import { REDUCED_MOTION } from './useMedia';

// The scroll, measured in screen heights from the top of the page:
//   0    to 0.55  the cubes burst apart and leave the screen
//   0.62 to 1.5   the hole opens, from a dot to the whole screen
// At 1.5 the section behind (the enquiry form) is fully uncovered and starts
// scrolling with the page (the track is sized for that, see sizeTrack).
const CUBES_END = 0.55;
const HOLE_START = 0.62;
const HOLE_END = 1.5;

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// FRONT lists the letters, by position in "tidence", that are drawn a second
// time above the cubes, so the anchor reads as woven through the word instead
// of pasted over it: the t in front of the CRM cube, the d in front of the
// anchor's left arm and bar end, the last e in front of the BOTS cube. The
// stem and the rest of the bar stay in front, so the T still reads.
const WORD = 'tidence';
const FRONT = new Set([0, 2, 6]);

function Letters({ front = false }) {
  return [...WORD].map((ch, at) => (
    <span key={at} className={front && !FRONT.has(at) ? 'is-back' : undefined}>
      {ch}
    </span>
  ));
}

/**
 * The opening, built from the brand banner (brand/whatsapp/banner-3d.html):
 * the wordmark set as large as the screen allows, and the anchor T rebuilt
 * from cubes standing in front of it, with three loose cubes floating around
 * the word.
 *
 * The hero is a screen laid over the next section (the enquiry form). Both
 * sit in one wrapper (.opening, App.jsx): the hero's stage is sticky, and the
 * form section is sticky right behind it, so the browser itself holds both
 * still while the page scrolls. Nothing is moved by script, so nothing can
 * lag the scroll and shake.
 *
 * Scrolling first sends the cubes off the screen, then punches a hole in the
 * middle of the hero, like a bullet hole in a sheet, and widens it until the
 * form behind is fully uncovered. The hole starts as a dot and grows slowly
 * at first, then faster (it eases in). The only thing written per frame is
 * its radius, as --hole on the stage, which the stage's CSS mask reads.
 *
 * Everything but the cubes is plain markup, so the prerendered page shows
 * the word, the line under it and the button before any script runs. The 3D
 * layer is a separate chunk loaded after mount.
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

  // Called every frame while the hero is on screen. p is progress through the
  // pinned part of the track; turn it back into pixels scrolled.
  const onProgress = useCallback((p) => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track || window.matchMedia(REDUCED_MOTION).matches) return;

    const vh = window.innerHeight;
    const scrolled = p * Math.max(0, track.offsetHeight - vh);
    const screens = scrolled / vh;

    const pc = clamp01(screens / CUBES_END);
    stage.style.setProperty('--pc', pc.toFixed(4));

    if (track.parentElement?.classList.contains('is-staged')) {
      const ph = clamp01((screens - HOLE_START) / (HOLE_END - HOLE_START));
      if (ph > 0) {
        // Ease in: a dot first, then quicker. Past the corners at the end.
        const max = Math.hypot(stage.clientWidth / 2, stage.clientHeight / 2) + 4;
        stage.style.setProperty('--hole', `${(max * ph * ph).toFixed(1)}px`);
        stage.classList.add('is-holed');
      } else {
        stage.classList.remove('is-holed');
      }
    }

    progressRef.current = pc;
    // Once every cube has left, there is nothing more to draw.
    if (pc < 1 || lastCubes.current < 1) sceneRef.current?.render(pc);
    lastCubes.current = pc;
  }, []);
  useScrollProgress(trackRef, { mode: 'pin', onProgress });

  // Stage the opening: the track is as tall as the section behind plus the
  // scroll the hero needs, and that section is pulled up to sit behind the
  // stage from the top. A negative margin takes the section out of the flow's
  // height, so the spacer after it gives the scroll back; a margin on the
  // section itself would stop it from sticking. Recomputed on any resize.
  useEffect(() => {
    const track = trackRef.current;
    const opening = track?.parentElement;
    const behind = track?.nextElementSibling;
    const spacer = behind?.nextElementSibling;
    if (!track || !opening || !behind || !spacer) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const sizeTrack = () => {
      const vh = window.innerHeight;
      const room = Math.round(HOLE_END * vh);
      const height = behind.offsetHeight + room;
      track.style.height = `${height}px`;
      behind.style.marginTop = `${-height}px`;
      spacer.style.height = `${room}px`;
    };

    opening.classList.add('is-staged');
    sizeTrack();
    const observer = new ResizeObserver(sizeTrack);
    observer.observe(behind);
    window.addEventListener('resize', sizeTrack);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sizeTrack);
      opening.classList.remove('is-staged');
      track.style.height = '';
      behind.style.marginTop = '';
      spacer.style.height = '';
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const word = wordRef.current;
    if (!canvas || !stage || !word) return;

    let alive = true;
    let observer;
    const reduced = window.matchMedia(REDUCED_MOTION).matches;

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
