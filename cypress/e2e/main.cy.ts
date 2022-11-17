describe('main content test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Title test', () => {
    // logo image with /assets/logo.png
    cy.get('#logo').should('be.visible');
  })

  it('Content title test', () => {
    // the title of the list with 'Crypto Exchanges'
    cy.get('#title').should('be.visible');
  })

  it('No information', () => {
    // the title of the list with 'Crypto Exchanges'
    cy.get('#no-information').should('be.visible');
  })
})