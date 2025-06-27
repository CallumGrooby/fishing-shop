require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Product schema & model (for "products" collection)
const productSchema = new mongoose.Schema(
  {
    name: String,
    priceInPence: Number,
    image: String,
    category: String,
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Optional: Log products on startup
    Product.find()
      .then((products) => {
        console.log("📦 All Products:", products.length);
        // console.log(JSON.stringify(products, null, 2));
      })
      .catch(console.error);
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Stripe checkout session route
app.post("/create-checkout-session", async (req, res) => {
  try {
    const itemIds = req.body.items.map((item) => item.id);

    const products = await Product.find({ _id: { $in: itemIds } });

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    const lineItems = req.body.items.map((item) => {
      const product = productMap.get(item.id);
      if (!product) {
        throw new Error(`Product with ID ${item.id} not found`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.priceInPence,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all products from unified "products" collection
app.post("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/get-home-sections", async (req, res) => {
  try {
    const sections = await mongoose.connection.db
      .collection("homeSections")
      .find()
      .sort({ position: 1 })
      .toArray();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homepage sections" });
  }
});

app.get("/get-special-offers", async (req, res) => {
  try {
    const sections = await mongoose.connection.db
      .collection("specialOffers")
      .find()
      .toArray();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch special offers" });
  }
});

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
