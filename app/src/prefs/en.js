// Source of truth for site copy. Spanish mirrors this shape; anything missing
// there falls back to the string here rather than printing a key.
import legal from './legal.en';

export default {
  meta: {
    title: 'Tidence — Websites, CRMs and business automation',
    description:
      'Tidence is a digital studio building websites, CRMs, office automation and the everyday tools a business runs on.',
    skip: 'Skip to content',
    openOutside: '(opens in a new tab)',
  },

  nav: {
    label: 'Primary',
    build: 'What we build',
    journey: 'Process',
    story: 'Journal',
    contact: 'Contact',
    cta: 'Start a project',
    language: 'Language',
  },

  hero: {
    eyebrow: 'Websites · CRMs · Automation',
    lead: 'We build the tools',
    em: 'your business runs on',
    sub: 'Websites, CRMs and the automations that quietly run your office. Designed, built and looked after by one team, start to finish.',
    badgeChip: 'Open',
    badge: 'Taking on new projects',
    ctaEmail: 'Email us about a project',
    ctaMore: 'See how we work',
    readout: 'Tide',
    tilesLabel: 'Quick links',
    tileEmail: 'Email the studio',
    tileWork: 'What we build',
  },

  form: {
    title: 'Start a project',
    name: 'Your name',
    namePh: 'Ana Rojas',
    need: 'What do you need',
    needLine: 'I need',
    needs: {
      website: 'Website',
      crm: 'CRM',
      automation: 'Automation',
      other: 'Something else',
    },
    details: 'Tell us a little more',
    detailsPh: 'What should it do? Who uses it?',
    sendEmail: 'Send by email',
    sendWhatsapp: 'Send by WhatsApp',
    note: 'Opens your email app with this already written. We reply within one business day.',
    subject: 'Project enquiry',
    greeting: 'Hi Tidence, I am interested in your services.',
  },

  // Prefilled enquiries. The visitor still reviews and sends them.
  enquiry: {
    subject: 'Project enquiry from the website',
    body: 'Hi Tidence,\n\nI found you through your website and I am interested in your services.\n\nWhat I would like to build:\nMy business:\nBest way to reach me:\n\nThanks,',
    whatsapp: 'Hi Tidence, I found you through your website and I am interested in your services. Can we talk about a project?',
  },

  manifesto: {
    lead: 'Most businesses buy software off the shelf and then spend years working around it.',
    resolve: 'We build around you.',
    support:
      'We start from how your business already runs, then design the site, the system and the automation to fit it. One team carries the work from the first conversation to long after launch.',
  },

  marquee: {
    words: ['Websites', 'CRMs', 'Automation', 'Dashboards', 'Bots', 'Internal tools', 'Integrations'],
  },

  services: {
    eyebrow: 'What we build',
    title: 'A website is\nwhere it starts.',
    lead: 'Most businesses come to us for a site and stay for what is behind it: the client list living in five spreadsheets, the report someone rebuilds every Monday, the copy and paste between two systems that never talk.',
    items: {
      web: {
        kind: 'Sites and web apps',
        title: 'Websites that do work',
        text: 'Not a brochure. A site that books, sells, takes enquiries and tells you what happened, designed for your business rather than poured into a template.',
        examples: ['Company and landing sites', 'Online stores and bookings', 'Client portals', 'Web platforms and SaaS'],
      },
      crm: {
        kind: 'CRMs and client systems',
        title: 'Your clients, in one place',
        text: 'A CRM shaped around how you actually sell, instead of a generic one you bend yourself around. Every lead, quote and follow up where the whole team can see it.',
        examples: ['Lead and sales pipelines', 'Client records and history', 'Quotes, invoices and payments', 'Follow up reminders'],
      },
      automation: {
        kind: 'Office automation',
        title: 'The work that does itself',
        text: 'We find the tasks someone repeats every day and hand them to software. Reports build overnight, invoices send on time, and data moves between your tools on its own.',
        examples: ['Reports that build themselves', 'Documents and invoices from templates', 'Email and WhatsApp notifications', 'Syncing data between systems'],
      },
      everyday: {
        kind: 'Everyday tools',
        title: 'Small tools, big hours back',
        text: 'Not every problem needs a platform. Sometimes it is a dashboard, a bot or a fifty line script, and it saves somebody an hour every single day.',
        examples: ['Internal dashboards', 'Inventory and scheduling', 'Chat bots for teams and clients', 'Scripts for the boring parts'],
      },
    },
  },

  journey: {
    eyebrow: 'The journey',
    title: 'From an idea\nto something that\nruns every day.',
    lead: 'Every project travels the same seven stages. Here is what happens at each one, and what you have in your hands when it ends.',
    hint: 'Keep scrolling',
    stageLabel: 'Stage {n} of {total}',
    stages: {
      listen: {
        kicker: 'First conversation',
        title: 'Listen',
        text: 'We start with how your business runs today, not with technology. Where time goes, what breaks, what you wish just happened.',
        out: ['A discovery call', 'The real problem, named'],
      },
      map: {
        kicker: 'Scope',
        title: 'Map',
        text: 'We write down what is being built and what is not, what it costs and when it lands. Agreed in writing before anything is committed.',
        out: ['Written scope', 'Timeline and price'],
      },
      design: {
        kicker: 'Interface',
        title: 'Design',
        text: 'Screens, flows and the shape of the data. You see and click through it early, while changing it is still cheap.',
        out: ['Clickable prototype', 'Data model'],
      },
      build: {
        kicker: 'Code',
        title: 'Build',
        text: 'The team that designed it writes it. Short cycles, a live preview you can open any day, and no handoff in the middle.',
        out: ['Weekly live previews', 'Readable code you own'],
      },
      connect: {
        kicker: 'Automation',
        title: 'Connect',
        text: 'We wire it into the rest of your day: email, WhatsApp, payments, spreadsheets, the tools you already pay for. This is where the hours come back.',
        out: ['Integrations', 'Automated tasks'],
      },
      launch: {
        kicker: 'Release',
        title: 'Launch',
        text: 'Security checked, tested on real phones, and shipped. We train your team and stay close for the first weeks of real use.',
        out: ['Live system', 'Team walkthrough'],
      },
      support: {
        kicker: 'After launch',
        title: 'Support',
        text: 'Software keeps moving after launch. We maintain it, fix what breaks, make the changes you ask for and add what you need as you grow.',
        out: ['Maintenance and fixes', 'Changes on request'],
      },
    },
  },

  approach: {
    title: 'How we work',
    items: {
      team: {
        k: 'One team, start to finish',
        v: 'The people who scope your project are the people who build it. No handoffs between vendors, and no context lost along the way.',
      },
      scope: {
        k: 'Scope before code',
        v: 'We agree what is being built and what is not, in writing, before anything gets committed.',
      },
      ships: {
        k: 'It ships or it does not count',
        v: 'We hand over something running, documented and yours. Not a mockup, not a slide deck.',
      },
    },
  },

  journal: {
    eyebrow: 'Journal',
    title: 'Notes from\nthe studio.',
    lead: 'Who we are, how we work, and how a couple of side projects turned into an agency.',
    by: 'By Tidence',
    read: 'Read the full story',
    close: 'Show less',
    feature: {
      tag: 'Our story',
      minutes: '4 min read',
      title: 'How Tidence started',
      dek: 'Before there were clients there were side projects: a game, a notes app, an attendance system and a Discord bot. This is how those turned into a studio.',
      intro:
        'Tidence began the way most good tools do, with people building things for themselves. Alexander Ross was designing interfaces and database schemas and pulling apart his own work to see where it broke. Bryan De Jesus was writing the backend systems that keep data moving between services. Separately, they kept shipping.',
      body: [
        'The projects were small but real. An arcade game with global leaderboards. A notes app with no ceremony. An attendance platform reporting in real time. A Discord bot handing out green points. A desktop app pulling live exchange rates. Each one was a lesson in finishing things, not just starting them.',
        'Somewhere along the way the questions changed. Instead of asking how something was built, people started asking whether it could be built for them: a website that took bookings, a client list that lived somewhere other than a spreadsheet, a report that would just appear every Monday.',
        'That was the moment Tidence stopped being two portfolios and became one studio. The name comes from the tide: steady, recurring work that keeps moving whether or not anyone is watching. It is how we think about software too. It should run quietly, every day, and keep running.',
        'Today we design and build websites, CRMs and the automation behind them, for businesses that would rather spend their hours on the work only they can do.',
      ],
      quote: 'Built to be used, not shown.',
      caption: 'Where it started: a desk, a laptop and a list of things to build.',
    },
    posts: {
      who: {
        tag: 'About us',
        title: 'Who we are',
        text: 'Tidence is a digital studio for websites, CRMs and business automation, founded by Alexander Ross (front end, data and security) and Bryan De Jesus (backend systems and APIs).',
      },
      stack: {
        tag: 'Studio notes',
        title: 'The right tools for the job',
        text: 'We are not tied to one stack. Web and mobile, cloud and on-site, SQL and NoSQL, AI and the tools you already pay for: we choose what fits your problem and your team, and learn whatever the job needs.',
      },
      principles: {
        tag: 'Principles',
        title: 'What we will not do',
        text: 'Sell you a template as a custom build. Lock you out of your own code. Ship anything we have not tested on a real phone and checked for security first.',
      },
    },
  },

  contact: {
    eyebrow: 'Last stage, first step',
    sloganA: 'Imagine it.',
    sloganB: 'We build it.',
    lead: 'Tell us what you picture, a site, a CRM, the task you would love to never do again. You will hear back from the studio within one business day.',
    soon: 'Coming soon',
    channels: {
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      email: 'Email',
    },
  },

  footer: {
    sections: 'Sections',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
  },

  legal,
};
