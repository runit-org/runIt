describe("Auth-logout", () => {
  it("user can logout", () => {
    cy.fixture("user_creds").then((user) => {
      cy.visit("/");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();

      cy.location("pathname", { timeout: 6000 }).should("include", "/posts");
      cy.findByRole("button", { name: /img/i }).click();
      cy.findByRole("button", { name: /logout/i }).click();
      cy.getCookie("token").should("not.exist");
    });
  });
});
