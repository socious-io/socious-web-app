import OnboardingElements from '../elements/OnboardingElements';

class OnboardingMethods {
  navigateToHome() {
    cy.visit('https://dev.socious.io/app');
  }
  clickOnLoginButton() {
    OnboardingElements.elements.loginBtn().click();
  }
  clickOnContinueButton() {
    OnboardingElements.elements.onboardingcontinueBtn().click();
  }
  setEmail(onboardingEmail) {
    OnboardingElements.elements
      .emailTxt()
      .clear()
      .type('testazintest60@outlook.com');
    return this;
  }
  setPassword(password) {
    OnboardingElements.elements.passwordTxt().clear().type('Socious1234');
    return this;
  }
  assertShowingCongratulationAfterLogin() {
    OnboardingElements.elements.congratulationsLbl().should('be.visible');
  }
  clickOnCompleteProfileButton() {
    OnboardingElements.elements.completeProfileBtn().click();
  }
  assertShowingSocialCausePage() {
    OnboardingElements.elements.socialCauseLbl().should('be.visible');
    OnboardingElements.elements.onboardingcontinueBtn().should('be.disabled');
  }
  selectSocialCause() {
    OnboardingElements.elements.socialCauseSearchTxt().type('animal');
    OnboardingElements.elements.searchedSocialcause().click();
  }
  assertShowingSkillsPage() {
    OnboardingElements.elements.skillsLbl().should('be.visible');
    OnboardingElements.elements.onboardingcontinueBtn().should('be.disabled');
  }
  selectSkills() {
    OnboardingElements.elements.skillSearchTxt().type('accounting');
    OnboardingElements.elements.searchedSkills().click();
  }
  assertShowingLocationPage() {
    OnboardingElements.elements.locationLbl().should('be.visible');
  }
  assertValidationMsgForNullCountryAndCity() {
    OnboardingElements.elements
      .countryNullValMsg()
      .should('contain', 'cannot be an empty field');
    OnboardingElements.elements
      .cityNullValMsg()
      .should('contain', 'cannot be an empty field');
  }
  selectCountry() {
    OnboardingElements.elements.countryTxt().type('canada');
    OnboardingElements.elements.selectedCountry().click();
  }
  selectCity() {
    OnboardingElements.elements.cityTxt().type('vanscoy');
    OnboardingElements.elements.selectedCity().click();
  }
  assertShowingAvailableForProjects() {
    OnboardingElements.elements.availableForProjectsLbl().should('be.visible');
  }
  assertShowingPhonenumber() {
    OnboardingElements.elements.PhoneNumberLbl().should('be.visible');
  }
  clickOnSkipLink() {
    OnboardingElements.elements.skipLink().click();
  }
  assertShowingBio() {
    OnboardingElements.elements.BioLbl().should('be.visible');
  }
  assertShowingPhoto() {
    OnboardingElements.elements.PhotoLbl().should('be.visible');
  }
  clickOnOnboardingCompletionButton() {
    OnboardingElements.elements.onboardingCompletionBtn().click();
  }
  assertShowingNotification() {
    OnboardingElements.elements.NotificationLbl().should('be.visible');
  }
  clickOnAllowNotificationButton() {
    OnboardingElements.elements.AllowNofificationBtn().click();
  }
}
export default OnboardingMethods;
