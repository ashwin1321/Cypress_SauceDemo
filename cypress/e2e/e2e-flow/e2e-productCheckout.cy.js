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

        cy.openCartPage();
        cy.checkoutCart();
        cy.checkoutStepOne(checkoutData.checkoutData.firstName, checkoutData.checkoutData.lastName, checkoutData.checkoutData.postalCode);
        cy.checkoutStepTwo();
        cy.checkoutComplete();
    });
});

