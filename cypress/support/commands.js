// Custom Cypress commands for enhanced functionality

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.document().should('have.property', 'readyState', 'complete');
});

Cypress.Commands.add('clearAndType', (selector, text) => {
  cy.get(selector).clear().type(text);
});

Cypress.Commands.add('clickAndWait', (selector, waitTime = 1000) => {
  cy.get(selector).click();
  cy.wait(waitTime);
});

Cypress.Commands.add('verifyErrorMessage', (selector, expectedText) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain.text', expectedText);
});

Cypress.Commands.add('verifyNoErrorMessage', (selector) => {
  cy.get(selector).should('not.be.visible');
});

Cypress.Commands.add('purchaseProduct', (productSelector, quantity) => {
  for (let i = 0; i < quantity; i++) {
    cy.get(productSelector).click();
    cy.wait(300);
  }
});

Cypress.Commands.add('verifyCartItem', (productName, price, quantity, subtotal) => {
  cy.contains('tr', productName).within(() => {
    cy.get('td').eq(1).should('contain', `$${price.toFixed(2)}`);
    cy.get('td').eq(2).should('contain', quantity.toString());
    cy.get('td').eq(3).should('contain', `$${subtotal.toFixed(2)}`);
  });
});

// Enhanced logging command
Cypress.Commands.add('logStep', (message) => {
  cy.log(`📝 ${message}`);
  cy.task('log', `Step: ${message}`);
});
