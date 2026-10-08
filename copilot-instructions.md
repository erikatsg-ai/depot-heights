# Copilot Instructions

## Project

- This is a statically generated Astro site for Depot Heights, Singapore.
- The canonical site URL is `https://depot-heights.vercel.app`.
- The site is deployed through Vercel from the GitHub repository; pushes to `main` trigger deployment.
- Use Node.js `>=22.12.0`.

## Development and validation

- Run `npm run dev` for local development.
- Run `npm run build` to build the site and generate the Pagefind search index.
- Run `npm run preview` to preview a production build.
- Keep `public/sitemap.xml` as the site's only XML sitemap. `public/robots.txt` and the sitemap link in the shared layout should point to it.
- Keep `/search/` out of the XML sitemap and set its robots directives to `noindex, follow` for both general crawlers and Google.

## Change guidelines

- Follow existing Astro component, styling, and content patterns.
- Make focused changes and avoid modifying unrelated files or generated output.
- After SEO or routing changes, verify the production build output, not just the source files.
- Do not claim a deployment is live until the deployed site has been checked.
