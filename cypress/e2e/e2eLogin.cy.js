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
            .get(loginPage.errorMessage)
            .should('be.visible')
            .and('contain.text', appData.loginErrorMessage);
    });
});