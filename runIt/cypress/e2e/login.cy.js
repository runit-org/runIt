describe("Auth-login", () => {
  it("user can login", () => {
    cy.fixture("user_creds").then((user) => {
      cy.visit("/");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
    });
  });
});
