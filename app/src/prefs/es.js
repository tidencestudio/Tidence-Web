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
    build: 'Qué construimos',
    journey: 'Proceso',
    story: 'Journal',
    contact: 'Contacto',
    cta: 'Empezar un proyecto',
    language: 'Idioma',
  },

  hero: {
    eyebrow: 'Sitios web · CRMs · Automatización',
    lead: 'Construimos las herramientas',
    em: 'con las que trabaja tu negocio',
    sub: 'Sitios web, CRMs y las automatizaciones que mueven tu oficina sin que nadie lo note. Diseñado, construido y cuidado por un mismo equipo, de principio a fin.',
    ctaEmail: 'Escríbenos sobre tu proyecto',
    ctaWhatsapp: 'Escríbenos por WhatsApp',
    ctaMore: 'Mira cómo trabajamos',
    note: 'Respondemos en un día hábil. Hablas con quienes escriben el código.',
    caption: 'El nombre viene de la marea: trabajo constante que no se detiene.',
  },

  // Mensajes prellenados. Quien escribe los revisa y los envía.
  enquiry: {
    subject: 'Consulta sobre un proyecto desde la web',
    body: 'Hola Tidence,\n\nLos encontré por su sitio web y me interesan sus servicios.\n\nLo que quiero construir:\nMi negocio:\nLa mejor forma de contactarme:\n\nGracias,',
    whatsapp: 'Hola Tidence, los encontré por su sitio web y me interesan sus servicios. ¿Podemos hablar de un proyecto?',
  },

  manifesto: {
    lead: 'La mayoría de los negocios compra software genérico y pasa años trabajando a su alrededor.',
    resolve: 'Nosotros construimos a tu medida.',
    support:
      'Partimos de cómo ya funciona tu negocio y diseñamos el sitio, el sistema y la automatización para que encajen. Un mismo equipo lleva el trabajo desde la primera conversación hasta mucho después del lanzamiento.',
  },

  marquee: {
    words: ['Sitios web', 'CRMs', 'Automatización', 'Dashboards', 'Bots', 'Herramientas internas', 'Integraciones'],
  },

  services: {
    eyebrow: 'Qué construimos',
    title: 'Un sitio web\nes donde empieza.',
    lead: 'La mayoría llega por un sitio y se queda por lo que hay detrás: la lista de clientes repartida en cinco hojas de cálculo, el reporte que alguien rehace cada lunes, el copiar y pegar entre dos sistemas que nunca se hablan.',
    items: {
      web: {
        kind: 'Sitios y aplicaciones web',
        title: 'Sitios que trabajan',
        text: 'No un folleto. Un sitio que reserva, vende, recibe consultas y te cuenta qué pasó, diseñado para tu negocio y no vaciado en una plantilla.',
        examples: ['Sitios de empresa y landing pages', 'Tiendas en línea y reservas', 'Portales para clientes', 'Plataformas web y SaaS'],
      },
      crm: {
        kind: 'CRMs y sistemas de clientes',
        title: 'Tus clientes, en un solo lugar',
        text: 'Un CRM hecho a la forma en que realmente vendes, en vez de uno genérico al que te tienes que adaptar. Cada prospecto, cotización y seguimiento donde todo el equipo lo ve.',
        examples: ['Embudos de prospectos y ventas', 'Fichas e historial de clientes', 'Cotizaciones, facturas y pagos', 'Recordatorios de seguimiento'],
      },
      automation: {
        kind: 'Automatización de oficina',
        title: 'El trabajo que se hace solo',
        text: 'Encontramos las tareas que alguien repite todos los días y se las damos al software. Los reportes se arman de noche, las facturas salen a tiempo y los datos pasan entre tus herramientas por su cuenta.',
        examples: ['Reportes que se arman solos', 'Documentos y facturas desde plantillas', 'Avisos por correo y WhatsApp', 'Sincronizar datos entre sistemas'],
      },
      everyday: {
        kind: 'Herramientas del día a día',
        title: 'Herramientas pequeñas, horas de vuelta',
        text: 'No todo problema necesita una plataforma. A veces es un dashboard, un bot o un script de cincuenta líneas, y le ahorra a alguien una hora todos los días.',
        examples: ['Dashboards internos', 'Inventario y agendas', 'Bots de chat para equipos y clientes', 'Scripts para la parte aburrida'],
      },
    },
  },

  journey: {
    eyebrow: 'El recorrido',
    title: 'De una idea\na algo que funciona\ntodos los días.',
    lead: 'Cada proyecto pasa por las mismas siete etapas. Esto es lo que ocurre en cada una, y lo que tienes en las manos cuando termina.',
    hint: 'Sigue bajando',
    stageLabel: 'Etapa {n} de {total}',
    stages: {
      listen: {
        kicker: 'Primera conversación',
        title: 'Escuchar',
        text: 'Empezamos por cómo funciona hoy tu negocio, no por la tecnología. A dónde se va el tiempo, qué se rompe, qué te gustaría que simplemente pasara.',
        out: ['Una llamada de diagnóstico', 'El problema real, con nombre'],
      },
      map: {
        kicker: 'Alcance',
        title: 'Trazar',
        text: 'Escribimos qué se construye y qué no, cuánto cuesta y cuándo llega. Acordado por escrito antes de comprometer nada.',
        out: ['Alcance por escrito', 'Calendario y precio'],
      },
      design: {
        kicker: 'Interfaz',
        title: 'Diseñar',
        text: 'Pantallas, flujos y la forma de los datos. Lo ves y lo recorres temprano, mientras cambiarlo todavía es barato.',
        out: ['Prototipo navegable', 'Modelo de datos'],
      },
      build: {
        kicker: 'Código',
        title: 'Construir',
        text: 'El equipo que lo diseñó lo escribe. Ciclos cortos, una vista previa en vivo que puedes abrir cualquier día y ningún traspaso a mitad de camino.',
        out: ['Avances en vivo cada semana', 'Código legible y tuyo'],
      },
      connect: {
        kicker: 'Automatización',
        title: 'Conectar',
        text: 'Lo integramos con el resto de tu día: correo, WhatsApp, pagos, hojas de cálculo y las herramientas que ya pagas. Aquí es donde vuelven las horas.',
        out: ['Integraciones', 'Tareas automatizadas'],
      },
      launch: {
        kicker: 'Lanzamiento',
        title: 'Lanzar',
        text: 'Revisado en seguridad, probado en teléfonos reales y publicado. Capacitamos a tu equipo y nos quedamos cerca las primeras semanas de uso real.',
        out: ['Sistema en vivo', 'Recorrido con tu equipo'],
      },
      support: {
        kicker: 'Tras el lanzamiento',
        title: 'Soporte',
        text: 'El software sigue en movimiento después del lanzamiento. Lo mantenemos, arreglamos lo que falle, hacemos los cambios que pidas y añadimos lo que necesites a medida que creces.',
        out: ['Mantenimiento y arreglos', 'Cambios a pedido'],
      },
    },
  },

  approach: {
    title: 'Cómo trabajamos',
    items: {
      team: {
        k: 'Un mismo equipo, de principio a fin',
        v: 'Quienes definen el alcance de tu proyecto son quienes lo construyen. Sin traspasos entre proveedores y sin contexto perdido en el camino.',
      },
      scope: {
        k: 'Alcance antes que código',
        v: 'Acordamos por escrito qué se va a construir y qué no, antes de que se suba una sola línea.',
      },
      ships: {
        k: 'Si no se publica, no cuenta',
        v: 'Entregamos algo funcionando, documentado y tuyo. No una maqueta ni una presentación.',
      },
    },
  },

  journal: {
    eyebrow: 'Journal',
    title: 'Notas desde\nel estudio.',
    lead: 'Quiénes somos, cómo trabajamos y cómo un par de proyectos personales se convirtieron en una agencia.',
    by: 'Por Tidence',
    read: 'Leer la historia completa',
    close: 'Mostrar menos',
    feature: {
      tag: 'Nuestra historia',
      minutes: '4 min de lectura',
      title: 'Cómo empezó Tidence',
      dek: 'Antes de los clientes hubo proyectos personales: un juego, una app de notas, un sistema de asistencia y un bot de Discord. Así se convirtieron en un estudio.',
      intro:
        'Tidence empezó como empiezan casi todas las buenas herramientas: con gente construyendo cosas para sí misma. Alexander Ross diseñaba interfaces y esquemas de bases de datos, y desarmaba su propio trabajo para ver dónde fallaba. Bryan De Jesus escribía los sistemas de backend que mantienen los datos en movimiento entre servicios. Cada uno por su lado, seguían entregando.',
      body: [
        'Los proyectos eran pequeños pero reales. Un juego arcade con tablas de líderes globales. Una app de notas sin ceremonia. Una plataforma de asistencia con reportes en tiempo real. Un bot de Discord que repartía puntos verdes. Una app de escritorio con tasas de cambio en vivo. Cada uno fue una lección sobre terminar las cosas, no solo empezarlas.',
        'En algún momento las preguntas cambiaron. En vez de preguntar cómo estaba hecho algo, la gente empezó a preguntar si se lo podían hacer a ellos: un sitio que tomara reservas, una lista de clientes que viviera en otro lugar que no fuera una hoja de cálculo, un reporte que simplemente apareciera cada lunes.',
        'Ese fue el momento en que Tidence dejó de ser dos portafolios y se convirtió en un estudio. El nombre viene de la marea: trabajo constante y recurrente que sigue moviéndose aunque nadie lo esté mirando. Así pensamos también el software. Debe funcionar en silencio, todos los días, y seguir funcionando.',
        'Hoy diseñamos y construimos sitios web, CRMs y la automatización detrás de ellos, para negocios que prefieren dedicar sus horas al trabajo que solo ellos pueden hacer.',
      ],
      quote: 'Hecho para usarse, no para mostrarse.',
      caption: 'Donde empezó: un escritorio, una laptop y una lista de cosas por construir.',
    },
    posts: {
      who: {
        tag: 'Sobre nosotros',
        title: 'Quiénes somos',
        text: 'Tidence es un estudio digital de sitios web, CRMs y automatización para negocios, fundado por Alexander Ross (front end, datos y seguridad) y Bryan De Jesus (sistemas de backend y APIs).',
      },
      stack: {
        tag: 'Notas del estudio',
        title: 'La herramienta adecuada para cada trabajo',
        text: 'No estamos atados a un solo stack. Web y móvil, nube y servidores propios, SQL y NoSQL, IA y las herramientas que ya pagas: elegimos lo que encaja con tu problema y tu equipo, y aprendemos lo que el trabajo necesite.',
      },
      principles: {
        tag: 'Principios',
        title: 'Lo que no haremos',
        text: 'Venderte una plantilla como si fuera un desarrollo a medida. Dejarte sin acceso a tu propio código. Publicar algo que no hayamos probado en un teléfono real y revisado en seguridad.',
      },
    },
  },

  contact: {
    eyebrow: 'Última etapa, primer paso',
    sloganA: 'Imagínalo.',
    sloganB: 'Lo construimos.',
    lead: 'Cuéntanos lo que tienes en mente: un sitio, un CRM, la tarea que te encantaría no volver a hacer. El estudio te responde en menos de un día hábil.',
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
