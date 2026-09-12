import { test, expect, request as playwrightRequest } from '@playwright/test';
import testData from '../../utils/testdata.json';

test('@api API DailyLimits test', async () => {

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
    console.log('Limits set and fetched successfully match for daily deposit limit', dailyDepositLimit.pendingLimit, '==', Number(payload.amount));
    console.log('Increased Deposit Limit will be updated in', dailyDepositLimit.day, 'days ', dailyDepositLimit.hour, 'hours ', dailyDepositLimit.minute, 'minutes and', dailyDepositLimit.second, 'seconds');

    await apiContext.dispose();

});

test('@api API Weekly Limits test', async () => {
    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://comeon.cleverdolphin.se',
        storageState: 'auth/user.json'
    });

    console.log('Sending API request to limits endpoint for weekly limit');
    const payload = {
        type: 'deposit',
        freq: 'week',
        amount: '500'
    };

    const response = await apiContext.post('/player/limit', {
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
    const weeklyDepositLimit = depositLimits.find(
        limit => Number(limit.timeConst) === 6
    );
    // print only pendinglimit from the weeklyDepositLimit object
    console.log('Weekly Deposit Pending Limit:', weeklyDepositLimit.pendingLimit);
    console.log('Weekly Deposit Limit:', weeklyDepositLimit.limit);
    expect(weeklyDepositLimit.limit).toBe(Number(payload.amount));
    console.log('Limits set and fetched successfully match for weekly deposit limit', weeklyDepositLimit.limit, '==', Number(payload.amount));

    await apiContext.dispose();
});

test('@api API Session Daily Limits test', async () => {
    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://comeon.cleverdolphin.se',
        storageState: 'auth/user.json'
    });

    console.log('Sending API request to limits endpoint for session daily limit');

    const payload = {
        amount: '15',
        type: 'time',
        freq: 'day',
        
    };     
    const response = await apiContext.post('/player/limit', {
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
    const timeLimits = getResponseBody.result.time;
    const dailyTimeLimit = timeLimits.find(
        limit => Number(limit.timeConst) === 5
    );
    // print only pendinglimit from the dailyTimeLimit object
    console.log('Daily Time Pending Limit:', dailyTimeLimit.pendingLimit);
    console.log('Daily Time Limit:', dailyTimeLimit.limit);
    expect(dailyTimeLimit.limit).toBe(Number(payload.amount));
    console.log('Limits set and fetched successfully match for daily time limit', dailyTimeLimit.limit, '==', Number(payload.amount));
    //Edit same daily session limits to 18 and verify pendinglimit is updated to 18
    const editPayload = {
        amount: '18',
        type: 'time',
        freq: 'day',
        
    };     
    const editResponse = await apiContext.post('/player/limit', {
        data: editPayload,
    });

    console.log('Updated Daily Session Limit Status:', editResponse.status());
    const editResponseText = await editResponse.text();
    console.log('Updated Daily Session Limit Response:', editResponseText);
    expect(editResponse.status()).toBe(200);
    const editResponseBody = JSON.parse(editResponseText);
    expect(editResponseBody.status).toBe('SUCCESS');

    // GET request to fetch the limits after editing
    const getEditResponse = await apiContext.get('/player/limit');
    console.log('GET Updated Daily Session Limit Status:', getEditResponse.status());
    const getEditResponseText = await getEditResponse.text();
    //console.log('GET Edit Response:', getEditResponseText);
    expect(getEditResponse.status()).toBe(200);
    const getEditResponseBody = JSON.parse(getEditResponseText);
    expect(getEditResponseBody.status).toBe('SUCCESS');

    // compare the limits set in the POST request with the limits fetched in the GET request
    const editTimeLimits = getEditResponseBody.result.time;
    const editDailyTimeLimit = editTimeLimits.find(
        limit => Number(limit.timeConst) === 5
    );
    // print only pendinglimit from the editDailyTimeLimit object
    console.log('Edited Daily Time Pending Limit:', editDailyTimeLimit.pendingLimit);
    console.log('Daily Time Limit before edit:', editDailyTimeLimit.limit);
    expect(editDailyTimeLimit.pendingLimit).toBe(Number(editPayload.amount));
    console.log('Limits set and fetched successfully match for edited daily time limit', editDailyTimeLimit.pendingLimit, '==', Number(editPayload.amount));
    console.log('Increased Daily Session Limit will be updated in', editDailyTimeLimit.day, 'days ', editDailyTimeLimit.hour, 'hours ', editDailyTimeLimit.minute, 'minutes and', editDailyTimeLimit.second, 'seconds');
    await apiContext.dispose();
});

