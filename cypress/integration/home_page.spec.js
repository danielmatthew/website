/// <reference types="Cypress" />

describe('Smoke test', () => {
  it('successfully loads', () => {
    // eslint-disable-next-line no-undef
    cy.visit('/');

    // eslint-disable-next-line no-undef
    cy.get('h1').should('contain', 'Accessibility without the snark.');
  });
});
