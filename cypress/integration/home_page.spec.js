/// <reference types="Cypress" />

describe('Home page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Dan Matthew');
  });
});
