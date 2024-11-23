import { Page } from '@playwright/test';
import { waitForAndClick } from '../utils/helpers';
import { productLocators } from '../data/productPageData';

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

    // Waits for the product page to fully load by checking an element that indicates the page is ready.
    async waitForPageToLoad(): Promise<void> {
    console.log('Waiting for the product page to load...');
    await this.page.waitForLoadState('networkidle');
    console.log('Product page loaded.');
  }

    // Clicks outside the body element (e.g., to close any overlays or modals).
    async clickOutsideBody(): Promise<void> {
    console.log('Clicking outside body to dismiss overlays or modals.');
    await this.page.locator('body').click();
  }

    // Returns the price locator for the current product.
    getProductPriceLocator() {
    return this.page.locator(productLocators.productPrice);
  }
}
