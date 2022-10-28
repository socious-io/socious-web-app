class SignUpElements{
    elements = {
        SignUpBtn: () => cy.contains('Join now'),
        SignUpcontinueBtn: () => cy.contains('Continue'),
        firstNameNullValMsg: () => cy.get('.justify-between > .grow > :nth-child(2) > .flex'),
        lastNameNullValMsg: () => cy.get(':nth-child(3) > .flex'),
        firstNameTxt: () => cy.get('[data-testid="First name-testid"]'),
        lastNameTxt: () => cy.get('[data-testid="Last name-testid"]'),
        firstNameSpecialCharacter: () => cy.get('.justify-between > .grow > :nth-child(2) > .flex'),
        lastNameSpecialCharacter: () => cy.get(':nth-child(3) > .flex'),
        emailTxt: () => cy.get('[data-testid="Email-testid"]'),
        emailNullValMsg: () => cy.get('.grow > .relative > .flex'),
        emailInvaliEmailValMsg: () => cy.get('.grow > .relative > .flex'),
        passwordTxt: () => cy.get('[data-testid="Password-testid"]'),
        confirmPasswordTxt: () => cy.get('[data-testid="Confirm password-testid"]'),
        passwordNullValMsg:() => cy.contains('Password cannot be an empty field'),
        passwordStrongValMsg: () => cy.contains('Password is not strong enough'),
        confirmPasswordValMsg: () => cy.contains('The passwords you entered do not match'),
        agreementChk: () => cy.get('.ml-10 > .grow > .flex > .text-center'),
        selectAgreementChk: () => cy.get('.w-4'),
        successfulCloseBtn: () => cy.get('div.mt-4 > .font-medium'),
        existingEmailValMsg: () => cy.contains('This email is already registered')

    }
    
}
module.exports = new SignUpElements();