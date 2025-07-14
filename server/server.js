require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();

app.use(
  cors({
    origin: "*", // For testing; use your Vercel domain in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  "/webhook",
  express.raw({ type: "application/json" }) // Needed for Stripe webhook
);
app.use(express.json()); // For all other routes

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

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

const sessionDataStore = new Map(); // Replace with DB in production

// Stripe checkout session route
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
          currency: "gbp",
          product_data: {
            name: product.name,
          },
          unit_amount: product.salePriceInPence ?? product.priceInPence,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    sessionDataStore.set(session.id, {
      items: req.body.items,
      shipping: req.body.shippingData,
    });
    console.log(session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/checkout-data", async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const order = await Order.findOne({ stripeSessionId: sessionId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("Failed to fetch order:", err);
    res.status(500).json({ error: "Server error" });
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

//  Orders
const orderSchema = new mongoose.Schema(
  {
    stripeSessionId: String,
    userEmail: String,
    shipping: Object,
    items: Array,
    paymentStatus: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    // Try to construct a webhook with the stripe-signature
    try {
      const sig = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const sessionId = session.id;

      const sessionData = sessionDataStore.get(sessionId);

      if (!sessionData) {
        console.error("❌ No session data found for:", sessionId);
        return res.status(200).send(); // Exit gracefully
      }

      const order = new Order({
        stripeSessionId: sessionId,
        userEmail: sessionData.shipping.email,
        shipping: sessionData.shipping,
        items: sessionData.items,
        paymentStatus: "paid",
      });

      try {
        await order.save();
        console.log("✅ Order saved:", order._id);
      } catch (err) {
        console.error("❌ Error saving order:", err);
      }

      sessionDataStore.delete(sessionId); // Optional cleanup
    }

    res.status(200).send(); // Always respond
  }
);

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
