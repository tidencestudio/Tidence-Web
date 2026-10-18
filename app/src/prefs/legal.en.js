// Legal pages. Written to describe what this site actually does; if the site
// starts collecting anything new (a form, analytics, a newsletter), the
// privacy policy has to change with it.
export default {
  back: 'Back to the site',
  updated: 'Last updated',
  date: 'October 18, 2026',
  contents: 'On this page',
  questions: 'Questions about this page? Write to',

  privacy: {
    metaTitle: 'Privacy policy — Tidence',
    eyebrow: 'Legal',
    title: 'Privacy policy',
    intro:
      'Tidence is a two-person digital studio. This page explains what information reaches us when you visit the Tidence website or get in touch, what we do with it, and what we never do with it. The short version: the site itself collects nothing about you, and anything you send us is used only to reply to you and do the work you ask for.',
    sections: [
      {
        id: 'site',
        heading: 'What the website collects',
        body: [
          'Nothing on its own. There are no accounts, no advertising, no analytics and no tracking cookies on this site. The only information that reaches us is what you type into the enquiry form or send us directly.',
          'The only thing the site stores is your language choice, English or Spanish, saved in your own browser under the key “tidence-lang” so the page opens in the same language next time. It never leaves your device, and you can clear it at any time by clearing this site’s data in your browser.',
        ],
      },
      {
        id: 'third-parties',
        heading: 'Services the page loads',
        body: [
          'To show the page, your browser connects to a few outside services. Each of them can see your IP address and basic browser details as part of delivering the file, under their own privacy policies:',
          {
            list: [
              'Vercel, which hosts the site and keeps standard server logs.',
              'Unsplash, which serves the photographs.',
              'Web3Forms, which delivers the enquiry form to our inbox. It only receives what you submit.',
            ],
          },
          'We do not receive personal data from any of them, and we do not use them to follow you around the web.',
        ],
      },
      {
        id: 'contact',
        heading: 'When you contact us',
        body: [
          'If you use the enquiry form, we receive your name, your email address, the kind of project and whatever you write in the message. If you write to us by email, Instagram or WhatsApp, we receive whatever you choose to send. We use it only to answer you, prepare a proposal and, if we work together, deliver and support the project.',
          'Those conversations also live on the platform you used (Google for email, Meta for Instagram and WhatsApp), which handles them under its own terms.',
        ],
      },
      {
        id: 'client-data',
        heading: 'Data inside client projects',
        body: [
          'When we build a site, CRM or automation for you, we may need access to data that belongs to your business or your customers. We access it only as far as the work requires, keep it out of our own tools wherever possible, and do not use it for anything else. The details are set out in the written agreement for each project.',
        ],
      },
      {
        id: 'never',
        heading: 'What we never do',
        body: [
          {
            list: [
              'Sell, rent or trade your information.',
              'Add you to a mailing list you did not ask for.',
              'Share your project details with anyone outside the studio without your permission.',
            ],
          },
        ],
      },
      {
        id: 'retention',
        heading: 'How long we keep it',
        body: [
          'We keep correspondence for as long as it is useful for an ongoing conversation or project, and project records for as long as we need them to support the work or meet accounting and legal obligations. After that we delete them.',
        ],
      },
      {
        id: 'rights',
        heading: 'Your choices',
        body: [
          'You can ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it. Email us and we will answer within thirty days.',
        ],
      },
      {
        id: 'changes',
        heading: 'Changes to this policy',
        body: [
          'If what the site collects changes, this page changes first, and the date at the top is updated.',
        ],
      },
    ],
  },

  terms: {
    metaTitle: 'Terms of service — Tidence',
    eyebrow: 'Legal',
    title: 'Terms of service',
    intro:
      'These terms cover your use of this website and the general basis on which Tidence takes on work. Every project also has its own written proposal; where that proposal and these terms disagree, the proposal wins.',
    sections: [
      {
        id: 'site',
        heading: 'Using this website',
        body: [
          'You are welcome to read, share and link to this site. Please do not copy its design, code or text to present as your own, try to disrupt it, or use it for anything unlawful.',
          'We keep the information here accurate, but it describes our services in general terms and is not an offer. Nothing is agreed until it is agreed in writing.',
        ],
      },
      {
        id: 'proposals',
        heading: 'Proposals and scope',
        body: [
          'Before any work starts we send a written proposal covering what will be built, what is not included, the price, the payment schedule and the expected timeline. Work begins once you accept it in writing.',
          'If you want to add or change something after that, we will tell you what it does to the price and timeline before doing it. Nothing is added to an invoice without your agreement.',
        ],
      },
      {
        id: 'payment',
        heading: 'Payment',
        body: [
          'Payment terms, including any deposit, are set out in each proposal. Invoices are due by the date shown on them. If a payment is late we may pause work until it arrives, and we will tell you before we do.',
        ],
      },
      {
        id: 'your-part',
        heading: 'Your part',
        body: [
          'Projects move at the speed of feedback. You agree to provide the content, access and decisions the project needs in reasonable time, and to make sure you have the rights to any text, images, logos or data you give us to use.',
        ],
      },
      {
        id: 'ownership',
        heading: 'Who owns the work',
        body: [
          'Once a project is paid in full, you own what we built specifically for you: the code, the design and the content, with full access to all of it. We never lock you out of your own system.',
          'Open-source libraries and third-party services stay under their own licences. General tools and techniques we already had, or develop along the way, remain ours to keep using, without any of your confidential information. Unless you ask us not to, we may show finished work in our portfolio.',
        ],
      },
      {
        id: 'confidentiality',
        heading: 'Confidentiality',
        body: [
          'Anything you share with us about your business that is not public stays between us. We use it only to do the work and we will sign a separate confidentiality agreement if you need one.',
        ],
      },
      {
        id: 'third-party',
        heading: 'Hosting and third-party services',
        body: [
          'Many projects depend on outside services: hosting, domains, payment processors, email providers, APIs. Their fees are yours unless the proposal says otherwise, and their availability is governed by their own terms. We will help you choose them, but we cannot control them.',
        ],
      },
      {
        id: 'warranty',
        heading: 'Fixes and support',
        body: [
          'We test everything before launch, including on real phones. If something we built does not work as agreed, tell us within thirty days of delivery and we will fix it at no cost. Support after that period, and new features, are covered by a separate agreement.',
        ],
      },
      {
        id: 'liability',
        heading: 'Limits of liability',
        body: [
          'We do careful work, but software runs in an imperfect world. To the extent the law allows, our total liability for any project is limited to the amount you paid for it, and we are not liable for indirect losses such as lost profits or lost data. You should keep your own backups of anything that matters.',
        ],
      },
      {
        id: 'ending',
        heading: 'Ending a project',
        body: [
          'Either of us can end a project with written notice. You pay for the work done up to that point, and we hand over everything completed so far once it is paid.',
        ],
      },
      {
        id: 'changes',
        heading: 'Changes to these terms',
        body: [
          'We may update these terms from time to time. The version that applies to a project is the one in force when its proposal was accepted.',
        ],
      },
    ],
  },
};
