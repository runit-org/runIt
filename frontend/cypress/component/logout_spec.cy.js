import { Route } from "react-router-dom";
import Login from "../../src/components/userAuth/logIn";
import Header from "../../src/layouts/header";
import ResponseProvider from "../../src/context/responseProvider";

const response = "";
const status = 200;
describe("Logout", () => {
  beforeEach(() => {
    // Login
    cy.fixture("user_creds").then((user) => {
      cy.login(user);
    });
  });

  it("renders", () => {
    cy.mount(<Route path={"/"} element={<Header />} />);

    //logout
    //refresh token
    cy.mount(<Route path={"/"} element={<Header />} />);
    cy.intercept("POST", "/api/auth/token/refresh/", {
      statusCode: 200,
    });
    //logout api
    cy.intercept("POST", "/api/auth/logout/", {
      statusCode: 200,
    }).as("logout");

    // Click the user image button and then the logout button
    cy.get("#basic-nav-dropdown").click();
    cy.get('[data-testid="logout-btn"]').click();

    // Wait for the logout interception and assert
    cy.wait("@logout").then((interception) => {
      cy.getCookie("runit_token").should("to.be.null");
      expect(interception.response.statusCode).equal(200);
    });
  });
});

// Custom Cypress command for login
Cypress.Commands.add("login", (user) => {
  cy.mount(
    <Route
      path={"/"}
      element={
        <ResponseProvider value={{ response: response, status: status }}>
          <Login />
        </ResponseProvider>
      }
    />
  );

  cy.intercept("POST", "/api/auth/login/", { statusCode: 200 }).as("login");
  cy.findByRole("textbox").type(user.username);
  cy.findByLabelText(/password/i).type(user.password);
  cy.findByRole("button", { name: /login/i }).click();

  // Wait for the login interception
  cy.wait("@login").then(() => {
    // Assertions for successful login if needed
    cy.getCookie("runit_token").should("exist");
  });
});
