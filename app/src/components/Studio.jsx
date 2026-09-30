import { ArrowUpRight } from '@phosphor-icons/react';
import StoryThread from './StoryThread';
import Reveal from './Reveal';
import { useT } from '../prefs/hooks';

/* TODO: swap the monogram tiles for real photographs of Alexander and Bryan.
   Stock portraits of real, named people would misrepresent them, so the
   typographic mark stands in until real photos exist. */
const people = [
  {
    key: 'alexander',
    initials: 'AR',
    name: 'Alexander Ross',
    role: 'founder',
    focus: ['React', 'Vite', 'Python', 'PostgreSQL', 'Linux'],
    links: [
      ['site', 'alexanderross.vercel.app', 'https://alexanderross.vercel.app'],
      ['email', 'alexrosstrabajo@gmail.com', 'mailto:alexrosstrabajo@gmail.com'],
      ['github', 'alexrosstrabajo-design', 'https://github.com/alexrosstrabajo-design'],
    ],
  },
  {
    key: 'bryan',
    initials: 'BD',
    name: 'Bryan De Jesus',
    role: 'cofounder',
    focus: ['Python', 'Node.js', 'REST', 'PostgreSQL', 'Docker'],
    links: [
      ['site', 'bryandejesusmejia.dev', 'https://www.bryandejesusmejia.dev/en'],
      ['contact', 'bryandejesusmejia.dev', 'https://www.bryandejesusmejia.dev/en#contact'],
      ['github', 'Bryan-De-Jesus-Mejia', 'https://github.com/Bryan-De-Jesus-Mejia'],
    ],
  },
];

/** Split profile pair. One layout family, used once. */
export default function Studio() {
  const t = useT();

  return (
    <section className="section studio" id="studio">
      <div className="container">
          <StoryThread />
        <Reveal>
          <h2 className="studio-head prewrap">{t('studio.title')}</h2>
        </Reveal>

        <div className="studio-grid">
          {people.map((p, i) => (
            <Reveal as="article" key={p.key} delay={i * 110} className={`person ${i === 1 ? 'reveal-from-right' : 'reveal-from-left'}`}>
              <p className="person-mark" aria-hidden="true">
                {p.initials}
              </p>

              <div className="person-top">
                <h3>{p.name}</h3>
                <p className="person-role">{t(`studio.roles.${p.role}`)}</p>
              </div>

              <p className="person-text">{t(`studio.people.${p.key}.text`)}</p>

              <ul className="tags">
                {p.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <ul className="person-links">
                {p.links.map(([key, value, href]) => (
                  <li key={key + value}>
                    <span className="person-key">{t(`studio.keys.${key}`)}</span>
                    <a
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer noopener"
                    >
                      {value}
                      <ArrowUpRight size={12} weight="regular" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
