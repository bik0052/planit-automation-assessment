import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor() {
    super();
    this.cartTable = 'table';
    this.cartItems = 'tbody tr';
    this.totalPrice = '.total';
  }

  getCartItems() {
    return this.getElement(this.cartItems);
  }

  verifyProductInCart(productName, expectedQuantity) {
    cy.logStep(`Verifying ${productName} in cart`);
    
    cy.contains('tr', productName).within(() => {
      cy.get('input[type="number"], .quantity')
        .should('have.value', expectedQuantity.toString());
    });
    
    return this;
  }

  verifyTotalCalculation() {
    cy.logStep('Verifying total calculation');
    
    let calculatedTotal = 0;
    
    this.getCartItems().each($row => {
      const rowText = $row.text();
      const priceMatches = rowText.match(/\$(\d+\.?\d*)/g);
      
      if (priceMatches && priceMatches.length > 0) {
        const subtotalStr = priceMatches[priceMatches.length - 1].replace('$', '');
        const subtotal = parseFloat(subtotalStr);
        
        if (!isNaN(subtotal)) {
          calculatedTotal += subtotal;
        }
      }
    }).then(() => {
      cy.log(`Calculated total: $${calculatedTotal.toFixed(2)}`);
      cy.contains('Total').should('be.visible');
      cy.contains(`$${calculatedTotal.toFixed(2)}`).should('be.visible');
    });
    
    return this;
  }
}
