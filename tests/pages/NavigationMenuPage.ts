import { Page, expect } from '@playwright/test';
import { waitForAndClick } from '../utils/helpers';
import { navigationMenuRoles } from '../data/navigationMenuPageData';

export class NavigationMenuPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the specified price range.
   * @param upToRange The name of the price range to select (e.g., 'zł - 200 zł').
   */
  async navigateToPriceRange(upToRange: string) {
    console.log('Navigating to the price range selection');
    
    // Click on "Buy" button in the navigation menu
    await waitForAndClick(this.page.getByRole('button', { name: navigationMenuRoles.buyButton }));
    console.log('Buy button clicked');

    // Click on "Price Range" button in the navigation menu
    await waitForAndClick(this.page.getByRole('button', { name: navigationMenuRoles.priceRangeButton }));
    console.log('Price Range button clicked');

    // Select the specified price range
    await this.selectPriceRange(upToRange);
    console.log(`Selected price range: ${upToRange}.`);
  }

  /**
   * Navigates to the specified category in the navigation menu.
   */
  async navigateToLegoBagsCategory() {
    // lick on "Buy" button in the navigation menu
    await waitForAndClick(this.page.getByRole('button', { name: navigationMenuRoles.buyButton }));
    console.log('Buy button clicked');

    // Click on "Artykuły LEGO" button in the navigation menu
    await waitForAndClick(this.page.getByRole('button', { name: navigationMenuRoles.legoArticlesButton }));
    console.log('LEGO Articles button clicked');

    // Click on "Torby i Plecaki" button in the navigation menu
    await waitForAndClick(this.page.getByRole('link', { name: navigationMenuRoles.bagsAndBackpacksLink }));
    console.log('Bags and Backpacks link clicked');
  }

  /**
   * Selects a specific price range on the page.
   * @param rangeName The name of the price range to click.
   */
  private async selectPriceRange(rangeName: string): Promise<void> {
    await this.page.getByRole('link', { name: rangeName }).click();
  }

  /**
   * Checks whether the product price is within the specified price range.
   * @param locator Locator for the element containing the product price.
   * @param min Minimum price value.
   * @param max Maximum price value.
   */
  async checkPriceInRange(locator: any, min: number, max: number) {
    const priceText = await locator.innerText();
    const price = parseFloat(priceText.replace(',', '.').replace(/[^\d.]/g, ''));

    expect(price).toBeGreaterThanOrEqual(min);
    expect(price).toBeLessThanOrEqual(max);

    console.log(`Verified that the price ${price} is between ${min} and ${max}.`);
  }
}
