const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");

//Generate Single Product
const createProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

// get single product by id
const getProductSingle = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//Update a Product by id
const updatedProduct = asyncHandler(async (req, res) => {
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
		res.status(500);
		throw new Error(error.message);
	}
});
// Delete a Product by id
const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			res.status(404);
			throw new Error(`Product with id ${id} not found`);
		} else {
			res.status(200).json(product);
		}
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

module.exports = {
	getAllProducts,
	createProduct,
	getProductSingle,
	updatedProduct,
	deleteProduct,
};
