import Nav from './Nav';

export default function Hero() {
  return (
    <div
      className="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: '#F5F8F7',
      }}
    >
      {/* The photo lives on its own layer so it can drift without moving
          the copy on top of it. */}
      <div className="hero-bg" aria-hidden="true" />

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
