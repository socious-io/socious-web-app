/// <reference types = "cypress"/>
import OnboardingElements from '../e2e/elements/OnboardingElements';
import OnboardingMethods from '../e2e/methods/OnboardingMethods';

const onboardingMethods = new OnboardingMethods();
describe('User Onboarding', () => {
  beforeEach('Navigate to the home page, then Login page', () => {
    onboardingMethods.setupTestUser();
    onboardingMethods.logout();
    onboardingMethods.navigateToHome();
    onboardingMethods.clickOnLoginButton();
  });
  afterEach('Log out', () => {
    onboardingMethods.logout();
  });
  specify('User logs in for the first time', () => {
    onboardingMethods.setEmail();
    onboardingMethods.setPassword();
    onboardingMethods.clickOnContinueButton();
    onboardingMethods.assertShowingCongratulationAfterLogin();
    onboardingMethods.clickOnCompleteProfileButton();
    onboardingMethods.assertShowingSocialCausePage();
    onboardingMethods.selectSocialCause();
    onboardingMethods.clickOnContinueButton();
    onboardingMethods.assertShowingSkillsPage();
    onboardingMethods.selectSkills();
    onboardingMethods.clickOnContinueButton();
    onboardingMethods.assertShowingLocationPage();
    onboardingMethods.clickOnContinueButton();
    onboardingMethods.assertValidationMsgForNullCountryAndCity();
    onboardingMethods.selectCountry();
    onboardingMethods.selectCity();
    onboardingMethods.clickOnContinueButton();
    onboardingMethods.assertShowingAvailableForProjects();
    onboardingMethods.clickOnContinueButton();
    onboardingMethods.assertShowingPhonenumber();
    onboardingMethods.clickOnSkipLink();
    onboardingMethods.assertShowingBio();
    onboardingMethods.clickOnSkipLink();
    onboardingMethods.assertShowingPhoto();
    onboardingMethods.clickOnOnboardingCompletionButton();
    onboardingMethods.assertShowingNotification();
    onboardingMethods.clickOnAllowNotificationButton();
  });
});
