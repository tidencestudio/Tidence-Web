import WaveLogo from './WaveLogo';

// SERVICES and INFO have no section to point at yet, so they render as
// plain labels rather than links that go nowhere.
const links = [
  ['SERVICES', null],
  ['WORK', '#work'],
  ['INFO', null],
  ['CONTACT', '#contact'],
];

export default function Nav({ textColor = '#F5F8F7' }) {
  return (
    <>
      <div className="hero-brand">
        <WaveLogo color="#2E8B93" />
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: 0.5,
            color: textColor,
          }}
        >
          TIDENCE
        </span>
      </div>

      <div className="hero-navlinks">
        {links.map(([label, href]) => {
          const color = label === 'CONTACT' ? textColor : `${textColor}bf`;
          return href ? (
            <a key={label} href={href} style={{ color }}>
              {label}
            </a>
          ) : (
            <span key={label} style={{ color }}>
              {label}
            </span>
          );
        })}
      </div>
    </>
  );
}
