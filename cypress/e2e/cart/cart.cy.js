import CartPage from "../../pages/cartPage";
import InventoryPage from "../../pages/inventoryPage";
import inventoryItems from "../../fixtures/inventoryItemsData.json";
import checkoutData from "../../fixtures/checkoutData.json";

const cartPage = new CartPage();
const inventoryPage = new InventoryPage();

describe("Scenario 3: Checkout with an item in the cart", () => {

    beforeEach(() => {
        cy.visitApp();
        cy.login();
        cy.assertOnInventory();
        cy.openCartPage();
    });

    it("TC 3.1: Verify that user should be able to continue to inventory page from cart page", () => {
        cy.clickButton(cartPage.continueShoppingButton);
        cy.shouldIncludeUrl(inventoryPage.inventoryUrl);
    });

    it("TC 3.2: Verify that user should be able to remove item from cart", () => {
        cy.removeItemFromCart(inventoryItems[0].name);
    });

    it("TC 3.3: Verify that user should be able to proceed to checkout from cart page", () => {
        cy.clickButton(cartPage.checkoutButton);
        cy.shouldIncludeUrl(cartPage.checkoutStepOneUrl);
    });
});

describe("Scenario 4: Checkout Page one screen", () => {

    beforeEach(() => {
        cy.visitApp();
        cy.login();
        cy.assertOnInventory();
        cy.openCartPage();
        cy.checkoutCart();
    });

    it("TC 4.1: Verify that user should be able to continue to checkout step two page after entering valid details in checkout step one page", () => {
        cy.checkoutStepOne(checkoutData.checkoutData.firstName, checkoutData.checkoutData.lastName, checkoutData.checkoutData.postalCode);
    });

    it("TC 4.2: Verify that user should see error message when trying to continue to checkout step two page with missing details in checkout step one page", () => {
        cy.clickButton(cartPage.checkoutContinueButton);
        cy.get(cartPage.checkoutErrorMessage).shouldBeVisible().shouldContainText("Error");
    });

    it("TC 4.3: Verify that user should be able to cancel button and navigate back to cart page  from checkout step one page", () => {
        cy.clickButton(cartPage.checkoutCancelButton);
        cy.shouldIncludeUrl(cartPage.cartUrl);
    });

    it("TC 4.4: Verify that the user is able to open cart page from checkout step one page by clicking on cart icon", () => {
        cy.clickButton(inventoryPage.cartIcon);
        cy.shouldIncludeUrl(cartPage.cartUrl);
    });
});

describe("Scenario 5: Checkout Page two screen", () => {

    beforeEach(() => {
        cy.visitApp();
        cy.login();
        cy.assertOnInventory();
        cy.openCartPage();
        cy.checkoutCart();
        cy.checkoutStepOne(checkoutData.checkoutData.firstName, checkoutData.checkoutData.lastName, checkoutData.checkoutData.postalCode);
    });

    it("TC 5.1: Verify that user should be able to click finish button to complete checkout", () => {
        cy.checkoutStepTwo();
    });

    it("TC 5.2: Verify that user should be able to click cancel button and navigate back to inventory page from checkout step two page", () => {
        cy.clickButton(cartPage.checkoutCancelButton);
        cy.shouldIncludeUrl(inventoryPage.inventoryUrl);
    });

    it("TC 5.3: Verify that the user is able to open cart page from checkout step two page by clicking on cart icon", () => {
        cy.clickButton(inventoryPage.cartIcon);
        cy.shouldIncludeUrl(cartPage.cartUrl);
    });

    it("TC 5.4: Verify that user should be able to click back home button and navigate to inventory page from checkout complete page", () => {
        cy.checkoutStepTwo();
        cy.checkoutComplete();
    });
});
