import { test, expect, request as playwrightRequest } from '@playwright/test';
import testData from '../utils/testdata.json';

test('@api API Login test', async () => {

    const user = testData.apiuser;

    const apiContext = await playwrightRequest.newContext({
        baseURL: 'https://comeon.cleverdolphin.se',

         extraHTTPHeaders: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Origin': 'https://comeon.cleverdolphin.se',
            'Referer': 'https://comeon.cleverdolphin.se/sv/sportsbook?sidebar=login',

            'Cookie': [
                'franchise=2',
                'franchiseCode=SWEDEN_COMEON',
                'locale=sv_SE',
                `d_id=${user.deviceId}`
            ].join('; ')
        }
    });

    const response = await apiContext.post('/auth/login', {

        data: {
            type: testData.apiuser.type,
            email: testData.apiuser.email,
            password: testData.apiuser.password,
            captchaToken: testData.apiuser.captchaToken,
            deviceId: testData.apiuser.deviceId,
            isComplianceTermsAccepted: testData.apiuser.isComplianceTermsAccepted
        }
    });

     console.log('Status:', response.status());

    const responseText = await response.text();
    console.log('Response:', responseText);

    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(responseText);

    expect(responseBody.status).toBe('SUCCESS');

    await apiContext.dispose();
});