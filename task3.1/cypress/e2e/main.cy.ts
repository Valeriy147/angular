describe('main page tests', () => {
  it('should visits the product page with id 1', () => {
    cy.visit('http://localhost:4200')
    cy.get("[data-cy='bestseller-product']:first")
      .click()
    cy.url().should('include', '/products/1')
  })
})
