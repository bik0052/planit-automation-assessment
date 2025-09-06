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
    this.getElement(selector).should('be.visible').click();
    return this;
  }

  typeText(selector, text) {
    this.getElement(selector).should('be.visible').clear().type(text);
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
