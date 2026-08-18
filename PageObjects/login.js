const { expect } = require("@playwright/test");

class login {
    constructor(page)
    {
        this.page=page;
        this.acceptCookies=page.getByRole('button', { name: 'Acceptera alla cookies' });
        this.login=page.locator('[data-at="login-homepage"]');
        this.username=page.locator('#loginEmail');
        this.password=page.locator('#loginPassword');
        this.loginButton=page.locator('[data-at="login-button-usernametab"]');
        this.welcomepopup=page.locator('[class*="welcome-screen-popup"] svg[data-at="svg-close"]');
        this.closeButton = page.locator('[data-at="close-button-general"]');
        this.profileIcon = page.locator('button[class="account-icon-header"]');
    }

    async goto()
    {
        await this.page.goto('https://comeon.cleverdolphin.se/sv');
        await this.acceptCookies.click();
      //  await this.page.waitForLoadState('networkidle');
        await this.login.click();

    }

    async validLogin(username, password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }

    async homepage()
    {
        await this.welcomepopup.click();
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
        await this.profileIcon.click();

    }
}
module.exports = { login};
