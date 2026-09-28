/**
 * Live preview of an external site. The iframe is laid out at 250% of the
 * container and scaled to 0.4, so it always renders at a desktop-width
 * viewport regardless of how wide the card ends up. It is inert — an overlay
 * link takes the click so the page never traps scrolling inside the frame.
 */
export default function SiteEmbed({ src, label, height = 340 }) {
  return (
    <div
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        background: 'var(--navy)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <iframe
        src={src}
        title={label}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: '250%',
          height: '250%',
          border: 0,
          transform: 'scale(0.4)',
          transformOrigin: '0 0',
          pointerEvents: 'none',
        }}
      />
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${label} in a new tab`}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: '0.85rem 1rem',
          fontSize: 11,
          letterSpacing: 1,
          color: 'var(--foam)',
          textDecoration: 'none',
          background:
            'linear-gradient(to top, rgba(18,50,64,0.72) 0%, rgba(18,50,64,0) 45%)',
        }}
      >
        VISIT SITE ↗
      </a>
    </div>
  );
}
