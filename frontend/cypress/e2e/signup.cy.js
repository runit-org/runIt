describe("Auth-Signup", () => {
  it("user can signup", () => {
    cy.fixture("user_creds").then((user) => {
      cy.visit("/signup");
      cy.findByRole("textbox", { name: /^name/i }).type(user.name);
      cy.findByRole("textbox", { name: /username/i }).type(user.username);
      cy.findByRole("textbox", { name: /email/i }).type(user.email);
      cy.findByLabelText(/^password/i).type(user.password);
      cy.findByLabelText(/confirm password/i).type(user.c_password);
      cy.findByRole("button", { name: /continue/i }).click();
    });
  });
});
