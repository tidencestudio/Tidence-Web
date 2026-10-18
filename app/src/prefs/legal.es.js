// Mirrors legal.en.js. Addresses the reader as "tú", like the rest of the site.
export default {
  back: 'Volver al sitio',
  updated: 'Última actualización',
  date: '18 de octubre de 2026',
  contents: 'En esta página',
  questions: '¿Preguntas sobre esta página? Escríbenos a',

  privacy: {
    metaTitle: 'Política de privacidad — Tidence',
    eyebrow: 'Legal',
    title: 'Política de privacidad',
    intro:
      'Tidence es un estudio digital de dos personas. Esta página explica qué información nos llega cuando visitas el sitio de Tidence o te pones en contacto, qué hacemos con ella y qué no hacemos nunca. En corto: el sitio no recoge nada sobre ti, y lo que nos envías lo usamos solo para responderte y hacer el trabajo que nos pidas.',
    sections: [
      {
        id: 'site',
        heading: 'Qué recoge el sitio',
        body: [
          'Nada por sí solo. Este sitio no tiene cuentas, publicidad, analítica ni cookies de seguimiento. La única información que nos llega es la que escribes en el formulario de consulta o la que nos envías directamente.',
          'El sitio no guarda nada en tu navegador. El idioma en que lo lees forma parte de la dirección de la página (/es para español, /en para inglés), así que cambiar de idioma cambia la dirección y no se guarda nada en tu dispositivo.',
        ],
      },
      {
        id: 'third-parties',
        heading: 'Servicios que carga la página',
        body: [
          'Para mostrar la página, tu navegador se conecta a algunos servicios externos. Cada uno puede ver tu dirección IP y datos básicos del navegador al entregar el archivo, según su propia política de privacidad:',
          {
            list: [
              'Vercel, que aloja el sitio y guarda registros estándar del servidor.',
              'Unsplash, que sirve las fotografías.',
              'Vercel también ejecuta nuestro gestor de consultas: lo que envías por el formulario se revisa y se manda por correo a nuestra bandeja de Gmail (Google). El gestor no guarda ninguna copia.',
              'Google reCAPTCHA, que se carga solo cuando empiezas a llenar el formulario de consulta, para distinguir a las personas del spam automático. Observa cómo se usa la página y recibe tu dirección IP, según la política de privacidad y los términos de Google.',
            ],
          },
          'No recibimos datos personales de ninguno de ellos ni los usamos para seguirte por internet.',
        ],
      },
      {
        id: 'contact',
        heading: 'Cuando nos contactas',
        body: [
          'Si usas el formulario de consulta, recibimos tu nombre, tu correo, el tipo de proyecto y lo que escribas en el mensaje. Si nos escribes por correo, Instagram o WhatsApp, recibimos lo que decidas enviar. Lo usamos solo para responderte, preparar una propuesta y, si trabajamos juntos, entregar y mantener el proyecto.',
          'Esas conversaciones también quedan en la plataforma que usaste (Google para el correo, Meta para Instagram y WhatsApp), que las gestiona según sus propios términos.',
        ],
      },
      {
        id: 'client-data',
        heading: 'Datos dentro de los proyectos',
        body: [
          'Cuando construimos un sitio, un CRM o una automatización para ti, puede que necesitemos acceso a datos de tu negocio o de tus clientes. Accedemos solo a lo que el trabajo requiere, los mantenemos fuera de nuestras propias herramientas siempre que se puede y no los usamos para nada más. Los detalles quedan por escrito en el acuerdo de cada proyecto.',
        ],
      },
      {
        id: 'never',
        heading: 'Lo que nunca hacemos',
        body: [
          {
            list: [
              'Vender, alquilar o intercambiar tu información.',
              'Añadirte a una lista de correo que no pediste.',
              'Compartir los detalles de tu proyecto con nadie fuera del estudio sin tu permiso.',
            ],
          },
        ],
      },
      {
        id: 'retention',
        heading: 'Cuánto tiempo la guardamos',
        body: [
          'Guardamos la correspondencia mientras sea útil para una conversación o un proyecto en curso, y los registros del proyecto mientras los necesitemos para darle soporte o cumplir obligaciones contables y legales. Después, los borramos.',
        ],
      },
      {
        id: 'rights',
        heading: 'Tus opciones',
        body: [
          'Puedes pedirnos en cualquier momento qué información tenemos sobre ti, que la corrijamos o que la borremos. Escríbenos y te responderemos en un plazo de treinta días.',
        ],
      },
      {
        id: 'changes',
        heading: 'Cambios en esta política',
        body: [
          'Si cambia lo que recoge el sitio, primero cambia esta página, y se actualiza la fecha de arriba.',
        ],
      },
    ],
  },

  terms: {
    metaTitle: 'Términos del servicio — Tidence',
    eyebrow: 'Legal',
    title: 'Términos del servicio',
    intro:
      'Estos términos cubren el uso de este sitio y las bases generales con las que Tidence acepta un trabajo. Cada proyecto tiene además su propia propuesta por escrito; si la propuesta y estos términos no coinciden, manda la propuesta.',
    sections: [
      {
        id: 'site',
        heading: 'Uso de este sitio',
        body: [
          'Puedes leer, compartir y enlazar este sitio. Te pedimos que no copies su diseño, código o textos para presentarlos como tuyos, que no intentes interrumpirlo y que no lo uses para nada ilegal.',
          'Mantenemos la información al día, pero describe nuestros servicios en términos generales y no es una oferta. Nada está acordado hasta que está acordado por escrito.',
        ],
      },
      {
        id: 'proposals',
        heading: 'Propuestas y alcance',
        body: [
          'Antes de empezar te enviamos una propuesta por escrito con lo que se va a construir, lo que no está incluido, el precio, el calendario de pagos y los plazos previstos. El trabajo empieza cuando la aceptas por escrito.',
          'Si después quieres añadir o cambiar algo, te decimos cómo afecta al precio y a los plazos antes de hacerlo. Nada se añade a una factura sin tu acuerdo.',
        ],
      },
      {
        id: 'payment',
        heading: 'Pagos',
        body: [
          'Las condiciones de pago, incluido cualquier anticipo, se fijan en cada propuesta. Las facturas vencen en la fecha que indican. Si un pago se retrasa, podemos pausar el trabajo hasta recibirlo, y te avisaremos antes de hacerlo.',
        ],
      },
      {
        id: 'your-part',
        heading: 'Tu parte',
        body: [
          'Los proyectos avanzan al ritmo de las respuestas. Te comprometes a aportar el contenido, los accesos y las decisiones que el proyecto necesita en un tiempo razonable, y a asegurarte de tener los derechos de cualquier texto, imagen, logo o dato que nos des para usar.',
        ],
      },
      {
        id: 'ownership',
        heading: 'De quién es el trabajo',
        body: [
          'Cuando el proyecto está pagado por completo, es tuyo todo lo que construimos específicamente para ti: el código, el diseño y el contenido, con acceso completo a todo. Nunca te dejamos fuera de tu propio sistema.',
          'Las librerías de código abierto y los servicios de terceros siguen bajo sus propias licencias. Las herramientas y técnicas generales que ya teníamos, o que desarrollamos por el camino, siguen siendo nuestras para seguir usándolas, sin ninguna de tu información confidencial. Salvo que nos pidas lo contrario, podemos mostrar el trabajo terminado en nuestro portafolio.',
        ],
      },
      {
        id: 'confidentiality',
        heading: 'Confidencialidad',
        body: [
          'Lo que nos cuentes de tu negocio que no sea público queda entre nosotros. Lo usamos solo para hacer el trabajo, y firmamos un acuerdo de confidencialidad aparte si lo necesitas.',
        ],
      },
      {
        id: 'third-party',
        heading: 'Alojamiento y servicios de terceros',
        body: [
          'Muchos proyectos dependen de servicios externos: alojamiento, dominios, pasarelas de pago, proveedores de correo, APIs. Sus costes corren por tu cuenta salvo que la propuesta diga otra cosa, y su disponibilidad se rige por sus propios términos. Te ayudamos a elegirlos, pero no podemos controlarlos.',
        ],
      },
      {
        id: 'warranty',
        heading: 'Correcciones y soporte',
        body: [
          'Probamos todo antes del lanzamiento, también en teléfonos reales. Si algo que construimos no funciona como se acordó, avísanos en los treinta días siguientes a la entrega y lo arreglamos sin coste. El soporte posterior y las funciones nuevas se cubren con un acuerdo aparte.',
        ],
      },
      {
        id: 'liability',
        heading: 'Límites de responsabilidad',
        body: [
          'Trabajamos con cuidado, pero el software funciona en un mundo imperfecto. En la medida en que la ley lo permita, nuestra responsabilidad total por un proyecto se limita a lo que pagaste por él, y no respondemos por pérdidas indirectas como beneficios o datos perdidos. Conviene que guardes tus propias copias de seguridad de lo importante.',
        ],
      },
      {
        id: 'ending',
        heading: 'Terminar un proyecto',
        body: [
          'Cualquiera de las dos partes puede terminar un proyecto con aviso por escrito. Pagas el trabajo hecho hasta ese momento y te entregamos todo lo completado en cuanto esté pagado.',
        ],
      },
      {
        id: 'changes',
        heading: 'Cambios en estos términos',
        body: [
          'Podemos actualizar estos términos de vez en cuando. La versión que aplica a un proyecto es la vigente cuando se aceptó su propuesta.',
        ],
      },
    ],
  },
};
