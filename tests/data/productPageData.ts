export const productLocators = {
  productPrice: '[data-test="product-price-sale"]',
};

export const productUrls = {
  productPage: 'https://www.lego.com/pl-pl/product/pirate-snub-fighter-75346',
};

export const priceVerification = {
  below50: { min: 0, max: 50 },
  from50to100: { min: 50, max: 100 },
  from100to200: { min: 100, max: 200 },
  from200to500: { min: 200, max: 500 },
  above500: { min: 500, max: Infinity },
};