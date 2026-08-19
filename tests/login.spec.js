
import testData from '../utils/testdata.json';
import { test, expect } from '../fixtures/baseFixture.js';

test('@smoke @regression login test', async ({ page, context, poManager }) => {

  await context.addCookies([
    {
      name: 'forceusernamepassword',
      value: 'true',
      domain: 'comeon.cleverdolphin.se',
      path: '/'
    }
  ]);
 // const pomanager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(testData.user1.username, testData.user1.password);
  await expect(page).toHaveURL('https://comeon.cleverdolphin.se/sv/sportsbook?sidebar=account');
  await loginPage.closeWelcomePopup();
  await loginPage.homepage();
  const logoutPage = poManager.getLogoutPage();
  await logoutPage.logout();

});

