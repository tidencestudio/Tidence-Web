import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import StoryThread from './StoryThread';
import Reveal from './Reveal';
import { useT } from '../prefs/hooks';

/* Names, tech tags and URLs are proper nouns and stay untranslated. Only the
   kind label and the description come from the dictionary.

   TODO: replace the `shot` values with real screenshots of each project.
   Seeded placeholders stand in until those exist. */
const projects = [
  {
    key: 'birdie',
    name: 'Birdie',
    tags: ['React', 'TypeScript', 'Canvas', 'Redis'],
    live: 'https://playbirdie.vercel.app/',
    repo: 'https://github.com/alexrosstrabajo-design/pajarito',
    by: 'Alexander',
    span: 'wide',
    shot: 'https://picsum.photos/seed/tidence-birdie-arcade/1200/760',
  },
  {
    key: 'textnode',
    name: 'TextNode',
    tags: ['React', 'JavaScript'],
    live: 'https://text-node.vercel.app/',
    repo: 'https://github.com/alexrosstrabajo-design/TextNode',
    by: 'Alexander',
    span: 'narrow',
    shot: 'https://picsum.photos/seed/tidence-textnode-notes/760/900',
  },
  {
    key: 'automator',
    name: 'Automator AI',
    tags: ['React', 'Three.js', 'OpenAI', 'Tailwind'],
    live: 'https://agoar.vercel.app/',
    repo: 'https://github.com/alexrosstrabajo-design/ai-chat',
    by: 'Alexander',
    span: 'half',
    shot: 'https://picsum.photos/seed/tidence-automator-ai/900/700',
  },
  {
    key: 'attendance',
    name: 'Student Attendance System',
    tags: ['Node.js', 'React', 'PostgreSQL'],
    repo: 'https://github.com/Bryan-De-Jesus-Mejia',
    by: 'Bryan',
    span: 'half',
    shot: 'https://picsum.photos/seed/tidence-attendance-platform/900/700',
  },
  {
    key: 'ecobot',
    name: 'EcoBot',
    tags: ['Python', 'discord.py'],
    repo: 'https://github.com/Bryan-De-Jesus-Mejia',
    by: 'Bryan',
    span: 'narrow',
    shot: 'https://picsum.photos/seed/tidence-ecobot-discord/760/900',
  },
  {
    key: 'currency',
    name: 'Currency Exchange System',
    tags: ['C#', 'WinForms', 'API'],
    repo: 'https://github.com/Bryan-De-Jesus-Mejia',
    by: 'Bryan',
    span: 'wide',
    shot: 'https://picsum.photos/seed/tidence-currency-desktop/1200/760',
  },
];

/**
 * Asymmetric portfolio grid on a six-column track. Spans are 4+2, 3+3, 2+4,
 * so the six projects fill exactly six cells with no blanks and no row that
 * repeats the one above it.
 */
export default function Work() {
  const t = useT();

  return (
    <section className="section work" id="work">
      <div className="container">
          <StoryThread />
        <Reveal>
          <h2 className="work-head">{t('work.title')}</h2>
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal
              as="article"
              key={p.key}
              delay={(i % 2) * 90}
              className={`project is-${p.span}`}
            >
              <div className="project-shot">
                <img
                  src={p.shot}
                  alt={t('work.shotAlt').replace('{name}', p.name)}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  width="1200"
                  height="760"
                />
              </div>

              <div className="project-body">
                <p className="project-kind">{t(`work.projects.${p.key}.kind`)}</p>
                <h3>{p.name}</h3>
                <p className="project-text">{t(`work.projects.${p.key}.text`)}</p>

                <ul className="tags">
                  {p.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <div className="project-foot">
                  {p.live && (
                    <a className="link" href={p.live} target="_blank" rel="noreferrer noopener">
                      {t('work.live')}
                      <ArrowUpRight size={13} weight="regular" aria-hidden="true" />
                      <span className="sr-only">{t('meta.openOutside')}</span>
                    </a>
                  )}
                  <a className="link" href={p.repo} target="_blank" rel="noreferrer noopener">
                    <GithubLogo size={14} weight="regular" aria-hidden="true" />
                    {t('work.source')}
                    <span className="sr-only">{t('meta.openOutside')}</span>
                  </a>
                  <span className="project-by">{p.by}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
