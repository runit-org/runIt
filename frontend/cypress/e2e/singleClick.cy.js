describe("Auth-loggedIn", () => {
  let username = "testuser1";
  let password = "password123";

  it("single click login works", () => {
    //login
    cy.visit("/");
    cy.findByRole("textbox").type(username);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole("button", { name: /login/i }).click();
    //route to homepage
    cy.location("pathname", { timeout: 6000 }).should("include", "/posts");
    cy.visit("/");
    cy.getCookie("token").should("be.not.empty");
  });
});
