import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Your site URL - crucial for canonical URLs and sitemap
  site: 'https://depot-heights.pages.dev',
  
  // Helps with URL handling
  trailingSlash: 'ignore',
  
  integrations: [
    sitemap({
      // Only include important pages
      filter: (page) => 
        !page.includes('/api/') && 
        !page.includes('/admin/'),
      
      // Last modification date
      lastmod: new Date(),
      
      // Change frequency (optional)
      changefreq: 'weekly',
      
      // Priority (optional)
      priority: 0.7,
    })
  ],
  
  // Build options for better performance
  build: {
    format: 'directory',
  },
});