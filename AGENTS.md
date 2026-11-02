# Working on Sintelium

## Product and boundaries

This is a bilingual, statically generated marketing site: Vite, native ES modules, CSS, and JSON content. Essential content must work without JavaScript. Preserve English/Spanish routes, SEO, accessibility, light/dark themes, and project-path hosting. Do not add a framework or runtime service without a concrete product need.

Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) before structural changes. Use [skills/maintain-site/SKILL.md](skills/maintain-site/SKILL.md) for site implementation and review. Product requirements live in docs/WEBSITE_SPECIFICATION.md; content editing guidance lives in CONTENT_GUIDE.md.

## Implementation rules

- Keep content in content/, rendering in scripts/render/, build IO in scripts/, browser behavior in src/, and design values in src/styles/tokens.css.
- Prefer small cohesive modules and explicit dependencies. Templates must not read files or mutate the filesystem. Browser modules should accept the environment they use so behavior can be tested.
- Reuse routing and layout helpers. Do not concatenate independent variants of localized URLs. Keep the configured basePath in every internal URL.
- Treat localized JSON strings as plain text. Escape text/attributes at the HTML boundary; validate URL schemes before rendering links. Do not introduce raw HTML content fields casually.
- Use semantic HTML, keyboard-operable controls, visible focus, localized accessible names, and synchronized ARIA state. Preserve progressive enhancement.
- Preserve stylesheet order. Prefer editing the owning rule over appending an override. Use tokens for shared design values. Verify both themes and the 760px header breakpoint when changing CSS.
- Avoid speculative abstractions, unrelated rewrites, new dependencies for native capabilities, and comments that only repeat code. Explain decisions and invariants where needed.
- Never edit src/generated/ or dist/ by hand or commit them. Leave unrelated user changes alone.
- Do not fabricate contact details or legal approval. Draft builds explicitly permit missing contact configuration; passing checks is not launch approval.

## Validation and delivery

Run npm run check before completing implementation changes (npm.cmd on PowerShell hosts that block npm.ps1). It checks JavaScript syntax, content, behavior tests, production build, and output links/assets. Add regression tests for changed behavior and validation boundaries, not tests that merely assert implementation details.

For visual changes, inspect production preview in both locales, themes, and mobile/desktop sizes; report any unperformed browser checks. For behavior-preserving template refactors, compare generated documents before/after. Keep package-lock.json aligned with dependency changes and use npm ci in CI.

Report what changed, what passed, and remaining limitations. Do not deploy or publish merely because a refactor was requested.
