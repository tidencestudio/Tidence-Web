import { useRef } from 'react';
import Nav from './Nav';
import useScrollEffect from './useScrollEffect';

export default function Hero() {
  const parallaxRef = useRef(null);

  useScrollEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    // Only the first viewport of scroll matters — past that the hero is gone.
    const travel = Math.min(window.scrollY, window.innerHeight) * 0.22;
    el.style.transform = `translate3d(0, ${travel.toFixed(1)}px, 0)`;
  });

  return (
    <div
      className="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: '#F5F8F7',
      }}
    >
      {/* The photo sits on its own layers so it can move without taking the
          copy with it: the outer one is driven by scroll for parallax, the
          inner one carries the slow idle drift. */}
      <div className="hero-parallax" ref={parallaxRef} aria-hidden="true">
        <div className="hero-bg" />
      </div>

      <Nav />

      <div
        style={{
          position: 'absolute',
          left: 'clamp(1.25rem, 5vw, 3rem)',
          right: 'clamp(1.25rem, 5vw, 3rem)',
          bottom: '4rem',
          maxWidth: 520,
          zIndex: 2,
        }}
      >
        <h1
          className="hero-enter"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 'clamp(32px, 7vw, 52px)',
            lineHeight: 1.08,
            letterSpacing: -1,
            margin: '0 0 6px',
            animationDelay: '0.1s',
          }}
        >
          Web design and
          <br />
          development for
          <br />
          businesses that grow.
        </h1>
        <div
          className="hero-enter"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 'clamp(32px, 7vw, 52px)',
            color: '#2E8B93',
            letterSpacing: -1,
            margin: '0 0 24px',
            animationDelay: '0.25s',
          }}
        >
          Without borders.
        </div>
        <a
          href="#work"
          className="hero-enter cta"
          style={{
            display: 'inline-block',
            fontSize: 13,
            letterSpacing: 0.5,
            color: '#F5F8F7',
            borderBottom: '1px solid #2E8B93',
            paddingBottom: 2,
            textDecoration: 'none',
            animationDelay: '0.4s',
          }}
        >
          See our work <span className="cta-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
