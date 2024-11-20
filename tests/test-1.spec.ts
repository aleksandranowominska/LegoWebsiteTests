import { test, expect } from '@playwright/test';
import { PriceRangePage } from './PriceRangePage';
import { waitForAndClick } from './utils/helpers';
import { urls, texts, roles, filters, locators, priceRanges } from './utils/testData';

test('test', async ({ page }) => {
  await page.goto(urls.base);

  // Age gate confirmation
  await waitForAndClick(page.locator(locators.ageGateButton));

  // Cookie confirmation
  await waitForAndClick(page.locator(locators.cookieAcceptButton));

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

  // Open product info
  await waitForAndClick(page.locator(locators.infoButton).nth(1));

  // Verify text on the page
  await expect(page.locator('body')).toContainText(texts.bodyVerification);
});
