require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/productsRoutes");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT_NUM || 4000;
app.use(express.json());
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
	res.send("Hello Node API Learning");
});
app.get("/blog", (req, res) => {
	res.send("Hello From Blog API");
});
app.get("/portfolio", (req, res) => {
	res.send("Hello From portfolio API");
});

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
