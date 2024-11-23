import { Page } from '@playwright/test';
import { waitForAndClick } from '../utils/helpers';
import { searchResultFilters, searchResultLocators, searchResultTexts } from '../data/searchResultPageData';

export class SearchResultPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Applies filters to the search results.
  async applyFilters(): Promise<void> {
    console.log('Applying filters to search results');

    // Check "In Stock" checkbox
    await waitForAndClick(this.page.locator(searchResultFilters.inStockCheckbox));
    console.log('In Stock filter applied');

    // Click "See More" button
    await waitForAndClick(this.page.locator(searchResultFilters.seeMoreButton));
    console.log('"See More" button clicked');

    // Select "Entertainment" category
    await waitForAndClick(this.page.getByText(searchResultFilters.entertainmentText));
    console.log('"Entertainment" filter applied');
  }

  // Applies sorting to the search results.
  async applySorting(): Promise<void> {
    console.log('Applying sorting to search results');

    // Click on sorting dropdown menu
    await waitForAndClick(this.page.getByText(searchResultFilters.sortByRecommended));
    console.log('Clicked on sorting dropdown menu');

    // Sort by "Rating"
    await waitForAndClick(this.page.getByText(searchResultFilters.sortByRating));
    console.log('Sorted by "Rating"');
  }

     // Navigates to the specific product page.
     async navigateToProduct(): Promise<void> {
      console.log('Navigating to the specific product page');
     }

  // Adds a specific product to the cart.
  async addProductToCart(productName: string): Promise<void> {
    console.log(`Adding product "${productName}" to the cart`);
    const productLocator = this.page.locator('article').filter({ hasText: productName });
    await productLocator.locator(searchResultLocators.addToCartButton).click();
    console.log(`Product "${productName}" added to the cart`);
}

  // Views the shopping bag after adding a product.
  async viewShoppingBag(): Promise<void> {
    console.log('Viewing shopping bag');
    await this.page.locator(searchResultLocators.viewMyBagButton).click();
    console.log('Shopping bag opened');
  }
}
