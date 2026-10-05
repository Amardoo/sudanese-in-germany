import { test, expect } from '@playwright/test';
test('calendar navigates, filters dates and reveals event details', async ({ page }) => {
  await page.goto('/events');
  // Navigate from the server's current month to the fixed sample data month.
  const initialDate = await page.locator('.calendar-day').first().getAttribute('data-date');
  const [year, month] = initialDate!.split('-').map(Number);
  const distance = (2026 - year) * 12 + 9 - month;
  for (let i = 0; i < Math.abs(distance); i++) {
    await page
      .getByRole('button', { name: distance > 0 ? 'الشهر التالي' : 'الشهر السابق', exact: true })
      .click();
  }
  await expect(page.getByRole('heading', { level: 1 })).toContainText('تقويم الفعاليات');
  const monthBefore = await page.locator('.calendar-toolbar h2').textContent();
  await page.getByRole('button', { name: 'الشهر التالي', exact: true }).click();
  await expect(page.locator('.calendar-toolbar h2')).not.toHaveText(monthBefore!);
  await page.getByRole('button', { name: 'الشهر السابق', exact: true }).click();
  await expect(page.locator('.calendar-toolbar h2')).toHaveText(monthBefore!);
  const firstDay = page.locator('.calendar-day').first();
  await firstDay.click();
  await expect(firstDay).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'عرض فعاليات الشهر', exact: true }).click();
  await expect(firstDay).toHaveAttribute('aria-pressed', 'false');
  const cards = page.locator('.event-card');
  await expect(cards).toHaveCount(2);
  await page.locator('[data-date="2026-09-26"]').click();
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('لقاء تعارف للمجتمع');
  await cards.first().locator('summary').click();
  await expect(cards.first().locator('details')).toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'عرض فعاليات الشهر', exact: true }).click();
  await page.getByRole('button', { name: 'ثقافة', exact: true }).click();
  await expect(page.getByRole('button', { name: 'ثقافة', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(cards).toHaveCount(0);
  await expect(page.getByText('لا توجد فعاليات لهذا الشهر')).toBeVisible();
  await page.getByRole('button', { name: 'الشهر التالي', exact: true }).click();
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('أمسية ثقافية سودانية');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
