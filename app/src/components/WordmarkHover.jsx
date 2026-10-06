import { useEffect, useRef } from 'react';

/**
 * Oversized outlined wordmark. The stroke draws itself once when it scrolls
 * into view, and a soft reveal follows the cursor across it.
 *
 * Ported from a version that held the cursor position in React state, which
 * re-renders the tree on every mousemove. The gradient centre is written
 * straight to the SVG node inside one rAF instead, so the pointer never
 * touches React at all.
 *
 * The reveal is decorative and pointer-only. On a touch screen, or under
 * reduced motion, the static outline is the whole component.
 */
export default function WordmarkHover({ text = 'tidence' }) {
  const svgRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add('is-drawn');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const mask = maskRef.current;
    if (!svg || !mask) return;

    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || calm.matches) return;

    let frame = 0;
    let pending = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // The viewBox is 300x100, so pointer position maps into user units.
      mask.setAttribute('cx', `${((pending.x - rect.left) / rect.width) * 300}`);
      mask.setAttribute('cy', `${((pending.y - rect.top) / rect.height) * 100}`);
    };

    const onMove = (event) => {
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onEnter = () => svg.classList.add('is-lit');
    const onLeave = () => svg.classList.remove('is-lit');

    svg.addEventListener('pointermove', onMove);
    svg.addEventListener('pointerenter', onEnter);
    svg.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      svg.removeEventListener('pointermove', onMove);
      svg.removeEventListener('pointerenter', onEnter);
      svg.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="wordmark"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={text}
    >
      <defs>
        {/* The brand ramp: deep sea-green through teal to mint, the same
            run of colour as the mark. */}
        {/* Stop colours are set in CSS, not as attributes: a presentation
            attribute is not a CSS declaration, so var() never resolves there
            and the stops silently fall back to black. */}
        <linearGradient id="wordmark-ramp" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
          <stop className="ramp-0" offset="0%" />
          <stop className="ramp-1" offset="45%" />
          <stop className="ramp-2" offset="100%" />
        </linearGradient>

        <radialGradient id="wordmark-reveal" ref={maskRef} gradientUnits="userSpaceOnUse" r="34" cx="150" cy="50">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>

        <mask id="wordmark-mask">
          <rect x="0" y="0" width="300" height="100" fill="url(#wordmark-reveal)" />
        </mask>
      </defs>

      {/* The letterforms are stroke-only, and an unfilled glyph has no hit
          area, so pointermove would never fire over the word itself. This
          transparent plate gives the whole box one. */}
      <rect x="0" y="0" width="300" height="100" fill="transparent" pointerEvents="all" />

      {/* The base outline: always present, and the only layer a touch screen
          or a reduced-motion reader ever sees. */}
      <text className="wordmark-base" x="50%" y="52%" textAnchor="middle" dominantBaseline="middle">
        {text}
      </text>

      {/* The lit layer, clipped to whatever the cursor is near. */}
      <text
        className="wordmark-lit"
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        mask="url(#wordmark-mask)"
        aria-hidden="true"
      >
        {text}
      </text>
    </svg>
  );
}
