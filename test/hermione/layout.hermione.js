const { assert } = require('chai');

describe('github', async function() {
    it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {
        await this.browser.url('/');
        await this.browser.setWindowSize(576, 1080);

        const button = await this.browser.$('button.navbar-toggler');
        assert.isTrue(await button.isDisplayed());
    });
});