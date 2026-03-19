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
        cy.login(appData.randomUsername, appData.randomPassword);
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessage);
    });

    it("Test 3: Invalid Login with Empty Credentials", () => {
        cy.visitApp();
        cy.login("", "");
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessageEmptyFields);
    });

    it("Test 4: Invalid Login with Empty Username", () => {
        cy.visitApp();
        cy.login("", appData.randomPassword);
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessageEmptyFields);
    });

    it("Test 5: Invalid Login with Empty Password", () => {
        cy.visitApp();
        cy.login(appData.randomUsername, "");
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessageEmptyPassword);
    });

    it("Test 6: Verify redirection to login when accessing Inventory without authentication", () => {
        cy.visit(appData.inventoryUrl, { failOnStatusCode: false });
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.unauthorizedLoginMessage);
    });
});