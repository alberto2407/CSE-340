// Needed Resources 
const regValidate = require('../utilities/account-validation')
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

// Route: GET to display the login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route: GET to display the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route: POST to process login data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send("login process")
  }
)

module.exports = router;