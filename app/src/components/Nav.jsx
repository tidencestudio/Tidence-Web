import WaveLogo from './WaveLogo';

const links = ['SERVICES', 'WORK', 'INFO', 'CONTACT'];

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
          left: '50%',
          right: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          letterSpacing: 1,
          zIndex: 2,
        }}
      >
        {links.map((label) => (
          <span
            key={label}
            style={{
              color: label === 'CONTACT' ? textColor : `${textColor}bf`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </>
  );
}
