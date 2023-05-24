const express = require("express");
const router = express.Router();

const productController = require("../../controllers/productInfoController");

router
  .route("/")
  .get(productController.getAllProductInfo)
  .post(productController.createProductInfo);

router.get("/limited", productController.getAllPrice);

router.get("/details/:pid", productController.getProductDetailsById);

router
  .route("/:id")
  .put(productController.updateProductInfo)
  .delete(productController.deleteProductInfo);

module.exports = router;
