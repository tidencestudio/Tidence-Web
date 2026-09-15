import Nav from './Nav';

export default function Hero() {
  return (
    <div
      className="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: '#F5F8F7',
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 42%, rgba(0,0,0,0) 62%), url('/wave-sunset.jpg') center/cover no-repeat",
      }}
    >
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
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 'clamp(32px, 7vw, 52px)',
            lineHeight: 1.08,
            letterSpacing: -1,
            margin: '0 0 6px',
          }}
        >
          Web design and
          <br />
          development for
          <br />
          businesses that grow.
        </h1>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 'clamp(32px, 7vw, 52px)',
            color: '#2E8B93',
            letterSpacing: -1,
            margin: '0 0 24px',
          }}
        >
          Without borders.
        </div>
        <a
          href="#work"
          style={{
            fontSize: 13,
            letterSpacing: 0.5,
            color: '#F5F8F7',
            borderBottom: '1px solid #2E8B93',
            paddingBottom: 2,
            textDecoration: 'none',
          }}
        >
          See our work →
        </a>
      </div>
    </div>
  );
}
