import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';

test('auth setup: save storage state', async ({ page }) => {
  const username = process.env.CITEMED_USERNAME!;
  const password = process.env.CITEMED_PASSWORD!;

  const login = new LoginPage(page);

  await login.openMainPage();
  await login.login(username, password);

  await expect(page).toHaveURL(/\/literature_reviews\/?/);

  await page.context().storageState({ path: '.auth/state.json' });
});
