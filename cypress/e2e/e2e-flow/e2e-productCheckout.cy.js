import InventoryPage from "../../pages/inventoryPage";
import inventoryItems from "../../fixtures/inventoryItemsData.json";
import CartPage from "../../pages/cartPage";
import checkoutData from "../../fixtures/checkoutData.json";

const inventoryPage = new InventoryPage();
const cartPage = new CartPage();

describe("E2E Product Checkout", () => {

    beforeEach(() => {
        cy.visitApp();
        cy.login();
        cy.assertOnInventory();
    });

    it("E2E: Verify that use shoule be allowed to complete a product checkout", () => {

        cy.get(inventoryPage.inventoryItem).first().within(() => {
            cy.get(inventoryPage.itemName).shouldBeVisible().click();
        });

        cy.get(inventoryPage.addToCartButton).shouldBeVisible().click();

        cy.get(inventoryPage.cartIcon).shouldBeVisible().shouldContainText("1").click();

        cy.shouldIncludeUrl(cartPage.cartUrl);

        cy.get(cartPage.cartItemName)
            .shouldBeVisible()
            .shouldContainText(inventoryItems[0].name);

        cy.get(cartPage.checkoutButton).shouldBeVisible().click();

        cy.shouldIncludeUrl(cartPage.checkoutStepOneUrl);

        cy.get(cartPage.checkoutFirstNameInput).shouldBeVisible().type(checkoutData.checkoutData.firstName);
        cy.get(cartPage.checkoutLastNameInput).shouldBeVisible().type(checkoutData.checkoutData.lastName);
        cy.get(cartPage.checkoutPostalCodeInput).shouldBeVisible().type(checkoutData.checkoutData.postalCode);

        cy.get(cartPage.checkoutContinueButton).shouldBeVisible().click();

        cy.shouldIncludeUrl(cartPage.checkoutStepTwoUrl);

        cy.get(inventoryPage.productName).shouldBeVisible().shouldContainText(inventoryItems[0].name);

        cy.get(cartPage.checkoutFinishButton).shouldBeVisible().click();

        cy.shouldIncludeUrl(cartPage.checkoutCompleteUrl);
        
        cy.get(cartPage.backHomeButton).shouldBeVisible().click();

        cy.shouldIncludeUrl(inventoryPage.inventoryUrl);
    });
});

