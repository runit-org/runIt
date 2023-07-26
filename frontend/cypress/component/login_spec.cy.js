import { Route } from "react-router-dom";
import ResponseProvider from "../../src/context/responseProvider";
import Login from "../../src/components/userAuth/logIn";

describe("Login form", () => {
  const response = "";
  const status = 200;

  it("renders", () => {
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
      cy.intercept("POST", "/api/auth/login/", {
        statusCode: 200,
      }).as("login");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
      cy.wait("@login").then((interception) => {
        expect(interception.response.statusCode).equal(200);
      });
    });
  });
});
