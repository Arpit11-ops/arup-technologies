# Arup Technologies Project Memory

The authoritative detailed project memory is maintained at
`D:\arup technlogoies\PROJECT_MEMORY.md` in the local workspace. This repository
copy records the deployment-critical facts so the project remains recoverable
when cloned elsewhere.

## Current state

- Four routes: `/`, `/services`, `/about`, and `/contact`.
- Stack: Next.js 16 App Router, TypeScript, Tailwind v4, Motion, Lenis, pnpm.
- Visual system: Satoshi, Onyx/Bone, Ember Orange, sharp geometry, route-line
  motion, and generated Arup capability studies.
- Generated assets: the shared studies in `public/generated/` plus six
  optimized Home Services lightbox studies in `public/images/services/`.
- Generated imagery is labeled as an Arup capability study, never client work.
- Home Services now uses the approved Kinetic Lightbox on a Bone canvas: a
  sticky scroll-linked desktop stage with directional wipes and a normal-flow
  stacked mobile layout. The dark capability imagery remains the visual anchor.
- The Kinetic Lightbox redesign is browser-verified but still uncommitted.
- Home Why uses a cinematic three-card layout with the real Arup beliefs and a
  supplied looping CloudFront video in the center card. Mobile stacks the cards;
  reduced motion exposes the underlying static Arup study.
- The Services hero remains unchanged. Immediately after it, the route now uses
  a 600svh pinned vertical 3D cylinder on desktop: synchronized service title
  and progress at left, six supplied video cards at center, and complete service
  information and CTA at right. Mobile uses six stacked video stories. Only the
  active film plays; reduced motion falls back to the static service studies.
- The six 8-second portrait films are stored in `public/videos/services/` with
  stable service-based filenames. Desktop/mobile browser verification found no
  console warnings or horizontal overflow.
- GitHub Pages URL: `https://arpit11-ops.github.io/arup-technologies/`.
- Repository: `https://github.com/Arpit11-ops/arup-technologies`.
- Deployment workflow: `.github/workflows/deploy-pages.yml`.
- Every push to `main` deploys automatically.

## Hosting rules

- The site uses Next.js static export. There is no runtime server.
- Keep `output: "export"`, `trailingSlash`, and the Pages base-path handling in
  `next.config.ts` unless hosting changes.
- Use `assetPath()` from `lib/utils.ts` for public asset URLs.
- The contact form validates locally and opens a prefilled email draft.
- Do not add server actions or API routes while deploying to GitHub Pages.

## Required workflow

- Before any frontend edit, invoke the applicable Impeccable command described
  in the parent workspace `AGENTS.md`.
- Respect `prefers-reduced-motion` and preserve keyboard/focus behavior.
- Run `pnpm build` and a base-path build before deployment changes.
- Verify desktop/mobile, image loading, route paths, and horizontal overflow.

## Known launch items

1. Replace `TODO_WHATSAPP_NUMBER` in `lib/utils.ts`.
2. Confirm `hello@aruptechnologies.com` is an active mailbox.
3. Add a static-form provider or change hosting if submissions must be stored.
4. Add testimonials only when real, approved quotes are available.

## Core decisions not to reverse casually

- Arup Blue is retired; Ember Orange is the signal accent.
- Do not restore real-work screenshots as dominant hero/service imagery without
  explicit user approval.
- Avoid template-agency visuals, fake proof, purple gradients, glassmorphism,
  nested cards, bouncing motion, and editorial cream/serif styling.
- Keep the exact supplied ARUP TECHNOLOGIES logo and self-hosted Satoshi fonts.

## Handoff note (2026-07-18 morning)

The working tree holds uncommitted changes: warmed Bone token (`#f5f1eb`),
new `components/route-network.tsx` hero animation, hero fold/typography fix,
and the completed scroll-scrub rebuild of `components/process.tsx`. The process
section was browser-verified at short desktop and mobile sizes; headline
clipping and step-opacity ownership were fixed. Why belief copy now uses a
reversible, AA-safe word scrub, the footer has a low-opacity ARUP watermark
reveal, service rail panels have desktop Ember traces, and primary WhatsApp
CTAs have a restrained desktop magnetic pull. The authoritative record and remaining
animation roadmap live in `..\plans\animation-enhancements.md`.

Last verified: 2026-07-18.
