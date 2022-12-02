/// <reference types = "cypress"/>
import SignUpElements from '../e2e/elements/SignUpElements';
import SignUpMethods from '../e2e/methods/SignUpMethods';
import TestingData from '/cypress/fixtures/TestingData.json'

const signUpMethods = new SignUpMethods();
describe('Sign Up', () => {
  beforeEach('Navigate to the home page, then SignUp page', () => {
    signUpMethods.logout();
    signUpMethods.navigateToHome();
    signUpMethods.clickOnSignUpButton();
  });
  afterEach('Log out', () => {
    signUpMethods.logout();
  });
  specify(
    'User tries to SignUp without entering first name and last name', () => {
      signUpMethods.clickOnContinueButton();
      signUpMethods.assertValidationMsgsForNullFirstNameLastName();
    },
  );
  specify('User enters invalid first name', () => {
    signUpMethods.setFirstName(TestingData.InvalidFirstName);
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForSpecialCharacterInFirstName();
  });
  specify('User enters invalid last name', () => {
    signUpMethods.setLastName(TestingData.InvalidLastName);
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForSpecialCharacterInLastName();
  });
  specify('User enters valid first name and last name (Successfully Sign up)', () => {
    signUpMethods.setFirstName(TestingData.ValidFirstName);
    signUpMethods.setLastName(TestingData.ValidLastName);
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertShowingEmailAfterPassingFirstStep();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForNullEmail();
    signUpMethods.setEmail(TestingData.InvalidEmail);
    signUpMethods.assertValidationMsgForInvalidEmail();
    signUpMethods.setValidEmail();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertShowingPasswordAfterPassingSecondStep();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForNullPassword();
    signUpMethods.setPassword(TestingData.InvalidPassword);
    signUpMethods.assertValidationMsgForNotStrongPassword();
    signUpMethods.setPassword(TestingData.ValidPassword);
    signUpMethods.setConfirmPassword(TestingData.ValidConfirmPassword);
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertShowingAgreementChkAfterPassingThirdStep();
    signUpMethods.checkAgreementChk();
    signUpMethods.clickOnContinueButton();
    signUpMethods.clickOnSuccessfulCloseBtn();
  });
  specify('User enters an existing email', () => {
    signUpMethods.setFirstName(TestingData.ValidFirstName);
    signUpMethods.setLastName(TestingData.ValidLastName);
    signUpMethods.clickOnContinueButton();
    signUpMethods.setEmail(TestingData.ExistingEmail);
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForExistingEmail();
  });
});
