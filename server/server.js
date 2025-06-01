require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// Rod schema and model (unchanged)
const rodSchema = new mongoose.Schema(
  {
    name: String,
    priceInPence: Number,
  },
  { collection: "Rods" }
);
const Rod = mongoose.model("Rod", rodSchema);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Log all rods on startup (optional)
    Rod.find()
      .then((rods) => {
        console.log("📦 All Rods:");
        console.log(JSON.stringify(rods, null, 2));
      })
      .catch(console.error);
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Stripe checkout session route (unchanged)
app.post("/create-checkout-session", async (req, res) => {
  try {
    const itemIds = req.body.items.map((item) => item.id);

    // Fetch rods by _id from Rod collection (using Mongoose)
    const rods = await Rod.find({ _id: { $in: itemIds } });

    const rodMap = new Map(rods.map((rod) => [rod._id.toString(), rod]));

    const lineItems = req.body.items.map((item) => {
      const rod = rodMap.get(item.id);
      if (!rod) {
        throw new Error(`Rod with ID ${item.id} not found`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: rod.name,
          },
          unit_amount: rod.priceInPence,
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

// New: Get all products from all collections dynamically
app.post("/get-products", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    // List all collections in the database
    const collections = await db.listCollections().toArray();

    const allProducts = [];

    for (const collection of collections) {
      // Fetch all docs from each collection
      const docs = await db.collection(collection.name).find({}).toArray();

      // Add collection name to each doc for frontend use
      allProducts.push(
        ...docs.map((doc) => ({
          ...doc,
          collection: collection.name,
        }))
      );
    }

    // Log all products on the server
    console.log("📦 All Products:");
    console.log(JSON.stringify(allProducts, null, 2));

    res.json({ products: allProducts });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
