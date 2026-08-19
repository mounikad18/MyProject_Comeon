import { test as base, expect} from '@playwright/test';
import { POManager } from '../PageObjects/POManager.js';

export const test = base.extend({

    poManager: async ({ page }, use) => {

        const poManager = new POManager(page);

        await use(poManager);
    },

});
export { expect };