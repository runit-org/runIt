describe("login", () => {
  it("user can login", () => {
    cy.visit("/");
    cy.findByRole("textbox").type("user");
    cy.findByLabelText(/password/i).type("password123");
    cy.findByRole("button", { name: /login/i }).click();
  });
});
