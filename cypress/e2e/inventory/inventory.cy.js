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
        cy.get(inventoryPage.inventoryContainer)
            .shouldBeVisible()
            .find(inventoryPage.inventoryItem)
            .shouldHaveLength(inventoryItems.length);
    });


    it("TC 2.3: Verify that the sort dropdown is visible and functional", () => {
        cy.get(inventoryPage.selectDropdown)
            .shouldBeVisible()
            .shouldBeEnabled();
    });

    it("TC 2.4: Verify that the sorted products are displayed correctly when sorting by price (low to high)", () => {
        cy.get(inventoryPage.selectDropdown)
            .shouldBeVisible()
            .select(inventoryPage.dropdownLowToHigh)

        inventoryPage.getPricesFromInventory().then(prices => {
            verifyAscendingSort(prices)
        });
    });

    it("TC 2.5: Verify that the sorted products are displayed correctly when sorting by price (high to low)", () => {
        cy.get(inventoryPage.selectDropdown)
            .shouldBeVisible()
            .select(inventoryPage.dropdownHighToLow)

        inventoryPage.getPricesFromInventory().then(prices => {
            verifyDescendingSort(prices)
        })
    });

    it("TC 2.6: Verify that the sorted products are displayed correctly when sorting by name (A to Z)", () => {
        cy.get(inventoryPage.selectDropdown)
            .shouldBeVisible()
            .select(inventoryPage.dropdownAZ)

        inventoryPage.getNamesFromInventory().then(names => {
            verifyAscendingSort(names)
        })
    });

    it("TC 2.7: Verify that the sorted products are displayed correctly when sorting by name (Z to A)", () => {
        cy.get(inventoryPage.selectDropdown)
            .shouldBeVisible()
            .select(inventoryPage.dropdownZA)

        inventoryPage.getNamesFromInventory().then(names => {
            verifyDescendingSort(names)
        })
    });

    it("TC 2.8: Verify that the inventory Page Items are displayed with correct name and price", () => {
        cy.get(inventoryPage.inventoryItem).each((item, index) => {
            cy.wrap(item)
                .find(inventoryPage.itemName)
                .shouldContainText(inventoryItems[index].name);

            cy.wrap(item)
                .find(inventoryPage.itemPrice)
                .shouldContainText(inventoryItems[index].price);
        });
    });

    it("TC 2.9: Verify that the user can add items to the cart from the inventory page and remove them", () => {
        cy.get(inventoryPage.inventoryItem).first().within(() => {
            cy.get(appData.button).shouldContainText(appData.addToCartButton).click();
            cy.get(appData.button).shouldContainText(appData.removeButton);
        });
    });

    it("TC 2.10: Verify that the user can navigate to the cart page from the inventory page", () => {
        cy.get(inventoryPage.cartIcon).shouldBeVisible().click();
        cy.shouldIncludeUrl(appData.cartUrl);
    });

    it("TC 2.11: Verify that the user can navigate to the product details page from the inventory page", () => {
        cy.get(inventoryPage.inventoryItem).first().within(() => {
            cy.get(inventoryPage.itemName).shouldBeVisible().click();
        });
        cy.get(inventoryPage.productName)
        .shouldBeVisible()
        .shouldContainText(inventoryItems[0].name);
    });

    it("TC 2.12: Verify that number of items in the cart is displayed correctly on the inventory page", () => {
        cy.get(inventoryPage.inventoryItem).first().within(() => {
            cy.get(appData.button).shouldContainText(appData.addToCartButton).click();
        });
        cy.get(inventoryPage.cartIcon)
            .shouldBeVisible()
            .shouldContainText("1");
    });

    it("TC 2.13: Verify that number of items in the cart is displayed correctly on the inventory page after removing items", () => {
        cy.get(inventoryPage.inventoryItem).first().within(() => {
            cy.get(appData.button).shouldContainText(appData.addToCartButton).click();
        });
        cy.get(inventoryPage.cartIcon)
            .shouldBeVisible()
            .shouldContainText("1");
        
        cy.get(inventoryPage.inventoryItem).first().within(() => {
            cy.get(appData.button).shouldContainText(appData.removeButton).click();
        });
        cy.get(inventoryPage.cartIcon)
            .shouldBeVisible()
            .shouldNotContainText("1");
    });

    it("TC 2.14: Verify that the user can log out from the inventory page", () => {
        cy.get(inventoryPage.menuButton).shouldBeVisible().click();
        cy.get(inventoryPage.logoutButton).shouldBeVisible().click();
        cy.get(loginPage.loginButton).shouldBeVisible();
    });

    it.only("TC 2.15: Verify that user can drill down to product details and add product to cart from there", () => {
        cy.get(inventoryPage.inventoryItem).first().within(() => {
            cy.get(inventoryPage.itemName).shouldBeVisible().click();
        });
        cy.get(inventoryPage.productName)
        .shouldBeVisible()
        .shouldContainText(inventoryItems[0].name);

        cy.get(inventoryPage.addToCartButton).shouldBeVisible().click();
        cy.get(inventoryPage.cartIcon)
            .shouldBeVisible()
            .shouldContainText("1");
    });
});