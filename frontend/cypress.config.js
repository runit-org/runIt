const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'us52tr',
  viewportWidth: 1280,
  viewportHeight: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
