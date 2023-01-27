import { Route } from "react-router-dom";
import Login from "../../src/components/UserAuth/log-in";

describe("Login form", () => {
  it("renders", () => {
    cy.mount(<Route path={"/"} element={<Login />} />);
    cy.fixture("user_creds").then((user) => {
      cy.intercept("POST", "/api/auth/login/", {
        statusCode: 200,
      }).as("login");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
    });
  });
});