const express = require("express");
const Product = require("../models/productModels");
const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});
// get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
// get single product by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Update a Product
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);
		// if product not found
		if (!product) {
			res.status(404).json({ message: `Product with id ${id} not found` });
		}
		const updatedProduct = await Product.findById(id);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Delete a Product
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			res.status(404).json({ message: `Product with id ${id} not found` });
		} else {
			res.status(200).json(product);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
