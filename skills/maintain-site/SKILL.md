---
name: maintain-site
description: Implement or review changes to the Sintelium static Vite site, including localized templates, browser controls, styles, and build output.
---

Read ../../AGENTS.md and ../../docs/ARCHITECTURE.md. Choose the module owning the requested behavior rather than adding another global override or expanding the build entrypoint.

For a route or template change, follow content -> route helpers -> page renderer -> shared layout -> generated HTML. Keep explicit translated counterparts and canonical/hreflang URLs aligned. Generated files are disposable; fix their source.

For browser interactions, keep state changes and ARIA updates together. Exercise keyboard dismissal, focus return, mutually exclusive header panels, breakpoint changes, and missing optional elements. Theme bootstrap must remain early and standalone to avoid a flash of the wrong palette.

For content changes, validate both locales and inspect the generated affected pages. Contact values must come from approved site configuration; legal templates remain drafts until the owner supplies approved content.

Run npm run check. After template-only refactoring, compare generated output to a baseline. For visual changes, use production preview and check English/Spanish, light/dark, and small/large screens. Report checks actually performed and unresolved gaps.
