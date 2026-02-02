import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly signIn: Locator;
  readonly loginFailMessage: Locator;
  readonly pageTitle: Locator;
  readonly subtitleText: Locator;
  readonly usernameLabel: Locator;
  readonly passwordLabel: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly logo: Locator;
  readonly toastCloseButton: Locator;
  readonly rememberMeLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#id_username');
    this.password = page.locator('#id_password');
    this.signIn = page.locator('input[value="Sign In"]');
    this.loginFailMessage = page.locator('div.toast-notification__content');
    this.pageTitle = page.locator('div.bold-text');
    this.subtitleText = page.locator('div.lite-text');
    this.usernameLabel = page.locator('label[for="id_username"]');
    this.passwordLabel = page.locator('label[for="id_password"]');
    this.rememberMeCheckbox = page.locator('#remember_me');
    this.rememberMeLabel = page.locator("label[for='remember_me']");
    this.forgotPasswordLink = page.locator('a[href="/reset_password/"]');
    this.logo = page.locator('#icon');
    this.toastCloseButton = page.locator('button[class="toast-notification__close"]');
  }

  async openMainPage() {
    await this.page.goto(process.env.LOGIN_PATH ?? '/login/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.signIn.click();
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/\/literature_reviews\/?/);
  }
}
