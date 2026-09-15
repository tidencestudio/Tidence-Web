import Reveal from './Reveal';

const projects = [
  {
    kind: '2D ARCADE GAME',
    name: 'Birdie',
    text: "Drive a little blue bird's taxi — pick up passengers and dodge potholes before the tank runs dry. 22 unlockable hats, a day/night cycle and global leaderboards.",
    tags: ['React', 'TypeScript', 'Canvas', 'Redis'],
    live: 'https://playbirdie.vercel.app/',
    repo: 'https://github.com/alexrosstrabajo-design/pajarito',
    by: 'Alexander',
  },
  {
    kind: 'AI AUTOMATION PLATFORM',
    name: 'Automator AI',
    text: 'A conversational platform wired into Automator, fronted by a 3D interface built with Three.js.',
    tags: ['React', 'Three.js', 'OpenAI', 'Tailwind'],
    live: 'https://agoar.vercel.app/',
    repo: 'https://github.com/alexrosstrabajo-design/ai-chat',
    by: 'Alexander',
  },
  {
    kind: 'NOTE TAKING APP',
    name: 'TextNode',
    text: 'A note-taking app for organising thoughts quickly — clean UI, full CRUD, no ceremony.',
    tags: ['React', 'JavaScript', 'Web App'],
    live: 'https://text-node.vercel.app/',
    repo: 'https://github.com/alexrosstrabajo-design/TextNode',
    by: 'Alexander',
  },
  {
    kind: 'FULLSTACK PLATFORM',
    name: 'Student Attendance System',
    text: 'Attendance management end to end — an Express backend, a React frontend and REST APIs driving real-time reporting.',
    tags: ['Node.js', 'React', 'PostgreSQL', 'REST API'],
    repo: 'https://github.com/Bryan-De-Jesus-Mejia',
    by: 'Bryan',
  },
  {
    kind: 'DESKTOP APPLICATION',
    name: 'Currency Exchange System',
    text: 'Desktop app pulling live exchange rates from an external API, with the business logic handled in C#.',
    tags: ['C#', 'WinForms', 'Guna UI', 'API Integration'],
    repo: 'https://github.com/Bryan-De-Jesus-Mejia',
    by: 'Bryan',
  },
  {
    kind: 'DISCORD BOT',
    name: 'EcoBot',
    text: 'Environmental awareness bot with interactive commands, eco quizzes, green points and custom reminders.',
    tags: ['Python', 'discord.py', 'Async'],
    repo: 'https://github.com/Bryan-De-Jesus-Mejia',
    by: 'Bryan',
  },
];

const linkStyle = {
  fontSize: 11,
  letterSpacing: 1,
  color: 'var(--teal)',
  textDecoration: 'none',
  borderBottom: '1px solid var(--line)',
  paddingBottom: 2,
};

export default function Work() {
  return (
    <section
      id="work"
      style={{ background: 'var(--foam)', padding: '6rem clamp(1.25rem, 5vw, 3rem)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
        <div
          style={{
            fontSize: 13,
            letterSpacing: 1,
            color: 'var(--teal)',
            marginBottom: '0.75rem',
          }}
        >
          WORK
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
          Things we have shipped.
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
          Games, platforms, bots and internal tools — built across the front
          end, the back end and the infrastructure in between.
        </p>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
            <article
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg)',
                padding: '1.75rem',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 1,
                  color: 'var(--teal)',
                  marginBottom: '0.6rem',
                }}
              >
                {p.kind}
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                  fontSize: 23,
                  margin: '0 0 0.6rem',
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'var(--slate)',
                  margin: '0 0 1.25rem',
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
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      letterSpacing: 0.5,
                      color: 'var(--navy)',
                      border: '1px solid var(--line)',
                      padding: '3px 9px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={linkStyle}
                  >
                    LIVE ↗
                  </a>
                )}
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={linkStyle}
                >
                  GITHUB ↗
                </a>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 11,
                    letterSpacing: 0.5,
                    color: 'var(--slate)',
                  }}
                >
                  {p.by}
                </span>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
