import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

test('homepage renders h1', async ({ page }) => {
  await page.goto(baseURL);
  await expect(page.locator('h1').first()).toBeVisible();
});
