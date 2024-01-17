/* eslint-disable cypress/unsafe-to-chain-command */
import { Route } from "react-router-dom";
import ResponseProvider from "../../src/context/responseProvider";
import Login from "../../src/components/userAuth/logIn";

describe("Login form", () => {
  const response = "";
  const status = 200;

  beforeEach(() => {
    cy.intercept("POST", "/api/auth/login/", {
      statusCode: 200,
    }).as("login");
  });

  it("logs in successfully", () => {
    cy.mount(
      <Route
        path={"/"}
        element={
          <ResponseProvider value={{ response: response, status: status }}>
            <Login />
          </ResponseProvider>
        }
        s
      />
    );
    cy.fixture("user_creds").then((user) => {
      cy.findByRole("textbox", { name: /username/i })
        .clear()
        .type(user.username);
      cy.findByLabelText(/password/i)
        .clear()
        .type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
      cy.wait("@login").then((interception) => {
        expect(interception.response.statusCode).equal(200);
      });
    });
  });
});
