import { expect, test } from './fixtures.js';

const METRICS = {
  unit: {
    tests: 6,
    failures: 0,
    coverage: 77.63,
    measuredAt: '2026-10-27T18:15',
    durationSeconds: 0.1,
    perTest: 0.0167,
  },
  e2e: {
    tests: 7,
    failures: 0,
    coverage: 81.25,
    measuredAt: '2026-10-27T18:16',
    durationSeconds: 4.2,
    perTest: 0.6,
  },
};

async function open(page) {
  await page.route('**/test-metrics.json', (route) => route.fulfill({ json: METRICS }));
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Lorem Ipsum');
}

test('[BASIC-FOOTER-01] footer shows four icons', async ({ page }) => {
  await open(page);
  await expect(page.locator('.footer-items .footer-item')).toHaveCount(4);
  await expect(page.locator('.footer-items svg')).toHaveCount(4);
  const icons = await page.locator('.footer-items svg').evaluateAll((nodes) => nodes.map((node) => node.innerHTML));
  expect(new Set(icons).size).toBe(icons.length);
});

test('[BASIC-FOOTER-02] footer shows counts and coverage', async ({ page }) => {
  await open(page);
  await expect(page.locator('#unit-label')).toHaveText('Unit 6 · 77.63 %');
  await expect(page.locator('#e2e-label')).toHaveText('E2E 7 · 81.25 %');
});

test('[BASIC-FOOTER-03] tooltip has three rows', async ({ page }) => {
  await open(page);
  await page.locator('#unit-metrics').hover();
  await expect(page.locator('#tooltip')).toContainText('Measured 2026-10-27T18:15');
  await expect(page.locator('#tooltip')).toContainText('Duration 0.1 s');
  await expect(page.locator('#tooltip')).toContainText('Per test 0.0167 s');
});

test('[BASIC-READER-01] README opens the reader', async ({ page }) => {
  await open(page);
  await page.locator('#readme').click();
  await expect(page.locator('#reader')).toBeVisible();
  await expect(page.locator('.reader-tab')).toHaveCount(4);
  await expect(page.locator('.reader-section').first()).toBeVisible();
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('[BASIC-LINKS-01] a reload restores the reader section', async ({ page }) => {
  await open(page);
  await page.goto('/#/docs/readme/tests');
  await expect(page.locator('#reader')).toBeVisible();
  await expect(page.locator('#reader-section-title')).toHaveText('Tests');
  await page.reload();
  await expect(page.locator('#reader')).toBeVisible();
  await expect(page.locator('#reader-section-title')).toHaveText('Tests');
});

test('[BASIC-DESIGN-01] the page follows the OS colour scheme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await open(page);
  const background = await page.locator('body').evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(background).toBe('rgb(32, 31, 37)');
});

test('[BASIC-LAYOUT-01] header and footer stay visible', async ({ page }) => {
  await open(page);
  await page.locator('#readme').click();
  await page.locator('#reader-body').evaluate((node) => {
    node.style.minHeight = '200vh';
  });
  await page.locator('#reader-body').evaluate((node) => node.scrollIntoView());
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('[BASIC-FOOTER-04] the footer is fixed and wraps cleanly', async ({ page }) => {
  await open(page);
  await page.setViewportSize({ width: 360, height: 720 });
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  expect(await footer.evaluate((node) => getComputedStyle(node).position)).toBe('fixed');
  await expect(page.locator('.footer-items .footer-item')).toHaveCount(4);
});

test('[BASIC-LAYOUT-02] the header is one row', async ({ page }) => {
  await open(page);
  const title = await page.locator('h1').boundingBox();
  const actions = await page.locator('.actions').boundingBox();
  expect(Math.abs(title.y + title.height / 2 - (actions.y + actions.height / 2))).toBeLessThan(8);
});

test('[BASIC-DESIGN-02] focus uses the green outline', async ({ page }) => {
  await open(page);
  await page.locator('#theme').focus();
  const outline = await page.locator('#theme').evaluate((node) => getComputedStyle(node).outlineColor);
  expect(outline).toBe('rgb(88, 139, 85)');
});

test('[BASIC-DESIGN-04] the root stays at 100%', async ({ page }) => {
  await open(page);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe('16px');
  await page.setViewportSize({ width: 800, height: 700 });
  await expect(page.locator('main')).toBeVisible();
});

test('[BASIC-DATES-01] dates use yyyy-mm-dd hh:mm', async ({ page }) => {
  await open(page);
  await expect(page.locator('time')).toHaveText(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
});
