describe("Auth-resetpw", () => {
  it("user can reset pw", () => {
    cy.fixture("user_creds").then((user) => {
      cy.visit("/reset-password-auth");
      cy.findByRole("textbox").type(user.email);
      cy.findByRole("button", { name: /confirm/i }).click();
    });
  });
});
