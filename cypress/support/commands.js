import appData from "../fixtures/appData.json";
import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/inventoryPage";


Cypress.Commands.add("visitApp", () => {
	return cy.visit("/");
});


Cypress.Commands.add("login", (username, password) => {
	const loginPage = new LoginPage();
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
	const inventoryPage = new InventoryPage();
	const inventoryUrl = appData.inventoryUrl;
	const headerText = appData.headerText;
	return cy
		.url().should("include", inventoryUrl)
		.get(inventoryPage.headerLabel)
		.shouldBeVisible()
		.shouldHaveText(headerText);
});

Cypress.Commands.add("shouldBeVisible", { prevSubject: 'element' }, (subject) => {
	return cy.wrap(subject).should('be.visible');
});

Cypress.Commands.add("shouldContainText", { prevSubject: 'element' }, (subject, expectedText) => {
	return cy.wrap(subject).should('contain.text', expectedText);
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