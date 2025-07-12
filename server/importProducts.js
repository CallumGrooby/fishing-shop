require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// ✅ Product Schema — must match your app's product structure
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    priceInPence: Number,
    salePriceInPence: Number,
    available: Boolean,
    tags: [String],
    category: String,
    image: String,
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

async function importProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const filePath = path.join(__dirname, "products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Optional: clear existing products
    // await Product.deleteMany({});

    const result = await Product.insertMany(products);
    console.log(`✅ Inserted ${result.length} products`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing products:", err);
    process.exit(1);
  }
}

importProducts();
