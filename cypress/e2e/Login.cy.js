/// <reference types = "cypress"/>
import LoginElements from '../e2e/elements/LoginElements';
import LoginMethods from '/cypress/e2e/methods/LoginMethods';

const loginMethods = new LoginMethods();
describe('Given user is in the Home page and navigates to the Login page', () => {
  beforeEach('Navigate to the home page, then login page', () => {
    loginMethods.navigateToHome();
    // loginMethods.clickOnLoginButton();
  });
  it('When user wants to login without entering email and password', () => {
    loginMethods.clickOnContinueButton();
    loginMethods.assertValidationMsgsForEmailPassword();
  });
  it('When user put invalid email and password', () => {
    loginMethods.setEmail('testazintest444@gmail.com');
    loginMethods.setPassword('12345678');
    loginMethods.clickOnContinueButton();
  });
  it('When user put valid email and password', () => {
    loginMethods.setEmail('testazintest4@gmail.com');
    loginMethods.setPassword('Socious1234');
    loginMethods.clickOnContinueButton();
    loginMethods.assertUrlAfterLogin();
  });
});
