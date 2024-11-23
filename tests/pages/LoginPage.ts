import { expect, Page } from '@playwright/test';
import { loginLocators, loginCredentials, loginTexts } from '../data/loginPageData';
import { waitForAndClick } from '../utils/helpers';

export class LoginPage {
    constructor(private page: Page) {}
}

export async function clickLoginButton(page, locators) {
    // Click login button
    await waitForAndClick(page.locator(loginLocators.loginButton));
    console.log('Clicked on login button.');
  
    // Click LEGO ID login button
    await waitForAndClick(page.locator(loginLocators.legoIdLoginButton));
    console.log('Selected LEGO ID login option.');
  }

  export async function loginWithLegoId(page) {
    await clickLoginButton(page, loginLocators);
  
    // Fill email
    await page.locator(loginLocators.emailInput).fill(loginCredentials.email);
    console.log("Filled correct email.");
    await waitForAndClick(page.locator(loginLocators.continueButton));
  
    // Fill password
    await page.locator(loginLocators.passwordInput).fill(loginCredentials.password);
    console.log("Filled correct password.");
    await waitForAndClick(page.locator(loginLocators.submitLoginButton));
  
    console.log("Login with LEGO ID completed.");
  }

  export async function assertUserLoggedIn(page) {
    const accountNameLocator = page.locator(loginLocators.accountNameText);
    await expect(accountNameLocator).toBeVisible({ timeout: 5000 });
    await expect(accountNameLocator).toContainText(loginTexts.accountName);
    console.log("Account name confirmed.");
  }