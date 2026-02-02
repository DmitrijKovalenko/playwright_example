import { test, expect } from '@playwright/test';

test('Verify user is authenticated (storageState)', async ({ page }) => {
  await page.goto('/literature_reviews/');
  await expect(page).toHaveURL(/\/literature_reviews\/?/);
});
