/// <reference types = "cypress"/>
import LoginElements from '../elements/LoginElements';
import AuthMethods from './AuthMethods';

class LoginMethods extends AuthMethods {
  clickOnLoginButton() {
    LoginElements.elements.loginBtn().click();
  }
  clickOnContinueButton() {
    LoginElements.elements.logincontinueBtn().click();
  }
  assertValidationMsgsForEmailPassword() {
    LoginElements.elements
      .emailValMsg()
      .should('contain', 'Email cannot be an empty field');
    LoginElements.elements
      .passwordValMsg()
      .should('contain', 'Password cannot be an empty field');
  }
  setEmail(username) {
    LoginElements.elements.emailTxt().clear().type(username);
    return this;
  }
  setPassword(password) {
    LoginElements.elements.passwordTxt().clear().type(password);
    return this;
  }
  assertUrlAfterLogin() {
    cy.location('pathname').should('equal', '/app/projects');
  }
}
export default LoginMethods;
