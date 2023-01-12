describe("Auth-loggedIn", () => {
  it("single click login works", () => {
    cy.fixture("user_creds").then((user) => {
      //login
      cy.visit("/");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
      //route to homepage
      cy.wait(4000);
      cy.visit("/");
      cy.getCookie("token", { timeout: 6000 }).should("be.not.empty");
    });
  });
});
