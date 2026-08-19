const { LoginPage } = require('./LoginPage');
const { LogoutPage } = require('./LogoutPage');
const { ResponsiblegamingPage } = require('./ResponsiblegamingPage');
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.logoutPage = new LogoutPage(page);
        this.responsiblegamingPage = new ResponsiblegamingPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getResponsiblegamingPage() {
        return this.responsiblegamingPage;
    }

    getLogoutPage() {
        return this.logoutPage;
    }
}
module.exports = { POManager };