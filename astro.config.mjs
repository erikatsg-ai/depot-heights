import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://depot-heights.pages.dev',
  integrations: [sitemap()],
});