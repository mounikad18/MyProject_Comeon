
import { test, expect } from '@playwright/test';
import { POManager } from '../PageObjects/POManager';
import testData from '../utils/testdata.json';

test('login test', async ({ page, context }) => {

  await context.addCookies([
        {
            name: 'forceusernamepassword',
            value: 'true',
            domain: 'comeon.cleverdolphin.se',
            path: '/'
        }
    ]);
 const pomanager = new POManager(page);
  const loginPage = pomanager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(testData.username, testData.password);
  await expect(page).toHaveURL('https://comeon.cleverdolphin.se/sv/sportsbook?sidebar=account');
  await loginPage.homepage();
  const logoutPage = pomanager.getLogoutPage();
  await logoutPage.logout();
 
});

test
