import React from "react";
import { CartItemsList } from "../CartItemsList";
import { PriceSummary } from "./PriceSummary";

export const CartOverview = ({ onNext, cartItems }) => {
  return (
    <div className="payment-section">
      <CartItemsList cartItems={cartItems} />

      <section className="summary-section">
        <PriceSummary items={cartItems} />
        <button className="continue-btn " onClick={() => onNext()}>
          Go to Checkout
        </button>
      </section>
    </div>
  );
};
