describe("Auth-login", () => {
  let username = "testuser";
  let password = "password123";

  it("user can login", () => {
    cy.visit("/");
    cy.findByRole("textbox").type(username);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole("button", { name: /login/i }).click();
  });
});
