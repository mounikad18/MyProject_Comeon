import { test as base, expect } from '@playwright/test';
import { POManager } from '../PageObjects/POManager.js';
import testData from '../utils/testdata.json';

export const test = base.extend({

    poManager: async ({ page }, use) => {

        const poManager = new POManager(page);

        await use(poManager);
    },
/*
    authenticatedPage: async ({ page, context, poManager }, use) => {

        await context.addCookies([
            {
                name: 'forceusernamepassword',
                value: 'true',
                domain: 'comeon.cleverdolphin.se',
                path: '/'
            }
        ]);

        const loginPage = poManager.getLoginPage();

        // Login setup
        await loginPage.goto();
        await loginPage.validLogin(testData.user1.username, testData.user1.password);
        await expect(page).toHaveURL(/sidebar=account/);
        await loginPage.closeWelcomePopup();
        // Give authenticated page to test
        await use(page);
    },
*/

});
export { expect };