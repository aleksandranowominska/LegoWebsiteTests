import { expect } from "@playwright/test";

export async function waitForAndClick(locator) {
    await locator.waitFor(); // Wait for the element to be available
    await locator.click();   // Perform the click action
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
  