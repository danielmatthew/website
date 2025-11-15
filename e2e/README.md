# E2E Tests with Playwright and Guidepup

This directory contains end-to-end tests for the website using Playwright and Guidepup for accessibility testing.

## Prerequisites

Before running the tests, you need to install Playwright browsers:

```bash
pnpm exec playwright install --with-deps chromium
```

## Running Tests

There are several ways to run the tests:

### Run all tests (headless)
```bash
pnpm run test:e2e
```

### Run tests with UI mode (recommended for development)
```bash
pnpm run test:e2e:ui
```

### Run tests in headed mode (see the browser)
```bash
pnpm run test:e2e:headed
```

### Debug mode
```bash
pnpm run test:e2e:debug
```

### View test report
```bash
pnpm run test:e2e:report
```

## Test Structure

- `smoke.spec.ts` - Basic smoke tests that verify:
  - The site renders successfully
  - The page title is correct
  - Main heading is visible
  - Page structure includes proper landmarks
  - Links are accessible
  - Screen reader accessibility (VoiceOver on macOS)
  - Proper heading hierarchy

## Accessibility Testing

The tests include Guidepup integration for screen reader testing. The VoiceOver test will only run on macOS with WebKit browser.

## Configuration

The Playwright configuration is in `playwright.config.ts` at the root of the project. It's configured to:

- Start the dev server automatically before running tests
- Use http://localhost:4321 as the base URL
- Run tests in Chromium by default
- Generate an HTML report after test completion
