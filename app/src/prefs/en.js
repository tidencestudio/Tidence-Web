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
    ctaEmail: 'Email us about a project',
    ctaMore: 'See what we do',
    tilesLabel: 'Quick links',
    tileEmail: 'Email the studio',
    tileWork: 'What we do',
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
    note: 'Your email app opens with the message ready.',
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
    title: 'What we do',
    items: {
      web: { title: 'Websites', text: 'Sites that bring you clients and take bookings.' },
      crm: { title: 'CRM', text: 'All your clients and sales in one place.' },
      automation: { title: 'Automation', text: 'Software does the repetitive tasks for you.' },
      tools: { title: 'Custom tools', text: 'Dashboards and bots that save you hours.' },
    },
  },

  process: {
    title: 'How we work',
    steps: {
      talk: { title: 'We talk', text: 'You tell us what you need.' },
      plan: { title: 'We plan', text: 'We agree on price and dates in writing.' },
      build: { title: 'We build', text: 'You see progress every week.' },
      launch: { title: 'We launch and stay', text: 'We publish it and keep helping you.' },
    },
  },

  about: {
    title: 'Who we are',
    text: 'We are Alexander Ross and Bryan De Jesus, a two-person studio. You talk directly with the people who write your code.',
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
  },

  legal,
};
