import { Route } from "react-router-dom";
import Login from "../../src/components/userAuth/logIn";
import Header from "../../src/layouts/header";
import ResponseProvider from "../../src/context/responseProvider";

describe("Logout", () => {
  const response = "";
  const status = 200;
  it("renders", () => {
    //login
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
    cy.fixture("user_creds").then((user) => {
      cy.intercept("POST", "/api/auth/login/", {
        statusCode: 200,
      }).as("login");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
      cy.wait("@login");
      cy.getCookie("token").should("exist");
      //logout
      cy.mount(<Route path={"/"} element={<Header />} />);
      cy.intercept("POST", "/api/auth/token/refresh/", {
        statusCode: 200,
      });
      cy.intercept("POST", "/api/auth/logout/", {
        statusCode: 200,
      }).as("logout");
      cy.findByRole("button", { name: /img/i }).click();

      cy.get('[data-testid="logout-btn"]').click();
      cy.wait("@logout");
      cy.getCookie("token").should("to.be.null");
    });
  });
});
