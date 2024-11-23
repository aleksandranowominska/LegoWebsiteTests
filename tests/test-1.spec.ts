import { test } from '@playwright/test';
import { MainPage } from './pages/MainPage';
import { GooglePage } from './pages/GooglePage';
import { LoginPage } from './pages/LoginPage';
import { HelpPage } from './pages/HelpPage';
import { NavigationMenuPage } from './pages/NavigationMenuPage';
import { SearchResultPage } from './pages/SearchResultPage';
import { ProductPage } from './pages/ProductPage';
import { priceVerification } from './data/productPageData';
import { helpTexts } from './data/helpPageData';
import { navigationMenuRoles } from './data/navigationMenuPageData';
import { waitForAndClick } from './utils/helpers';
import { searchResultLocators, searchResultTexts } from './data/searchResultPageData';
import { basketPageLocators } from './data/basketPageData';
import { BasketPage } from './pages/BasketPage';

test('Check if the product price is within the price range', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.prepareTestEnvironment();

  const navigationMenu = new NavigationMenuPage(page);
  await navigationMenu.navigateToPriceRange('zł - 200 zł');

  const searchResultPage = new SearchResultPage(page);
  await searchResultPage.applyFilters();
  await searchResultPage.applySorting();
  await searchResultPage.navigateToProduct();

  const productPage = new ProductPage(page);
  await productPage.waitForPageToLoad();
  await productPage.clickOutsideBody();

  const productPriceLocator = productPage.getProductPriceLocator();
  await navigationMenu.checkPriceInRange(
    productPriceLocator,
    priceVerification.from100to200.min,
    priceVerification.from100to200.max
  );
});

test('Search for help with getting the instruction', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.prepareTestEnvironment();

  const helpPage = new HelpPage(page);
  await helpPage.navigateToHelpSection();
  await helpPage.navigateToContactUs();
  await helpPage.searchForHelp(helpTexts.helpSearchQuery);
  await helpPage.openHelpArticle(helpTexts.helpResultTitle);
  await helpPage.confirmHelpfulness();
  await helpPage.verifyFeedbackMessage(helpTexts.feedbackMessage);
});

test('Login to the user account with email', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.prepareTestEnvironment();

  const loginPage = new LoginPage(page);
  await loginPage.loginWithLegoId();
  await loginPage.assertUserLoggedIn();
});

test('Login to the user account with Google account', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.prepareTestEnvironment();

  const googlePage = new GooglePage(page);
  await googlePage.performGoogleSignIn();

  const loginPage = new LoginPage(page);
  await loginPage.assertUserLoggedIn();
});

test('Add product to the cart, verify and increase quantity', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.prepareTestEnvironment();

  // Navigate to LEGO Bags category
  const navigationMenuPage = new NavigationMenuPage(page);
  await navigationMenuPage.navigateToLegoBagsCategory();

  // Add specific product to cart and view bag
  const searchResultPage = new SearchResultPage(page);
  const productName = searchResultTexts.specificBag; // Now contains only the product name
  await searchResultPage.addProductToCart(productName);
  await searchResultPage.viewShoppingBag();

  // Verify the product is in the basket with the correct quantity
  const basketPage = new BasketPage(page);
  await basketPage.verifyProductInBasket(productName, 1);

  // Increase product quantity and verify the updated quantity
  await basketPage.increaseProductQuantity();
  await basketPage.verifyUpdatedQuantity(2);
});