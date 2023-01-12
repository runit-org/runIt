describe("Auth-logout", () => {
  it("user can logout", () => {
    cy.fixture("user_creds").then((user) => {
      //login
      cy.visit("/");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
      //logout
      cy.wait(4000);
      cy.getCookie("token").should("be.not.empty");
      cy.findByRole("button", { name: /img/i }).click();
      cy.findByRole("button", { name: /logout/i }).click();
      cy.getCookie("token").should("not.exist");
    });
  });
});
