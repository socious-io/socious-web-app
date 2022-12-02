class LoginElements {
  elements = {
    loginBtn: () => cy.contains('Sign in'),
    logincontinueBtn: () => cy.contains('Continue'),
    emailValMsg: () =>
      cy.get('.justify-between > .grow > :nth-child(2) > .flex'),
    passwordValMsg: () => cy.get(':nth-child(3) > .relative > .flex'),
    emailTxt: () => cy.get('[data-testid="Email-testid"]'),
    passwordTxt: () => cy.get('[data-testid="Password-testid"]'),
    invalidLoginMsg: () => cy.get('.text-sm')
  };
}
module.exports = new LoginElements();
