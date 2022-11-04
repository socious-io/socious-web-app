class AuthMethods {
  logout() {
    // Cypress currently doesn't delete third-party cookies between tests so we need to call this manually
    cy.clearCookies({domain: null});
  }
  navigateToHome() {
    cy.visit('/app');
  }
}

export default AuthMethods;
