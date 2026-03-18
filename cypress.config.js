// const { defineConfig } = require("cypress");
import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  env: {
    username: process.env.CYPRESS_username,
    password: process.env.CYPRESS_password
  },
});
