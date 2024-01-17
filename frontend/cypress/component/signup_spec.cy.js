import { Route } from "react-router-dom";
import ResponseProvider from "../../src/context/responseProvider";
import Signup from "../../src/components/userAuth/signUp";

describe("Signup form", () => {
  const response = "";
  const status = 200;

  beforeEach(() => {
    cy.intercept("POST", "/api/auth/register/", {
      statusCode: 200,
    }).as("signup");
  });
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
      // Type user information
      cy.findByRole("textbox", { name: /username/i }).type(user.username);
      cy.findByRole("textbox", { name: /email/i }).type(user.email);
      cy.findByLabelText(/^password/i).type(user.password);
      cy.findByLabelText(/confirm password/i).type(user.c_password);
      //find submit button and submit
      cy.findByRole("button", { name: /continue/i }).click();
      // Wait for the signup interception and assert
      cy.wait("@signup").then((interception) => {
        expect(interception.response.statusCode).equal(200);
      });
    });
  });
});
