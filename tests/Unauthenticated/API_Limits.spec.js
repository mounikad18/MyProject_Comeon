import { test, expect, request as playwrightRequest } from '@playwright/test';
import testData from '../../utils/testdata.json';

test('@api API Limits test', async () => {

    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://comeon.cleverdolphin.se',

        storageState: 'auth/user.json'
    });

    console.log('Sending API request to limits endpoint ');
    const payload = {
        type: 'deposit',
        freq: 'day',
        amount: '150'
    };

    const response = await apiContext.post('/player/limit',
        {
            data: payload,
        });

    console.log('Status:', response.status());

    const responseText = await response.text();
    console.log('Response:', responseText);
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(responseText);
    expect(responseBody.status).toBe('SUCCESS');

    // GET request to fetch the limits
    const getResponse = await apiContext.get('/player/limit');
    console.log('GET Status:', getResponse.status());
    const getResponseText = await getResponse.text();
    //console.log('GET Response:', getResponseText);
    expect(getResponse.status()).toBe(200);
    const getResponseBody = JSON.parse(getResponseText);
    expect(getResponseBody.status).toBe('SUCCESS');
    // compare the limits set in the POST request with the limits fetched in the GET request
    const depositLimits = getResponseBody.result.deposit;
    const dailyDepositLimit = depositLimits.find(
        limit => Number(limit.timeConst) === 5
    );
// print only pendinglimit from the dailyDepositLimit object
console.log('Daily Deposit Pending Limit:', dailyDepositLimit.pendingLimit);
    //console.log('Daily Deposit Limit:',JSON.stringify(dailyDepositLimit, null, 2));

    expect(dailyDepositLimit.pendingLimit).toBe(Number(payload.amount));
    console.log ('Limits set and fetched successfully match for daily deposit limit', dailyDepositLimit.pendingLimit, '==', Number(payload.amount));

    await apiContext.dispose();

});