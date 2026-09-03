
import { test as setup, expect } from '../../fixtures/baseFixture.js';

import testData from '../../utils/testdata.json';

const authFile = 'auth/user.json';

setup('authenticate', async ({ page, context, poManager }) => {

    await context.addCookies([
        {
            name: 'forceusernamepassword',
            value: 'true',
            domain: 'comeon.cleverdolphin.se',
            path: '/'
        }
    ]);
    const loginPage = poManager.getLoginPage();

    await loginPage.goto();

    await loginPage.validLogin(testData.user1.username,testData.user1.password);

    // Make sure login has actually completed
    await expect(page).toHaveURL(/sidebar=account/);
    await loginPage.closeWelcomePopup();

    // Save cookies + localStorage
    await page.context().storageState({path: authFile});

    console.log(`Authentication state saved to ${authFile}`);

});
