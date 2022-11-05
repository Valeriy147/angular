describe('categories page tests', () => {
  it('should visits the bestsellers page', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Bestsellers').click()
    cy.url().should('include', '/category/bestsellers')
  })

  it('should visits the top ranking page', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Top Ranking').click()
    cy.url().should('include', '/category/topRanking')
  })
})
