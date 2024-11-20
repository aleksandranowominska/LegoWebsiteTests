import { Page } from '@playwright/test';

export class PriceRangePage {
  constructor(private page: Page) {}

  // Function that clicks to a different price range
  async selectPriceRange(rangeName: string): Promise<void> {
    await this.page.getByRole('link', { name: rangeName }).click();
  }
}