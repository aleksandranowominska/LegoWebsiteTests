import { Page } from '@playwright/test';
import { googleCredentials, googleLocators } from '../data/googlePageData';
import { waitForAndClick } from '../utils/helpers';

export class GooglePage {
    private page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
}

      async function handleGoogleSignInError(page) {
          const tryAgainButton = page.locator(googleLocators.googleTryAgainButton);
          
          try {
            // Waiting for the "Try again" button
            await tryAgainButton.waitFor({ state: 'visible', timeout: 5000 });
            console.log('Try again button is now visible.');
          } catch (error) {
            console.log('Try again button did not appear within timeout.');
            return;
          }
        
          console.log('Retry detected: "Try again" button is visible. Retrying sign-in.');
          await tryAgainButton.click({ force: true });
          console.log('Clicked "Try again".');
          
          const emailInput = page.locator(googleLocators.googleEmailInput);
          await emailInput.waitFor({ state: 'visible' });
          await emailInput.fill(googleCredentials.googleEmail);
          console.log('Re-filled Google email.');
          
          await waitForAndClick(page.locator(googleLocators.googleNextEmailButton));
          console.log('Clicked "Next" button after retry.');
        }
      
        export async function performGoogleSignIn(page) {
          // Click on the "Sign in with Google" button
          await waitForAndClick(page.getByTestId(googleLocators.googleSignInButton));
          console.log('Clicked on Google Sign-In button.');
        
          // Wait until the page is fully loaded
          await page.waitForLoadState('networkidle');
        
          // Fill in the email
          await page.locator(googleLocators.googleEmailInput).fill(googleCredentials.googleEmail);
          console.log('Filled Google email.');
        
          // Click the "Next" button for email step
          await waitForAndClick(page.locator(googleLocators.googleNextEmailButton));
          console.log('Clicked "Next" button after email.');
        
          // Handle potential "Try again" scenario
          await handleGoogleSignInError(page);
      
           // Wait for password input to be visible
          await page.locator(googleLocators.googlePasswordInput).waitFor({ state: 'visible' });
      
          // Fill in the password
          await page.locator(googleLocators.googlePasswordInput).fill(googleCredentials.googlePassword);
          console.log('Filled Google password.');
      
          // Click the "Next" button for password step
          await waitForAndClick(page.locator(googleLocators.googleNextPasswordButton));
          console.log('Clicked "Next" button after password.');
        }