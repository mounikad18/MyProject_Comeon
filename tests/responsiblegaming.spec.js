

import { test, expect } from '../fixtures/baseFixture.js';

test('@regression Responsible Gaming test', async ({ authenticatedPage, poManager }) => {

  
  
  /*const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(testData.user2.username, testData.user2.password);
  await expect(page).toHaveURL('https://comeon.cleverdolphin.se/sv/sportsbook?sidebar=account');
  await loginPage.closeWelcomePopup();*/

  const responsiblegamingPage = poManager.getResponsiblegamingPage();
  await responsiblegamingPage.responsiblegaminglimits();
  const dailylimitamount = await responsiblegamingPage.dailylimitamount.innerText();
  console.log('Daily Limit Amount:', dailylimitamount);

});
