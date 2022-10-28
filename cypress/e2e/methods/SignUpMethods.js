import SignUpElements from "../elements/SignUpElements";

class SignUpMethods{
    
    navigateToHome(){
        cy.visit('https://dev.socious.io/app')
    }
    clickOnSignUpButton(){
        SignUpElements.elements.SignUpBtn().click()
    }
    clickOnContinueButton(){
        SignUpElements.elements.SignUpcontinueBtn().click()
    }
    assertValidationMsgsForNullFirstNameLastName(){        
        SignUpElements.elements.firstNameNullValMsg().should('contain','First name cannot be an empty field')
        SignUpElements.elements.lastNameNullValMsg().should('contain','Last name cannot be an empty field') 
    }
    assertValidationMsgForSpecialCharacterInFirstName(){        
        SignUpElements.elements.firstNameSpecialCharacter().should('contain','special characters.')
    }
    assertValidationMsgForSpecialCharacterInLastName(){
        SignUpElements.elements.lastNameSpecialCharacter().should('contain','special characters.') 
    }
    setFirstName(firstname){//I should improve these kinds of functions to get being more general
        SignUpElements.elements.firstNameTxt().clear().type(firstname);
        return this        
    }
    
    setLastName(lastname){
        SignUpElements.elements.lastNameTxt().clear().type(lastname);
        return this       
    }
    enterInvalidFirstName(){
        this.setFirstName('First$$Name'); 
    }
    enterInvalidLastName(){
        this.setLastName('Last$$Name');
    }
    enterValidFirstName(){
        this.setFirstName('valid first name'); 
    }
    enterValidLastName(){
        this.setLastName('valid last name');
    }
    
    assertShowingEmailAfterPassingFirstStep(){
       
        SignUpElements.elements.emailTxt().should('be.visible')
    }
    assertValidationMsgForNullEmail(){
        SignUpElements.elements.emailNullValMsg().should('contain','Email cannot be an empty field')
    }
    setEmail(email){
        SignUpElements.elements.emailTxt().clear().type(email);
        return this       
    }
    enterInvalidEmail(){
        this.setEmail('testazintest4');
    }
    enterValidEmail(){
        this.setEmail('testazintest60@outlook.com'); 
    }
    assertValidationMsgForInvalidEmail(){
        SignUpElements.elements.emailInvaliEmailValMsg().should('contain','Email address is not valid')
    }
    assertShowingPasswordAfterPassingSecondStep(){
        SignUpElements.elements.passwordTxt().should('be.visible')
    }
    assertValidationMsgForNullPassword(){
        SignUpElements.elements.passwordNullValMsg().should('contain','Password cannot be an empty field')
    }
    setPassword(password){
        SignUpElements.elements.passwordTxt().clear().type(password);
        return this       
    }
    enterInvalidPassword(){
        this.setPassword('12345678');
    }
    enterValidPassword(){
        this.setPassword('Socious1234'); 
    }
    assertValidationMsgForNotStrongPassword(){
        SignUpElements.elements.passwordStrongValMsg().should('contain','Password is not strong enough')
    }
    assertValidationMsgForConfirmPassword(){
        SignUpElements.elements.confirmPasswordValMsg().should('contain','The passwords you entered do not match')
    }
    setConfirmPassword(confirmPassword){
        SignUpElements.elements.confirmPasswordTxt().clear().type(confirmPassword);
        return this       
    }
    enterValidConfirmPassword(){
        this.setConfirmPassword('Socious1234'); 
    }
    assertShowingAgreementChkAfterPassingThirdStep(){
        SignUpElements.elements.agreementChk().should('be.visible')
    }
    checkAgreementChk(){
        SignUpElements.elements.selectAgreementChk().check();
    }
    clickOnSuccessfulCloseBtn(){
        SignUpElements.elements.successfulCloseBtn().click();
    }
    enterExistingEmail(){
        this.setEmail('testazintest4@yahoo.com'); 
    }
    assertValidationMsgForExistingEmail(){
        SignUpElements.elements.existingEmailValMsg().should('contain','This email is already registered')
    }

}
export default SignUpMethods