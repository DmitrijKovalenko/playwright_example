import { test, expect } from '@playwright/test';
import { ResetPasswordPage } from '@pages/resetPasswordPage';

test.describe('Reset password page UI (guest)', () => {
  let reset: ResetPasswordPage;

  test.beforeEach(async ({ page }) => {
    reset = new ResetPasswordPage(page);
    await reset.open();
    await reset.expectOpened();
  });

  test('Verify that Reset Password page logo is visible', async () => {
    await expect(reset.logo).toBeVisible();
  });

  test('Verify that Reset Password page title is visible', async () => {
    await expect(reset.title).toBeVisible();
  });

  test('Verify that Reset Password page subtitle is visible', async () => {
    await expect(reset.subtitle).toBeVisible();
  });

  test('Verify that Email label is visible', async () => {
    await expect(reset.emailLabel).toBeVisible();
  });

  test('Verify that Email input is visible and enabled', async () => {
    await expect(reset.emailInput).toBeVisible();
    await expect(reset.emailInput).toBeEnabled();
  });

  test('Verify that Reset password button is visible and enabled', async () => {
    await expect(reset.resetPasswordButton).toBeVisible();
    await expect(reset.resetPasswordButton).toBeEnabled();
  });

  test('Verify that Back button is visible and enabled', async () => {
    await expect(reset.backButton).toBeVisible();
    await expect(reset.backButton).toBeEnabled();
  });
});
