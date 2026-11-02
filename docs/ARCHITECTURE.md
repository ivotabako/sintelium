# Architecture and maintenance

Sintelium is a static site with progressive enhancement. Vite bundles generated HTML and browser assets; it is not a client-side router. There is no backend requirement.

## Data flow

1. content/*.json supplies configuration and bilingual content.
2. scripts/validate-content.mjs validates content before generation.
3. scripts/lib/content.mjs loads data; scripts/lib/paths.mjs anchors filesystem paths to the repository.
4. scripts/render/routes.mjs maps page IDs and service categories to localized, base-prefixed routes.
5. scripts/render/layout.mjs owns document metadata, header, footer, and generic page layout. html.mjs owns text escaping/localization.
6. home.mjs, services.mjs, company.mjs, and legal.mjs provide page renderers through explicit content/routing/layout dependencies. They do not perform IO.
7. scripts/build.mjs composes renderers and writes src/generated/. Vite bundles the pages to dist/. Finalization adds sitemap/robots and handles CNAME.
8. scripts/check-dist.mjs verifies bundled documents and internal destinations.

## Browser code and CSS

src/main.js is the composition entrypoint. src/ui/header.js owns navigation/settings state, dismissal, and accessible labels. src/theme.js owns interactive appearance preferences; src/theme-init.js is intentionally standalone and inlined before paint. Keep those two theme contracts covered together.

CSS loads in this order: tokens, base, layout, components, refinements, themes. The last two layers contain the existing visual redesign and theme overrides; moving selectors between layers can change the cascade. Keep visual changes separate from mechanical module extraction and verify them in a browser.

## Extending the site

Add shared pages in content/pages.json and register their renderer in scripts/build.mjs. Add service categories through content/services.json and update the category validation if the supported catalogue changes. Update bilingual SEO/navigation as appropriate. Routing/output tests should derive expectations from content when counts or categories are intentionally changed.

All renderer factories accept dependencies and return rendering functions. They can be imported without generating files. Keep filesystem side effects in command entrypoints. Use built-in Node tests for behavioral contracts; avoid introducing a test framework solely for simple helpers.

## Quality checks

npm run check runs syntax checking, content validation, tests, production build, and distribution verification. CI runs the same command. npm run preview serves the built artifact; use the configured base path from content/site.json. On Windows, npm.cmd avoids PowerShell script execution policy issues.

Draft builds currently allow unset contact configuration, as documented in README.md. Direct execution of scripts/validate-content.mjs is strict unless ALLOW_UNCONFIGURED_CONTACT=true is explicitly set. Neither mode grants legal approval.

## Authored language selection

English and Spanish are separate static documents selected through ordinary links. The document root opts out of automatic translation, with a matching Google translation hint, so browser translation does not replace the selected authored language after navigation. Preserve the actual locale in lang, metadata, and language link destinations.
