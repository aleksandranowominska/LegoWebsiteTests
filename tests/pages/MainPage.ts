import { Page } from '@playwright/test';
import { urls, locators } from '../data/mainPageData';
import { acceptAgeGateAndCookies } from '../utils/helpers';

export class MainPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async prepareTestEnvironment() {
    await this.page.goto(urls.base);
    console.log('Opened Lego site');
    await acceptAgeGateAndCookies(this.page, locators);
  }
}
