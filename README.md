# Sintelium website

A bilingual static marketing website for Sintelium built with Vite, vanilla JavaScript, and CSS. Content is authored in JSON and generated into localized static pages for English and Spanish.

## Prerequisites

- Node.js 18+
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

The build produces a static `dist` output for GitHub Pages. The CI workflow should run checks and publish the generated artifact.

## Notes

- Legal pages intentionally remain templates until the owner approves legal content.
- Contact links cannot be fabricated; use approved configuration only.
- No backend or runtime API is required for essential content.
