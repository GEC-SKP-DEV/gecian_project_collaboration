import { test, expect } from '@playwright/test';

test('home page shows navbar title', async ({ page }) => {
  await page.goto('/');
  // Wait for Navbar title to appear after loading screen
  await expect(page.getByRole('heading', { name: 'Project Archive' })).toBeVisible({ timeout: 10000 });
});
