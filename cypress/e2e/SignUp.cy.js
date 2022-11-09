/// <reference types = "cypress"/>
import SignUpElements from '../e2e/elements/SignUpElements';
import SignUpMethods from '../e2e/methods/SignUpMethods';

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
    'User tries to SignUp without entering first name and last name',
    () => {
      signUpMethods.clickOnContinueButton();
      signUpMethods.assertValidationMsgsForNullFirstNameLastName();
    },
  );
  specify('User enters invalid first name', () => {
    signUpMethods.enterInvalidFirstName();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForSpecialCharacterInFirstName();
  });
  specify('User enters invalid last name', () => {
    signUpMethods.enterInvalidLastName();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForSpecialCharacterInLastName();
  });
  specify(
    'User enters valid first name and last name (Successfully Sign up)',
    () => {
      signUpMethods.enterValidFirstName();
      signUpMethods.enterValidLastName();
      signUpMethods.clickOnContinueButton();
      signUpMethods.assertShowingEmailAfterPassingFirstStep();
      signUpMethods.clickOnContinueButton();
      signUpMethods.assertValidationMsgForNullEmail();
      signUpMethods.enterInvalidEmail();
      signUpMethods.assertValidationMsgForInvalidEmail();
      signUpMethods.enterValidEmail();
      signUpMethods.clickOnContinueButton();
      signUpMethods.assertShowingPasswordAfterPassingSecondStep();
      signUpMethods.clickOnContinueButton();
      signUpMethods.assertValidationMsgForNullPassword();
      signUpMethods.enterInvalidPassword();
      signUpMethods.assertValidationMsgForNotStrongPassword();
      signUpMethods.enterValidPassword();
      signUpMethods.enterValidConfirmPassword();
      signUpMethods.clickOnContinueButton();
      signUpMethods.assertShowingAgreementChkAfterPassingThirdStep();
      signUpMethods.checkAgreementChk();
      signUpMethods.clickOnContinueButton();
      signUpMethods.clickOnSuccessfulCloseBtn();
    },
  );
  specify('User enters an existing email', () => {
    signUpMethods.enterValidFirstName();
    signUpMethods.enterValidLastName();
    signUpMethods.clickOnContinueButton();
    signUpMethods.enterExistingEmail();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForExistingEmail();
  });
});
