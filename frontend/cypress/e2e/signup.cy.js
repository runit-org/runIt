describe("Auth-Signup", () => {
  let name = "testuser";
  let username = "testuser1";
  let email = "user@email.com";
  let password = "password123";
  let c_password = "password123";

  it("user can signup", () => {
    cy.visit("/signup");

    cy.findByRole("textbox", { name: /^name/i }).type(name);
    cy.findByRole("textbox", { name: /username/i }).type(username);
    cy.findByRole("textbox", { name: /email/i }).type(email);
    cy.findByLabelText(/^password/i).type(password);
    cy.findByLabelText(/confirm password/i).type(c_password);
    cy.findByRole("button", { name: /continue/i }).click();
  });
});
