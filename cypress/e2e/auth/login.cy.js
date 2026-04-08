import LoginPage from "../../pages/LoginPage.js"
import appData from "../../fixtures/appData.json";
import CartPage from "../../pages/cartPage.js";
import "allure-cypress";

let loginPage = new LoginPage();
let cartPage = new CartPage();

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
        cy.shouldDisplayErrorMessageOnLogin(appData.loginErrorMessage);
    });

    it("TC 1.3: should display error for empty credentials", () => {
        cy.login("", "");
        cy.shouldDisplayErrorMessageOnLogin(appData.loginErrorMessageEmptyFields);
    });

    it("TC 1.4: should display error for empty username", () => {
        cy.login("", appData.randomPassword);
        cy.shouldDisplayErrorMessageOnLogin(appData.loginErrorMessageEmptyFields);
    });
    

    it("TC 1.5: should display error for empty password", () => {
        cy.login(appData.randomUsername, "");
        cy.shouldDisplayErrorMessageOnLogin(appData.loginErrorMessageEmptyPassword);
    });

    it("TC 1.6: Verify redirection to login when accessing Inventory without authentication", () => {
        cy.visit(appData.inventoryUrl, { failOnStatusCode: false });
        cy.shouldDisplayErrorMessageOnLogin(appData.unauthorizedLoginMessage);
    });

    it("TC 1.7: should prevent login for locked out user", () => {
        cy.login(appData.lockedOutUsername, Cypress.env('password'));
        cy.shouldDisplayErrorMessageOnLogin(appData.lockedOutErrorMessage);
    });

     it("TC 0.1: should redirect to login when accessing checkout without authentication", () => {
        cy.visit(cartPage.checkoutStepOneUrl, { failOnStatusCode: false });
        cy.shouldNotIncludeUrl(appData.inventoryUrl);
        cy.shouldNotIncludeUrl(cartPage.cartUrl);
        cy.shouldDisplayErrorMessageOnLogin(appData.unauthorizedLoginMessageCart);
    });
});