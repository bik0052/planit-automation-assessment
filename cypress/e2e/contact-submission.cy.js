import { HomePage } from '../support/pages/HomePage.js';
import { ContactPage } from '../support/pages/ContactPage.js';

describe('Test Case 2: Contact Form Submission', () => {
  let homePage;
  let contactPage;

  beforeEach(() => {
    homePage = new HomePage();
    contactPage = new ContactPage();
    
    homePage.visit().verifyHomePageLoaded().goToContact();
    cy.get('#forename').should('be.visible');
  });

  it('should successfully submit contact form with valid data', () => {
    const timestamp = Date.now();
    const runNumber = Cypress.env('RUN_NUMBER') || '1';
    
    cy.logStep(`Starting Test Case 2: Contact Form Submission (Run ${runNumber})`);
    
    contactPage.fillMandatoryFields(
      `${Cypress.env('testFirstName')}_${timestamp}`,
      Cypress.env('testLastName'),
      `test_${timestamp}@example.com`,
      '0123456789',
      `${Cypress.env('testMessage')} - Run ${runNumber} at ${new Date().toISOString()}`
    );
    
    contactPage.submitForm();
    contactPage.verifySuccessMessage();
    
    cy.logStep(`Test Case 2 Run ${runNumber} completed successfully`);
  });
});
