import appData from "../fixtures/appData.json";
import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/inventoryPage";
import CartPage from "../pages/cartPage";
import inventoryItems from "../fixtures/inventoryItemsData.json";

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();

Cypress.Commands.add("visitApp", () => {
	return cy.visit("/");
});


Cypress.Commands.add("login", (username, password) => {
	const user = username ?? Cypress.env('username');
	const pass = password ?? Cypress.env('password');
	// if (!user || !pass) {
	// 	throw new Error('Missing credentials: call cy.login(user, pass) or set CYPRESS_username and CYPRESS_password in environment/.env');
	// }
	if (user && pass) {
		return cy
			.get(loginPage.uname).clear().type(user)
			.get(loginPage.password).clear().type(pass)
			.get(loginPage.loginButton).click();
	} else if (user && !pass) {
		return cy
			.get(loginPage.uname).clear().type(user)
			.get(loginPage.loginButton).click();
	} else if (!user && pass) {
		return cy
			.get(loginPage.password).clear().type(pass)
			.get(loginPage.loginButton).click();
	} else {
		return cy
			.get(loginPage.loginButton).click();
	}
});

// Assert we're on the inventory page and header is visible
Cypress.Commands.add("assertOnInventory", () => {
	const inventoryUrl = appData.inventoryUrl;
	const headerText = appData.headerText;
	return cy
		.shouldIncludeUrl(inventoryUrl)
		.get(inventoryPage.headerLabel)
		.shouldBeVisible()
		.shouldHaveText(headerText);
});

Cypress.Commands.add("openCartPage", () => {

	cy.get(inventoryPage.inventoryItem).first().within(() => {
		cy.get(inventoryPage.itemName).shouldBeVisible().click();
	});

	cy.get(inventoryPage.addToCartButton).shouldBeVisible().click();
	cy.get(inventoryPage.cartIcon).shouldBeVisible().shouldContainText("1").click();
	cy.shouldIncludeUrl(cartPage.cartUrl);
});


Cypress.Commands.add("checkoutCart", () => {
	cy.get(cartPage.checkoutButton).shouldBeVisible().click();
	cy.shouldIncludeUrl(cartPage.checkoutStepOneUrl);
});

Cypress.Commands.add("checkoutStepOne", (firstName, lastName, postalCode) => {
	cy.get(cartPage.checkoutFirstNameInput).shouldBeVisible().type(firstName);
	cy.get(cartPage.checkoutLastNameInput).shouldBeVisible().type(lastName);
	cy.get(cartPage.checkoutPostalCodeInput).shouldBeVisible().type(postalCode);
	cy.clickButton(cartPage.checkoutContinueButton);
	cy.shouldIncludeUrl(cartPage.checkoutStepTwoUrl);
});

Cypress.Commands.add("removeItemFromCart", (itemName) => {
	cy.get(cartPage.cartItemName).shouldBeVisible().shouldContainText(itemName);
	cy.clickButton(cartPage.removeButton);
	cy.shouldNotExist(cartPage.cartItemName);
	cy.get(inventoryPage.cartIcon).shouldBeVisible().shouldNotContainText("1");
});

Cypress.Commands.add("checkoutStepTwo", () => {
	cy.clickButton(cartPage.checkoutFinishButton);
	cy.shouldIncludeUrl(cartPage.checkoutCompleteUrl);
});

Cypress.Commands.add("checkoutComplete", () => {
	cy.clickButton(cartPage.backHomeButton);
	cy.shouldIncludeUrl(inventoryPage.inventoryUrl);
});

Cypress.Commands.add("sortProducts", (sortOption, sortingOrder, sortType) => {
	cy.get(inventoryPage.selectDropdown)
		.shouldBeVisible()
		.select(sortOption)

	if (sortType === "price") {
		inventoryPage.getPricesFromInventory().then(prices => {
			sortingOrder(prices)
		});
	} else if (sortType === "name") {
		inventoryPage.getNamesFromInventory().then(names => {
			sortingOrder(names)
		});
	}
});

Cypress.Commands.add("addFirstItemToCart", () => {
	cy.get(inventoryPage.inventoryItem).first().within(() => {
		cy.get(appData.button).shouldContainText(appData.addToCartButton).click();
	});
	cy.get(inventoryPage.cartIcon)
		.shouldBeVisible()
		.shouldContainText("1");
});

Cypress.Commands.add("removeOneItemFromCart", () => {
	cy.get(inventoryPage.inventoryItem).first().within(() => {
		cy.get(appData.button).shouldContainText(appData.removeButton).click();
	});
	cy.get(inventoryPage.cartIcon)
		.shouldBeVisible()
		.shouldNotContainText("1");
});

Cypress.Commands.add("addItemToCart", () => {
	cy.clickButton(inventoryPage.addToCartButton);
	cy.get(inventoryPage.cartIcon)
		.shouldBeVisible()
		.invoke('text')
		.should((text) => {
			const count = parseInt(text.trim(), 10);
			expect(count).to.be.greaterThan(0);
		});
});

Cypress.Commands.add("drillDownToFirstProductDetails", () => {
	cy.get(inventoryPage.inventoryItem).first().within(() => {
		cy.clickButton(inventoryPage.itemName);
	});
	cy.get(inventoryPage.productName)
		.shouldBeVisible()
		.shouldContainText(inventoryItems[0].name);
});

Cypress.Commands.add("logout", () => {
	cy.clickButton(inventoryPage.menuButton);
	cy.clickButton(inventoryPage.logoutButton);
	cy.get(loginPage.loginButton).shouldBeVisible();
});

Cypress.Commands.add("openCartPage", () => {
	cy.clickButton(inventoryPage.cartIcon);
	cy.shouldIncludeUrl(cartPage.cartUrl);
})

Cypress.Commands.add("cancelCheckout", () => {
	cy.clickButton(cartPage.checkoutCancelButton);

	cy.url().should((url) => {
		expect(
			url.includes(inventoryPage.inventoryUrl) ||
			url.includes(cartPage.cartUrl)
		).to.be.true;
	});
});

Cypress.Commands.add("shouldBeVisible", { prevSubject: 'element' }, (subject) => {
	return cy.wrap(subject).should('be.visible');
});

Cypress.Commands.add("shouldContainText", { prevSubject: 'element' }, (subject, expectedText) => {
	return cy.wrap(subject).should('contain.text', expectedText);
});

Cypress.Commands.add("shouldNotContainText", { prevSubject: 'element' }, (subject, expectedText) => {
	cy.wrap(subject).should('not.contain.text', expectedText);
});

Cypress.Commands.add("shouldHaveLength", { prevSubject: 'element' }, (subject, expectedLength) => {
	return cy.wrap(subject).should('have.length', expectedLength);
});

Cypress.Commands.add("shouldHaveText", { prevSubject: 'element' }, (subject, expectedText) => {
	return cy.wrap(subject).should('have.text', expectedText);
});

Cypress.Commands.add("shouldBeEnabled", { prevSubject: 'element' }, (subject) => {
	return cy.wrap(subject).should('be.enabled');
});

Cypress.Commands.add('shouldIncludeUrl', (url) => {
	return cy.url().should('include', url);
});

Cypress.Commands.add('shouldNotExist', (selector) => {
	cy.get('body').find(selector).should('not.exist');
});

Cypress.Commands.add("clickButton", (subject) => {
	return cy
		.get(subject)
		.shouldBeVisible()
		.click();
});
