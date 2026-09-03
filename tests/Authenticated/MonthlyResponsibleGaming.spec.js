

import { test, expect } from '../../fixtures/baseFixture.js';

test.only ('@regression Responsible Gaming test', async ({ page, poManager }) => {

  await page.goto('/?sidebar=account');
  console.log('Current URL:', page.url());


  const responsiblegamingPage = poManager.getResponsiblegamingPage();
  await responsiblegamingPage.responsiblegaminglimits();
  const monthlylimitamount = await responsiblegamingPage.monthlylimitamount.innerText();
  console.log('Monthly Limit Amount:', monthlylimitamount);

});

