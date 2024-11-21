import { test, expect } from '@playwright/test';
import { checkPriceInRange, PriceRangePage } from './PriceRangePage';
import { waitForAndClick, acceptAgeGateAndCookies } from './utils/helpers';
import { urls, texts, roles, filters, locators, priceRanges, priceVerification } from './utils/testData';

test('Check if the product price is within the price range ', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Navigation and filtering
  const priceRangePage = new PriceRangePage(page);
  await waitForAndClick(page.getByRole('button', { name: roles.buyButton }));
  await waitForAndClick(page.getByRole('button', { name: roles.priceRangeButton }));
  await priceRangePage.selectPriceRange(priceRanges.upTo200);  
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

  // Sprawdzenie ceny produktu
  await checkPriceInRange(page.locator(locators.productPrice), priceVerification.from100to200.min, priceVerification.from100to200.max);
});

test('Search for help with getting the instruction', async ({ page }) => {
  await page.goto(urls.base);

  // Confirm age gate and accept cookies
  await acceptAgeGateAndCookies(page, locators);

  // Navigate to help and search
  await waitForAndClick(page.getByRole('button', { name: roles.helpButton }));
  await waitForAndClick(page.locator(locators.helpNavigation).getByRole('link', { name: 'Skontaktuj się z nami' }));
  await page.locator(locators.searchBarInput).click();
  await page.locator(locators.searchBarInput).fill(texts.helpSearchQuery);
  await page.locator(locators.searchBarButton).click();

  // Click on result containing the expected text
  await page.locator('a', { hasText: texts.helpResultTitle }).click();

  // Confirm the information was helpful
  await waitForAndClick(page.getByRole('button', { name: roles.confirmHelpfulButton }));

// Verify the text "Dzięki za opinię" appears and then disappears
await expect(page.locator(`text=${texts.feedbackMessage}`)).toBeVisible({ timeout: 5000 });
await expect(page.locator(`text=${texts.feedbackMessage}`)).toBeHidden({ timeout: 7000 });
});