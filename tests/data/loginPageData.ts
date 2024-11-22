import dotenv from 'dotenv';
dotenv.config();

export const loginLocators = {
  loginButton: '[data-test="header-account-cta"]',
  legoIdLoginButton: '[data-test="legoid-login-button"]',
  emailInput: '#username',
  continueButton: '[data-testid="loginBtn"]',
  passwordInput: '#password',
  submitLoginButton: '.Button_buttonTextBase__1ban9gyw',
  accountNameText: '[data-test="header-account-cta"] span',
};

export const loginCredentials = {
  email: process.env.EMAIL || '',
  password: process.env.PASSWORD || '',
};

export const loginTexts = {
  accountName: 'Test Test',
};
