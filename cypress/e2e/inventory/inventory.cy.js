import InventoryPage from "../../pages/inventoryPage";
import LoginPage from "../../pages/LoginPage";
import inventoryItems from "../../fixtures/inventoryItemsData.json";
import appData from "../../fixtures/appData.json";
import { verifyAscendingSort, verifyDescendingSort } from "../../utils/sortUtils";
import "allure-cypress";

const inventoryPage = new InventoryPage();
const loginPage = new LoginPage();

describe("Scenario 2: Inventory Page Test Cases", () => {

    beforeEach(() => {
        cy.visitApp();
        cy.login();
    });

    it("TC 2.1: Verify that the inventory page is displayed after successful login", () => {
        cy.assertOnInventory();
    });

    it("TC 2.2: Verify that the correct number of products are displayed on the inventory page", () => {
       inventoryPage.verifyCorrectNumberOfProducts();
    });


    it("TC 2.3: Verify that the sort dropdown is visible and functional", () => {
        cy.get(inventoryPage.selectDropdown).shouldBeVisible().shouldBeEnabled();
    });

    it("TC 2.4: Verify that the sorted products are displayed correctly when sorting by price (low to high)", () => {
        cy.sortProducts(inventoryPage.dropdownLowToHigh, verifyAscendingSort, "price");
    });

    it("TC 2.5: Verify that the sorted products are displayed correctly when sorting by price (high to low)", () => {
        cy.sortProducts(inventoryPage.dropdownHighToLow, verifyDescendingSort, "price");
    });

    it("TC 2.6: Verify that the sorted products are displayed correctly when sorting by name (A to Z)", () => {
        cy.sortProducts(inventoryPage.dropdownAZ, verifyAscendingSort, "name");
    });

    it("TC 2.7: Verify that the sorted products are displayed correctly when sorting by name (Z to A)", () => {
        cy.sortProducts(inventoryPage.dropdownZA, verifyDescendingSort, "name");
    });

    it("TC 2.8: Verify that the inventory Page Items are displayed with correct name and price", () => {
       inventoryPage.VerifyInventoryItemsWithCorrectNameAndPrice();
    });

    it("TC 2.9: Verify that the user can navigate to the cart page from the inventory page", () => {
        cy.openCartPage();
    });

    it("TC 2.10: Verify that the user can navigate to the product details page from the inventory page", () => {
        cy.drillDownToFirstProductDetails();
    });

    it("TC 2.11: Verify that number of items in the cart is displayed correctly on the inventory page", () => {
        cy.addFirstItemToCart();
    });

    it("TC 2.12: Verify that number of items in the cart is displayed correctly on the inventory page after removing items", () => {
        cy.addFirstItemToCart();
        cy.removeOneItemFromCart();
    });

    it("TC 2.13: Verify that the user can log out from the inventory page", () => {
        cy.logout();
    });

    it("TC 2.14: Verify that user can drill down to product details and add product to cart from there", () => {
        cy.drillDownToFirstProductDetails();
        cy.addItemToCart();
    });
});