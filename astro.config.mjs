// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = process.env.PUBLIC_SITE_URL ?? 'https://nizaequipamientos.com.ar';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
