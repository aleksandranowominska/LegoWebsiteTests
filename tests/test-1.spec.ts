import { test, expect } from '@playwright/test';
import { waitForAndClick, acceptAgeGateAndCookies } from './utils/helpers';
import { urls, roles, locators, priceVerification } from './utils/testData';
import { performGoogleSignIn } from './pages/GooglePage';
import { loginCredentials, loginLocators, loginTexts } from './data/loginPageData';
import { assertUserLoggedIn, clickLoginButton, loginWithLegoId } from './pages/LoginPage';
import { helpLocators, helpTexts } from './data/helpPageData';
import { HelpPage } from './pages/HelpPage';
import { navigationMenuRoles, priceRanges } from './data/navigationMenuPageData';
import { NavigationMenuPage } from './pages/NavigationMenuPage';
import { searchResultFilters, searchResultTexts } from './data/searchResultPageData';
import { SearchResultPage } from './pages/SearchResultPage';
import { productLocators } from './data/productPageData';
import { ProductPage } from './pages/ProductPage';

test('Check if the product price is within the price range', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Navigation to price range
  const navigationMenu = new NavigationMenuPage(page);
  await navigationMenu.navigateToPriceRange('zł - 200 zł');

  // Apply filters, sorting, and navigate to the product page
  const searchResultPage = new SearchResultPage(page);
  await searchResultPage.applyFilters();
  await searchResultPage.applySorting();
  await searchResultPage.navigateToProduct();

  // Product page logic
  const productPage = new ProductPage(page);
  await productPage.waitForPageToLoad();
  await productPage.clickOutsideBody();

  // Checking the product price
  const productPriceLocator = productPage.getProductPriceLocator();
  await navigationMenu.checkPriceInRange(
    productPriceLocator,
    priceVerification.from100to200.min,
    priceVerification.from100to200.max
  );
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