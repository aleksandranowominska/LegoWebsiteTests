import { test, expect } from '@playwright/test';
import { checkPriceInRange, PriceRangePage } from './PriceRangePage';
import { waitForAndClick, acceptAgeGateAndCookies, performLoginWithLegoId } from './utils/helpers';
import { urls, texts, roles, filters, locators, priceRanges, priceVerification, credentials } from './utils/testData';
import { performGoogleSignIn } from './pages/GooglePage';

test('Check if the product price is within the price range ', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Navigation and filtering
  console.log('Navigating to the price range selection');
  const priceRangePage = new PriceRangePage(page);
  await waitForAndClick(page.getByRole('button', { name: roles.buyButton }));
  await waitForAndClick(page.getByRole('button', { name: roles.priceRangeButton }));
  await priceRangePage.selectPriceRange(priceRanges.upTo200);  
  console.log('Selected price range: up to 200.');
  await waitForAndClick(page.locator(filters.inStockCheckbox));
  await waitForAndClick(page.locator(filters.seeMoreButton));

  // Sorting and selecting products
  await waitForAndClick(page.getByText(filters.entertainmentText));
  await waitForAndClick(page.getByText(filters.sortByRecommended));
  await waitForAndClick(page.getByText(filters.sortByRating));

  // Navigate to specific product page
  await waitForAndClick(page.getByLabel(texts.productTitle));

  // Clicking outside body
  await page.locator('body').click();

  // Checking the product price
  await checkPriceInRange(page.locator(locators.productPrice), priceVerification.from100to200.min, priceVerification.from100to200.max);
  console.log('Product price is within the range of 100-200.');
});

test('Search for help with getting the instruction', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Navigate to help and search
  console.log('Navigating to help section');
  await waitForAndClick(page.getByRole('button', { name: roles.helpButton }));
  await waitForAndClick(page.locator(locators.helpNavigation).getByRole('link', { name: 'Skontaktuj się z nami' }));
  console.log('Navigated to "Contact Us" page.');
  await page.locator(locators.searchBarInput).click();
  await page.locator(locators.searchBarInput).fill(texts.helpSearchQuery);
  await page.locator(locators.searchBarButton).click();
  console.log(`Searched query: ${texts.helpSearchQuery}.`);

  // Click on result containing the expected text
  await page.locator('a', { hasText: texts.helpResultTitle }).click();
  console.log(`Opened help article.`);

  // Confirm the information was helpful
  await waitForAndClick(page.getByRole('button', { name: roles.confirmHelpfulButton }));
  console.log('Confirmed the information was helpful');

  // Verify the text "Dzięki za opinię" appears and then disappears
  await expect(page.locator(`text=${texts.feedbackMessage}`)).toBeVisible({ timeout: 5000 });
  console.log('Feedback message appeared.');
  await expect(page.locator(`text=${texts.feedbackMessage}`)).toBeHidden({ timeout: 7000 });
  console.log('Feedback message disappeared.');
});

test('Login to the user account with email', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Perform login steps
  console.log('Performing login - happy path.');
  await performLoginWithLegoId(page, locators);

  // Fill email
  await page.locator(locators.emailInput).fill(credentials.email);
  console.log('Filled correct email.');
  await waitForAndClick(page.locator(locators.continueButton));

  // Fill password
  await page.locator(locators.passwordInput).fill(credentials.password);
  console.log('Filled correct password.');
  await waitForAndClick(page.locator(locators.submitLoginButton));

  // Assert user logged in
  const accountNameLocator = page.locator(locators.accountNameText);
  await expect(accountNameLocator).toBeVisible({ timeout: 5000 });
  await expect(accountNameLocator).toContainText(texts.accountName);
  console.log('Account name confirmed.');
});

test('Login to the user account with Google account', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Perform LEGO ID login steps
  await performLoginWithLegoId(page, locators);

  // Use the new Google Sign-In function
  console.log('Performing login with Google.');
  await performGoogleSignIn(page);

  // Assert user logged in
  const accountNameLocator = page.locator(locators.accountNameText);
  await expect(accountNameLocator).toBeVisible({ timeout: 5000 });
  await expect(accountNameLocator).toContainText(texts.accountName);
  console.log('Account name confirmed.');
});