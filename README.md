# Sintelium website

A bilingual static marketing website for Sintelium built with Vite, vanilla JavaScript, and CSS. Content is authored in JSON and generated into localized static pages for English and Spanish.

## Prerequisites

- Node.js 20.19+ (Node.js 24 tested)
- npm

## Install

```bash
npm install
```

## Commands

```bash
npm run validate
npm run build
npm run test
npm run check:dist
npm run dev
```

## Content model

- `content/site.json` contains domain and contact configuration.
- `content/navigation.json` defines navigation and CTA labels.
- `content/pages.json` defines route maps for shared pages.
- `content/services.json` includes all category and subservice content.
- `content/faqs.json` contains all FAQ entries in both languages.
- `content/process.json` defines the four-step engagement process.
- `content/use-cases.json` contains illustrative use cases.
- `content/seo.json` contains unique metadata per page.
- `content/legal.json` includes the legal review status template and owner gate.

## Editing content

- Maintain both `en` and `es` versions for every localized field.
- Add service categories in `content/services.json` and keep their routes aligned with `pages.json`/route generation.
- Update contact configuration only in `content/site.json` and use approved URLs or email addresses.
- If both `bookingUrl` and `email` are unset, the build will stop in production mode unless `ALLOW_UNCONFIGURED_CONTACT=true` is used for local-only development.

## Local preview

```bash
npm run dev
```

## Production deployment

The build produces a static `dist` output for GitHub Pages. Pull requests run validation, tests, build, and route/asset checks. Pushes to main publish the checked artifact.

## Notes

- Legal pages intentionally remain templates until the owner approves legal content.
- Contact links cannot be fabricated; use approved configuration only.
- No backend or runtime API is required for essential content.

## Design and implementation reference

The original supplied brief is preserved in [docs/WEBSITE_SPECIFICATION.md](docs/WEBSITE_SPECIFICATION.md). See [docs/DESIGN_REVIEW.md](docs/DESIGN_REVIEW.md) for the redesign, verification, and remaining gaps. The brief describes the intended product; it is not a claim that every acceptance criterion is implemented.

Shared design tokens are in `src/styles/tokens.css`; the current visual system and responsive refinements are in `src/styles/refinements.css`. The technical diagram is an accessible inline SVG in the page generator. Keep its text translated. No fonts or images load from third parties.

## Hosting paths

`content/site.json` is the single source for `domain` (origin only) and `basePath` (no trailing slash). The existing project deployment uses `https://ivotabako.github.io` with `/sintelium`. Local preview is at `http://127.0.0.1:4173/sintelium/`. Run `npm run build` then `npm run preview`; use this production preview for final visual checks. `npm run dev` generates pages once; restart it after editing JSON or generator templates. CSS and JS edits update through Vite.

For the intended custom domain, set `domain` to `https://sintelium.io` and `basePath` to an empty string, rebuild, and configure the verified domain in GitHub Pages. `public/CNAME` is included only for domain-root builds. Project builds remove it from output to avoid claiming the custom domain prematurely. Vite outputs localized pages directly into `dist`; finalization must never overwrite bundled HTML with raw templates.

## Launch configuration still required

Contact email/booking URL are unset and legal pages are templates. Current builds allow these draft conditions explicitly so design review and the existing deployment remain possible; this is not a production-readiness gate. Do not treat a passing build as legal/contact approval. Complete the owner checklist in the specification before public launch.

## Light and dark themes

The header sun/moon button toggles the full site palette in either language. On the first visit, the site follows the device color preference; choosing a theme saves `sintelium-theme` in localStorage for subsequent pages and visits on the same browser/origin. Choices synchronize across open tabs. If storage is blocked, the switch still works on the current page. Clear that browser's site data to return to device defaults. Without JavaScript, the light design remains readable and the inactive theme control is hidden.

`src/theme-init.js` is inlined early in each generated head to apply the preference before painting. `src/theme.js` handles the accessible toggle, persistence, device preference changes, and browser toolbar color. `src/styles/themes.css` defines the dark palette and theme-aware logo treatment. The explicit CSS color scheme signals the designed palette to supporting browsers, but embedded browsers with forced color rewriting may still override website styles.

On mobile (760px and below), appearance and language controls are grouped inside the header gear button. Navigation retains its own Menu button. Settings close on Escape, outside click, navigation opening, or breakpoint changes. Desktop controls remain inline. Light mode now uses light hero, diagram, and footer surfaces as well as light content sections; dark mode retains the forest palette.
