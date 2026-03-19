import LoginPage from "../pages/LoginPage.js"
import appData from "../fixtures/app.json";

let loginPage = new LoginPage();

describe("Scenario 1: Login to the Application", () => {
    it("Test 1: Valid Login", () => {
        cy.visitApp();
        cy.login();
        cy.assertOnInventory();
    });

    it("Test 2: Invalid Login with Invalid Credentials", () => {
        cy.visitApp();
        cy.login("invalid_user", "invalid_pass");
        cy
            .get(loginPage.errorMessageLocator)
            .should('be.visible')
            .and('contain.text', appData.loginErrorMessage);
    });

    it("Test 3: Invalid Login with Empty Credentials", () => {
        cy.visitApp();
        cy.login("", "");
        cy
            .get(loginPage.errorMessageLocator)
            .should('be.visible')
            .and('contain.text', appData.loginErrorMessageEmptyFields);
    });

    it("Test 4: Invalid Login with Empty Username", () => {
        cy.visitApp();
        cy.login("", "some_password");
        cy
            .get(loginPage.errorMessageLocator)
            .should('be.visible')
            .and('contain.text', appData.loginErrorMessageEmptyFields);
    });

    it("Test 5: Invalid Login with Empty Password", () => {
        cy.visitApp();
        cy.login("some_username", "");
        cy
            .get(loginPage.errorMessageLocator)
            .should('be.visible')
            .and('contain.text', appData.loginErrorMessageEmptyPassword);
    });

    it("Test 6: Verify redirection to login when accessing Inventory without authentication", () => {
        cy.visit("/inventory.html",  { failOnStatusCode: false });
        cy
            .get(loginPage.errorMessageLocator)
            .should('be.visible')
            .and('contain.text', appData.unauthorizedLoginMessage);
    });
});