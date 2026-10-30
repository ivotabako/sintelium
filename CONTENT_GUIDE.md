# Content Guide

This project is intentionally content-driven. Update all product and service copy in the JSON files under `content/`.

## Required translation rule

Every localized field must include both `en` and `es` keys. Validation fails if any are missing.

## Top-level files

- `content/site.json`: brand, domain, contact, social, and legal baseline configuration.
- `content/navigation.json`: header links and CTA labels.
- `content/pages.json`: canonical public routes for shared pages.
- `content/services.json`: categories and subservices; includes route definitions, summaries, and deliverables.
- `content/faqs.json`: FAQ content and optional featured grouping.
- `content/process.json`: steps for the process page.
- `content/use-cases.json`: descriptive illustrative examples.
- `content/seo.json`: title and description metadata for each page.
- `content/legal.json`: legal review status and templates for pending publication approval.

## Safe editing patterns

- Never hardcode service copy into HTML templates.
- Keep route slugs stable and localized directly in the JSON files.
- Re-run `npm run validate` after any content change.
- Use neutral, factual language without fabricated claims or proof.

## Adding a service

1. Add the category object to `content/services.json`.
2. Add the corresponding localized route under the matching locale path.
3. Ensure title, summary, subservices, and deliverables all include `en` and `es` strings.
4. Validate the build and review the generated service page.
