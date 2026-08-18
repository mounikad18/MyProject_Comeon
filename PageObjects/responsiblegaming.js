class responsiblegaming {

    constructor(page) {
        this.page = page;
        this.responsiblegaming = page.locator('a[data-at="list-item-link"]:has-text("Ansvarfullt spelande")');
        this.depositlimits = page.locator('a[href="/sv/sportsbook?sidebar=account%2Cmy-limits%2Cdeposit"]');
        this.dailylimitamount = page.locator('li[data-at="day-limit-list-item"] .link-list__value');

    }

    async responsiblegaminglimits() {
        await this.responsiblegaming.click();
        await this.depositlimits.click();

    }

}

module.exports = { responsiblegaming };