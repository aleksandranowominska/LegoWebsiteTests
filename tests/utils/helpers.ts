import { expect } from "@playwright/test";
import { credentials, locators } from "./testData";

export async function waitForAndClick(locator) {
  await locator.waitFor(); // Wait for the element to be available
  await locator.click();   // Perform the click action
}

export async function acceptAgeGateAndCookies(page, locators) {
  // Age gate confirmation
  await waitForAndClick(page.locator(locators.ageGateButton));

  // Cookie confirmation
  await waitForAndClick(page.locator(locators.cookieAcceptButton));
  console.log('Age gate confirmed and cookies accepted.');
}

export async function performLoginWithLegoId(page, locators) {
  // Click login button
  await waitForAndClick(page.locator(locators.loginButton));
  console.log('Clicked on login button.');

  // Click LEGO ID login button
  await waitForAndClick(page.locator(locators.legoIdLoginButton));
  console.log('Selected LEGO ID login option.');
}

async function handleGoogleSignInError(page) {
    const tryAgainButton = page.locator(locators.googleTryAgainButton);
    
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
    
    const emailInput = page.locator(locators.googleEmailInput);
    await emailInput.waitFor({ state: 'visible' });
    await emailInput.fill(credentials.googleEmail);
    console.log('Re-filled Google email.');
    
    await waitForAndClick(page.locator(locators.googleNextEmailButton));
    console.log('Clicked "Next" button after retry.');
  }

  export async function performGoogleSignIn(page) {
    // Click on the "Sign in with Google" button
    await waitForAndClick(page.getByTestId(locators.googleSignInButton));
    console.log('Clicked on Google Sign-In button.');
  
    // Wait until the page is fully loaded
    await page.waitForLoadState('networkidle');
  
    // Fill in the email
    await page.locator(locators.googleEmailInput).fill(credentials.googleEmail);
    console.log('Filled Google email.');
  
    // Click the "Next" button for email step
    await waitForAndClick(page.locator(locators.googleNextEmailButton));
    console.log('Clicked "Next" button after email.');
  
    // Handle potential "Try again" scenario
    await handleGoogleSignInError(page);

     // Wait for password input to be visible
    await page.locator(locators.googlePasswordInput).waitFor({ state: 'visible' });

    // Fill in the password
    await page.locator(locators.googlePasswordInput).fill(credentials.googlePassword);
    console.log('Filled Google password.');

    // Click the "Next" button for password step
    await waitForAndClick(page.locator(locators.googleNextPasswordButton));
    console.log('Clicked "Next" button after password.');
  }