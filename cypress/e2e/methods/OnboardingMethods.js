import OnboardingElements from '../elements/OnboardingElements';
import {api} from './api.js';
import AuthMethods from './AuthMethods';

export const runEmail = `onboarding-${new Date().valueOf()}@tests.example.com`;

class OnboardingMethods extends AuthMethods {
  setupTestUser() {
    return cy
      .request('POST', api('/auth/register'), {
        first_name: 'Onboarding',
        last_name: 'Test',
        username: runEmail.split('@')[0],
        password: 'Socious1234',
        email: runEmail,
      })
      .then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.status).to.equal(200);
      });
  }
  clickOnLoginButton() {
    OnboardingElements.elements.loginBtn().click();
  }
  clickOnContinueButton() {
    OnboardingElements.elements.onboardingcontinueBtn().click();
  }
  setEmail() {
    OnboardingElements.elements.emailTxt().clear().type(runEmail);
    return this;
  }
  setPassword() {
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
