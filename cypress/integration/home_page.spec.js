/// <reference types="Cypress" />

describe('Smoke test', () => {
  it('successfully loads', () => {
    // eslint-disable-next-line no-undef
    cy.visit('/');

    // eslint-disable-next-line no-undef
    cy.get('.post-list__heading').should('contain', 'Latest posts');
  });
});
