import React from "react";
import { PriceSummary } from "./PriceSummary";
import { CartItemsList } from "../CartItemsList";
import { addToCart } from "../Cart";
import { motion, AnimatePresence } from "framer-motion";
import { PriceComponent } from "../PriceComponent";
import { useSelector } from "react-redux";

export const Payment = ({ onBack, shippingData }) => {
  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckOut = () => {
    // Sort all the items, so that i am only send the valid information (server, then find the products in the database by the id, so the client cant change the price)
    const minimalItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    console.log(shippingData);

    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: minimalItems,
        shippingData: shippingData,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log(url);
        // window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <div className="payment-section">
      <section className="cart-items">
        <div className="">
          <h2
            className="title"
            style={{ cursor: "pointer", marginTop: "1rem" }}
          >
            Items in Your Order
          </h2>
          <Cart cartItems={cartItems} />
        </div>

        <div className="inputted-address-section">
          <h2 className="title">Delivery Address</h2>

          <div className="shipping-review">
            <div className="shipping-row">
              <span>Full Name</span>
              <span>{shippingData.fullName}</span>
            </div>
            <div className="shipping-row">
              <span>Email</span>
              <span>{shippingData.email}</span>
            </div>
            <div className="shipping-row">
              <span>Phone</span>
              <span>{shippingData.phone}</span>
            </div>
            <div className="shipping-row">
              <span>Address</span>
              <span>
                {shippingData.address1}
                {shippingData.address2 && `, ${shippingData.address2}`}
              </span>
            </div>
            <div className="shipping-row">
              <span>City</span>
              <span>{shippingData.city}</span>
            </div>
            <div className="shipping-row">
              <span>Postcode</span>
              <span>{shippingData.postcode}</span>
            </div>
            <div className="shipping-row">
              <span>Country:</span>
              <span>{shippingData.country}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right: Summary + Checkout */}
      <div className="summary-section">
        <PriceSummary items={cartItems} />
        <button onClick={handleCheckOut} className="continue-btn">
          Complete Purchase
        </button>
        <button onClick={onBack} className="continue-btn">
          Back To Shipping
        </button>
      </div>
    </div>
  );
};

export const Cart = ({ cartItems }) => {
  return (
    <ul className="cart-items">
      <AnimatePresence>
        {cartItems.map((item) => (
          <motion.li
            className="cart-item"
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.25 } }}
            layout
          >
            <div className="cart-item-image-container">
              <img src={item.image} alt={item.name} className="product-image" />
            </div>

            <div className="product-info">
              <p className="product-name">{item.name}</p>

              <PriceComponent product={item} />
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
