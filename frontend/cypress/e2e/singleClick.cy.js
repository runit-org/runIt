describe("Auth-loggedIn", () => {
  it("single click login works", () => {
    cy.fixture("user_creds").then((user) => {
      //signup
      cy.visit("/signup");
      cy.findByRole("textbox", { name: /^name/i }).type(user.name);
      cy.findByRole("textbox", { name: /username/i }).type(user.username);
      cy.findByRole("textbox", { name: /email/i }).type(user.email);
      cy.findByLabelText(/^password/i).type(user.password);
      cy.findByLabelText(/confirm password/i).type(user.c_password);
      cy.findByRole("button", { name: /continue/i }).click();
      //login
      cy.visit("/");
      cy.findByRole("textbox").type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /login/i }).click();
      //route to homepage
      cy.location("pathname", { timeout: 20000 })
        .should("include", "/posts")
        .then(() => {
          cy.visit("/");
          cy.getCookie("token").should("be.not.empty");
        });
    });
  });
});
