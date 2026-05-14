/**
 * Sanity Studio config (modo standalone).
 *
 * Cómo usar:
 *   1. Instalar Sanity CLI: npm i -g sanity@latest
 *   2. Crear proyecto: sanity init (toma este config y crea projectId/dataset)
 *   3. Levantar Studio local: sanity dev
 *   4. Deploy: sanity deploy → te da URL https://<nombre>.sanity.studio
 *
 * Alternativa: deploy embebido en este repo via sanity-astro (decisión pendiente).
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'niza-splash',
  title: 'Niza · Splash',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Splash · Portal de marca')
              .child(S.document().schemaType('splash').documentId('splash-singleton')),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => t.schemaType !== 'splash'),
  },

  document: {
    actions: (input, context) =>
      context.schemaType === 'splash'
        ? input.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((t) => t.templateId !== 'splash')
        : prev,
  },
});
