class logout {
    constructor(page) {
        this.page = page;
        this.logoutButton = page.locator('[data-at="logout-button-myaccount"]');

    }
    async 
    async logout() {

        await this.logoutButton.click();
    }
}
module.exports = { logout };