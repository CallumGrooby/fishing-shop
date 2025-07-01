import React from "react";
import { ShippingForm } from "./ShippingForm";
import { useSelector } from "react-redux";
import { PriceSummary } from "./PriceSummary";

export const ShippingDetails = ({ setShippingData, onNext, onBack }) => {
  const cartItems = useSelector((state) => state.cart.items);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Shipping Data:", data);
    setShippingData(data);
    onNext(data);
  };

  return (
    <div className="payment-section">
      <ShippingForm handleSubmit={handleSubmit} />

      <section className="summary-section">
        <PriceSummary items={cartItems} />
        <button
          type="submit"
          form="shipping-form"
          className="continue-btn title"
        >
          Continue
        </button>
      </section>
    </div>
  );
};
