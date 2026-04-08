import inventoryItems from "../fixtures/inventoryItemsData.json";

export default class InventoryPage {

    constructor() {

        this.selectDropdown = "select.product_sort_container[data-test='product-sort-container']"
        this.headerLabel = "div.header_label"
        this.inventoryContainer = "[data-test='inventory-list']"
        this.inventoryItem = ".inventory_item"
        this.dropdownHighToLow = "Price (high to low)"
        this.dropdownLowToHigh = "Price (low to high)"
        this.dropdownAZ = "Name (A to Z)"
        this.dropdownZA = "Name (Z to A)"
        this.itemPrice = ".inventory_item_price"
        this.itemName = ".inventory_item_name"
        this.cartIcon = "[data-test='shopping-cart-link']"
        this.productName = "[data-test='inventory-item-name']"
        this.menuButton = "#react-burger-menu-btn"
        this.logoutButton = "#logout_sidebar_link"
        this.addToCartButton = "[data-test='add-to-cart']"
        this.inventoryUrl = "/inventory.html"
    }

    getPricesFromInventory() {
        return cy.get(this.inventoryItem).then(items => {
            const prices = [...items].map(item =>
                parseFloat(
                    item.querySelector(this.itemPrice)
                        .textContent
                        .replace('$', '')
                )
            )
            return prices
        })
    }

    getNamesFromInventory() {
        return cy.get(this.inventoryItem).then(items => {
            const names = [...items].map(item =>
                item.querySelector(this.itemName).textContent
            )
            return names
        })
    }

    VerifyInventoryItemsWithCorrectNameAndPrice() {
        cy.get(this.inventoryItem).each((item, index) => {
            cy.wrap(item)
                .find(this.itemName)
                .shouldContainText(inventoryItems[index].name);

            cy.wrap(item)
                .find(this.itemPrice)
                .shouldContainText(inventoryItems[index].price);
        });
    }

    verifyCorrectNumberOfProducts() {
        cy.get(this.inventoryContainer)
            .shouldBeVisible()
            .find(this.inventoryItem)
            .shouldHaveLength(inventoryItems.length);
    }
}