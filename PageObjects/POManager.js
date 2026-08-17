const { login } = require('./login');
const { logout } = require('./logout');
const { responsiblegaming } = require('./responsiblegaming');
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new login(page);
        this.logoutPage = new logout(page);
        this.responsiblegamingPage = new responsiblegaming(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getResponsibleGamingPage() {
        return this.responsiblegamingPage;
    }

    getLogoutPage() {
        return this.logoutPage;
    }
}
module.exports = { POManager };