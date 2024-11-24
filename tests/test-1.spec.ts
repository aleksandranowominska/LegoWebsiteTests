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
import { BasketPage } from './pages/BasketPage';
import { SubscriptionPage } from './pages/subscriptionPage';
import { searchResultTexts } from './data/searchResultPageData';
import { ApiClient } from './utils/ApiClient';
import { PRODUCT_RECOMMENDATIONS_QUERY } from './utils/graphqlQueries';
import { ApiHelper } from './utils/ApiHelper';

// E2E tests
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

test('Login to the user account with Google', async ({ page }) => {
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

  const navigationMenuPage = new NavigationMenuPage(page);
  await navigationMenuPage.navigateToLegoBagsCategory();

  const searchResultPage = new SearchResultPage(page);
  const productName = searchResultTexts.specificBag;
  await searchResultPage.addProductToCart(productName);
  await searchResultPage.viewShoppingBag();

  const basketPage = new BasketPage(page);
  await basketPage.verifyProductInBasket(productName, 1);

  await basketPage.increaseProductQuantity();
  await basketPage.verifyUpdatedQuantity(2);
});

test('Subscribe to newsletter', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.prepareTestEnvironment();

  await mainPage.fillAndSubmitNewsletterForm();

  const subscriptionPage = new SubscriptionPage(page);
  await subscriptionPage.assertDisplayedEmail();
  await subscriptionPage.fillSubscriptionForm();
});

// API tests
test('Validate recommended product prices', async ({ page, request }) => {
  const productPage = new ProductPage(page);

  await productPage.openProductPage();

  const cookies = await page.context().cookies();
  console.log('Cookies obtained:', cookies);

  const token = ApiHelper.getTokenFromCookies(cookies);
  console.log('Token obtained:', token);

  const apiClient = new ApiClient(request);
  const data = await apiClient.sendGraphQLRequest(token, PRODUCT_RECOMMENDATIONS_QUERY);

  ApiHelper.validateApiResponse(data);
  const recommendedProducts = data.data.productRecommendations.recommendedProducts;
  ApiHelper.validateRecommendedProductPrices(recommendedProducts, 200);
});