const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "us52tr",
  viewportWidth: 1280,
  viewportHeight: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    specPattern: [
      "./cypress/e2e/signup.cy.js",
      "./cypress/e2e/login.cy.js",
      "./cypress/e2e/singleClick.cy.js",
      "./cypress/e2e/logout.cy.js",
      "./cypress/e2e/resetPassword.cy.js",
    ],
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
