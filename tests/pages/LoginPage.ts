import { expect, Page } from '@playwright/test';
import { loginLocators, loginCredentials, loginTexts } from '../data/loginPageData';
import { waitForAndClick } from '../utils/helpers';

export class LoginPage {
  constructor(private page: Page) {}

  async clickLoginButton() {
    // Click login button
    await waitForAndClick(this.page.locator(loginLocators.loginButton));
    console.log('Clicked on login button.');
  
    // Click LEGO ID login button
    await waitForAndClick(this.page.locator(loginLocators.legoIdLoginButton));
    console.log('Selected LEGO ID login option.');
  }

  async loginWithLegoId() {
    await this.clickLoginButton();
  
    // Fill email
    await this.page.locator(loginLocators.emailInput).fill(loginCredentials.email);
    console.log("Filled correct email.");
    await waitForAndClick(this.page.locator(loginLocators.continueButton));
  
    // Fill password
    await this.page.locator(loginLocators.passwordInput).fill(loginCredentials.password);
    console.log("Filled correct password.");
    await waitForAndClick(this.page.locator(loginLocators.submitLoginButton));
  
    console.log("Login with LEGO ID completed.");
  }

  async assertUserLoggedIn() {
    const accountNameLocator = this.page.locator(loginLocators.accountNameText);
    await expect(accountNameLocator).toBeVisible({ timeout: 5000 });
    await expect(accountNameLocator).toContainText(loginTexts.accountName);
    console.log("Account name confirmed.");
  }
}
