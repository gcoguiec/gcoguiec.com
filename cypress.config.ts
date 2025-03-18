import vitePreprocessor from 'cypress-vite';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor());
    },
    specPattern: 'cypress/e2e/**/*.e2e-spec.ts',
    supportFile: false
  }
});
