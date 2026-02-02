import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';
import { ResetPasswordPage } from '@pages/resetPasswordPage';

test.describe('Reset password (guest)', () => {
  let login: LoginPage;
  let reset: ResetPasswordPage;
  let resetEmail: string;

  test.beforeEach(async ({ page }) => {
    resetEmail = process.env.CITEMED_RESET_EMAIL!;
    expect(resetEmail).toBeTruthy();
    login = new LoginPage(page);
    reset = new ResetPasswordPage(page);
    await login.openMainPage();
    await expect(page).toHaveURL(/\/login\/?/);
    await expect(login.forgotPasswordLink).toBeVisible();
  });

  test('Verify that clicking Forgot password navigates to Reset Password page', async ({ page }) => {
    await login.forgotPasswordLink.click();
    await expect(page).toHaveURL(/\/reset_password\/?/);
  });

  test('Verify that submitting a valid email redirects to reset_password_done page', async ({ page }) => {
    await login.forgotPasswordLink.click();
    await reset.expectOpened();
    await reset.submitReset(resetEmail);
    await expect(page).toHaveURL(/\/reset_password_done\/?/);
    await expect(page.getByText('Password Reset Email Sent', { exact: false })).toBeVisible();
  });

  test('Verify that submitting an empty email triggers browser validation message', async ({ page }) => {
    await login.forgotPasswordLink.click();
    await reset.expectOpened();
    await reset.emailInput.fill('');
    await reset.resetPasswordButton.click();
    const msg = await reset.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(msg).toBeTruthy();
  });

  test('Verify that clicking Back navigates back to Login page', async ({ page }) => {
    await login.forgotPasswordLink.click();
    await reset.expectOpened();
    await reset.backButton.click();
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that clicking Back to Sign In on reset_password_done redirects to Login page', async ({ page }) => {
    await login.forgotPasswordLink.click();
    await reset.expectOpened();
    const email = process.env.CITEMED_RESET_EMAIL!;
    expect(email).toBeTruthy();
    await reset.submitReset(email);
    await expect(page).toHaveURL(/\/reset_password_done\/?/);
    await reset.backToSignInButton.click();
    await expect(page).toHaveURL(/\/login\/?/);
  });
});
