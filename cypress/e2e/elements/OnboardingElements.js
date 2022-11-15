class OnboardingElements {
  elements = {
    loginBtn: () => cy.contains('Sign in'),
    emailTxt: () => cy.get('[data-testid="Email-testid"]'),
    passwordTxt: () => cy.get('[data-testid="Password-testid"]'),
    onboardingcontinueBtn: () => cy.contains('Continue'),
    congratulationsLbl: () => cy.contains('Congratulations'),
    completeProfileBtn: () => cy.contains('Complete your profile'),
    socialCauseLbl: () => cy.contains('What are your social causes?'),
    socialCauseSearchTxt: () => cy.get('[data-testid="undefined-testid"]'),
    searchedSocialcause: () => cy.get('.inline-flex > .text-secondary'),
    skillsLbl: () => cy.contains('What skills do you have?'),
    skillSearchTxt: () => cy.get('[data-testid="undefined-testid"]'),
    searchedSkills: () => cy.get('.inline-flex > .text-secondary'),
    locationLbl: () => cy.contains("What's your location?"),
    countryNullValMsg: () => cy.get(':nth-child(5) > .flex.text-error'),
    cityNullValMsg: () => cy.get(':nth-child(8) > .flex.text-error'),
    countryTxt: () => cy.get('input[name=country-input]'),
    cityTxt: () => cy.get('input[name=city-input'),
    selectedCountry: () => cy.get('.block'),
    selectedCity: () => cy.get('.block'),
    availableForProjectsLbl: () =>
      cy.contains('Are you available for projects?'),
    PhoneNumberLbl: () => cy.contains('What’s your phone number?'),
    skipLink: () => cy.get('.relative.flex > .right-0'),
    BioLbl: () => cy.contains('Tell us about who you are'),
    PhotoLbl: () => cy.contains('Add a profile photo'),
    onboardingCompletionBtn: () => cy.contains('Complete your profile'),
    NotificationLbl: () => cy.contains('Allow notifications'),
    AllowNofificationBtn: () => cy.get('.bg-white'),
  };
}
module.exports = new OnboardingElements();
