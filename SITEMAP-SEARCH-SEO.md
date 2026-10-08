# Sitemap and Search Indexing Task

## Goal

Keep the XML sitemap limited to indexable site pages. The internal `/search/` results page should remain usable by visitors but must not be indexed or listed in the sitemap.

## Changes made

- Removed the Astro sitemap integration so builds no longer generate `sitemap-0.xml` or `sitemap-index.xml`.
- Kept the hand-maintained `public/sitemap.xml` and removed the old `public/sitemap-index.xml`.
- Updated `public/robots.txt` and the shared layout's sitemap link to reference `/sitemap.xml`.
- Removed `/search/` from `public/sitemap.xml`.
- Confirmed `src/pages/search.astro` sets `robotsFollow="noindex, follow"`. The shared layout emits this for both `robots` and `googlebot`.

## Validation and deployment

- `npm run build` completed successfully after the sitemap exclusion.
- The generated search page contained both `noindex, follow` directives, and the generated sitemap did not contain `/search/`.
- The sitemap exclusion was pushed to `main` in commit `c22ac49`.
- The last live-site check after that push still found `/search/` in the deployed sitemap, even though the source and build output exclude it. Recheck the Vercel deployment and live sitemap before treating this task as fully deployed.
