import { expect, Page } from '@playwright/test';

export class PriceRangePage {
  constructor(private page: Page) {}

  // Function that clicks to a different price range
  async selectPriceRange(rangeName: string): Promise<void> {
    await this.page.getByRole('link', { name: rangeName }).click();
  }
}

  /**
   * Checks whether the product price is within the price range.
   * @param locator Locator with element price.
   * @param min Minimum value.
   * @param max Maximum value.
   */
  export async function checkPriceInRange(locator, min, max) {
    const priceText = await locator.innerText();
    const price = parseFloat(priceText.replace(',', '.').replace(/[^\d.]/g, ''));
  
    expect(price).toBeGreaterThanOrEqual(min);
    expect(price).toBeLessThanOrEqual(max);
  }