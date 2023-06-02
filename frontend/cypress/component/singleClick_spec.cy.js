import { Route } from "react-router-dom";
import ResponseProvider from "../../src/components/Context/response-context";
import Login from "../../src/components/UserAuth/log-in";
import SingleClick from "../../src/components/UserAuth/single-click";

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
      cy.mount(<Route path={"/"} element={<SingleClick />} />);
      cy.getCookie("token").should("be.not.null");
    });
  });
});
