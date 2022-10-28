/// <reference types = "cypress"/>
// import LoginElements from "../elements/LoginElements";

class LoginMethods {
  navigateToHome() {
    cy.visit('https://dev.socious.io/app');
  }
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
  // assertUrlAfterLogin(){
  //     cy.url().should('equal','https://dev.socious.io/app/projects')
  //     //cy.url().should('equal','https://dev.socious.io/app/auth/onboarding')
  // // }
}
//module.exports = new LoginMethods();
export default LoginMethods;
