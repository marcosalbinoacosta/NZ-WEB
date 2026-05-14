import { defineField, defineType } from 'sanity';

export const splash = defineType({
  name: 'splash',
  title: 'Splash · Portal de marca',
  type: 'document',
  groups: [
    { name: 'contenido', title: 'Contenido', default: true },
    { name: 'puertas', title: 'Estudio y Tienda' },
    { name: 'pie', title: 'Pie de página' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'brand',
      title: 'Nombre de marca',
      type: 'string',
      group: 'contenido',
      initialValue: 'Niza',
      validation: (R) => R.required().max(40),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (frase principal)',
      type: 'string',
      group: 'contenido',
      description: 'Aparece como título grande junto a la imagen.',
      validation: (R) => R.max(80),
    }),
    defineField({
      name: 'intro',
      title: 'Texto introductorio',
      type: 'text',
      rows: 3,
      group: 'contenido',
      description: 'Breve párrafo bajo el tagline. Hasta ~200 caracteres.',
      validation: (R) => R.max(220),
    }),
    defineField({
      name: 'hero',
      title: 'Imagen principal',
      type: 'image',
      group: 'contenido',
      options: { hotspot: true, metadata: ['lqip', 'palette', 'dimensions'] },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (accesibilidad)',
          type: 'string',
          validation: (R) => R.required().max(125),
        }),
      ],
    }),

    defineField({
      name: 'estudio',
      title: 'Puerta · Estudio',
      type: 'object',
      group: 'puertas',
      fields: portalFields(),
    }),
    defineField({
      name: 'tienda',
      title: 'Puerta · Tienda',
      type: 'object',
      group: 'puertas',
      fields: portalFields(),
    }),

    defineField({
      name: 'footer',
      title: 'Pie de página',
      type: 'object',
      group: 'pie',
      fields: [
        defineField({ name: 'address', title: 'Dirección', type: 'string', validation: (R) => R.required() }),
        defineField({ name: 'whatsapp', title: 'WhatsApp', type: 'string', description: 'Formato +54 9 351 ...', validation: (R) => R.required() }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'string', description: 'Con o sin @', validation: (R) => R.required() }),
        defineField({ name: 'email', title: 'Email', type: 'string', validation: (R) => R.required().email() }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'Título (meta)',
          type: 'string',
          description: 'Aparece en la pestaña del navegador y resultados de Google. ~60 caracteres.',
          validation: (R) => R.required().max(70),
        }),
        defineField({
          name: 'description',
          title: 'Descripción (meta)',
          type: 'text',
          rows: 2,
          description: '~155 caracteres.',
          validation: (R) => R.required().max(170),
        }),
        defineField({
          name: 'ogImage',
          title: 'Imagen para compartir (Open Graph)',
          type: 'image',
          description: 'Aparece al pegar el link en WhatsApp, Instagram, etc. Ideal 1200×630.',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'brand', subtitle: 'tagline', media: 'hero' },
    prepare({ title, subtitle, media }) {
      return { title: title ?? 'Splash', subtitle: subtitle ?? '', media };
    },
  },
});

function portalFields() {
  return [
    defineField({
      name: 'label',
      title: 'Etiqueta corta',
      type: 'string',
      description: 'Ej: "Estudio" o "Tienda". Aparece arriba de la tarjeta.',
      validation: (R) => R.required().max(20),
    }),
    defineField({
      name: 'title',
      title: 'Título de la puerta',
      type: 'string',
      validation: (R) => R.required().max(40),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (R) => R.max(220),
    }),
    defineField({
      name: 'cta',
      title: 'Texto del botón',
      type: 'string',
      validation: (R) => R.max(30),
    }),
    defineField({
      name: 'url',
      title: 'URL destino',
      type: 'url',
      validation: (R) => R.required().uri({ scheme: ['http', 'https'] }),
    }),
  ];
}
