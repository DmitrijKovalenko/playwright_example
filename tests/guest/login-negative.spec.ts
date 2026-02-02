import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';

test.describe('Login negative (guest)', () => {
  let login: LoginPage;
  let username: string;
  let password: string;

  const invalidCredsToastText = 'Please enter a correct username and password.';

  test.beforeEach(async ({ page }) => {
    username = process.env.CITEMED_USERNAME!;
    password = process.env.CITEMED_PASSWORD!;

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

    login = new LoginPage(page);
    await login.openMainPage();
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that login with a wrong password shows an invalid credentials toast message', async ({ page }) => {
    await login.login(username, `${password}___wrong`);

    await expect(login.loginFailMessage).toBeVisible();
    await expect(login.loginFailMessage).toContainText(invalidCredsToastText);
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that login with a wrong username shows an invalid credentials toast message', async ({ page }) => {
    await login.login(`${username}___wrong`, password);

    await expect(login.loginFailMessage).toBeVisible();
    await expect(login.loginFailMessage).toContainText(invalidCredsToastText);
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that login with a wrong username and wrong password shows an invalid credentials toast message', async ({
    page,
  }) => {
    await login.login(`${username}___wrong`, `${password}___wrong`);

    await expect(login.loginFailMessage).toBeVisible();
    await expect(login.loginFailMessage).toContainText(invalidCredsToastText);
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that login with a case-changed username shows an invalid credentials toast message', async ({
    page,
  }) => {
    await login.login(username.toUpperCase(), `${password}___wrong`);

    await expect(login.loginFailMessage).toBeVisible();
    await expect(login.loginFailMessage).toContainText(invalidCredsToastText);
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that login with a case-changed password shows an invalid credentials toast message', async ({
    page,
  }) => {
    await login.login(`${username}___wrong`, password.toUpperCase());

    await expect(login.loginFailMessage).toBeVisible();
    await expect(login.loginFailMessage).toContainText(invalidCredsToastText);
    await expect(page).toHaveURL(/\/login\/?/);
  });

  test('Verify that submitting the login form with an empty username triggers a browser validation message', async ({
    page,
  }) => {
    await login.username.fill('');
    await login.password.fill(password);
    await login.signIn.click();

    await expect(page).toHaveURL(/\/login\/?/);

    const msg = await login.username.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(msg).toBeTruthy();
  });

  test('Verify that submitting the login form with an empty password triggers a browser validation message', async ({
    page,
  }) => {
    await login.username.fill(username);
    await login.password.fill('');
    await login.signIn.click();

    await expect(page).toHaveURL(/\/login\/?/);

    const msg = await login.password.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(msg).toBeTruthy();
  });

  test('Verify that submitting the login form with an empty username and empty password triggers a browser validation message', async ({
    page,
  }) => {
    await login.username.fill('');
    await login.password.fill('');
    await login.signIn.click();

    await expect(page).toHaveURL(/\/login\/?/);

    const msg = await login.username.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(msg).toBeTruthy();
  });
});
