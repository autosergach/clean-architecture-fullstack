describe("Auth flow", () => {
  it("registers and lands on tasks page", () => {
    const email = `user${Date.now()}@example.com`;
    cy.visit("/register");
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type("password123");
    cy.contains("Create account").click();
    cy.contains("Delivery board").should("exist");
  });
});
