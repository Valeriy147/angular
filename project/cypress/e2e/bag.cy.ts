describe('bag page tests', () => {
  it('should add product in bag after click on "Buy now" button', () => {
    cy.visit('http://localhost:4200/')
    cy.get("[data-cy='buy']:first").click()
    cy.get("[data-cy='bag']").click()
    cy.get("[data-cy='modal-bag-product']:first").should('be.visible')
    cy.get("[data-cy='checkout']").click()
    cy.get("[data-cy='bag-product']:first").should('be.visible')
  })
})
