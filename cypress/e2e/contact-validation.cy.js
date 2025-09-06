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
    
    // Verify error messages (with more flexible checking)
    contactPage.verifyErrorMessages();
    
    // Fill mandatory fields (ensure all required fields are filled)
    contactPage.fillMandatoryFields(
      'TestFirstName',  // firstName - required
      'TestSurname',    // surname - might be required
      'test@example.com', // email - required
      '1234567890',     // telephone - might be required
      'Test message content' // message - required
    );
    
    // Verify errors are cleared
    contactPage.verifyNoErrorMessages();
    
    cy.logStep('Test Case 1 completed successfully');
  });
});
