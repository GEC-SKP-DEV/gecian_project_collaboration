# Internal Developer Guide

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Drizzle ORM + PostgreSQL
- Firebase Auth + Storage
- TailwindCSS

## Local Setup

- Copy `.env.local` from a teammate or populate based on `README.md`.
- Install: `npm install`
- DB: `npm run db:push`
- Dev: `npm run dev` ([http://localhost:3001](http://localhost:3001))

## Useful Scripts

- Build: `npm run build`
- Lint: `npm run lint`
- Drizzle: `npm run drizzle:studio`, `npm run db:push`, `npm run db:generate`
- Tests: `npm test`, `npm run e2e`

## Code Structure

- `app/` layouts, pages, API routes
- `components/` UI components (notably `components/repeto/*`)
- `lib/` DB (`lib/db.ts`), schema (`lib/schema.ts`), utils (`lib/utils.ts`)
- `util/` helpers: `uploadImage.ts`
- `types/` shared TS types

## Conventions

- Use `@/` absolute imports (see `tsconfig.json` paths).
- Keep server-only code out of client components.
- Add unit tests for utilities and leaf UI components.
- Add e2e tests for core flows (home, add-project, profile).

## Deployment

- GitHub Pages workflow exists at `.github/workflows/nextjs.yml`.
- Cloudflare-specific artifacts are not used; `.open-next/` is ignored and should not be committed.
