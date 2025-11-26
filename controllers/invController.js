const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by id view
 * ************************** */

invCont.buildGetInventoryById = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryById(inventory_id)
  const grid = utilities.buildVehicleDetail(data[0])
  let nav = await utilities.getNav()
  res.render("./inventory/inventory", {
    title: data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model,
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory management view
 * ************************** */

invCont.buildInventoryManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {  
    title: "Inventory Management",
    errors: null,
    nav,
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */

invCont.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null
  })
}

/* ***************************
 *  Add classification
 * ************************** */

invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)

  let nav = await utilities.getNav()

  if (result) {
    req.flash("notice", "Classification added successfully.")
    res.redirect("/inv/management")
  } else {
    req.flash("error", "Failed to add classification.")
    res.render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null
    })
  }
}

/* ***************************
 *  Build add inventory view and add inventory
 * ************************** */

invCont.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()

  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationList,
    errors: null,
    inv_make: "",
    inv_model: "",
    inv_description: "",
    inv_image: "/images/vehicles/no-image.png",
    inv_thumbnail: "/images/vehicles/no-image-tn.png",
    inv_price: "",
    inv_year: "",
    inv_miles: "",
    inv_color: ""
  })
}

/* ***************************
 *  Add inventory
 * ************************** */

invCont.addInventory = async function (req, res) {
  const {
    classification_id, 
    inv_make, inv_model, 
    inv_description,
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color
  } = req.body

  const result = await invModel.addInventory(
    classification_id, 
    inv_make, 
    inv_model, 
    inv_description,
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color
  )

  let nav = await utilities.getNav()

  if (result) {
    req.flash("notice", "Inventory item added successfully.")
    res.redirect("/inv/management")
  } else {
    req.flash("error", "Failed to add vehicle.")
    const classificationList = await utilities.buildClassificationList(classification_id)

    res.render("./inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: null,
      ...req.body
    })
  }
}

module.exports = invCont;