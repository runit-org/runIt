import { Route } from "react-router-dom";
import ResponseProvider from "../../src/Context/response-context";
import Signup from "../../src/components/UserAuth/sign-up";

describe("Signup form", () => {
  const response = "";
  const status = 200;
  it("renders", () => {
    cy.mount(
      <Route
        path={"/"}
        element={
          <ResponseProvider value={{ response: response, status: status }}>
            <Signup />
          </ResponseProvider>
        }
      />
    );
    cy.fixture("user_creds").then((user) => {
      cy.intercept("POST", "/api/auth/register/", {
        statusCode: 200,
      }).as("signup");
      cy.findByRole("textbox", { name: /^name/i }).type(user.name);
      cy.findByRole("textbox", { name: /username/i }).type(user.username);
      cy.findByRole("textbox", { name: /email/i }).type(user.email);
      cy.findByLabelText(/^password/i).type(user.password);
      cy.findByLabelText(/confirm password/i).type(user.c_password);
      cy.findByRole("button", { name: /continue/i }).click();
    });
  });
});
