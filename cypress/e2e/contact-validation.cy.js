import { HomePage } from '../support/pages/HomePage.js';
import { ContactPage } from '../support/pages/ContactPage.js';

describe('Test Case 1: Contact Form Validation', () => {
  let homePage;
  let contactPage;

  beforeEach(() => {
    homePage = new HomePage();
    contactPage = new ContactPage();
    
    homePage.visit().verifyHomePageLoaded().goToContact();
    cy.get('#forename').should('be.visible');
  });

  it('should show error messages when submitting empty form and clear them when filled', () => {
    cy.logStep('Starting Test Case 1: Contact Form Validation');
    
    // Submit empty form
    contactPage.submitForm();
    
    // Verify error messages
    contactPage.verifyErrorMessages();
    
    // Fill mandatory fields
    contactPage.fillMandatoryFields(
      Cypress.env('testFirstName'),
      '',
      Cypress.env('testEmail'),
      '',
      Cypress.env('testMessage')
    );
    
    // Verify errors are cleared
    contactPage.verifyNoErrorMessages();
    
    cy.logStep('Test Case 1 completed successfully');
  });
});
