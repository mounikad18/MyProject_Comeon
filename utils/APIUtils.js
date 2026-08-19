class ApiUtils {

    constructor(request) 
    {
        this.request = request;
    }

    async post(API_LOGIN,data, options = {} )
    {
        const response = await this.request.post(API_LOGIN, {
            data: data,

            ...options
        });

        return response;
    }

    async login(user)
    {
        const response = await this.post('API_LOGIN', {
            data: {
            type: testData.apiuser.type,
            email: testData.apiuser.email,
            password: testData.apiuser.password,
            captchaToken: testData.apiuser.captchaToken,
            deviceId: testData.apiuser.deviceId,
            isComplianceTermsAccepted: testData.apiuser.isComplianceTermsAccepted
        }
    });
}
}

module.exports = { ApiUtils };