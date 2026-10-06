// Neutral Latin American Spanish, addressing the reader as "tú": the studio's
// pitch is direct work with the people building the product, and "usted" would
// put back the distance the copy is arguing against.
import legal from './legal.es';

export default {
  meta: {
    title: 'Tidence — Sitios web, CRMs y automatización para negocios',
    description:
      'Tidence es un estudio digital que construye sitios web, CRMs, automatización de oficina y las herramientas del día a día con las que trabaja un negocio.',
    skip: 'Saltar al contenido',
    openOutside: '(se abre en una pestaña nueva)',
  },

  nav: {
    label: 'Principal',
    build: 'Qué hacemos',
    process: 'Cómo trabajamos',
    about: 'Quiénes somos',
    contact: 'Contacto',
    cta: 'Empezar un proyecto',
    language: 'Idioma',
  },

  hero: {
    lead: 'Construimos las herramientas',
    em: 'con las que trabaja',
    strong: 'tu negocio.',
    sub: 'Sitios web, CRMs y automatizaciones para tu negocio. Hechos por un equipo de dos.',
    ctaEmail: 'Escríbenos sobre tu proyecto',
    ctaMore: 'Mira qué hacemos',
    tilesLabel: 'Accesos rápidos',
    tileEmail: 'Escribir al estudio',
    tileWork: 'Qué hacemos',
  },

  form: {
    title: 'Empieza un proyecto',
    name: 'Tu nombre',
    namePh: 'Ana Rojas',
    need: 'Qué necesitas',
    needLine: 'Necesito',
    needs: {
      website: 'Sitio web',
      crm: 'CRM',
      automation: 'Automatización',
      other: 'Otra cosa',
    },
    details: 'Cuéntanos un poco más',
    detailsPh: '¿Qué debería hacer? ¿Quién lo usa?',
    sendEmail: 'Enviar por correo',
    sendWhatsapp: 'Enviar por WhatsApp',
    note: 'Se abre tu correo con el mensaje listo.',
    subject: 'Consulta sobre un proyecto',
    greeting: 'Hola Tidence, me interesan sus servicios.',
  },

  // Mensajes prellenados. Quien escribe los revisa y los envía.
  enquiry: {
    subject: 'Consulta sobre un proyecto desde la web',
    body: 'Hola Tidence,\n\nLos encontré por su sitio web y me interesan sus servicios.\n\nLo que quiero construir:\nMi negocio:\nLa mejor forma de contactarme:\n\nGracias,',
    whatsapp: 'Hola Tidence, los encontré por su sitio web y me interesan sus servicios. ¿Podemos hablar de un proyecto?',
  },

  services: {
    title: 'Qué hacemos',
    items: {
      web: { title: 'Sitios web', text: 'Páginas que traen clientes y reciben reservas.' },
      crm: { title: 'CRM', text: 'Todos tus clientes y ventas en un solo lugar.' },
      automation: { title: 'Automatización', text: 'El software hace las tareas repetitivas por ti.' },
      tools: { title: 'Herramientas a medida', text: 'Paneles y bots que te ahorran horas.' },
    },
  },

  process: {
    title: 'Cómo trabajamos',
    steps: {
      talk: { title: 'Hablamos', text: 'Nos cuentas qué necesitas.' },
      plan: { title: 'Planeamos', text: 'Acordamos precio y fechas por escrito.' },
      build: { title: 'Construimos', text: 'Ves el avance cada semana.' },
      launch: { title: 'Lanzamos y te acompañamos', text: 'Lo publicamos y seguimos ayudándote.' },
    },
  },

  about: {
    title: 'Quiénes somos',
    text: 'Somos Alexander Ross y Bryan De Jesus, un estudio de dos personas. Hablas directo con quienes escriben tu código.',
  },

  contact: {
    sloganA: 'Imagínalo.',
    sloganB: 'Lo construimos.',
    lead: 'Escríbenos. Respondemos en un día hábil.',
    soon: 'Muy pronto',
    channels: {
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      email: 'Correo',
    },
  },

  footer: {
    sections: 'Secciones',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
  },

  legal,
};
