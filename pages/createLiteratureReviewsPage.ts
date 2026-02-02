import { Page, Locator } from '@playwright/test';

export class CreateLiteratureReviewsPage {
  readonly page: Page;
  readonly projectName: Locator;
  readonly nextStepButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectName = page.locator('#project-name');
    this.nextStepButton = page.locator("//button[normalize-space(.)='Next Step']");
  }
}
