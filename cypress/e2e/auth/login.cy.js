import LoginPage from "../../pages/LoginPage.js"
import appData from "../../fixtures/appData.json";
import "allure-cypress";

let loginPage = new LoginPage();

describe("Scenario 1: Login Functionality", () => {

    beforeEach(() => {
        cy.visitApp();
    });

    it("TC 1.1: should login successfully with valid credentials", () => {
        cy.login();
        cy.assertOnInventory();
    });

    it("TC 1.2: should display error for invalid credentials", () => {
        cy.login(appData.randomUsername, appData.randomPassword);
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessage);
    });

    it("TC 1.3: should display error for empty credentials", () => {
        cy.login("", "");
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessageEmptyFields);
    });

    it("TC 1.4: should display error for empty username", () => {
        cy.login("", appData.randomPassword);
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessageEmptyFields);
    });

    it("TC 1.5: should display error for empty password", () => {
        cy.login(appData.randomUsername, "");
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.loginErrorMessageEmptyPassword);
    });

    it("TC 1.6: Verify redirection to login when accessing Inventory without authentication", () => {
        cy.visit(appData.inventoryUrl, { failOnStatusCode: false });
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.unauthorizedLoginMessage);
    });

    it("TC 1.7: should prevent login for locked out user", () => {
        cy.login(appData.lockedOutUsername, Cypress.env('password'));
        cy
            .get(loginPage.errorMessageLocator)
            .shouldBeVisible()
            .shouldContainText(appData.lockedOutErrorMessage);
    });
});