import { Route } from "react-router-dom";
import ResetPwEmail from "../../src/components/userAuth/resetPwEmail";

describe("Reset password form", () => {
  it("renders", () => {
    // Mount component
    cy.mount(<Route path={"/"} element={<ResetPwEmail />} />);
    cy.fixture("user_creds").then((user) => {
      // Intercept the request and provide a successful response
      cy.intercept("POST", "/api/auth/sendResetPasswordEmail/", {
        statusCode: 200,
      }).as("resetPwEmail");
      // Type the email and click the submit
      cy.findByRole("textbox").type(user.email);
      cy.findByRole("button", { name: /confirm/i }).click();
      /// Wait for the email reset interception and assert
      cy.wait("@resetPwEmail").then((interception) => {
        expect(interception.response.statusCode).equal(200);
      });
    });
  });
});
