import { HomePage } from '../support/pages/HomePage.js';
import { ShopPage } from '../support/pages/ShopPage.js';
import { CartPage } from '../support/pages/CartPage.js';

describe('Test Case 3: Shopping Cart Verification', () => {
  let homePage;
  let shopPage;
  let cartPage;

  const productsData = {
    'Stuffed Frog': { quantity: 2 },
    'Fluffy Bunny': { quantity: 5 },
    'Valentine Bear': { quantity: 3 }
  };

  beforeEach(() => {
    homePage = new HomePage();
    shopPage = new ShopPage();
    cartPage = new CartPage();
    
    homePage.visit().verifyHomePageLoaded().goToShop();
    cy.get('.product, .item').should('be.visible');
  });

  it('should correctly calculate subtotals and total for multiple products', () => {
    cy.logStep('Starting Test Case 3: Shopping Cart Verification');
    
    // Purchase products
    Object.entries(productsData).forEach(([productName, data]) => {
      shopPage.buyProduct(productName, data.quantity);
    });

    // Navigate to cart
    shopPage.goToCart();
    cy.get('table, .cart').should('be.visible');

    // Verify cart contents
    Object.entries(productsData).forEach(([productName, data]) => {
      cartPage.verifyProductInCart(productName, data.quantity);
    });

    // Verify total calculation
    cartPage.verifyTotalCalculation();
    
    cy.logStep('Test Case 3 completed successfully');
  });
});
