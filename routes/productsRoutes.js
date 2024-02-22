const express = require("express");

const router = express.Router();
const {
	createProduct,
	getAllProducts,
	getProductSingle,
	updatedProduct,
	deleteProduct,
} = require("../controllers/productControllers");

// Create a product
router.post("/", createProduct);

// get all products
router.get("/", getAllProducts);

// get single product by id
router.get("/:id", getProductSingle);

//Update a Product by id
router.put("/:id", updatedProduct);

// Delete a Product by id
router.delete("/:id", deleteProduct);

module.exports = router;
