import { expect } from "@playwright/test";
import { credentials, locators } from "./testData";
import { googleLocators, googleCredentials } from "../data/googlePageData.ts";

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