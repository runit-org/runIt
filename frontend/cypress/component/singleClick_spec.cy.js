import { Route } from "react-router-dom";
import ResponseProvider from "../../src/context/responseProvider";
import Login from "../../src/components/userAuth/logIn";
import SingleClick from "../../src/components/userAuth/singleClick";

describe("Single click login", () => {
  it("renders", () => {
    const response = "";
    const status = 200;
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

      //check if token exists
      cy.wait("@login").then(() => {
        cy.mount(<Route path={"/"} element={<SingleClick />} />);
        cy.location("pathname", { timeout: 6000 })
          .should("include", "/")
          .then(() => {
            cy.getCookie("token").should("be.not.null");
          });
      });
    });
  });
});
