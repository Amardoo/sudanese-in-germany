import { test, expect } from '@playwright/test';
test('home, search, filter, guide, and mobile navigation', async ({ page, isMobile }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { name: 'مسارات مختلفة' })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  if (isMobile) {
    await page.getByRole('button', { name: 'فتح القائمة' }).click();
    await page
      .getByRole('navigation', { name: 'قائمة الهاتف' })
      .getByRole('link', { name: 'المقالات', exact: true })
      .click();
  } else {
    await page
      .getByRole('navigation', { name: 'القائمة الرئيسية' })
      .getByRole('link', { name: 'المقالات', exact: true })
      .click();
  }
  await page.getByRole('textbox', { name: 'ابحث في الأدلة' }).fill('zzzz');
  await expect(page.getByText('لم نجد دليلاً بهذا البحث')).toBeVisible();
  await page.getByRole('button', { name: 'عرض كل الأدلة' }).click();
  await page.getByRole('button', { name: 'اللغة الألمانية', exact: true }).click();
  await expect(page.locator('.guide-card')).toHaveCount(3);
  await page.getByRole('link', { name: 'خطة بسيطة لتعلّم الألمانية' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('خطة بسيطة لتعلّم الألمانية');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
test('imported WordPress article is searchable and readable', async ({ page }) => {
  await page.goto('/guides');
  await page.getByRole('textbox', { name: 'ابحث في الأدلة' }).fill('Jobvalley');
  await expect(page.getByRole('link', { name: 'تطبيق Jobvalley لعمل الطلاب' })).toBeVisible();
  await page.getByRole('link', { name: 'تطبيق Jobvalley لعمل الطلاب' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('تطبيق Jobvalley لعمل الطلاب');
  await expect(
    page.getByText('مقال من أرشيف الموقع · راجع حداثة المعلومات', { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'كيفية استخدام تطبيق Jobvalley' })).toBeVisible();
});
test('article URLs become safe external links', async ({ page }) => {
  await page.goto('/guides/article-1274');
  const link = page.getByRole('link', { name: 'https://www.wg-gesucht.de' });
  await expect(link).toHaveAttribute('href', 'https://www.wg-gesucht.de');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
test('independent journey progress persists, reverses, and resets', async ({ page }) => {
  await page.goto('/dashboard?path=student');
  const first = page.getByRole('checkbox').first();
  await first.check();
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '1');
  await page.reload();
  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await page.getByRole('button', { name: 'أنا طبيب', exact: true }).click();
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '0');
  await page.getByRole('checkbox').first().check();
  await page.reload();
  await expect(page.getByRole('button', { name: 'أنا طبيب', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await page.getByRole('button', { name: 'أنا طالب', exact: true }).click();
  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await page.getByRole('checkbox').first().uncheck();
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '0');
  await page.getByRole('checkbox').first().check();
  await page.getByRole('button', { name: 'إعادة بدء المسار' }).click();
  await page.getByRole('button', { name: 'نعم، ابدأ من جديد' }).click();
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '0');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
test('invalid guide returns 404', async ({ page }) => {
  const response = await page.goto('/guides/unknown-guide');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'الصفحة دي ما لقيناها' })).toBeVisible();
});
test('blocked browser storage preserves working session with notice', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked');
      },
    });
  });
  await page.goto('/dashboard?path=worker');
  await expect(page.getByRole('alert').filter({ hasText: 'تعذر الحفظ في المتصفح' })).toBeVisible();
  await page.getByRole('checkbox').first().check();
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '1');
});
