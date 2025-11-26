const { body, validationResult } = require("express-validator")
const validate = {}

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlpha()
      .withMessage("Classification name must contain only letters, no spaces.")
  ]
}

validate.checkClassificationData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = req.nav
    return res.render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors
    })
  }
  next()
}

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .notEmpty()
      .withMessage("Make required"),
    body("inv_model")
      .notEmpty()
      .withMessage("Model required"),
    body("inv_description")
      .notEmpty()
      .withMessage("Description required"),
    body("inv_price")
      .isNumeric()
      .withMessage("Price must be a number"),
    body("inv_year")
      .isInt()
      .withMessage("Year must be an integer"),
    body("inv_miles")
      .isNumeric()
      .withMessage("Miles must be numeric"),
    body("inv_color")
      .notEmpty()
      .withMessage("Color required")
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await require("../utilities").getNav()
    let classificationList = await require("../utilities").buildClassificationList(req.body.classification_id)

    return res.render("./inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors,
      ...req.body
    })
  }
  next()
}

module.exports = validate
