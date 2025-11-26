// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:inventoryId", invController.buildGetInventoryById);

// Route to build inventory management view
router.get("/management", invController.buildInventoryManagement);

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

// Route to insert a new classification
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Route to build add inventory view
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to insert a new inventory item
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router;