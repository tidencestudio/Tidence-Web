// Source of truth for site copy. Spanish mirrors this shape; anything missing
// there falls back to the string here rather than printing a key.
export default {
  meta: {
    skip: 'Skip to content',
    openOutside: '(opens in a new tab)',
  },

  nav: {
    label: 'Primary',
    work: 'Work',
    studio: 'Studio',
    contact: 'Contact',
    cta: 'Start a project',
    language: 'Language',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
  },

  hero: {
    lead: 'We design and build the web,',
    em: 'end to end',
    sub: 'A two-person studio. You talk to the people writing the code, not to someone relaying messages.',
    cta: 'See the work',
  },

  manifesto: {
    lead: 'Most studios put three people between you and the person writing your code.',
    resolve: 'We put none.',
    support:
      'No project manager relaying requirements. No junior inheriting the build halfway through. The two people you meet are the two people who ship it.',
  },

  capabilities: {
    title: 'Four things,\ndone properly.',
    lead: 'We would rather be good at a short list than available for a long one.',
    items: {
      front: {
        title: 'Front end',
        text: 'React and Vite, built to the design rather than to a template. Responsive, keyboard operable and fast on the phones people actually own.',
      },
      back: {
        title: 'Back end',
        text: 'Node and Python services, REST APIs and the plumbing between them. Written so the next person can read it.',
      },
      data: {
        title: 'Data',
        text: 'PostgreSQL and Redis schemas designed before the first query, so reporting does not become a rewrite six months later.',
      },
      security: {
        title: 'Security',
        text: 'Pentesting on our own work. Auth, session handling and input validation get checked before anything ships.',
      },
    },
  },

  work: {
    title: 'Things we have shipped',
    live: 'Live',
    source: 'Source',
    shotAlt: 'Screenshot of {name}',
    projects: {
      birdie: {
        kind: '2D arcade game',
        text: "Drive a blue bird's taxi. Pick up passengers, dodge potholes, watch the tank. 22 unlockable hats, a day and night cycle, global leaderboards.",
      },
      textnode: {
        kind: 'Note taking app',
        text: 'Notes for people who think faster than they file. Full CRUD, no ceremony.',
      },
      automator: {
        kind: 'AI automation platform',
        text: 'A conversational platform wired into Automator, fronted by a 3D interface built with Three.js.',
      },
      attendance: {
        kind: 'Fullstack platform',
        text: 'Attendance end to end. An Express backend, a React frontend and REST APIs driving reporting in real time.',
      },
      ecobot: {
        kind: 'Discord bot',
        text: 'Environmental awareness bot. Quizzes, green points, custom reminders.',
      },
      currency: {
        kind: 'Desktop application',
        text: 'Live exchange rates pulled from an external API, with the business logic handled in C#.',
      },
    },
  },

  approach: {
    title: 'How we work',
    items: {
      both: {
        k: 'You get both of us',
        v: 'There is no account layer. The person who answers your email is the person editing the file.',
      },
      scope: {
        k: 'Scope before code',
        v: 'We agree what is being built and what is not, in writing, before anything gets committed.',
      },
      ships: {
        k: 'It ships or it does not count',
        v: 'Every project below is live, or its source is public. Nothing here is a mockup.',
      },
    },
  },

  studio: {
    title: 'Two people build all of it.\nYou talk to both.',
    roles: {
      founder: 'Founder',
      cofounder: 'Co-founder',
    },
    keys: {
      site: 'Site',
      email: 'Email',
      github: 'GitHub',
      contact: 'Contact',
    },
    people: {
      alexander: {
        text: 'Front end, database architecture and pentesting. Builds the interface and keeps the security honest.',
      },
      bryan: {
        text: 'Backend systems. APIs and architectures that move data between things and keep moving it under load.',
      },
    },
  },

  contact: {
    title: 'Start a project',
    lead: 'Tell us what you are building. You will hear back from one of us within a day.',
    name: 'Name',
    email: 'Email',
    brief: 'What are you building',
    briefHelp: 'Rough is fine. Scope, timing and budget if you have them.',
    submit: 'Start a project',
    sending: 'Opening mail',
    summary: 'There are {count} fields to fix.',
    doneTitle: 'Your mail client is open',
    doneText: 'We have written the message for you. Send it and we will reply within a day. If nothing opened, write to',
    again: 'Write another',
    subject: 'New project enquiry from {name}',
    errors: {
      name: 'Tell us what to call you.',
      emailMissing: 'We need an address to reply to.',
      emailInvalid: 'That address is missing an @ or a domain.',
      briefMissing: 'A sentence or two is enough to start.',
      briefShort: 'A little more detail helps us answer usefully.',
    },
  },

  footer: {
    sections: 'Sections',
    elsewhere: 'Elsewhere',
    legal: 'Legal',
    github: 'GitHub',
    email: 'Email',
    privacy: 'Privacy',
    terms: 'Terms',
    built: 'Built by the two people listed above',
  },
};
