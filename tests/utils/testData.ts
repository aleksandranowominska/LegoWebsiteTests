// Test data
export const urls = {
    base: 'https://www.lego.com/pl-pl?age-gate=grown_up',
    productPage: 'https://www.lego.com/pl-pl/product/pirate-snub-fighter-75346',
  };
  
  export const texts = {
    productTitle: 'Piracki myśliwiec',
    bodyVerification: 'Ograniczenie',
  };
  
  export const roles = {
    buyButton: 'Kupuj',
    priceRangeButton: 'Przedziały cenowe',
  };
  
  export const filters = {
    inStockCheckbox: '[data-test="in-stock-items-only"] [data-test="checkbox-text"]',
    seeMoreButton: '[data-test="product-facet-interest-accordion-content-child"] [data-test="see-more"]',
    entertainmentText: 'Rozrywka',
    sortByRecommended: 'Sortuj według:Polecane',
    sortByRating: 'Ocena',
  };
  
  export const locators = {
    ageGateButton: '[data-test="age-gate-grown-up-cta"]',
    cookieAcceptButton: '[data-test="cookie-accept-all"]',
    productTitle: '[data-test="product-leaf-title"]',
    infoButton: '[data-test="info-button"]',
    productPrice: '[data-test="product-price-sale"]',
  };
  
  export const priceRanges = {
    allRanges: 'ZOBACZ WSZYSTKIE PRZEDZIAŁY',
    below50: 'Poniżej 50 zł',
    upTo100: 'zł - 100 zł',
    upTo200: 'zł - 200 zł',
    upTo500: 'zł - 500 zł',
    above500: 'Ponad 500 zł',
  };
  
  export const priceVerification = {
    below50: { min: 0, max: 50 },
    from50to100: { min: 50, max: 100 },
    from100to200: { min: 100, max: 200 },
    from200to500: { min: 200, max: 500 },
    above500: { min: 500, max: Infinity },
  };
  