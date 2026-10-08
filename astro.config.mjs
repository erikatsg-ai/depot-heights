// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Set the deployment URL for Vercel
  site: 'https://depot-heights.vercel.app',
  
  // Use 'always' to prevent redirection issues on sitemap XML files
  trailingSlash: 'always',
  
  // Inline CSS bundles into HTML to eliminate render-blocking stylesheet requests
  build: {
    inlineStylesheets: 'always',
  },
});