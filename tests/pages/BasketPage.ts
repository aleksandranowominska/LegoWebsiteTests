import { Page, expect } from '@playwright/test';
import { basketPageLocators } from '../data/basketPageData';

export class BasketPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Increases the quantity of a product in the basket.
  async increaseProductQuantity(): Promise<void> {
    console.log('Increasing product quantity in the basket');
    await this.page.locator(basketPageLocators.quantityIncreaseButton).click();
    console.log('Product quantity increased');
  }

  // Verifies if a specific product is added to the basket.
  async verifyProductInBasket(productName: string, expectedQuantity: number): Promise<void> {
    console.log(`Verifying if product "${productName}" is in the basket`);
    
    // Check if the product name exists in the basket
    const productNameLocator = this.page.locator('span[data-test="markup"]').filter({ hasText: productName });
    await expect(productNameLocator).toBeVisible();
    console.log(`Product "${productName}" is visible in the basket`);

    // Check if the quantity matches the expected value
    const quantityLocator = this.page.locator('input[data-test="quantity-value"]');
    await expect(quantityLocator).toHaveValue(String(expectedQuantity));
    console.log(`Product "${productName}" has the correct quantity: ${expectedQuantity}`);
  }

  // Waits for the quantity to update and verifies the new value.
  async verifyUpdatedQuantity(expectedQuantity: number): Promise<void> {
    console.log(`Waiting for the quantity to update to ${expectedQuantity}`);
    const quantityLocator = this.page.locator('input[data-test="quantity-value"]');
    
    // Wait for the value to update to the expected quantity
    await expect(quantityLocator).toHaveValue(String(expectedQuantity), { timeout: 5000 });
    console.log(`Quantity successfully updated to: ${expectedQuantity}`);
  }
}
