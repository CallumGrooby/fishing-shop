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

app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate ObjectId format (optional but safe)
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Reviews

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userName: String,
    rating: Number, // e.g. 1 to 5
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "reviews" }
);

const Review = mongoose.model("Review", reviewSchema);

app.post("/add-review", async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    const review = new Review({
      productId,
      userName,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("❌ Failed to add review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

app.get("/product/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
