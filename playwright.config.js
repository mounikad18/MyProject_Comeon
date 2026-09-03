import { defineConfig, devices } from '@playwright/test';
import { environment } from './config/environment.js';

export default defineConfig({
  testDir: './tests',

  timeout: 40 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  fullyParallel: true,
  //workers: 5,
  globalSetup: './tests/auth/globalSetup.js',

  use: {
    baseURL: environment.baseURL,
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [

    // Main tests
    {
      name: 'unauthenticated',

      testMatch: 'Unauthenticated/**/*.spec.js',

      use: {
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
    {
      name: 'authenticated',

      testMatch: 'Authenticated/**/*.spec.js',

      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/user.json',
        headless: false,
      },

    },


  ]
  /*projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
  ],*/

});
