// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Set the deployment URL for Vercel
  site: 'https://depot-heights.vercel.app',
  
  // Ensure trailing slashes for SEO consistency
  trailingSlash: 'always',
  
  // Configure metadata for the site
  title: {
    default: 'Depot Heights - HDB Estate Guide',
    template: '%s | Depot Heights',
  },
  
  // Experimental features if needed
  experimental: {
    // Enable easier client directives if needed
  },
  
  // Integrations and plugins can be added here
  // integrations: [],
});
