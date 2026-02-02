import { Page, Locator, expect } from '@playwright/test';

export class ResetPasswordPage {
  readonly page: Page;

  readonly title: Locator;
  readonly subtitle: Locator;
  readonly emailLabel: Locator;
  readonly emailInput: Locator;
  readonly resetPasswordButton: Locator;
  readonly backButton: Locator;
  readonly logo: Locator;
  readonly backToSignInButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator('div.bold-text');
    this.subtitle = page.locator('div.lite-text');
    this.emailLabel = page.locator('label[for="id_email"]');
    this.emailInput = page.locator('#id_email');
    this.resetPasswordButton = page.locator('input.submit-button');
    this.backButton = page.locator('input.back-button');
    this.logo = page.locator('#icon');
    this.backToSignInButton = page.locator('input.submit-button[value="Back to Sign In"]');
  }

  async open() {
    await this.page.goto('/reset_password/');
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/reset_password\/?/);
  }

  async submitReset(email: string) {
    await this.emailInput.fill(email);
    await this.resetPasswordButton.click();
  }
}
