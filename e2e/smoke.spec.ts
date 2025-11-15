import { test, expect } from '@playwright/test';
import { voiceOver } from '@guidepup/playwright';

test.describe('Smoke tests', () => {
  test('should render the homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check that the page has loaded
    expect(await page.title()).toBeTruthy();
  });

  test('should display the correct page title', async ({ page }) => {
    await page.goto('/');

    // Verify the page title
    const title = await page.title();
    expect(title).toContain('Dan Matthew is an accessibility and design systems consultant');
  });

  test('should have the main heading visible', async ({ page }) => {
    await page.goto('/');

    // Check for the main heading text
    const heading = page.getByText('Accessibility and design systems consultant');
    await expect(heading).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');

    // Check for main landmark
    const main = page.locator('main#main');
    await expect(main).toBeVisible();

    // Check for navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have accessible links', async ({ page }) => {
    await page.goto('/');

    // Check that social links are present and accessible
    const socialLinks = page.getByRole('link', { name: /github|linkedin|bluesky/i });
    expect(await socialLinks.count()).toBeGreaterThan(0);
  });
});

test.describe('Screen reader accessibility', () => {
  test('should be navigable with VoiceOver', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'VoiceOver is only available on macOS');

    await page.goto('/');

    // Start VoiceOver
    await voiceOver.start(page);

    try {
      // Navigate to the main content
      await voiceOver.next();

      // Get the spoken phrase
      const spokenPhrase = await voiceOver.lastSpokenPhrase();

      // Verify that VoiceOver is reading content
      expect(spokenPhrase).toBeTruthy();

    } finally {
      // Always stop VoiceOver
      await voiceOver.stop();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check that headings are properly structured
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Verify the page has a logical heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });
});
