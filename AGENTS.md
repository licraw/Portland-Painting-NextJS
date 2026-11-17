# AGENTS.md

## Project overview

This repository contains the Portland Painting and Restoration website. It is a
Next.js 15 App Router application using React, TypeScript, Tailwind CSS, and
styled-components.

## Toolchain

- Node.js 22.x
- Yarn 1.22.22 (the package manager pinned in `package.json`)
- Next.js App Router

Use Yarn for dependency and script commands. Do not add an npm or pnpm lockfile.

## Repository map

- `src/app/`: routes, layouts, API handlers, and most UI components
- `src/app/components/`: shared UI components
- `src/data/`: generated or local data used by the site
- `content/`: site content kept outside the route tree
- `public/`: static images and downloadable assets
- `scripts/`: maintenance and data-fetching scripts
- `.github/workflows/`: scheduled automation

The `@/*` TypeScript alias resolves to `src/*`.

## Local development

```bash
yarn install --frozen-lockfile
cp .env.example .env.local
yarn dev
```

The local site is available at `http://localhost:3000`.

Most pages can be developed without credentials. Integrations such as Asana,
email, Mailchimp, reCAPTCHA, and Google Reviews require the corresponding
variables documented in `.env.example`.

## Validation

Run checks appropriate to the files you changed. Before handing off a broad or
production-facing change, run all three:

```bash
yarn tsc --noEmit
yarn lint
yarn build
```

If a command fails for a reason that predates your change, report the exact
failure and verify that your work did not add another one. Do not silence lint
or type errors globally to make a check pass.

There is currently no automated test suite. For UI changes, also exercise the
affected route in a browser at both desktop and mobile widths. For API changes,
test success, invalid-input, and missing-configuration behavior.

## Project conventions

- Prefer TypeScript for new application code.
- Keep secrets in `.env.local`; never commit credentials or real customer data.
- Keep server-only environment variables and integration clients out of client
  components.
- Preserve existing public URLs and redirects unless the task explicitly calls
  for an SEO or routing change.
- Reuse shared components before introducing route-specific duplicates.
- Keep API handlers defensive: validate request data and return useful HTTP
  status codes without leaking credentials or provider responses.
- Treat `src/data/google-reviews.json` as generated data. Update it with
  `node scripts/fetch-google-reviews.mjs` when Google credentials are available.
- Avoid committing generated output such as `.next/`, coverage, or TypeScript
  build-info files.
- Optimize large images before adding them to `public/`. Use lowercase,
  descriptive filenames without spaces for new assets.

## Content and brand voice

Write like an experienced Portland contractor speaking plainly to a homeowner.

- Use natural paragraphs with varied sentence lengths.
- Prefer specific, concrete language over promotional adjectives.
- Keep claims factual and verifiable. Never invent awards, experience,
  guarantees, certifications, prices, customer quotes, or service areas.
- Match the tone and terminology of nearby approved copy before writing new
  content.
- Preserve existing copy unless the task explicitly requests a rewrite.
- Use “we” for the company and “you” for the customer.
- Make calls to action direct and useful, such as “Request an estimate.”
- Mention Portland or regional conditions only when they are relevant.
- Explain trade terminology in language a homeowner can understand.

Avoid common AI-writing patterns:

- Grandiose words such as “transformative,” “unparalleled,” “elevate,”
  “revolutionize,” “meticulous,” and “exceptional” unless supported.
- Choppy sequences of very short sentences.
- Sentence fragments used for artificial emphasis.
- Repeated three-item lists added only for rhythm.
- “Not just X, but Y” constructions.
- Openings such as “In today’s fast-paced world.”
- Generic phrases such as “your trusted partner,” “look no further,” “we’ve got
  you covered,” and “take it to the next level.”
- Excessive em dashes, rhetorical questions, exclamation points, and headings.
- Repeating the same point in the introduction, body, and conclusion.
- Keyword stuffing or awkwardly repeating location and service names.

Before handing off new copy, read it aloud and revise anything that sounds like
an advertisement, a template, or a series of disconnected slogans.

## SEO and public URLs

- Write page titles and descriptions for humans first.
- Give each page a distinct purpose, title, heading, and description.
- Do not create competing pages targeting the same search intent.
- Preserve established URLs and redirects unless an SEO change is requested.
- Add internal links only when they help a visitor continue their task.
- Never invent structured-data values, ratings, reviews, or business details.

## Accessibility

- Use semantic HTML before adding ARIA attributes.
- Keep heading levels in a logical order.
- Ensure every interactive control is keyboard accessible.
- Give informative images meaningful alt text; use empty alt text for decorative
  images.
- Do not communicate meaning through color alone.
- Preserve visible focus states and sufficient color contrast.
- Associate form errors and instructions with the relevant fields.

## Forms and integrations

- Validate input on the server even when the client also validates it.
- Treat uploads, contact details, and tracking values as untrusted input.
- Do not log credentials, message contents, or customer personal information.
- Provide clear loading, success, validation, and provider-failure states.
- Prevent duplicate submissions where practical.
- Do not change recipients, Asana destinations, analytics, or third-party
  identifiers without explicit direction.

## Design UI with restraint

Every visible element should help a visitor understand the service, evaluate
the company, navigate, or complete a task. Do not add content or interface
elements merely to make a page appear more complete.

- Add only the sections, fields, controls, and messages required by the task.
- Preserve the existing information architecture unless a structural change is
  explicitly requested.
- Do not invent statistics, testimonials, awards, badges, urgency messages,
  project details, service claims, or social proof.
- Do not add extra cards, feature grids, FAQs, banners, carousels, tabs, filters,
  or decorative calls to action without a demonstrated user need.
- Prefer one clear primary action per section. Add a secondary action only when
  it supports a distinct and likely user intent.
- Do not repeat the same claim or call to action in adjacent sections.
- Keep labels and instructions concise. Do not add helper text that only
  restates a heading, field label, or obvious interaction.
- Keep forms to the minimum information needed for the next step. Mark optional
  fields clearly rather than adding explanatory copy around every field.
- Use progressive disclosure for advanced or infrequently needed information.
- Prefer improving hierarchy, spacing, typography, and grouping over adding
  containers or decorative elements.
- Use icons only when they improve recognition or scanning. Do not add icons to
  every heading, button, or list item by default.
- Avoid tooltips for information that should be visible or clear from the label.
- Keep empty, loading, success, and error states useful and brief.
- When existing content is sufficient, refine its presentation instead of
  introducing new content.

Before adding an element, ask what user question it answers or what action it
enables. If there is no specific answer, leave it out.

## Visual direction

The site should feel like a Portland restoration field guide: established,
practical, material-focused, and informed by historic homes. It should not
resemble a generic SaaS landing page or a mass-market contractor template.

### Visual character

- Favor warm, tactile, architectural presentation over polished tech styling.
- Use warm plaster, forest green, oxide red, aged brass, moss, and charcoal.
- Use a sturdy editorial serif for major headings and a restrained sans serif
  for body text and controls.
- Use mostly square or lightly rounded corners. Reserve pill shapes for tags.
- Prefer thin rules, subtle borders, paper-like surfaces, and natural texture.
- Avoid glassmorphism, neon gradients, floating blobs, excessive shadows, and
  interchangeable icon-card grids.
- Use asymmetry and editorial image placement when it improves the composition.
- Do not center every heading, paragraph, and call to action.

### Photography

- Prefer real project, process, material, and craft photography.
- Show preparation and repair work as well as finished rooms and exteriors.
- Use consistent crops and natural color treatment.
- Include useful captions such as neighborhood, home era, surface, or scope
  when that information is known.
- Never invent project details to make a layout appear complete.

### Recurring motifs

Use a small number of recognizable elements consistently:

- Restoration-record or field-note captions
- Project numbers and architectural rules
- Before-and-after comparisons
- Paint or material swatches
- Close-up process photography

Do not use all motifs in every section. Their purpose is to create continuity,
not decoration.

### Design review

Before handing off a visual change, ask:

- Could this section belong to any contractor or SaaS website?
- Does it communicate painting, carpentry, restoration, or Portland?
- Is the hierarchy still clear without relying on rounded cards?
- Are real project details doing more work than decorative effects?
- Does the new work match the established palette, typography, and spacing?

## Visual changes

- Reuse the existing spacing, typography, colors, and component patterns.
- Check desktop and mobile layouts.
- Avoid redesigning surrounding sections when only one component was requested.
- Prevent layout shift by giving images appropriate dimensions.
- Optimize new assets and use descriptive lowercase filenames without spaces.
- Compare before-and-after screenshots for substantial visual changes.

## Definition of done

A change is complete when:

- The requested behavior works.
- Type-checking and relevant validation have been run.
- Desktop and mobile behavior have been checked for UI changes.
- Loading, empty, error, and success states have been considered.
- No secrets, generated files, or unrelated formatting changes were introduced.
- Documentation is updated when setup or behavior changes.

## Change discipline

- Inspect `git status` before editing and preserve unrelated user changes.
- Keep changes scoped to the request; do not reformat unrelated files.
- Update this guide and the README when setup, commands, integrations, or the
  repository layout changes.

## Branches and pull requests

- Start each new update on a descriptive branch using the `codex/` prefix,
  such as `codex/add-project-gallery` or `codex/improve-admin-editing`.
- Keep one coherent update per branch. Do not mix unrelated work into the same
  pull request.
- Before opening a pull request, run the validation appropriate to the change
  and review the complete diff for secrets, generated files, and unrelated
  edits.
- Open a pull request for every completed update unless the user explicitly
  asks to keep the work local.
- Use a concise, descriptive pull request title. In the description, summarize
  what changed, list the checks performed, and call out any setup steps or
  follow-up work.
