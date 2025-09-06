import './commands';
import 'cypress-mochawesome-reporter/register';

// Hide XHR requests from command log
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Uncaught exception:', err.message);
  return false;
});

// Test logging
Cypress.on('test:before:run', (test) => {
  console.log(`🧪 Starting test: ${test.title}`);
});

Cypress.on('test:after:run', (test) => {
  console.log(`✅ Finished test: ${test.title} - Status: ${test.state}`);
});
