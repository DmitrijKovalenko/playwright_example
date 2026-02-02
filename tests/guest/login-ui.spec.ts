import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';

test.describe('Login page UI (guest)', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.openMainPage();
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that Login page title is visible', async () => {
    await expect(login.pageTitle).toBeVisible();
  });

  test('Verify that Login page subtitle text is visible', async () => {
    await expect(login.subtitleText).toBeVisible();
  });

  test('Verify that CiteMed logo is visible', async () => {
    await expect(login.logo).toBeVisible();
  });

  test('Verify that Username label is visible', async () => {
    await expect(login.usernameLabel).toBeVisible();
  });

  test('Verify that Password label is visible', async () => {
    await expect(login.passwordLabel).toBeVisible();
  });

  test('Verify that Username input is visible and enabled', async () => {
    await expect(login.username).toBeVisible();
    await expect(login.username).toBeEnabled();
  });

  test('Verify that Password input is visible and enabled', async () => {
    await expect(login.password).toBeVisible();
    await expect(login.password).toBeEnabled();
  });

  test('Verify that Password input is masked', async () => {
    await expect(login.password).toHaveAttribute('type', 'password');
  });

  test('Verify that Remember me checkbox is visible and can be toggled', async () => {
    await expect(login.rememberMeCheckbox).toBeVisible();
    await expect(login.rememberMeCheckbox).not.toBeChecked();

    await login.rememberMeCheckbox.check();
    await expect(login.rememberMeCheckbox).toBeChecked();

    await login.rememberMeCheckbox.uncheck();
    await expect(login.rememberMeCheckbox).not.toBeChecked();
  });

  test('Verify that Remember me label is visible', async () => {
    await expect(login.rememberMeLabel).toBeVisible();
  });

  test('Verify that invalid login shows toast and toast can be closed', async () => {
    await login.username.fill(process.env.CITEMED_USERNAME!);
    await login.password.fill('invalid_password');
    await login.signIn.click();

    await expect(login.loginFailMessage).toBeVisible();

    await login.toastCloseButton.click();
    await expect(login.loginFailMessage).not.toBeVisible();
  });
});
