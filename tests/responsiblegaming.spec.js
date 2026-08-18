
import { test, expect } from '@playwright/test';
import { POManager } from '../PageObjects/POManager';
import testData from '../utils/testdata.json';

test ('Responsible Gaming test', async ({ page, context }) => {

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
  await loginPage.validLogin(testData.user2.username, testData.user2.password);
  await expect(page).toHaveURL('https://comeon.cleverdolphin.se/sv/sportsbook?sidebar=account');
  await loginPage.welcomepopup.click();
  const responsiblegamingPage = pomanager.getResponsibleGamingPage();
  await responsiblegamingPage.responsiblegaminglimits();
  const dailylimitamount = await responsiblegamingPage.dailylimitamount.innerText();
  console.log('Daily Limit Amount:', dailylimitamount);

});