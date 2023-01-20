import "@testing-library/cypress/";
import "@testing-library/cypress/add-commands";

Cypress.on("uncaught:exception", (err) => {
  return false;
});
