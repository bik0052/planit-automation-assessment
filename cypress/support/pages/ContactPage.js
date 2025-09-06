import { BasePage } from './BasePage.js';

export class ContactPage extends BasePage {
  constructor() {
    super();
    this.firstNameField = '#forename';
    this.surnameField = '#surname';
    this.emailField = '#email';
    this.telephoneField = '#telephone';
    this.messageField = '#message';
    this.submitButton = '.btn-contact';
    this.successMessage = '.alert-success';
    
    this.errorMessages = {
      forename: '#forename-err',
      surname: '#surname-err', 
      email: '#email-err',
      telephone: '#telephone-err',
      message: '#message-err'
    };
  }

  fillMandatoryFields(firstName, surname, email, telephone, message) {
    cy.logStep('Filling mandatory form fields');
    if (firstName) this.typeText(this.firstNameField, firstName);
    if (surname) this.typeText(this.surnameField, surname);
    if (email) this.typeText(this.emailField, email);
    if (telephone) this.typeText(this.telephoneField, telephone);
    if (message) this.typeText(this.messageField, message);
    return this;
  }

  submitForm() {
    cy.logStep('Submitting contact form');
    this.clickElement(this.submitButton);
    return this;
  }

  verifyErrorMessages() {
    cy.logStep('Verifying error messages are displayed');
    cy.wait(1000);
    
    this.getElement(this.errorMessages.forename).should('be.visible');
    this.getElement(this.errorMessages.email).should('be.visible'); 
    this.getElement(this.errorMessages.message).should('be.visible');
    return this;
  }

  verifyNoErrorMessages() {
    cy.logStep('Verifying error messages are cleared');
    cy.wait(1000);
    
    this.getElement(this.errorMessages.forename).should('not.be.visible');
    this.getElement(this.errorMessages.email).should('not.be.visible');
    this.getElement(this.errorMessages.message).should('not.be.visible');
    return this;
  }

  verifySuccessMessage() {
    cy.logStep('Verifying success message');
    this.getElement(this.successMessage)
      .should('be.visible')
      .and('contain.text', 'Thanks');
    return this;
  }
}
