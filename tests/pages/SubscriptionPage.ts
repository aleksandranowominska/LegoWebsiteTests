import { Page, expect } from '@playwright/test';
import { subscriptionLocators, subscriptionTexts, subscriptionUserBirthnData } from '../data/subscriptionPageData';
import { loginCredentials } from '../data/loginPageData';

export class SubscriptionPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Assert if the email is consistent with the previously entered one
    async assertDisplayedEmail() {
        console.log('Asserting the displayed email.');
        const displayedEmail = await this.page.locator(subscriptionLocators.emailInput).inputValue();
        console.log(`Displayed email: ${displayedEmail}`);
        expect(displayedEmail).toBe(loginCredentials.email);
        console.log('Displayed email matches the entered email');
    }

    // Fill the subscription form
    async fillSubscriptionForm() {
        const { birthDay, birthMonth, birthYear } = subscriptionUserBirthnData;

        console.log('Filling the subscription form.');
        await this.page.locator(subscriptionLocators.daySelect).selectOption(birthDay);
        await this.page.locator(subscriptionLocators.monthSelect).selectOption(birthMonth);
        await this.page.locator(subscriptionLocators.yearSelect).selectOption(birthYear);
        console.log(`Selected birth date: ${birthDay}-${birthMonth}-${birthYear}`);

        await this.page.locator(subscriptionLocators.personalizedContentCheckbox).click();
        console.log('Checked personalized content checkbox.');

        await this.page.locator(subscriptionLocators.contentVisibilityCheckbox).click();
        console.log('Checked content visibility checkbox.');

        await this.page.locator(subscriptionLocators.subscribeButton).click();
        console.log('Clicked on the subscribe button.');
        console.log('Asserting that the thank you message is visible.');
        const thankYouHeading = await this.page.locator(subscriptionLocators.thankYouHeading).innerText();
        expect(thankYouHeading).toBe(subscriptionTexts.thankYouMessage);
        console.log('Thank-you message is present.');
    }
}
