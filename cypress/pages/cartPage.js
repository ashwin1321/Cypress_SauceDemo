export default class cartPage {

    constructor() {

        this.checkoutButton = '[data-test="checkout"]'
        this.continueShoppingButton = '[data-test="continue-shopping"]'
        this.removeButton = '[data-test="remove-sauce-labs-backpack"]'
        this.cartItemName = '[data-test="inventory-item-name"]'
        this.cartUrl = "/cart.html"
        this.checkoutStepOneUrl = "/checkout-step-one.html"
        this.checkoutFirstNameInput = '[data-test="firstName"]'
        this.checkoutLastNameInput = '[data-test="lastName"]'
        this.checkoutPostalCodeInput = '[data-test="postalCode"]'
        this.checkoutContinueButton = '[data-test="continue"]'
        this.checkoutStepTwoUrl = "/checkout-step-two.html"
        this.checkoutFinishButton = '[data-test="finish"]'
        this.checkoutCancelButton = '[data-test="cancel"]'
        this.backHomeButton = '[data-test="back-to-products"]'
        this.checkoutCompleteUrl = "/checkout-complete.html"
    }
}