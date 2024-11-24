import { Page } from '@playwright/test';
import { acceptAgeGateAndCookies, waitForAndClick } from '../utils/helpers';
import { productLocators, productUrls } from '../data/productPageData';

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

  // Opens the product page and handles the cookies consent popup
  async openProductPage(): Promise<void> {
    await this.page.goto(productUrls.productPage);
    console.log('Navigated to product page.');

    await acceptAgeGateAndCookies(this.page, productLocators);
    console.log('Age gate and cookies consent handled.');
  }

}
