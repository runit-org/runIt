// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/react";
import { MemoryRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../src/store";
import "../../src/styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

Cypress.Commands.add("mount", (component, options = {}) => {
  const { routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;

  const wrapped = (
    <Provider store={store}>
      <MemoryRouter {...routerProps}>
        <Routes>{component}</Routes>
      </MemoryRouter>
    </Provider>
  );

  return mount(wrapped, mountOptions);
});

// Example use:
// cy.mount(<MyComponent />)
