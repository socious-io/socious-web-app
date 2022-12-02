/// <reference types = "cypress"/>
import LoginMethods from '/cypress/e2e/methods/LoginMethods';
import TestingData from '/cypress/fixtures/TestingData.json'

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
  specify("User can't login with invalid email and invalid password", () => {
    loginMethods.setEmail(TestingData.InvalidEmailForLogin);
    loginMethods.setPassword(TestingData.InvalidPassword);
    loginMethods.clickOnContinueButton();
    loginMethods.assertValidationMsgsForInvalidEmailInvalidPassword();
  });
  specify('User logs in with valid email and valid password', () => {
    loginMethods.setEmail(TestingData.EmailForLogin);
    loginMethods.setPassword(TestingData.PasswordForLogin);
    loginMethods.clickOnContinueButton();
    loginMethods.assertUrlAfterLogin();
  });
});
