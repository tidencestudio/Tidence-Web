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
    build: 'What we do',
    process: 'How we work',
    about: 'Who we are',
    contact: 'Contact',
    cta: 'Start a project',
    language: 'Language',
  },

  hero: {
    lead: 'We build the tools',
    em: 'your business',
    strong: 'runs on.',
    sub: 'Websites, CRMs and automations for your business. Built by a team of two.',
    chipsLabel: 'What we build',
    chips: {
      website: 'Websites',
      crm: 'CRM',
      automation: 'Automation',
      custom: 'Custom tools',
      contact: 'Contact',
    },
    newsTag: 'New:',
    news: 'we are on WhatsApp Business. Write to us directly.',
  },

  form: {
    title: 'Start a project',
    name: 'Your name',
    namePh: 'Ana Rojas',
    email: 'Your email',
    emailPh: 'ana@company.com',
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
    send: 'Send enquiry',
    sending: 'Sending',
    sendWhatsapp: 'Send by WhatsApp',
    note: 'Goes straight to our inbox. We reply within one business day.',
    fallback: 'We could not reach our form service, so your email app opened with the message ready to send.',
    sentTitle: 'Got it.',
    sentText: 'Your enquiry is in our inbox. Expect a reply within one business day.',
    sentWhatsapp: 'Faster? Message us on WhatsApp',
    again: 'Send another',
    subject: 'Project enquiry',
    greeting: 'Hi Tidence, I am interested in your services.',
  },

  // Prefilled enquiries. The visitor still reviews and sends them.
  enquiry: {
    subject: 'Project enquiry from the website',
    body: 'Hi Tidence,\n\nI found you through your website and I am interested in your services.\n\nWhat I would like to build:\nMy business:\nBest way to reach me:\n\nThanks,',
    whatsapp: 'Hi Tidence, I found you through your website and I am interested in your services. Can we talk about a project?',
  },

  services: {
    eyebrow: 'What we do',
    title: 'A website is\nwhere it starts.',
    lead: 'Most clients come for a site and stay for what is behind it: the spreadsheets, the Monday report, the copy and paste between systems.',
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
    eyebrow: 'How we work',
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

  journal: {
    eyebrow: 'Journal',
    title: 'Who\nwe are.',
    lead: 'The story of the studio and what we care about.',
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
      ],
      quote: 'Built to be used, not shown.',
      caption: 'Where it started: a desk, a laptop and a list of things to build.',
    },
    posts: {
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
    sloganA: 'Imagine it.',
    sloganB: 'We build it.',
    lead: 'Write to us. We reply within one business day.',
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
    rights: 'All rights reserved.',
  },

  legal,
};
