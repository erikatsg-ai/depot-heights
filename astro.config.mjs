// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Set the deployment URL for Vercel
  site: 'https://depot-heights.vercel.app',
  
  // Use 'never' to prevent redirection issues on sitemap XML files
  trailingSlash: 'never',
  
  // Register the sitemap integration to auto-generate sitemap-index.xml on build
  integrations: [sitemap()],

  // Inline CSS bundles into HTML to eliminate render-blocking stylesheet requests
  build: {
    inlineStylesheets: 'always',
  },
});