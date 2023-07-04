describe('Pool', () => {
  beforeEach(() => cy.visit('/pool'))
  it('add liquidity links to /add/NEXI', () => {
    cy.get('#join-pool-button').click()
    cy.url().should('contain', '/add/NEXI')
  })

  it('import pool links to /import', () => {
    cy.get('#import-pool-link').click()
    cy.url().should('contain', '/find')
  })
})
