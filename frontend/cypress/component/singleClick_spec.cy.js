import { Route } from "react-router-dom";
import Login from "../../src/components/UserAuth/log-in";
import SingleClick from "../../src/components/UserAuth/single-click";

describe("Single click login", () => {
  it("renders", () => {
    //login
    cy.mount(<Route path={"/"} element={<Login />} />);
    cy.fixture("user_creds").then((user) => {
      cy.intercept("POST", "/api/auth/login/", {
        statusCode: 200,
      });
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();

      //check if token exists
      cy.mount(<Route path={"/"} element={<SingleClick />} />);
      cy.location("pathname", { timeout: 6000 })
        .should("include", "/")
        .then(() => {
          cy.getCookie("token").should("be.not.null");
        });
    });
  });
});
