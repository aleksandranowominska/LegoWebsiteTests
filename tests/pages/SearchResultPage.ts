import { Page } from '@playwright/test';
import { waitForAndClick } from '../utils/helpers';
import { searchResultFilters, searchResultTexts } from '../data/searchResultPageData';

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

    // Click on the product title
    await waitForAndClick(this.page.getByLabel(searchResultTexts.productTitle));
    console.log(`Navigated to product: ${searchResultTexts.productTitle}`);
  }
}
