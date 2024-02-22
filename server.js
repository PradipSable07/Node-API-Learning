require("dotenv").config();
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/ProductsRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const morgan = require("morgan");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT_NUM || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes for app start
app.get("/", (req, res) => {
	// throw new Error("Fake Error generated for testing purpose");
	res.send("Hello Node API Learning");
});
app.get("/blog", (req, res) => {
	res.send("Hello From Blog API");
});
app.get("/portfolio", (req, res) => {
	res.send("Hello From portfolio API");
});

// routes for products
app.use("/api/products", productRoutes);
app.use(errorMiddleware);
mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log("Connected too MongoDB");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}....`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
