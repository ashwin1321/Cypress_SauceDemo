import LoginPage from "../pages/LoginPage.js"
import variables from "../fixtures/variables.json"
import InventoryPage from "../pages/inventoryPage.js"

let login = new LoginPage();

describe("Scenario 1: Login to the Application", () => {


    it("Test 1: Valid Login", () => {

        try {

            login.visitUrl();

            login.login(variables.username, variables.password);
            cy.url().should("include", variables.inventoryUrl)
            cy.get(InventoryPage.headerLabel).should("have.text", variables.headerText)
            cy.log("-------- Login Completed successfully --------")

        } catch (e) {
            console.log("Something went Wrong!" + e);
            cy.log("Soemthing went Wrong!" + e)
        }

    })
})