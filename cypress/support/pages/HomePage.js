import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor() {
    super();
    this.contactLink = 'a[href="#/contact"]';
    this.shopLink = 'a[href="#/shop"]';
  }

  goToContact() {
    cy.logStep('Navigating to Contact page');
    this.clickElement(this.contactLink);
    cy.url().should('contain', 'contact');
    return this;
  }

  goToShop() {
    cy.logStep('Navigating to Shop page');
    this.clickElement(this.shopLink);
    cy.url().should('contain', 'shop');
    return this;
  }

  verifyHomePageLoaded() {
    cy.url().should('include', 'jupiter.cloud.planittesting.com');
    cy.get('body').should('contain.text', 'Jupiter Toys');
    return this;
  }
}
