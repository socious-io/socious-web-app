/// <reference types = "cypress"/>
import LoginMethods from '/cypress/e2e/methods/LoginMethods';

const loginMethods = new LoginMethods();
describe('Login', () => {
  beforeEach('Navigate to the home page, then login page', () => {
    loginMethods.logout();
    loginMethods.navigateToHome();
    loginMethods.clickOnLoginButton();
  });
  afterEach('Log out', () => {
    loginMethods.logout();
  });
  specify("User can't login without entering email and password", () => {
    loginMethods.clickOnContinueButton();
    loginMethods.assertValidationMsgsForEmailPassword();
  });
  specify("User can't login with invalid email and password", () => {
    loginMethods.setEmail('testazintest444@gmail.com');
    loginMethods.setPassword('12345678');
    loginMethods.clickOnContinueButton();
  });
  specify('User logs in with valid email and password', () => {
    loginMethods.setEmail('testazintest4@gmail.com');
    loginMethods.setPassword('Socious1234');
    loginMethods.clickOnContinueButton();
    loginMethods.assertUrlAfterLogin();
  });
});
