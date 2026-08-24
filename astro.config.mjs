import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Your site URL - crucial for canonical URLs and sitemap
  site: 'https://depot-heights.pages.dev',
  
  // Strict rule to prevent appending trailing slashes to XML/file extensions
  trailingSlash: 'never',
  
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
  
  // Changed to 'file' to ensure static files and assets map cleanly without trailing slash loops
  build: {
    format: 'file',
  },
});
