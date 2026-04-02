const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 MongoDB URL paste here
mongoose.connect("YOUR_MONGODB_URL");

// 📦 Schema
const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  image: String
});

// 🔐 LOGIN
app.post("/api/login", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "1234") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ➕ ADD PRODUCT
app.post("/api/add-product", async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json({ msg: "Added" });
});

// 📦 GET PRODUCTS
app.get("/api/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// 🛒 BUY
app.post("/api/buy", (req, res) => {
  res.json({ msg: "Order placed" });
});

app.listen(3000, () => console.log("Server running"));