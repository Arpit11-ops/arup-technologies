# Arup Technologies Website

Premium four-page marketing website for Arup Technologies, an AI-powered
digital agency covering websites, marketing, SEO, software, apps, and workflow
automation.

## Links

- Live: https://arpit11-ops.github.io/arup-technologies/
- Repository: https://github.com/Arpit11-ops/arup-technologies
- Persistent handoff: [PROJECT_MEMORY.md](PROJECT_MEMORY.md)

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Motion and Lenis
- pnpm
- GitHub Pages static export

## Local development

```powershell
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production builds

Standard local export:

```powershell
pnpm build
```

GitHub Pages-compatible export:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/arup-technologies'
pnpm build
```

Pushing to `main` triggers `.github/workflows/deploy-pages.yml` and deploys the
static `out/` directory automatically.

## Important

- Replace `TODO_WHATSAPP_NUMBER` in `lib/utils.ts` before launch promotion.
- Confirm that `hello@aruptechnologies.com` is active.
- GitHub Pages has no server runtime. The contact form opens a prefilled email
  draft; server actions and API routes are not supported by this deployment.
- Read [PROJECT_MEMORY.md](PROJECT_MEMORY.md) before substantial changes.
