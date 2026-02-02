import { Page, Locator } from '@playwright/test';

export class LiteratureReviewsPage {
  readonly page: Page;
  readonly createNewProject: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewProject = page.locator('a[href="/literature_reviews/create_literaturereview"]');
  }

  async clickCreateNewProject() {
    await this.createNewProject.click();
  }
}
