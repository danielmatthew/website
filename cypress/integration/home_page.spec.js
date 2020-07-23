/// <reference types="Cypress" />

describe('Smoke test', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Dan Matthew');
  });
});
