import { Route } from "react-router-dom";
import ResetPwEmail from "../../src/components/userAuth/resetPwEmail";

describe("Reset password form", () => {
  it("renders", () => {
    cy.mount(<Route path={"/"} element={<ResetPwEmail />} />);
    cy.fixture("user_creds").then((user) => {
      cy.intercept("POST", "/api/auth/sendResetPasswordEmail/", {
        statusCode: 200,
      });
      cy.findByRole("textbox").type(user.email);
      cy.findByRole("button", { name: /confirm/i }).click();
    });
  });
});
