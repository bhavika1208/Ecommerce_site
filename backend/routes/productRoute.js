const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts); // for adding to db we use get
router
  .route("admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct); // for getting from db we use post
router
  .route("admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProducts)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProducts);
  
  router.route("/product/:id").get(getProductDetails); // for updating we use put

module.exports = router;
