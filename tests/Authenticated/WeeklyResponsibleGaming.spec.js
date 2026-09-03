

import { test, expect } from '../../fixtures/baseFixture.js';

test.only ('@regression Responsible Gaming test', async ({ page, poManager }) => {

  await page.goto('/?sidebar=account');
  console.log('Current URL:', page.url());


  const responsiblegamingPage = poManager.getResponsiblegamingPage();
  await responsiblegamingPage.responsiblegaminglimits();
  const weeklylimitamount = await responsiblegamingPage.weeklylimitamount.innerText();
  console.log('Weekly Limit Amount:', weeklylimitamount);

});

