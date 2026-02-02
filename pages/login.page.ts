import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class LoginPage extends BasePage {
  readonly emailInp: Locator;
  readonly passwordInp: Locator;
  readonly signInBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpNowLink: Locator;
  readonly loginTitle: Locator;
  readonly dashboardLink: Locator;
  readonly validationMessage: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInp = page.locator('//input[contains(@type, "email")]');
    this.passwordInp = page.locator('//input[contains(@type, "password")]');
    this.signInBtn = page.locator('//button[contains(@type, "submit")]');
    this.forgotPasswordLink = page.locator('//app-button[contains(@routerlink, "/auth/forgot-password")]');
    this.signUpNowLink = page.locator('//app-button[contains(@class, "__info-button --primary --link")]');
    this.loginTitle = page.locator('div.rmv-heading-1').filter({ hasText: /sign in/i });
    this.dashboardLink = page.locator('//cdk-tree//a[contains(@href, "dashboard")]');
    this.validationMessage = page.locator('app-validation-message');
    this.toastMessage = page.locator('#toast-container');
  }
}
