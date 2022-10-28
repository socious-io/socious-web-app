/// <reference types = "cypress"/>
import SignUpElements from '../e2e/elements/SignUpElements';
import SignUpMethods from '../e2e/methods/SignUpMethods';

const signUpMethods = new SignUpMethods();
describe('Given user is in the Home page and navigates to the SignUp page', () => {
  beforeEach('Navigate to the home page, then SignUp page', () => {
    signUpMethods.navigateToHome();
    signUpMethods.clickOnSignUpButton();
  });
  it('When user wants to SignUp without entering first name and last name', () => {
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgsForNullFirstNameLastName();
  });
  it('When user enter invalid first name', () => {
    signUpMethods.enterInvalidFirstName();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForSpecialCharacterInFirstName();
  });
  it('When user enter invalid last name', () => {
    signUpMethods.enterInvalidLastName();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForSpecialCharacterInLastName();
  });
  it('When user enter valid first name and last name(Successfully Sign up)', () => {
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
  });
  it('When user enter an existing email', () => {
    signUpMethods.enterValidFirstName();
    signUpMethods.enterValidLastName();
    signUpMethods.clickOnContinueButton();
    signUpMethods.enterExistingEmail();
    signUpMethods.clickOnContinueButton();
    signUpMethods.assertValidationMsgForExistingEmail();
  });
});
