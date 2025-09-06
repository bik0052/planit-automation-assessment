import { BasePage } from './BasePage.js';

export class ShopPage extends BasePage {
  constructor() {
    super();
    this.cartLink = '#nav-cart';
    
    this.products = {
      'Stuffed Frog': { 
        buyButton: '.product:contains("Stuffed Frog") .btn-success' 
      },
      'Fluffy Bunny': { 
        buyButton: '.product:contains("Fluffy Bunny") .btn-success' 
      },
      'Valentine Bear': { 
        buyButton: '.product:contains("Valentine Bear") .btn-success' 
      }
    };
  }

  buyProduct(productName, quantity) {
    cy.logStep(`Purchasing ${quantity}x ${productName}`);
    
    for (let i = 0; i < quantity; i++) {
      cy.contains('.product', productName)
        .find('.btn-success, .btn')
        .first()
        .click();
      cy.wait(500);
    }
    return this;
  }

  goToCart() {
    cy.logStep('Navigating to cart');
    this.clickElement(this.cartLink);
    cy.url().should('contain', 'cart');
    return this;
  }
}
