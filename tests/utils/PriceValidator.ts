export class PriceValidator {
  static validatePrice(priceInCents: number, maxPricePLN: number): void {
    const priceInPLN = priceInCents / 100;
    console.log(`Price: ${priceInPLN} PLN`);
    if (priceInPLN > maxPricePLN) {
      throw new Error(`The price exceeds the maximum limit! Current price: ${priceInPLN} PLN`);
    }
  }
}
