import { PriceValidator } from './PriceValidator';

export class ApiHelper {
  // Extracts the token from the cookies array
  static getTokenFromCookies(cookies: { name: string, value: string }[]): string {
    const tokenCookie = cookies.find(cookie => cookie.name === 'gqauth');
    if (!tokenCookie || !tokenCookie.value) {
      throw new Error('Token cookie not found!');
    }
    return tokenCookie.value;
  }

  // Validates the API response to ensure that recommended products are present
  static validateApiResponse(data: any): void {
    if (!data?.data?.productRecommendations?.recommendedProducts) {
      throw new Error('Recommended products list not found in the API response.');
    }
  }

  // Validates the prices of recommended products, checking if they are below the specified max price
  static validateRecommendedProductPrices(recommendedProducts: any[], maxPrice: number): void {
    recommendedProducts.forEach(product => {
      const priceInCents = product.price.centAmount;
      const priceInPLN = priceInCents / 100;
      console.log(`Product: ${product.name}, Price: ${priceInPLN} PLN`);
      PriceValidator.validatePrice(priceInCents, maxPrice);
    });
  }
}
