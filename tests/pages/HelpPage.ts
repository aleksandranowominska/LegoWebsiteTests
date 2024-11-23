import { Page, Locator, expect } from '@playwright/test';
import { helpLocators, helpTexts } from '../data/helpPageData';
import { waitForAndClick } from '../utils/helpers';

export class HelpPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHelpSection(): Promise<void> {
    console.log('Navigating to help section.');
    await waitForAndClick(this.page.getByRole('button', { name: 'Pomoc' }));
    console.log('Clicked on "Help" button.');
  }

  async navigateToContactUs(): Promise<void> {
    console.log('Navigating to "Contact Us" page.');
    await waitForAndClick(this.page.locator(helpLocators.helpNavigation).getByRole('link', { name: 'Skontaktuj się z nami' }));
    console.log('Navigated to "Contact Us" page.');
  }

  async searchForHelp(query: string): Promise<void> {
    console.log(`Searching for help: "${query}".`);
    await this.page.locator('[data-test="search-bar-input"]').click();
    await this.page.locator('[data-test="search-bar-input"]').fill(query);
    await this.page.locator('[data-test="search-bar-btn"]').click();
    console.log(`Search query submitted: "${query}".`);
  }

  async openHelpArticle(title: string): Promise<void> {
    console.log(`Opening help article with title: "${title}".`);
    await this.page.locator('a', { hasText: title }).click();
    console.log(`Opened help article: "${title}".`);
  }

  async confirmHelpfulness(): Promise<void> {
    console.log('Confirming the article was helpful.');
    await waitForAndClick(this.page.getByRole('button', { name: 'Tak' }));
    console.log('Helpfulness confirmed.');
  }

  async verifyFeedbackMessage(message: string): Promise<void> {
    console.log(`Verifying feedback message: "${message}".`);
    const feedbackLocator: Locator = this.page.locator(`text=${message}`);
    await expect(feedbackLocator).toBeVisible({ timeout: 5000 });
    console.log('Feedback message is visible.');
    await expect(feedbackLocator).toBeHidden({ timeout: 7000 });
    console.log('Feedback message is no longer visible.');
  }
}
