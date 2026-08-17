const { login } = require('./login');
const { logout } = require('./logout');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new login(page);
        this.logoutPage = new logout(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getLogoutPage() {
        return this.logoutPage;
    }
}
module.exports = { POManager };