import { expect } from "@playwright/test";

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
  