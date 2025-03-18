context('Smoke Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("doesn't throw magic smoke", () => {
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
