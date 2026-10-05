import { test, expect } from '@playwright/test';
test('bookmarks persist and can be removed from saved filter', async ({ page }) => {
  await page.goto('/guides');
  await page.getByRole('button', { name: 'حفظ المقال: من أين تبدأ الدراسة في ألمانيا؟' }).click();
  await page.getByRole('button', { name: 'المحفوظات (1)' }).click();
  await expect(page.locator('.guide-card')).toHaveCount(1);
  await page.reload();
  await page.getByRole('button', { name: 'المحفوظات (1)' }).click();
  await expect(page.locator('.guide-card')).toHaveCount(1);
  await page
    .getByRole('button', { name: 'إزالة من المحفوظات: من أين تبدأ الدراسة في ألمانيا؟' })
    .click();
  await expect(page.locator('.guide-card')).toHaveCount(0);
});
test('home directory anchor and legacy redirect', async ({ page }) => {
  await page.goto('/#associations');
  await expect(page).toHaveURL(/\/#associations$/);
  await expect(page.locator('#associations-title')).toBeInViewport();
  expect(await page.locator('.association-card').count()).toBeGreaterThan(0);
  await page.goto('/associations');
  await expect(page).toHaveURL(/\/#associations$/);
  await expect(page.locator('#associations-title')).toBeInViewport();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
test('local topic, reply, like, reload, and deletion are functional', async ({ page }) => {
  await page.goto('/community');
  await expect(page.getByText('مساحة تجريبية:', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'اطرح سؤالاً أو موضوعاً' }).click();
  await page.getByLabel('عنوان الموضوع').fill('سؤال اختباري عن الدراسة');
  await page
    .getByLabel('التفاصيل')
    .fill('كيف ننظم ملف الجامعة؟ <script>window.injected=true</script>');
  await page.getByRole('combobox', { name: 'المجتمع', exact: true }).selectOption('students');
  await page.getByRole('button', { name: 'إضافة الموضوع محلياً' }).click();
  const post = page
    .locator('.discussion-card')
    .filter({ has: page.getByRole('heading', { name: 'سؤال اختباري عن الدراسة', exact: true }) });
  await expect(post).toBeVisible();
  await post.getByRole('button', { name: '0 ردود' }).click();
  await post.getByLabel('أضف ردك').fill('هذا رد للتجربة');
  await post.getByRole('button', { name: 'إضافة الرد محلياً' }).click();
  await expect(post.getByText('هذا رد للتجربة')).toBeVisible();
  await post.getByRole('button', { name: 'إعجاب: سؤال اختباري عن الدراسة' }).click();
  await page.reload();
  await expect(
    post.getByRole('button', { name: 'إعجاب: سؤال اختباري عن الدراسة' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await post.getByRole('button', { name: '1 ردود' }).click();
  await expect(post.getByText('هذا رد للتجربة')).toBeVisible();
  await post.getByRole('button', { name: 'حذف الرد: هذا رد للتجربة' }).click();
  await expect(post.getByRole('button', { name: '0 ردود' })).toBeVisible();
  await post.getByRole('button', { name: 'حذف الموضوع', exact: true }).click();
  await post.getByRole('button', { name: 'تأكيد الحذف' }).click();
  await expect(post).toHaveCount(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  expect(await page.evaluate(() => Object.hasOwn(window, 'injected'))).toBe(false);
});
test('community filters, storage recovery, and account setup state', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('sig:community:v1', '{bad'));
  await page.goto('/community');
  await page.getByRole('button', { name: 'الأطباء والمهن الطبية' }).click();
  await expect(page.locator('.discussion-card')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'ابحث في النقاشات' }).fill('zzzz');
  await expect(page.getByText('ما في موضوع مطابق لبحثك')).toBeVisible();
  await page.getByRole('button', { name: 'عرض كل النقاشات' }).click();
  await expect(page.locator('.discussion-card')).toHaveCount(4);
  await page.goto('/account');
  await expect(page.getByRole('heading', { name: 'تسجيل الحسابات ينتظر التفعيل' })).toBeVisible();
});
