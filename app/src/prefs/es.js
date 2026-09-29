// Neutral Latin American Spanish, addressing the reader as "tú": this is a
// two-person studio whose whole pitch is that you talk to them directly, and
// "usted" would put back the distance the copy is arguing against.
export default {
  meta: {
    skip: 'Saltar al contenido',
    openOutside: '(se abre en una pestaña nueva)',
  },

  nav: {
    label: 'Principal',
    work: 'Trabajo',
    studio: 'Estudio',
    contact: 'Contacto',
    cta: 'Empezar un proyecto',
    language: 'Idioma',
    themeToLight: 'Cambiar al tema claro',
    themeToDark: 'Cambiar al tema oscuro',
  },

  hero: {
    lead: 'Diseñamos y construimos la web,',
    em: 'de principio a fin',
    sub: 'Un estudio de dos personas. Hablas con quienes escriben el código, no con alguien que traslada mensajes.',
    cta: 'Ver el trabajo',
  },

  manifesto: {
    lead: 'La mayoría de los estudios pone tres personas entre tú y quien escribe tu código.',
    resolve: 'Nosotros no ponemos ninguna.',
    support:
      'Sin gerente de proyecto trasladando requisitos. Sin un junior heredando el desarrollo a mitad de camino. Las dos personas que conoces son las dos que lo entregan.',
  },

  capabilities: {
    title: 'Cuatro cosas,\nbien hechas.',
    lead: 'Preferimos ser buenos en una lista corta que estar disponibles para una larga.',
    items: {
      front: {
        title: 'Front end',
        text: 'React y Vite, construido según el diseño y no según una plantilla. Responsivo, operable con teclado y rápido en los teléfonos que la gente realmente tiene.',
      },
      back: {
        title: 'Back end',
        text: 'Servicios en Node y Python, APIs REST y la fontanería entre ambos. Escrito para que la próxima persona pueda leerlo.',
      },
      data: {
        title: 'Datos',
        text: 'Esquemas de PostgreSQL y Redis diseñados antes de la primera consulta, para que los reportes no se conviertan en una reescritura seis meses después.',
      },
      security: {
        title: 'Seguridad',
        text: 'Pentesting sobre nuestro propio trabajo. Autenticación, manejo de sesiones y validación de entradas se revisan antes de publicar nada.',
      },
    },
  },

  work: {
    title: 'Lo que hemos entregado',
    live: 'En vivo',
    source: 'Código',
    shotAlt: 'Captura de pantalla de {name}',
    projects: {
      birdie: {
        kind: 'Juego arcade 2D',
        text: 'Maneja el taxi de un pajarito azul. Recoge pasajeros, esquiva baches y vigila el tanque. 22 sombreros desbloqueables, ciclo de día y noche, tablas de líderes globales.',
      },
      textnode: {
        kind: 'App de notas',
        text: 'Notas para quienes piensan más rápido de lo que archivan. CRUD completo, sin ceremonia.',
      },
      automator: {
        kind: 'Plataforma de automatización con IA',
        text: 'Una plataforma conversacional conectada a Automator, con una interfaz 3D construida con Three.js.',
      },
      attendance: {
        kind: 'Plataforma fullstack',
        text: 'Asistencia de principio a fin. Un backend en Express, un frontend en React y APIs REST que alimentan reportes en tiempo real.',
      },
      ecobot: {
        kind: 'Bot de Discord',
        text: 'Bot de conciencia ambiental. Cuestionarios, puntos verdes y recordatorios personalizados.',
      },
      currency: {
        kind: 'Aplicación de escritorio',
        text: 'Tasas de cambio en vivo tomadas de una API externa, con la lógica de negocio resuelta en C#.',
      },
    },
  },

  approach: {
    title: 'Cómo trabajamos',
    items: {
      both: {
        k: 'Nos tienes a los dos',
        v: 'No hay una capa de cuentas. Quien responde tu correo es quien edita el archivo.',
      },
      scope: {
        k: 'Alcance antes que código',
        v: 'Acordamos por escrito qué se va a construir y qué no, antes de que se suba una sola línea.',
      },
      ships: {
        k: 'Si no se publica, no cuenta',
        v: 'Cada proyecto de abajo está en vivo, o su código es público. Aquí no hay maquetas.',
      },
    },
  },

  studio: {
    title: 'Dos personas construyen todo.\nHablas con ambas.',
    roles: {
      founder: 'Fundador',
      cofounder: 'Cofundador',
    },
    keys: {
      site: 'Sitio',
      email: 'Correo',
      github: 'GitHub',
      contact: 'Contacto',
    },
    people: {
      alexander: {
        text: 'Front end, arquitectura de bases de datos y pentesting. Construye la interfaz y mantiene honesta la seguridad.',
      },
      bryan: {
        text: 'Sistemas de backend. APIs y arquitecturas que mueven datos entre servicios y los siguen moviendo bajo carga.',
      },
    },
  },

  contact: {
    title: 'Empezar un proyecto',
    lead: 'Cuéntanos qué estás construyendo. Uno de los dos te responde en menos de un día.',
    name: 'Nombre',
    email: 'Correo',
    brief: 'Qué estás construyendo',
    briefHelp: 'Con un borrador basta. Alcance, tiempos y presupuesto si los tienes.',
    submit: 'Empezar un proyecto',
    sending: 'Abriendo el correo',
    summary: 'Hay {count} campos por corregir.',
    doneTitle: 'Tu cliente de correo está abierto',
    doneText: 'Ya escribimos el mensaje por ti. Envíalo y te respondemos en menos de un día. Si no se abrió nada, escríbenos a',
    again: 'Escribir otro',
    subject: 'Nueva consulta de proyecto de {name}',
    errors: {
      name: 'Dinos cómo llamarte.',
      emailMissing: 'Necesitamos una dirección para responderte.',
      emailInvalid: 'A esa dirección le falta una @ o un dominio.',
      briefMissing: 'Con una o dos frases basta para empezar.',
      briefShort: 'Un poco más de detalle nos ayuda a responderte bien.',
    },
  },

  footer: {
    sections: 'Secciones',
    elsewhere: 'En otros sitios',
    legal: 'Legal',
    github: 'GitHub',
    email: 'Correo',
    privacy: 'Privacidad',
    terms: 'Términos',
    built: 'Construido por las dos personas de arriba',
  },
};
