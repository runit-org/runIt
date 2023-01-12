describe("Auth-logout", () => {
  let username = "testuser1";
  let password = "password123";
  it("user can logout", () => {
    cy.visit("/");
    cy.findByRole("textbox").type(username);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole("button", { name: /login/i }).click();

    cy.location("pathname", { timeout: 6000 }).should("include", "/posts");
    cy.findByRole("button", { name: /img/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.getCookie("token").should("not.exist");
  });
});
