# Testing Guide

## Unit Tests (Jest + Testing Library)
- Run all: `npm test`
- Watch mode: `npm run test:watch`
- Location: `__tests__/` with `*.test.ts|tsx`

## E2E Tests (Playwright)
- Install browsers: `npx playwright install`
- Run: `npm run e2e`
- Headed: `npm run e2e:headed`
- Report: `npm run e2e:report`
- Config: `playwright.config.ts` (starts `npm run dev` on port 3001)

## Artifacts
- Coverage: `coverage/`
- Playwright: `test-results/`, `playwright-report/`
