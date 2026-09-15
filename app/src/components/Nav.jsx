import WaveLogo from './WaveLogo';

const links = [
  ['WORK', '#work'],
  ['CONTACT', '#contact'],
];

export default function Nav({ textColor = '#F5F8F7' }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 2,
        }}
      >
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

      <div
        style={{
          position: 'absolute',
          top: '2.15rem',
          right: '3rem',
          display: 'flex',
          gap: '2.5rem',
          fontSize: 12,
          letterSpacing: 1,
          zIndex: 2,
        }}
      >
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            style={{
              color: label === 'CONTACT' ? textColor : `${textColor}bf`,
              textDecoration: 'none',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
