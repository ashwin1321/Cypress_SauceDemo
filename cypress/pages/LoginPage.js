export default class LoginPage {

    constructor() {


        this.uname = "#user-name";
        this.password = "#password";
        this.loginButton = "#login-button";
    }

    // visit the link
    visitUrl() {
        const baseUrl = Cypress.config("baseUrl");
        cy.visit("/")
        cy.log("------ Visiting Site: " + baseUrl)
    }

    // enter creds and login
    login(username, password) {

        cy.log("------- Entering Credentials --------")
        cy.get(this.uname).type(username);
        cy.get(this.password).type(password);
        cy.log("------- Clicking LoginIn Button -------")
        cy.get(this.loginButton).click();
    }
}