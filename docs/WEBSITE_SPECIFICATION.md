# Sintelium — Website Product & Implementation Specification

**Domain:** `https://sintelium.io`  
**Document status:** Implementation-ready specification, v1.0  
**Audience:** GitHub coding agent, designer, content reviewer, and project owner  
**Primary language:** English (`en`)  
**Second language:** Spanish (`es`)  
**Architecture:** Vite + vanilla JavaScript + CSS, statically generated HTML, JSON-authored content, GitHub Pages hosting  
**Primary conversion:** Book a discovery call  
**Brand positioning:** AI transformation & agentic automation consultancy

> **Agent instruction:** Build a complete, production-ready, bilingual marketing website for Sintelium using this document as the source of truth. Do not add a backend, a frontend SPA framework, a CMS, or third-party runtime APIs. Make reasonable implementation choices where unspecified, document them, and do not fabricate company achievements, clients, partnerships, certifications, testimonials, pricing, or guarantees. All contact details and booking links must be configurable, and unconfigured actions must not lead to broken or placeholder destinations.

---

## 1. Business context and product goals

Sintelium helps organizations adopt AI and agentic automation, develop custom software, modernize existing systems, improve reliability and performance, strengthen security, and transform engineering workflows. Serve startups, SMEs, mid-market companies, and enterprises globally with an enterprise-grade but approachable presentation. Emphasize AI transformation and autonomous workflows on the homepage while presenting broad, credible software engineering capabilities.

**Do not prominently mention the founder's 25 years of experience.** The About page may discuss technical depth and hands-on expertise in general terms, but avoid unverifiable numerical claims or unsupported credentials. Present Sintelium as a consultancy, not as a large agency with invented teams or offices.

### Business outcomes

1. Generate qualified discovery-call bookings.
2. Explain AI and agentic offerings to technical and nontechnical buyers.
3. Build trust through clear methodology, technical specificity, and realistic commitments.
4. Demonstrate the breadth of software engineering services without diluting the AI-first positioning.
5. Support international discoverability in English and Spanish.
6. Make all site copy, navigation, services, and contact configuration maintainable in JSON.

### Success metrics (instrumentation-ready, not fabricated)

- Primary CTA clicks and completed booking handoffs (only if analytics is configured).
- Contact email link clicks.
- Service-category page visits and clickthroughs.
- Organic search impressions, indexed pages, and Core Web Vitals.
- Language-switch engagement.

No analytics provider is required for launch. Do not claim conversions or track users without consent/legal review where applicable.

---

## 2. Positioning, messaging, and voice

### Brand promise

**Practical AI transformation, backed by rigorous software engineering.**

### Suggested headline

**Build smarter systems. Move business forward.**

### Suggested subheadline

**Sintelium designs and delivers AI agents, intelligent automation, and dependable software solutions—from first strategy to production deployment.**

### Supporting message

**Make AI useful, not just impressive.** We identify valuable opportunities, integrate with real business systems, and engineer solutions that are secure, observable, maintainable, and built to evolve.

### Voice principles

- Professional, trustworthy, approachable, clear, and technically grounded.
- Outcome-oriented without inflated promises.
- Explain acronyms on first use in customer-facing copy.
- Prefer concrete verbs: assess, design, integrate, automate, modernize, secure, optimize, deliver.
- Avoid empty hype such as “revolutionary,” “guaranteed ROI,” “fully autonomous with zero oversight,” or “enterprise-certified.”
- Do not invent social proof or present example projects as actual completed engagements.

### Audiences and motivations

| Audience | Primary need | Relevant offering |
|---|---|---|
| Small business owner | Reduce manual work and improve operations | Workflow automation, AI assistants, custom tools |
| Startup founder | Validate and launch quickly | MVPs, product engineering, AI integration |
| CTO / engineering leader | Modernize, scale, and reduce technical risk | Architecture, modernization, performance, security |
| Enterprise innovation leader | Move AI pilots into governed production | AI transformation, agents, evaluations, integration |
| Operations leader | Streamline cross-system workflows | Process discovery, integrations, agentic automation |

---

## 3. Information architecture and routes

Use **real static HTML pages for every public URL**, not an SPA relying on client-side routing. A Vite-compatible build-time prerender script must create all localized HTML entrypoints, injecting JSON-derived text and SEO metadata. JavaScript may enhance interactions but essential page content must be readable without JavaScript.

### Route matrix

| Page | English | Spanish |
|---|---|---|
| Homepage | `/en/` | `/es/` |
| Services index | `/en/services/` | `/es/servicios/` |
| AI transformation & agentic automation | `/en/services/ai-transformation/` | `/es/servicios/transformacion-ia/` |
| Custom software engineering | `/en/services/software-engineering/` | `/es/servicios/ingenieria-software/` |
| Modernization & architecture | `/en/services/modernization/` | `/es/servicios/modernizacion/` |
| Performance, cloud & reliability | `/en/services/performance-cloud/` | `/es/servicios/rendimiento-cloud/` |
| Security & quality engineering | `/en/services/security-quality/` | `/es/servicios/seguridad-calidad/` |
| Data & integrations | `/en/services/data-integrations/` | `/es/servicios/datos-integraciones/` |
| Advisory & engineering enablement | `/en/services/advisory/` | `/es/servicios/consultoria/` |
| About | `/en/about/` | `/es/nosotros/` |
| Process | `/en/process/` | `/es/proceso/` |
| FAQ | `/en/faq/` | `/es/preguntas-frecuentes/` |
| Contact | `/en/contact/` | `/es/contacto/` |
| Privacy | `/en/privacy/` | `/es/privacidad/` |
| Legal notice | `/en/legal/` | `/es/aviso-legal/` |
| 404 | `/404.html` | Shared localized fallback where possible |

**Root `/`:** A lightweight, crawlable English-default landing or redirect page linking to `/en/` and `/es/`; avoid automatic geolocation or Accept-Language routing that cannot run on static hosting. Set `x-default` hreflang to root, with language links. Preserve path and query only when safe. Language switch maps each page to its explicit translated counterpart, not a naive string replacement.

### Global navigation

Logo (home), Services (accessible dropdown), Process, About, FAQ, Contact, language switch EN/ES, prominent **Book a discovery call** button. Mobile navigation uses an accessible toggle, Escape to close, focus management, and scroll behavior without trapping users unexpectedly. Footer includes service links, company summary, email, privacy, legal notice, language links, and copyright year.

### Page-specific content requirements

**Home:** Hero with two CTAs; practical value proposition; AI transformation spotlight; 4–6 featured service cards; outcomes/benefits; how we work (four stages); example use cases clearly labeled *illustrative*; engineering principles; FAQ preview; final discovery-call CTA.

**Services index:** Intro; grouped category cards; common business challenges; engagement models (fixed-scope, time & materials, retainer) without pricing; delivery approach; CTA.

**Each service category page:** Localized hero; problems addressed; 5–12 subservices; typical deliverables; example use cases explicitly hypothetical; engagement workflow; relevant adjacent categories; FAQ subset; CTA. Do not duplicate identical generic copy across all pages.

**About:** Mission, practical philosophy, engineering values, how Sintelium collaborates, commitment to responsible AI and maintainability; no invented team size or clients.

**Process:** Discover → Design → Build & Integrate → Validate & Evolve. Explain checkpoints, scope management, handover, security review, and client involvement.

**FAQ:** 12–18 substantive questions, category-filterable with accessible native controls or simple JS; no backend.

**Contact:** Booking CTA; email contact; brief explanation of what to include in an inquiry; no deceptive form that implies submission to a server. Optional mailto composer only if it clearly opens the user's email application.

**Privacy and legal:** Clearly marked content requiring owner/legal review before publication; no fake legal entity, postal address, registration number, or compliance assertions. Configure actual privacy notice for hosting, scheduling, email and optional analytics. If not approved, block production launch rather than publishing fabricated legal text.

**404:** Helpful EN/ES links, homepage and services links, branded styling.

---

## 4. Detailed service catalog

The service taxonomy below is the **complete proposed offering**. Populate `services.json` with localized descriptions and at least one concrete deliverable per subservice. Homepage prioritizes category A; other categories remain discoverable. Do not claim every capability is staffed or certified: offerings must be reviewed by the business owner before publication.

### A. AI transformation & agentic automation (primary)

1. **AI opportunity assessment:** workflow inventory, feasibility, prioritization, data readiness, risk analysis, and roadmap.
2. **AI adoption strategy:** use-case selection, proof-of-value plans, operating model, governance, and rollout sequencing.
3. **Custom AI agents:** task-focused agents with tools, permissions, state management, and human approval.
4. **Multi-agent systems:** specialized agent coordination, orchestration, task routing, and failure recovery.
5. **Agentic business workflows:** event-driven and approval-driven automation spanning internal tools.
6. **LLM application engineering:** model integration, prompt architecture, structured outputs, tool calling, and fallback logic.
7. **RAG and enterprise knowledge assistants:** ingestion, indexing, retrieval, permissions-aware search, citations, and evaluation.
8. **AI copilots:** assistants embedded into support, operations, sales, or internal productivity workflows.
9. **Document intelligence:** extraction, classification, summarization, validation, and review queues.
10. **Conversational interfaces:** internal and customer-facing assistants with escalation paths.
11. **AI system evaluation:** benchmark datasets, task success rates, hallucination tests, regression suites, and quality gates.
12. **AI safety and governance:** data handling, prompt injection defenses, guardrails, auditability, and approval policies.
13. **AI observability and operations:** tracing, cost monitoring, latency, drift signals, incident response, and feedback loops.
14. **Model/provider selection:** quality, privacy, latency, availability, and total-cost comparisons.
15. **AI integration and migration:** connecting AI functionality to existing APIs, workflows, and data sources.
16. **Human-in-the-loop design:** escalation, review interfaces, confidence thresholds, and rollback procedures.
17. **AI proof of concept to production:** prototyping, evaluation, hardening, deployment, and handover.
18. **Agentic SDLC transformation:** repository-aware coding agents, automated test generation, AI code review, and engineering workflow governance.

**Representative deliverables:** opportunity matrix, AI architecture, working agent prototype, integration specifications, evaluation reports, deployment runbooks, governance recommendations, production-ready system where scoped.

### B. Custom software engineering

1. Product discovery and technical requirements.
2. Web application and dashboard development.
3. Backend and API engineering.
4. SaaS platform architecture and implementation.
5. MVPs and proof-of-concept development.
6. Enterprise internal tools and portals.
7. Microservices and service-oriented systems.
8. Event-driven and asynchronous applications.
9. Third-party API integrations and middleware.
10. Authentication, authorization, and identity integrations.
11. Database and persistence layer engineering.
12. Technical documentation, onboarding, and handover.
13. Ongoing feature development and product iteration.
14. Production bug investigation and critical fixes.

**Deliverables:** architecture and design decisions, source code, tests, deployment configuration, technical documentation, and handover.

### C. Legacy modernization & architecture

1. Legacy application audits and modernization roadmaps.
2. Codebase restructuring and large-scale refactoring.
3. Monolith modularization and decomposition.
4. Framework, runtime, and dependency upgrades.
5. API redesign and versioning strategies.
6. Architecture reviews and system redesign.
7. Cloud-readiness and migration planning.
8. Data model and database migration.
9. Technical debt identification and prioritization.
10. Legacy integration and interoperability.
11. Incremental replacement / strangler-pattern migrations.
12. AI-assisted migration with human review and regression controls.
13. System rescue and stabilization.

**Deliverables:** assessment, risk register, target architecture, staged migration plan, migrated components, regression tests.

### D. Performance, cloud & reliability

1. Performance profiling and bottleneck analysis.
2. Application response-time and throughput optimization.
3. Database query/index tuning.
4. Caching and content-delivery strategy.
5. Load, stress, and capacity testing.
6. Concurrency and distributed-systems improvements.
7. Cloud infrastructure architecture and migration.
8. Containerization and orchestration.
9. CI/CD and release automation.
10. Infrastructure as code and environment reproducibility.
11. Monitoring, logs, metrics, and distributed tracing.
12. Reliability engineering, incident analysis, and recovery planning.
13. Scalability architecture and resilience testing.
14. Cloud resource and operational cost optimization.
15. Backup, disaster recovery, and business continuity planning.

**Deliverables:** baseline metrics, profiling findings, optimized code/configuration, load-test report, dashboards, runbooks.

### E. Security & quality engineering

1. Secure code review and threat modeling.
2. Dependency and software supply-chain vulnerability review.
3. Authentication and authorization assessments.
4. API security assessments.
5. Secrets and configuration hygiene.
6. Security patching and remediation support.
7. Static analysis and secure CI/CD checks.
8. Security architecture and least-privilege design.
9. Application hardening and security regression tests.
10. Automated unit, integration, and end-to-end testing.
11. Test strategy and coverage improvement.
12. Code quality, maintainability, and architecture fitness checks.
13. Release readiness and quality gates.
14. Secure AI application reviews, including prompt injection and tool-permission risks.

**Deliverables:** prioritized findings, remediation plan, patches, test suites, secure development recommendations. **Do not advertise formal penetration testing, compliance certification, or audit attestations unless explicitly confirmed.**

### F. Data engineering & integrations

1. Data architecture and modeling.
2. ETL/ELT pipelines and workflow orchestration.
3. Database migrations and synchronization.
4. Data quality, validation, and lineage.
5. Search and indexing infrastructure.
6. Vector database integration and retrieval infrastructure.
7. Real-time and event-stream processing.
8. Analytics data preparation and reporting integrations.
9. CRM, ERP, and business application integrations.
10. API integration and data exchange design.
11. AI-ready knowledge-base ingestion and transformation.
12. Data access controls, retention, and privacy-aware design.

**Deliverables:** pipelines, integration adapters, data contracts, validation checks, operational documentation.

### G. Advisory & engineering enablement

1. Technology strategy and solution architecture.
2. Fractional technical leadership / CTO advisory where appropriate.
3. Technical due diligence and codebase assessment.
4. Engineering delivery and SDLC process review.
5. AI adoption enablement for development teams.
6. Developer productivity and tooling improvements.
7. AI coding assistant and agent workflow governance.
8. Build-versus-buy and vendor selection support.
9. Engineering standards, architecture decision records, and documentation.
10. Team coaching and technical workshops.
11. Maintenance strategy and lifecycle planning.
12. Independent architecture and performance reviews.

**Deliverables:** assessment reports, architecture options, recommendations, roadmaps, workshops, implementation plans.

### Engagement models

- **Fixed-scope project:** agreed objectives, milestones, acceptance criteria, and change management.
- **Time and materials:** flexible engineering and consulting capacity with transparent tracking.
- **Ongoing retainer:** agreed support, modernization, optimization, or continuous delivery capacity.

Do not publish prices or suggest guaranteed delivery timelines. Every proposal is scoped individually.

---

## 5. Recommended English website copy

The implementation agent must place copy in JSON, not directly in HTML templates. These are approved **drafts pending owner review**, not claims of completed work.

### Homepage

**Eyebrow:** `AI TRANSFORMATION · AGENTIC AUTOMATION · SOFTWARE ENGINEERING`  
**H1:** `Build smarter systems. Move business forward.`  
**Lead:** `Sintelium helps businesses turn AI opportunities into reliable software. We design intelligent agents, automate complex workflows, modernize applications, and deliver solutions built for real-world operations.`  
**Primary CTA:** `Book a discovery call`  
**Secondary CTA:** `Explore our services`  
**Trust line:** `Practical engineering. Clear collaboration. Solutions designed to last.`

**Section title:** `From AI ambition to working systems`  
**Section intro:** `We combine AI strategy with hands-on engineering to take ideas from exploration through integration, validation, and production.`

**Featured cards:**
- `AI Agents & Automation` — `Design agents and workflows that connect models, data, tools, and human decisions.`
- `AI Transformation` — `Find high-value opportunities and build a realistic roadmap from pilot to production.`
- `Custom Software` — `Create dependable applications, APIs, and business platforms tailored to your needs.`
- `Modernization` — `Improve existing systems through targeted refactoring, migration, and architectural change.`
- `Performance & Reliability` — `Remove bottlenecks, strengthen resilience, and prepare systems to scale.`
- `Security & Quality` — `Reduce technical risk with secure engineering, testing, and remediation.`

**Benefits heading:** `Technology that works for your business`  
**Benefit items:** `Reduce repetitive work`; `Connect disconnected systems`; `Improve software reliability`; `Build with security in mind`; `Keep people in control of AI decisions`.

**Process heading:** `A clear path from idea to impact`  
**Steps:** `Discover the challenge`; `Design the right approach`; `Build and integrate`; `Validate, launch, and improve`.

**Illustrative use-case heading:** `Where intelligent engineering can help`  
**Examples (label “Illustrative use cases”):** `Automate document intake and review`; `Create a knowledge assistant for internal teams`; `Modernize a business-critical application`; `Improve API performance under growing demand`.

**Closing heading:** `Let's discuss what your business needs next.`  
**Closing text:** `Whether you're exploring AI or improving a complex software system, we'll start with the problem and work toward a practical solution.`  
**CTA:** `Book a discovery call`.

### Services index

**H1:** `Services that connect AI ambition with engineering execution.`  
**Lead:** `From AI agents and automation to software modernization, security, and cloud reliability, Sintelium supports the full journey from technical strategy to delivery.`

### About

**H1:** `Engineering with purpose. AI with practical value.`  
**Lead:** `Sintelium is a software and AI consultancy focused on solving meaningful business challenges through thoughtful architecture, responsible automation, and dependable delivery.`  
**Values:** `Clarity over complexity`; `Engineering discipline`; `Responsible AI`; `Long-term maintainability`; `Transparent collaboration`.

### Process

**H1:** `A straightforward way to solve complex challenges.`  
**Discover:** `Understand business goals, constraints, systems, and risks.`  
**Design:** `Define architecture, priorities, success criteria, and a delivery plan.`  
**Build:** `Implement, integrate, and test in close collaboration with stakeholders.`  
**Validate & evolve:** `Measure against agreed criteria, document outcomes, and plan the next improvements.`

### Contact

**H1:** `Let's talk about your next project.`  
**Lead:** `Tell us what you're trying to achieve. We can explore AI opportunities, review an existing system, or discuss a new software solution.`  
**Primary CTA:** `Book a discovery call`  
**Secondary CTA:** `Send an email`  
**Prompt:** `Helpful details include your business goal, current challenges, approximate scope, and preferred timeline. Please avoid sharing credentials or sensitive data in your first message.`

---

## 6. Spanish localization requirements and starter copy

All navigation, headings, CTAs, descriptions, FAQs, accessibility labels, metadata, legal pages, and service details must have Spanish translations at launch. **Do not use English placeholders on Spanish pages.** Spanish should be natural, professional, international-neutral Spanish, not mechanical word-for-word translation. Human review recommended before launch.

### Core Spanish copy

| Key | Spanish |
|---|---|
| Home eyebrow | `TRANSFORMACIÓN CON IA · AUTOMATIZACIÓN AGÉNTICA · INGENIERÍA DE SOFTWARE` |
| Home H1 | `Sistemas más inteligentes. Empresas que avanzan.` |
| Home lead | `Sintelium ayuda a las empresas a convertir las oportunidades de la inteligencia artificial en soluciones de software fiables. Diseñamos agentes inteligentes, automatizamos procesos complejos, modernizamos aplicaciones y desarrollamos sistemas preparados para el mundo real.` |
| Book CTA | `Reservar una reunión inicial` |
| Explore services | `Explorar servicios` |
| Services H1 | `Servicios que convierten la visión de IA en soluciones reales.` |
| About H1 | `Ingeniería con propósito. IA con valor práctico.` |
| Process H1 | `Una forma clara de resolver desafíos complejos.` |
| Contact H1 | `Hablemos de tu próximo proyecto.` |
| Email CTA | `Enviar un correo` |
| Discover | `Descubrir` |
| Design | `Diseñar` |
| Build | `Desarrollar e integrar` |
| Validate | `Validar y evolucionar` |
| FAQ | `Preguntas frecuentes` |
| Privacy | `Privacidad` |
| Legal | `Aviso legal` |

### Spanish service category labels

- `Transformación con IA y automatización agéntica`
- `Ingeniería de software a medida`
- `Modernización y arquitectura`
- `Rendimiento, cloud y fiabilidad`
- `Seguridad y calidad del software`
- `Ingeniería de datos e integraciones`
- `Consultoría y capacitación técnica`

**Agent requirement:** Translate every subservice title, description, use case, deliverable, FAQ answer, and page metadata into complete Spanish content. A language completeness validator must fail the build if any required translation is missing. Preserve technical meaning and avoid unsupported localized claims.

---

## 7. FAQs: content requirements and initial Q&A

Provide at least 12 questions per language. Initial English draft:

1. **What does Sintelium do?** We help organizations plan, build, integrate, and improve AI-powered and conventional software systems, including agents, automation, modernization, and engineering consulting.
2. **Do we need an existing AI strategy?** No. We can start by identifying opportunities, evaluating feasibility, and defining a practical roadmap.
3. **Can you integrate AI with our current tools?** Often yes, subject to available APIs, data access, security requirements, and a technical assessment.
4. **What is an AI agent?** An AI-enabled system that can reason about a task and use approved tools to take actions within defined controls and oversight.
5. **How do you manage AI reliability?** We define measurable success criteria, test representative scenarios, use safeguards and human review where appropriate, and monitor deployed behavior.
6. **Can you modernize an existing application?** Yes. We can assess its architecture, dependencies, risks, and business priorities before proposing incremental improvements or replacement.
7. **Do you build complete applications?** Yes. Projects can cover discovery, architecture, implementation, testing, deployment, and handover.
8. **Can you help with performance problems?** Yes. We begin with measurement and profiling, then prioritize improvements based on observed bottlenecks.
9. **Do you provide security services?** We offer secure engineering, code and dependency reviews, and remediation support. Formal audits or certifications are not implied.
10. **What project sizes do you accept?** We can discuss focused assessments, targeted improvements, and end-to-end projects; fit depends on scope and availability.
11. **How do engagements work?** Depending on the project, we can discuss fixed-scope delivery, time-and-materials collaboration, or ongoing support arrangements.
12. **Do you publish prices?** No. We prepare proposals based on goals, complexity, constraints, and the work required.
13. **Do you work internationally?** Sintelium is designed to work with clients internationally, subject to practical scheduling, contractual, and legal requirements.
14. **How do we get started?** Book a discovery call or send a short email outlining your goals and challenges.
15. **Will our team stay involved?** Yes. We favor clear checkpoints, shared decisions, and appropriate review and handover.
16. **Can AI agents operate without human oversight?** Some tasks may be automated, but approval controls and human oversight should be proportionate to the risks involved.

Translate all answers to Spanish and store in `faqs.json`. Avoid FAQ rich-result schema unless it is appropriate under current search-engine eligibility guidance; ordinary FAQ markup remains useful.

---

## 8. Design system and visual identity

### Design direction

Minimalist premium technology; approachable, confident, calm, precise. Use **deep green, teal, and graphite**, restrained technical diagrams and code-inspired visual motifs, ample whitespace, crisp typography, and subtle interactions. Avoid neon cyberpunk, stock photos of anonymous office teams, fake dashboards, gratuitous 3D effects, and excessive animation.

### Suggested tokens

```css
:root {
  --color-forest-950: #0B2422;
  --color-forest-900: #12332F;
  --color-teal-600: #147D73;
  --color-teal-500: #1C9A8E;
  --color-teal-100: #DDF4EF;
  --color-graphite-950: #17211F;
  --color-graphite-700: #46534F;
  --color-graphite-500: #65736E;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F5F8F6;
  --color-border: #DCE6E1;
  --color-focus: #087E75;
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --content-width: 1200px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --shadow-card: 0 10px 36px rgb(11 36 34 / 8%);
}
```

Colors are starting points; verify WCAG AA contrast for all text, links, focus states, and buttons. White-on-teal may fail for some token combinations: use a sufficiently dark variant. Default light theme with a dark forest hero and occasional dark sections. Dark-mode support is optional, not a launch requirement.

### Typography and layout

- System font stack to avoid external font dependencies and tracking.
- Desktop body 16–18px, line-height 1.55–1.7; headings via `clamp()`.
- 8px-based spacing rhythm; content max width ~1200px, prose width ~70ch.
- Breakpoints based on content, approximately 480px, 768px, 1024px.
- Mobile-first, minimum touch targets ~44px, readable line lengths.
- Components: header, mobile nav, hero, CTA button, service card, value card, process timeline, FAQ accordion, breadcrumb, footer, language switch, diagram, notice.

### Technical illustration language

Create original inline SVG graphics illustrating: connected nodes and tool permissions; agent orchestration; workflow before/after; software architecture layers; observability signals; secure integration. Diagrams should be informative and accessible, not merely decoration. Decorative SVG uses `aria-hidden="true"`; informative SVG has a localized text alternative. Avoid external image dependencies where practical.

### Logo brief

**Name:** Sintelium  
**Symbol:** Stylized `S` monogram  
**Style:** Geometric, intelligent, minimal, distinctive; may subtly suggest two connected paths, a circuit, or a continuous workflow.  
**Palette:** Deep forest green / teal; monochrome versions mandatory.  
**Deliverables:** Original vector `logo-mark.svg`, `logo-horizontal.svg`, `logo-reversed.svg`, `favicon.svg`, PNG social preview asset.  
**Constraints:** Legible at 16–32px; no overly intricate node network; no copied existing brand marks; no stock trademark assumptions. Logo must remain editable SVG and include sensible accessibility labels where used as meaningful content. Generate at least three conceptual SVG variants during implementation and choose one based on simplicity and legibility. Final trademark clearance is outside website implementation.

### Motion

- Hover transitions 150–250ms, modest elevation/opacity.
- Optional subtle diagram line animation only where useful.
- Respect `prefers-reduced-motion: reduce`.
- No autoplay video, parallax-heavy effects, or scroll hijacking.

---

## 9. Technical architecture

### Non-negotiable constraints

1. Vite + **vanilla JS + plain CSS** only; no React/Vue/Angular, CSS frameworks, backend, serverless functions, or CMS.
2. All editable site content authored in local JSON files organized by content type.
3. Build-time script reads and validates JSON, generates one complete static HTML page per localized route, and writes `dist/`.
4. Client JS is only for progressive enhancements: nav, FAQ interactions if needed, language selection UI, and optional light visual effects.
5. No runtime `fetch()` required for essential content; no network API calls. External booking and `mailto:` links are user-initiated navigations, not backend calls.
6. No secret tokens, API keys, or private data in the repo or frontend bundle.
7. Relative or root-based asset URLs must work at `https://sintelium.io/` and be configurable for GitHub Pages preview under a repository subpath.
8. HTML must be semantically valid and render meaningful content when JS is disabled.
9. All user-visible content must come from JSON or approved reusable design assets, not hardcoded strings in HTML templates. Accessibility and fallback labels should also be localized.

### Suggested repository tree

```text
sintelium-website/
├── .github/workflows/deploy.yml
├── .github/workflows/ci.yml
├── public/
│   ├── favicon.svg
│   ├── robots.txt              # generated or copied with verified origin
│   ├── images/
│   │   ├── logo-mark.svg
│   │   ├── logo-horizontal.svg
│   │   ├── logo-reversed.svg
│   │   └── og-default.png
│   └── CNAME                   # sintelium.io; deploy only for production domain
├── content/
│   ├── site.json
│   ├── navigation.json
│   ├── pages.json
│   ├── services.json
│   ├── faqs.json
│   ├── process.json
│   ├── use-cases.json
│   ├── seo.json
│   └── legal.json
├── src/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   └── components.css
│   ├── scripts/
│   │   ├── main.js
│   │   ├── navigation.js
│   │   └── enhancements.js
│   └── templates/
│       ├── layout.js
│       ├── home.js
│       ├── services-index.js
│       ├── service-detail.js
│       ├── content-page.js
│       └── components.js
├── scripts/
│   ├── build.mjs
│   ├── validate-content.mjs
│   ├── generate-seo.mjs
│   └── check-links.mjs
├── tests/
│   ├── content.test.mjs
│   ├── routes.test.mjs
│   └── seo.test.mjs
├── package.json
├── vite.config.js
├── README.md
└── LICENSE                    # only if owner approves a license
```

**Implementation option:** `scripts/build.mjs` validates content, generates localized source entry HTML into a temporary directory, invokes Vite multi-page build, then generates sitemap/robots/404 and validates `dist`. An equivalent deterministic static generation pipeline is acceptable. Do not rely on Vite's SPA fallback as the published page architecture.

### Rendering and escaping

- Escape text and attribute values inserted into HTML by templates; do not interpolate untrusted content into `innerHTML` without safe handling.
- Validate URLs and allow only `https:`, `mailto:`, and approved internal routes as applicable.
- Keep rich content structured (paragraph arrays, lists) rather than accepting arbitrary HTML in JSON.
- Generate stable route mappings from explicit slugs.
- Fail build on duplicate IDs/slugs, missing locale fields, missing required SEO metadata, broken internal links, invalid booking URLs, and missing required assets.
- Ensure deterministic output, UTF-8 encoding, and no accidental duplicate canonical URLs.

---

## 10. JSON content contracts and concrete examples

The examples below define **shape**, not the full final content. The agent must expand them to all pages, all seven service categories, every subservice, and both languages. Use strict schema validation (custom Node validation or lightweight development-only JSON Schema validator). Every localized object must have `en` and `es` values.

### `content/site.json`

```json
{
  "brand": "Sintelium",
  "domain": "https://sintelium.io",
  "defaultLocale": "en",
  "locales": ["en", "es"],
  "contact": {
    "email": null,
    "bookingUrl": null
  },
  "social": {
    "linkedin": null,
    "github": null
  },
  "organization": {
    "legalName": null,
    "registeredAddress": null,
    "registrationNumber": null
  },
  "logo": {
    "mark": "/images/logo-mark.svg",
    "horizontal": "/images/logo-horizontal.svg"
  }
}
```

**Configuration rule:** `null` means unconfigured. Booking button must be hidden or replaced with a clearly labeled working email CTA until `bookingUrl` is set. The preferred booking URL must be an explicit owner-supplied HTTPS link. Email CTA must be hidden until a real email is supplied; never display `hello@sintelium.io` as confirmed without owner approval. For production readiness, deployment should fail a required-contact check unless at least one working approved contact path is configured. Both email and booking link are launch goals.

### `content/navigation.json`

```json
{
  "primary": [
    { "id": "services", "label": { "en": "Services", "es": "Servicios" }, "routeId": "services" },
    { "id": "process", "label": { "en": "Process", "es": "Proceso" }, "routeId": "process" },
    { "id": "about", "label": { "en": "About", "es": "Nosotros" }, "routeId": "about" },
    { "id": "faq", "label": { "en": "FAQ", "es": "Preguntas frecuentes" }, "routeId": "faq" },
    { "id": "contact", "label": { "en": "Contact", "es": "Contacto" }, "routeId": "contact" }
  ],
  "cta": { "label": { "en": "Book a discovery call", "es": "Reservar una reunión inicial" }, "action": "booking" }
}
```

### `content/pages.json`

```json
{
  "home": {
    "routes": { "en": "/en/", "es": "/es/" },
    "hero": {
      "eyebrow": {
        "en": "AI TRANSFORMATION · AGENTIC AUTOMATION · SOFTWARE ENGINEERING",
        "es": "TRANSFORMACIÓN CON IA · AUTOMATIZACIÓN AGÉNTICA · INGENIERÍA DE SOFTWARE"
      },
      "title": {
        "en": "Build smarter systems. Move business forward.",
        "es": "Sistemas más inteligentes. Empresas que avanzan."
      },
      "description": {
        "en": "Sintelium helps businesses turn AI opportunities into reliable software.",
        "es": "Sintelium ayuda a las empresas a convertir las oportunidades de la IA en software fiable."
      }
    },
    "featuredServiceIds": ["ai-transformation", "software-engineering", "modernization", "performance-cloud", "security-quality", "data-integrations"]
  },
  "services": { "routes": { "en": "/en/services/", "es": "/es/servicios/" } },
  "about": { "routes": { "en": "/en/about/", "es": "/es/nosotros/" } },
  "process": { "routes": { "en": "/en/process/", "es": "/es/proceso/" } },
  "faq": { "routes": { "en": "/en/faq/", "es": "/es/preguntas-frecuentes/" } },
  "contact": { "routes": { "en": "/en/contact/", "es": "/es/contacto/" } },
  "privacy": { "routes": { "en": "/en/privacy/", "es": "/es/privacidad/" } },
  "legal": { "routes": { "en": "/en/legal/", "es": "/es/aviso-legal/" } }
}
```

**Agent:** Expand each page record with complete localized sections and structured blocks; keep `routes` as the source of truth for localized URL generation. Service detail routes live in `services.json`.

### `content/services.json`

```json
{
  "categories": [
    {
      "id": "ai-transformation",
      "priority": 1,
      "featured": true,
      "routes": {
        "en": "/en/services/ai-transformation/",
        "es": "/es/servicios/transformacion-ia/"
      },
      "title": {
        "en": "AI Transformation & Agentic Automation",
        "es": "Transformación con IA y automatización agéntica"
      },
      "summary": {
        "en": "Turn AI opportunities into reliable agents, workflows, and integrated systems.",
        "es": "Convierte las oportunidades de IA en agentes, procesos y sistemas integrados fiables."
      },
      "icon": "agent-network",
      "subservices": [
        {
          "id": "custom-ai-agents",
          "title": { "en": "Custom AI Agents", "es": "Agentes de IA a medida" },
          "description": {
            "en": "Design task-focused agents with approved tools, controls, and human oversight.",
            "es": "Diseñamos agentes orientados a tareas con herramientas autorizadas, controles y supervisión humana."
          },
          "deliverables": {
            "en": ["Agent architecture", "Working prototype", "Evaluation plan"],
            "es": ["Arquitectura del agente", "Prototipo funcional", "Plan de evaluación"]
          }
        }
      ],
      "relatedCategoryIds": ["data-integrations", "security-quality"]
    }
  ]
}
```

**Agent:** Include all seven category IDs exactly: `ai-transformation`, `software-engineering`, `modernization`, `performance-cloud`, `security-quality`, `data-integrations`, `advisory`. Include all catalog subservices from §4, with bilingual descriptions and deliverables. Build must reject any category missing its Spanish route or translation.

### `content/faqs.json`

```json
{
  "items": [
    {
      "id": "what-we-do",
      "category": "general",
      "question": {
        "en": "What does Sintelium do?",
        "es": "¿A qué se dedica Sintelium?"
      },
      "answer": {
        "en": "We help organizations plan, build, integrate, and improve AI-powered and conventional software systems.",
        "es": "Ayudamos a las organizaciones a planificar, desarrollar, integrar y mejorar sistemas de software con y sin inteligencia artificial."
      },
      "featured": true
    }
  ]
}
```

### `content/process.json`

```json
{
  "steps": [
    {
      "id": "discover",
      "number": 1,
      "title": { "en": "Discover", "es": "Descubrir" },
      "description": {
        "en": "Understand goals, constraints, existing systems, and risks.",
        "es": "Comprender objetivos, limitaciones, sistemas existentes y riesgos."
      }
    }
  ]
}
```

### `content/use-cases.json`

```json
{
  "items": [
    {
      "id": "document-automation",
      "isIllustrative": true,
      "title": {
        "en": "Automate document intake and review",
        "es": "Automatizar la recepción y revisión de documentos"
      },
      "description": {
        "en": "An example workflow that extracts data, validates fields, and routes exceptions for human review.",
        "es": "Un ejemplo de proceso que extrae datos, valida campos y deriva excepciones a revisión humana."
      },
      "serviceIds": ["ai-transformation", "data-integrations"]
    }
  ]
}
```

### `content/seo.json`

```json
{
  "defaults": {
    "siteName": "Sintelium",
    "ogImage": "/images/og-default.png",
    "robots": "index,follow"
  },
  "pages": {
    "home": {
      "title": {
        "en": "Sintelium | AI Transformation & Agentic Automation",
        "es": "Sintelium | Transformación con IA y automatización agéntica"
      },
      "description": {
        "en": "AI agents, intelligent automation, and software engineering for ambitious businesses.",
        "es": "Agentes de IA, automatización inteligente e ingeniería de software para empresas con ambición."
      }
    }
  }
}
```

**Agent:** Populate metadata for every route including each service category, About, Process, FAQ, Contact, Privacy, and Legal. Provide descriptive, unique titles and descriptions in both languages.

### `content/legal.json`

```json
{
  "status": "requires-owner-legal-review",
  "privacy": { "en": [], "es": [] },
  "legalNotice": { "en": [], "es": [] },
  "lastReviewed": null
}
```

**Agent:** Do not replace missing legal details with invented content. Create templates/checklist for owner completion, and fail production readiness if legally required pages remain unapproved. Hosting and scheduling service disclosures must reflect the actual providers selected.

---

## 11. SEO, localization, and social sharing

- Each page gets a unique localized `<title>`, meta description, canonical URL, Open Graph title/description/image, Twitter/X card tags, and correct `<html lang>`.
- Emit reciprocal `hreflang="en"`, `hreflang="es"`, and `hreflang="x-default"` on paired pages, including localized service routes.
- Generate XML sitemap from the route registry with canonical production URLs; include language alternates when valid. Do not put `lastmod` dates unless they reflect actual content changes.
- Generate `robots.txt` referencing the production sitemap; avoid indexing preview builds if separate preview origins exist.
- Semantic headings: one H1 per page; logical H2/H3; descriptive internal links; breadcrumbs on service pages.
- Structured data: accurate `Organization`/`ProfessionalService` only with verified information; `WebSite` and `BreadcrumbList` where applicable; `Service` for service pages with truthful descriptions and provider. Avoid fabricated ratings, reviews, offers, addresses, or certifications.
- Create a branded 1200×630 PNG social image with readable title and monogram; avoid text clipping on mobile previews.
- Static HTML must include primary content at initial response; never rely on Google rendering client-side JS for indexing.
- Ensure no broken routes, duplicate canonical pages, thin localized placeholder pages, or mixed-language metadata.
- Avoid claiming that schema markup guarantees rich results.

---

## 12. Accessibility, responsiveness, performance, and security

### Accessibility

- Target WCAG 2.2 AA for implemented UI.
- Semantic landmarks, skip-to-content link, keyboard-operable menus, visible focus, correct button/link semantics.
- Language switch labels clearly identify destination language.
- FAQ accordions may use native `<details>/<summary>` for progressive enhancement.
- SVG accessibility as specified; meaningful images have localized alt text.
- Contrast, zoom to 200%, responsive reflow, and reduced-motion behavior tested.
- No text embedded exclusively in decorative images.

### Performance budgets

- Target Lighthouse ≥95 Performance, ≥95 Accessibility, ≥95 Best Practices, ≥95 SEO on representative pages (targets, not guarantees).
- Aim for LCP ≤2.5s, CLS ≤0.1, INP ≤200ms on realistic mobile conditions.
- Avoid heavy JS; keep initial JS bundle small (suggested ≤50KB gzipped, excluding dev tools), optimize images and SVGs.
- No unnecessary external fonts, trackers, animation libraries, or remote images.
- Use responsive image dimensions, lazy loading for below-fold media, and preload only critical assets.

### Security and privacy

- No secrets in frontend files, config, or CI logs.
- Validate all outbound links; use `rel="noopener noreferrer"` for external `target="_blank"` links.
- Do not process user-entered sensitive data in browser or log it.
- No contact form that pretends to submit without a backend.
- Use safe HTML escaping and URL validation in generation scripts.
- Set security headers where GitHub Pages supports them; acknowledge GitHub Pages cannot freely configure all HTTP response headers. Consider meta CSP only after testing and do not misrepresent it as equivalent to HTTP CSP headers.
- Keep dependencies minimal, pin lockfile, and audit packages in CI.
- Document third-party booking service privacy implications and any cookie/analytics consent requirements.

---

## 13. GitHub Pages and domain deployment

### Deployment assumptions

- Production URL: `https://sintelium.io` (apex domain).
- GitHub Pages uses GitHub Actions deployment from built `dist/` artifacts.
- Domain ownership, DNS access, and repository permissions are owner responsibilities.
- Configure `public/CNAME` as `sintelium.io` for the production deployment, or use GitHub Pages custom-domain settings as appropriate; do not enable an unverified custom domain on a test deployment.
- Configure DNS apex records per **current GitHub Pages documentation**; do not hardcode stale IPs in docs. Enable HTTPS after DNS verification.
- Optional `www.sintelium.io` redirect should be documented and configured consistently with GitHub Pages guidance.

### Build commands

```bash
npm ci
npm run validate
npm run build
npm run test
npm run check:dist
```

Suggested `package.json` scripts: `dev`, `validate`, `build`, `test`, `check:dist`, `preview`. `npm run build` must output static localized pages, assets, sitemap, robots, 404, and CNAME (production only).

### GitHub Actions

- CI on pull requests: `npm ci`, JSON validation, unit tests, build, static output checks, link checks.
- Deployment on pushes to `main` after successful checks; use official `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` with appropriate `pages: write` and `id-token: write` permissions.
- Document repository Settings → Pages → GitHub Actions, custom domain, DNS verification, and HTTPS enforcement.
- No deployment secrets should be needed for a purely static site.

### Local development

`npm install` then `npm run dev`; if dev server does not support the generated localized routes automatically, run the generator in watch mode. Changes to JSON should update local previews without manual edits to generated HTML. Production build must remain deterministic.

---

## 14. Testing and acceptance criteria

### Automated checks

1. JSON parse and schema validation for all content files.
2. Both locales present for every public string and required metadata field.
3. Every route produces a nonempty static `index.html` with localized H1, title, and description.
4. Every service category and subservice from §4 appears in the appropriate localized page.
5. Internal route references and assets resolve; no broken internal links.
6. Hreflang links are reciprocal and canonical URLs point to the correct language page.
7. Sitemap contains all indexable canonical URLs and excludes 404.
8. Social preview and favicon assets exist and render.
9. JSON content is escaped correctly; malicious-looking sample strings cannot inject markup.
10. Booking/email CTAs are valid or safely hidden if unconfigured.
11. No invented client names, reviews, awards, statistics, certifications, or fake contact details.
12. Build works without network calls to content APIs and pages render with JS disabled.
13. Mobile navigation, language switching, FAQ interactions, and keyboard controls work.
14. Reduced motion and focus visibility are honored.
15. Production readiness gate flags missing legal approval and contact configuration.

### Manual QA matrix

- Viewports: 360, 390, 768, 1024, 1440px.
- Browsers: latest Chrome, Firefox, Safari, Edge; iOS Safari and Android Chrome where available.
- Keyboard-only navigation, screen reader spot checks, 200% zoom.
- EN/ES copy and route review, including accents and punctuation.
- Verify all CTAs, social links, external scheduling links, and mailto links.
- Run Lighthouse on home, service detail, and contact in both languages.
- Verify real production canonical URLs, DNS, HTTPS, and social previews after deployment.

### Definition of done

The project is complete when all required pages exist in both languages, the full service catalog is populated, content is JSON-driven and statically rendered, the design is responsive and accessible, the logo/assets are included, technical SEO is complete, CI and GitHub Pages deployment work, tests pass, and README documents maintenance. **Public launch** additionally requires owner-provided booking URL and email, verified legal disclosures, and final review of service claims and Spanish translations.

---

## 15. Implementation plan for coding agent

### Phase 1 — Foundation

- Initialize Vite vanilla JS project and npm scripts.
- Establish content schemas, route registry, localization helper, HTML escaping, and validation.
- Implement static generation pipeline and `dist` verification.
- Add initial tests for localized routing and content completeness.

### Phase 2 — Design and reusable components

- Implement design tokens and responsive layout.
- Produce three S-monogram SVG concepts; select a legible default and derive brand assets.
- Implement accessible header, nav, language switch, buttons, cards, breadcrumb, FAQ, footer.
- Create original lightweight technical diagrams.

### Phase 3 — Content and pages

- Populate all service categories and subservices in EN/ES.
- Populate complete homepage, About, Process, FAQ, Contact, and service index copy.
- Generate each service detail page with distinctive content and deliverables.
- Populate illustrative use cases, clearly labeled as examples.
- Add legal templates with explicit approval gates.

### Phase 4 — SEO, testing, and deployment

- Generate metadata, hreflang, canonical URLs, sitemap, robots, schema, OG assets.
- Implement CI and GitHub Pages deployment workflow.
- Run automated tests, accessibility and performance checks, link validation.
- Write comprehensive README and owner handover checklist.

### Phase 5 — Owner launch checklist

- Supply and verify real booking URL.
- Supply and verify contact email.
- Confirm company legal name and applicable business disclosures.
- Approve privacy and legal pages based on actual operations and providers.
- Review service offerings for accuracy and delivery capability.
- Review Spanish translations.
- Approve logo for use and perform trademark checks as appropriate.
- Configure GitHub Pages domain and DNS; test HTTPS.
- Validate live website and search indexing settings.

---

## 16. README and maintenance documentation requirements

README must include: project overview, prerequisites, install/run/build commands, content JSON file guide, how to add/edit a service, how to update both translations, route and SEO update steps, image/logo editing guidance, how to set booking/email links, accessibility rules, local preview, CI checks, GitHub Pages deployment, DNS/custom domain, privacy considerations, and troubleshooting.

Add a `CONTENT_GUIDE.md` or README section documenting exact JSON schema fields, supported content blocks, localized routes, and safe editing patterns. No nontechnical owner should need to edit HTML templates to change a service description or CTA label.

---

## 17. Explicit exclusions and future enhancements

**Excluded at launch:** backend, database, account system, authentication, live chat, embedded AI assistant, CMS, runtime service API calls, payments, e-commerce, fabricated case studies, blog, newsletter, cookie-heavy analytics, third-party widget embeds, automated lead collection.

**Possible future work:** blog/insights section, authentic case studies, downloadable technical resources, verified client testimonials, additional languages, scheduling provider integration via a simple outbound link, privacy-conscious analytics, client portal, advanced interactive diagrams. Do not implement these without explicit approval.

---

## 18. Final agent execution prompt

> Implement the complete Sintelium website from this specification in a GitHub repository. Use Vite, vanilla JavaScript, and CSS with JSON-authored bilingual content and build-time static HTML generation. Prioritize AI transformation and agentic automation, but publish all seven service categories and all detailed subservices. Use a minimalist deep-green/teal/graphite design with an original stylized S SVG logo and technical diagrams. Create all specified EN/ES routes, semantic accessible pages, complete SEO metadata, schema, sitemap, social previews, CI, GitHub Pages deployment, and documentation. Do not add a backend or runtime content API. Do not invent proof, credentials, legal identity, prices, or contact links. Use explicit configuration and production-readiness checks for missing contact/legal details. Run tests and report results, unresolved owner decisions, and deployment steps.

**End of specification.**
