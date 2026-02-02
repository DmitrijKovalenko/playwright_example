import { test, expect } from '@playwright/test';
import { LiteratureReviewsPage } from '@pages/literatureReviewsPage';

test('Create new project: click button opens create_literaturereview', async ({ page }) => {
  await page.goto('/literature_reviews/');
  const lr = new LiteratureReviewsPage(page);
  await lr.clickCreateNewProject();
  await expect(page).toHaveURL(/\/literature_reviews\/create_literaturereview\/?/);
});
