import { allureCypress } from "allure-cypress/reporter";
import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.CYPRESS_ENV ? `.env.${process.env.CYPRESS_ENV}` : ".env",
});

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
  },
  env: {
    username: process.env.CYPRESS_username,
    password: process.env.CYPRESS_password
  },
});
