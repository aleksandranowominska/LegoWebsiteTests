import dotenv from 'dotenv';
dotenv.config();

export const urls = {
    base: 'https://www.lego.com/pl-pl?age-gate=grown_up',
    productPage: 'https://www.lego.com/pl-pl/product/pirate-snub-fighter-75346',
    helpPage: 'https://www.lego.com/pl-pl/help',
  };

  export const credentials = {
    email: process.env.EMAIL || '',
    password: process.env.PASSWORD || '',
  };
  
  export const texts = {
    accountName: 'Test Test',
    productTitle: 'Piracki myśliwiec',
    bodyVerification: 'Ograniczenie',
    helpSearchQuery: 'instrukcje składania',
    helpResultTitle: 'Jak pobrać instrukcje budowania online Gdzie trafiają wszystkie broszurki?',
    feedbackMessage: 'Dzięki za opinię',
  };
  
  export const roles = {
    buyButton: 'Kupuj',
    priceRangeButton: 'Przedziały cenowe',
    helpButton: 'Pomoc',
    confirmHelpfulButton: 'Tak',
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
    searchBarInput: '[data-test="search-bar-input"]',
    searchBarButton: '[data-test="search-bar-btn"]',
    helpNavigation: '[data-test="main-navigation"]',
    contactUsLink: '[data-test="main-navigation"] a[role="link"][name="Skontaktuj się z nami"]',
    loginButton: '[data-test="header-account-cta"]',
    legoIdLoginButton: '[data-test="legoid-login-button"]',
    emailInput: '#username',
    continueButton: '[data-testid="loginBtn"]',
    passwordInput: '#password',
    submitLoginButton: '.Button_buttonTextBase__1ban9gyw',
    accountNameText: '[data-test="header-account-cta"] span', 
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
  