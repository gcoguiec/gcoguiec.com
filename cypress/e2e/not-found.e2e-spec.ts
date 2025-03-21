context('Not Found', () => {
  beforeEach(() => {
    cy.visit('/missing-page-or-whatever');
  });

  it('returns a not-found page', () => {
    cy.contains('Not Found');
  });
});
