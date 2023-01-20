import { Route } from "react-router-dom";
import Login from "../../src/components/UserAuth/log-in";
import Header from "../../src/components/SiteElements/header";

describe("Logout", () => {
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

      //logout
      cy.mount(<Route path={"/"} element={<Header />} />);
      cy.intercept("POST", "/api/auth/token/refresh/", {
        statusCode: 200,
      });
      cy.intercept("POST", "/api/auth/logout/", {
        statusCode: 200,
      });
      cy.findByRole("button", { name: /img/i }).click();
      cy.findByRole("button", { name: /logout/i }).click();
      cy.getCookie("token").should("not.exist");
    });
  });
});
