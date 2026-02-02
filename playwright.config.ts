import { defineConfig } from '@playwright/test';
import 'tsconfig-paths/register';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /tests\/auth\/auth\.setup\.ts/,
    },
    {
      name: 'auth',
      dependencies: ['setup'],
      testMatch: /tests\/auth\/.*\.spec\.ts/,
      use: {
        storageState: '.auth/state.json',
      },
    },
    {
      name: 'guest',
      testMatch: /tests\/guest\/.*\.spec\.ts/,
    },
  ],

  reporter: [
    ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],

    [
      'monocart-reporter',
      {
        name: 'Citemed',
        outputFile: 'reports/monocart/index.html',
      },
    ],

    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
  ],
});
