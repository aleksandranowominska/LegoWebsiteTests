import dotenv from 'dotenv';
dotenv.config();

export const urls = {
  base: 'https://www.lego.com/pl-pl?age-gate=grown_up',
  productPage: 'https://www.lego.com/pl-pl/product/pirate-snub-fighter-75346',
};

export const locators = {
  ageGateButton: '[data-test="age-gate-grown-up-cta"]',
  cookieAcceptButton: '[data-test="cookie-accept-all"]',
  productTitle: '[data-test="product-leaf-title"]',
  searchBarInput: '[data-test="search-bar-input"]',
  searchBarButton: '[data-test="search-bar-btn"]',
  newsletterInput: '[data-test="input-with-button-input"]',
  newsletterButton: '[data-test="input-with-button-button"]',
};