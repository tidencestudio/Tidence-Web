import SiteEmbed from './SiteEmbed';

const people = [
  {
    name: 'Alexander Ross',
    role: 'FOUNDER',
    site: 'https://alexanderross.vercel.app',
    siteLabel: 'alexanderross.vercel.app',
    text: 'Web development, database architecture and pentesting. Builds the front end and keeps the security honest.',
    focus: ['React', 'Vite', 'Python', 'PostgreSQL', 'Linux'],
    meta: [
      ['BASED', 'Student at ITESA'],
      ['STATUS', 'Available for hire'],
    ],
    links: [
      ['EMAIL', 'alexrosstrabajo@gmail.com', 'mailto:alexrosstrabajo@gmail.com'],
      ['GITHUB', 'alexrosstrabajo-design', 'https://github.com/alexrosstrabajo-design'],
      ['INSTAGRAM', '@alexanderross2312', 'https://instagram.com/alexanderross2312'],
    ],
  },
  {
    name: 'Bryan De Jesus',
    role: 'CO-FOUNDER',
    site: 'https://www.bryandejesusmejia.dev/en',
    siteLabel: 'bryandejesusmejia.dev',
    text: 'Backend developer building robust APIs and server-side systems — scalable architectures that move data and automate workflows.',
    focus: ['Python', 'Node.js', 'REST APIs', 'PostgreSQL', 'Docker'],
    meta: [
      ['BASED', 'National District, DR'],
      ['RESPONSE', 'Under 24 hours'],
    ],
    links: [
      ['GITHUB', 'Bryan-De-Jesus-Mejia', 'https://github.com/Bryan-De-Jesus-Mejia'],
      ['CONTACT', 'bryandejesusmejia.dev', 'https://www.bryandejesusmejia.dev/en#contact'],
    ],
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '6rem clamp(1.25rem, 5vw, 3rem) 7rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: 1,
            color: 'var(--teal)',
            marginBottom: '0.75rem',
          }}
        >
          CONTACT
        </div>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 38,
            letterSpacing: -0.5,
            margin: '0 0 0.75rem',
          }}
        >
          Talk to the people who build it.
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--slate)',
            maxWidth: 560,
            margin: '0 0 3.5rem',
          }}
        >
          No account managers in between — you work directly with the two of us.
          Both sites below are live.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {people.map((p) => (
            <article
              key={p.name}
              style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}
            >
              <SiteEmbed src={p.site} label={p.siteLabel} />

              <div style={{ padding: '1.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 500,
                      fontSize: 25,
                      margin: 0,
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: 1,
                      color: 'var(--teal)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.role}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: 'var(--slate)',
                    margin: '0 0 1.5rem',
                  }}
                >
                  {p.text}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {p.focus.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: 11,
                        letterSpacing: 0.5,
                        border: '1px solid var(--line)',
                        padding: '3px 9px',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '2.5rem',
                    paddingBottom: '1.25rem',
                    marginBottom: '1.25rem',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {p.meta.map(([k, v]) => (
                    <div key={k}>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: 1,
                          color: 'var(--slate)',
                          marginBottom: 4,
                        }}
                      >
                        {k}
                      </div>
                      <div style={{ fontSize: 13 }}>{v}</div>
                    </div>
                  ))}
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  {p.links.map(([k, v, href]) => (
                    <li
                      key={k}
                      style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          letterSpacing: 1,
                          color: 'var(--slate)',
                          width: 74,
                          flexShrink: 0,
                        }}
                      >
                        {k}
                      </span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{
                          fontSize: 13,
                          color: 'var(--navy)',
                          textDecoration: 'none',
                          borderBottom: '1px solid var(--line)',
                          paddingBottom: 1,
                        }}
                      >
                        {v} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
