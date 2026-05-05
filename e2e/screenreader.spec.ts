import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// The browser build is an ES module; swap its export for a window assignment so
// it can be injected with addScriptTag (which uses a plain <script>, not <script type="module">).
const vsrBundle = readFileSync(
  resolve('node_modules/@guidepup/virtual-screen-reader/lib/esm/index.browser.js'),
  'utf-8'
).replace(
  /export\{[A-Za-z0-9$_]+ as Virtual,([A-Za-z0-9$_]+) as virtual\};/,
  (_, v) => `window.__guidepupVirtual=${v};`
);

test.describe('Screen reader accessibility', () => {
  test('should be navigable with virtual screen reader', async ({ page }) => {
    await page.goto('/');
    await page.addScriptTag({ content: vsrBundle });

    const spokenPhrase = await page.evaluate(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vsr = (window as any).__guidepupVirtual;
      await vsr.start({ container: document.body });
      await vsr.next();
      const phrase = await vsr.lastSpokenPhrase();
      await vsr.stop();
      return phrase;
    });

    expect(spokenPhrase).toBeTruthy();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });
});
