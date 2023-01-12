describe("Auth-resetpw", () => {
  let email = "user@email.com";

  it("user can reset pw", () => {
    cy.visit("/reset-password-auth");
    cy.findByRole("textbox").type(email);
    cy.findByRole("button", { name: /confirm/i }).click();
  });
});
