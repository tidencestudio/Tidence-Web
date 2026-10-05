import { useEffect, useRef } from 'react';

const MAX_DPR = 2;
const TAU = Math.PI * 2;

/**
 * SonarGrid: the page background. A dot field that sends out expanding rings,
 * on a timer and wherever the reader clicks or taps.
 *
 * Ported from the 21st.dev SonarGrid component to plain JSX for this project
 * (no TypeScript, no Tailwind) and adapted from a section background to a
 * page one: the canvas is fixed to the viewport behind all content, and clicks
 * are heard on the window, because content covers the canvas everywhere.
 *
 * Draws in `--accent`. It idles between
 * pings, stops in hidden tabs, and under reduced motion renders the still grid
 * and nothing else. Purely decorative and hidden from assistive tech.
 */
export default function SonarGrid({
  spacing = 26,
  dotRadius = 1.4,
  baseOpacity = 0.2,
  pingEvery = 3.2,
  speed = 260,
  ringWidth = 90,
  amplitude = 1.7,
  interactive = true,
  maxRings = 6,
  seedPing = true,
  pingArea = [0.15, 0.2, 0.85, 0.8],
}) {
  const canvasRef = useRef(null);

  // The loop reads props through this ref, so it never has to restart. Synced
  // in an effect rather than during render.
  const opts = useRef(null);
  const next = {
    spacing,
    dotRadius,
    baseOpacity,
    pingEvery,
    speed,
    ringWidth,
    amplitude,
    interactive,
    maxRings,
    seedPing,
    pingArea,
  };
  if (opts.current === null) opts.current = next;
  useEffect(() => {
    opts.current = next;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rings = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let timer = 0;
    let seeded = false;
    let fill = '';
    let nextPing = performance.now() + opts.current.pingEvery * 1000;

    const readColor = () => {
      fill = getComputedStyle(canvas).color;
    };

    const addRing = (x, y, born) => {
      rings.push({ x, y, born });
      while (rings.length > opts.current.maxRings) rings.shift();
    };

    const draw = (now) => {
      const o = opts.current;
      // Seconds until a ring has travelled off the canvas.
      const lifetime = (Math.hypot(width, height) + o.ringWidth) / o.speed;
      rings = rings.filter((r) => (now - r.born) / 1000 < lifetime);
      const live = rings.map((r) => {
        const age = (now - r.born) / 1000;
        const radius = age * o.speed;
        return { x: r.x, y: r.y, radius, reach: radius + o.ringWidth, fade: 1 - age / lifetime };
      });

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fill;

      const cols = Math.ceil(width / o.spacing) + 1;
      const rows = Math.ceil(height / o.spacing) + 1;
      const offsetX = (width - (cols - 1) * o.spacing) / 2;
      const offsetY = (height - (rows - 1) * o.spacing) / 2;

      // Pass 1: every resting dot in a single path and a single fill.
      const hot = [];
      ctx.globalAlpha = o.baseOpacity;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        const cx = offsetX + i * o.spacing;
        for (let j = 0; j < rows; j++) {
          const cy = offsetY + j * o.spacing;
          let energy = 0;
          for (const r of live) {
            if (Math.abs(cx - r.x) > r.reach || Math.abs(cy - r.y) > r.reach) continue;
            const dist = Math.abs(Math.hypot(cx - r.x, cy - r.y) - r.radius);
            if (dist >= o.ringWidth) continue;
            const t = 1 - dist / o.ringWidth;
            const k = t * t * (3 - 2 * t) * r.fade; // smoothstep, fading with age
            if (k > energy) energy = k;
          }
          if (energy < 0.01) {
            ctx.moveTo(cx + o.dotRadius, cy);
            ctx.arc(cx, cy, o.dotRadius, 0, TAU);
          } else {
            hot.push(cx, cy, energy);
          }
        }
      }
      ctx.fill();

      // Pass 2: only the dots on a wavefront get their own alpha and radius.
      for (let k = 0; k < hot.length; k += 3) {
        const energy = hot[k + 2];
        ctx.globalAlpha = o.baseOpacity + (1 - o.baseOpacity) * energy;
        ctx.beginPath();
        ctx.arc(hot[k], hot[k + 1], o.dotRadius * (1 + o.amplitude * energy), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!seeded) {
        // One ring already mid-expansion, so the first paint shows the idea.
        seeded = true;
        const [x0, y0, x1, y1] = opts.current.pingArea;
        if (opts.current.seedPing && !reduceMotion.matches) {
          addRing(width * (x0 + (x1 - x0) * 0.68), height * (y0 + (y1 - y0) * 0.34), performance.now() - 500);
        }
      }
      draw(performance.now());
    };

    const scheduleIdle = (delay) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => tick(performance.now()), Math.max(16, delay));
    };

    const tick = (now) => {
      raf = 0;
      if (document.hidden) return;
      if (reduceMotion.matches) {
        rings = [];
        draw(now);
        return;
      }
      const o = opts.current;
      if (o.pingEvery > 0 && now >= nextPing) {
        const [x0, y0, x1, y1] = o.pingArea;
        addRing(width * (x0 + Math.random() * (x1 - x0)), height * (y0 + Math.random() * (y1 - y0)), now);
        nextPing = now + o.pingEvery * 1000;
      }
      draw(now);
      if (rings.length > 0) raf = requestAnimationFrame(tick);
      else if (o.pingEvery > 0) scheduleIdle(nextPing - now);
    };

    const wake = () => {
      if (!raf) {
        window.clearTimeout(timer);
        raf = requestAnimationFrame(tick);
      }
    };

    const onDown = (e) => {
      if (!opts.current.interactive || reduceMotion.matches) return;
      addRing(e.clientX, e.clientY, performance.now());
      wake();
    };

    const onVisibility = () => {
      if (!document.hidden) wake();
    };

    readColor();
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', wake);
    wake();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', wake);
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  return <canvas ref={canvasRef} className="sonar" aria-hidden="true" />;
}
