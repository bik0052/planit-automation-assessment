export class BasePage {
  constructor() {
    this.url = Cypress.config().baseUrl;
  }

  visit(path = '') {
    cy.visit(path);
    cy.waitForPageLoad();
    return this;
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    this.getElement(selector)
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .should('be.visible')
      .click();
    return this;
  }

typeText(selector, text) {
  this.getElement(selector)
    .scrollIntoView({ offset: { top: -100, left: 0 } })
    .should('be.visible')
    .clear({ force: true })  // Add { force: true } here
    .type(text, { force: true });  // Add { force: true } here too
  return this;
}

  verifyElementVisible(selector) {
    this.getElement(selector).should('be.visible');
    return this;
  }

  verifyText(selector, text) {
    this.getElement(selector).should('contain.text', text);
    return this;
  }

  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('exist');
    return this;
  }
}
