import { Page } from '@playwright/test';
import { googleCredentials, googleLocators } from '../data/googlePageData';
import { waitForAndClick } from '../utils/helpers';
import { LoginPage } from './LoginPage';

export class GooglePage {
  constructor(private page: Page) {}

  private async handleGoogleSignInError() {
    const tryAgainButton = this.page.locator(googleLocators.googleTryAgainButton);
    
    try {
      await tryAgainButton.waitFor({ state: 'visible', timeout: 5000 });
      console.log('Try again button is now visible.');
    } catch (error) {
      console.log('Try again button did not appear within timeout.');
      return;
    }
  
    console.log('Retry detected: "Try again" button is visible. Retrying sign-in.');
    await tryAgainButton.click({ force: true });
    console.log('Clicked "Try again".');
    
    const emailInput = this.page.locator(googleLocators.googleEmailInput);
    await emailInput.waitFor({ state: 'visible' });
    await emailInput.fill(googleCredentials.googleEmail);
    console.log('Re-filled Google email.');
    
    await waitForAndClick(this.page.locator(googleLocators.googleNextEmailButton));
    console.log('Clicked "Next" button after retry.');
  }

  async performGoogleSignIn() {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickLoginButton();

    // Click on the "Sign in with Google" button
    await waitForAndClick(this.page.getByTestId(googleLocators.googleSignInButton));
    console.log('Clicked on Google Sign-In button.');
  
    await this.page.waitForLoadState('networkidle');
  
    // Fill in the email
    await this.page.locator(googleLocators.googleEmailInput).fill(googleCredentials.googleEmail);
    console.log('Filled Google email.');
  
    // Click the "Next" button for email step
    await waitForAndClick(this.page.locator(googleLocators.googleNextEmailButton));
    console.log('Clicked "Next" button after email.');
  
    // Handle potential "Try again" scenario
    await this.handleGoogleSignInError();
  
    // Wait for password input to be visible
    await this.page.locator(googleLocators.googlePasswordInput).waitFor({ state: 'visible' });
  
    // Fill in the password
    await this.page.locator(googleLocators.googlePasswordInput).fill(googleCredentials.googlePassword);
    console.log('Filled Google password.');
  
    // Click the "Next" button for password step
    await waitForAndClick(this.page.locator(googleLocators.googleNextPasswordButton));
    console.log('Clicked "Next" button after password.');
  }
}
