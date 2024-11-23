import dotenv from 'dotenv';
dotenv.config();

export const urls = {
  base: 'https://www.lego.com/pl-pl?age-gate=grown_up',
  productPage: 'https://www.lego.com/pl-pl/product/pirate-snub-fighter-75346',
};

export const roles = {
  helpButton: 'Pomoc',
  confirmHelpfulButton: 'Tak',
};

export const locators = {
  ageGateButton: '[data-test="age-gate-grown-up-cta"]',
  cookieAcceptButton: '[data-test="cookie-accept-all"]',
  productTitle: '[data-test="product-leaf-title"]',
  infoButton: '[data-test="info-button"]',
  productPrice: '[data-test="product-price-sale"]',
  searchBarInput: '[data-test="search-bar-input"]',
  searchBarButton: '[data-test="search-bar-btn"]',
};

export const priceVerification = {
  below50: { min: 0, max: 50 },
  from50to100: { min: 50, max: 100 },
  from100to200: { min: 100, max: 200 },
  from200to500: { min: 200, max: 500 },
  above500: { min: 500, max: Infinity },
};
