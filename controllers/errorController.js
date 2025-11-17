// controllers/errorController.js
const errorTest = (req, res, next) => {
  throw new Error("Intentional server error for testing.")
}

module.exports = { errorTest }