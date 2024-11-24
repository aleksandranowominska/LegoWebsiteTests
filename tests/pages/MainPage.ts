import { Page } from '@playwright/test';
import { urls, locators } from '../data/mainPageData';
import { acceptAgeGateAndCookies } from '../utils/helpers';
import { loginCredentials } from '../data/loginPageData';

export class MainPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Prepare test environment: pick adult mode and accept cookies
  async prepareTestEnvironment() {
    await this.page.goto(urls.base);
    console.log('Opened Lego site');
    await acceptAgeGateAndCookies(this.page, locators);
  }

  // Fill the newsletter form
  async fillAndSubmitNewsletterForm() {
    console.log('Filling the newsletter form.');
    await this.page.locator(locators.newsletterInput).click();
    await this.page.locator(locators.newsletterInput).fill(loginCredentials.email);
    console.log(`Filled newsletter input with email: ${loginCredentials.email}`);
    await this.page.locator(locators.newsletterButton).click();
    console.log('Clicked the newsletter submit button');
  }
}
