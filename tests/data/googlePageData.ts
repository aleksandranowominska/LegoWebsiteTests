import dotenv from 'dotenv';
dotenv.config();

export const googleCredentials = {
  googleEmail: process.env.GOOGLE_EMAIL || '',
  googlePassword: process.env.GOOGLE_PASSWORD || '',
};

export const googleLocators = {
  googleSignInButton: 'ExternalLoginButtongoogle',
  googleEmailInput: 'input#identifierId',
  googleNextEmailButton: '#identifierNext span[jsname="V67aGc"]',
  googlePasswordInput: 'input[name="Passwd"]',
  googleNextPasswordButton: '#passwordNext span[jsname="V67aGc"]',
  googleSignInErrorText: 'span[jsslot]',
  googleTryAgainButton: 'span[jsname="V67aGc"][aria-hidden="true"]',
};