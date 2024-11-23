import { test, expect } from '@playwright/test';
import { checkPriceInRange, PriceRangePage } from './PriceRangePage';
import { waitForAndClick, acceptAgeGateAndCookies } from './utils/helpers';
import { urls, texts, roles, filters, locators, priceRanges, priceVerification } from './utils/testData';
import { performGoogleSignIn } from './pages/GooglePage';
import { loginCredentials, loginLocators, loginTexts } from './data/loginPageData';
import { assertUserLoggedIn, clickLoginButton, loginWithLegoId } from './pages/LoginPage';
import { helpLocators, helpTexts } from './data/helpPageData';
import { HelpPage } from './pages/HelpPage';

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
  await page.goto('https://www.lego.com/pl-pl?age-gate=grown_up');

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Create an instance of HelpPage
  const helpPage = new HelpPage(page);

  // Navigate and search in help section
  await helpPage.navigateToHelpSection();
  await helpPage.navigateToContactUs();
  await helpPage.searchForHelp(helpTexts.helpSearchQuery);

  // Open a specific help article
  await helpPage.openHelpArticle(helpTexts.helpResultTitle);

  // Confirm and verify feedback
  await helpPage.confirmHelpfulness();
  await helpPage.verifyFeedbackMessage(helpTexts.feedbackMessage);
});

test('Login to the user account with email', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Perform login steps
  console.log("Performing login - happy path.");
  await loginWithLegoId(page);

  // Assert user logged in
  await assertUserLoggedIn(page);
});

test('Login to the user account with Google account', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Perform LEGO ID login steps
  await clickLoginButton(page, locators);

  // Use the new Google Sign-In function
  console.log('Performing login with Google.');
  await performGoogleSignIn(page);

  // Assert user logged in
  await assertUserLoggedIn(page);
});