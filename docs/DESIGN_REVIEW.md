# Design review — 31 October 2026



## Fixed in this revision



- Build finalization overwrote bundled pages with source HTML, breaking deployed styling. Vite now uses the generated directory as its root and preserves processed output.

- Localized homepages were bare HTML fragments without document head, header, footer, or asset entrypoints. Every route now has a complete static shell.

- Replaced the two-language gateway with the complete English homepage. EN/ES controls remain available throughout the site.

- Unified project base paths across navigation, service cards, footer, favicon, canonical URLs, sitemap, and bundled assets.

- Language switches and hreflang metadata now pair the actual page, including translated service slugs.

- Reworked hierarchy, spacing, responsive header, service cards, process steps, FAQ, footer, buttons, and the technical workflow graphic. Service detail content now has a proper centered container.

- Removed a clipped inline logo in favor of the existing logo asset. Localized navigation, skip link, diagram and contact availability messages.

- Kept mobile navigation usable without JavaScript; visible focus and reduced-motion support remain.

- Replaced POSIX-only npm environment syntax with a portable Node runner, corrected Windows validation entrypoint detection, and added PR CI plus output checks.

- Preserved the owner-supplied specification in this repository without silently rewriting its requirements.



## Verification



Automated: bilingual content validation; generator regressions for full document shells and translated service routes; production build; all generated pages checked for CSS bundling, source-script leakage, one H1, missing internal routes/assets, and sitemap coverage. Browser checks: desktop homepage; 390px mobile homepage and menu opening; English AI service detail and language switching to its Spanish counterpart. Full browser/device matrix and Lighthouse remain unverified.



## Remaining specification gaps and owner decisions



These existed before the redesign and should not be mistaken for completed launch requirements:



- Contact email and booking URL are null. Supply real approved details in `content/site.json`; unavailable actions remain hidden.

- Privacy/legal copy is unapproved. There is no enforced legal launch gate; current npm builds deliberately permit draft contact configuration. Agree a preview versus production release policy before enforcing a launch block on the existing deployment.

- The source content contains only a subset of the full proposed subservice catalog. Review delivery capabilities and expand bilingual JSON against specification section 4.

- Much homepage copy is still in generator templates rather than JSON; further content-model work is needed for fully owner-editable copy.

- Service problem/workflow sections use shared generic text; category-specific use cases, breadcrumbs and additional structured data remain incomplete.

- FAQ category filtering and the services navigation dropdown are not implemented.

- Social sharing still uses the existing SVG rather than the specified 1200×630 PNG; some sharing clients do not support SVG previews.

- Production custom-domain DNS, HTTPS, indexing and social previews require verification after owner configuration. No domain settings were changed in this PR.

- Lighthouse, screen readers, 200% zoom and the full cross-browser/device matrix are not certified by automated route checks.

- The existing Vite 5 dependency tree reports two npm audit findings during installation; dependency/security upgrades should be reviewed separately.



## Specification clarification for this revision



Use a full English-default landing page at `/` with a canonical pointing to `/en/`, rather than a separate language-choice screen. This is consistent with the lightweight English-default option in section 3 while giving visitors immediate company information. Use explicit translated routes for the language switch. For project Pages hosting, prepend the configured base path to every internal URL. Preserve the intended apex domain as a future configuration rather than forcing an unverified domain on the existing project deployment.

