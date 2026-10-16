# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Builds the Pagefind index, then starts the local dev server at `localhost:4321` |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

The local Pagefind index is generated from a production build when the dev server starts. It reflects the content at startup; rerun `npm run dev` after changing indexed page content to refresh search results. `npm run build` generates the production site and its Pagefind index in `dist/pagefind/`.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Page SEO metadata

Every page using `src/layouts/Layout.astro` must provide a unique `title`, a
page-specific `description`, and a single `focusKeyword`. The shared contract
is defined in `src/utils/seo.ts`, so missing fields fail Astro's type check.

Use a concise, accurate title and description that reflect the page content.
Choose a natural-language focus phrase that describes that page's primary
search intent. The focus phrase is editorial guidance only; it is not emitted
as a `meta keywords` tag, which search engines do not use for ranking.
