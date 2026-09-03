import { chromium } from '@playwright/test';
import { POManager } from '../../PageObjects/POManager.js';
import testData from '../../utils/testdata.json';
import { environment } from '../../config/environment.js';

const authFile = 'auth/user.json';

async function globalSetup() {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext({
        baseURL: environment.baseURL
    });

    const page = await context.newPage();

    // Add ComeOn cookie
    await context.addCookies([
        {
            name: 'forceusernamepassword',
            value: 'true',
            domain: 'comeon.cleverdolphin.se',
            path: '/'
        }
    ]);

    // Create Page Object Manager
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    // Navigate to application
    await loginPage.goto();

    // Login
    await loginPage.validLogin(
        testData.user1.username,
        testData.user1.password
    );

    // Verify successful login
    await page.waitForURL(/sidebar=account/);

    console.log('User logged in successfully');

    // Close welcome popup
    await loginPage.closeWelcomePopup();

    // Save authentication state
    await context.storageState({
        path: authFile
    });

    console.log(`Authentication state saved to ${authFile}`);

    await browser.close();
}

export default globalSetup;