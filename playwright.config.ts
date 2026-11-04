import { defineConfig } from '@playwright/test';
export default defineConfig({
  projects: [{name:'webkit',use:{browserName:'webkit'},grep:/@webkit/},{name:'chromium',use:{browserName:'chromium'}}],
  testDir: './tests', timeout: 60000, fullyParallel: true, workers: 6,
  use: { baseURL: 'http://127.0.0.1:5175/ai/', headless: true, trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 5175 --strictPort', url: 'http://127.0.0.1:5175/ai/', reuseExistingServer: false },
});
