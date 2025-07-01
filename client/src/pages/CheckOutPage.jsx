import React, { useState } from "react";
import { CartItemsList } from "../components/CartItemsList";
import { useDispatch, useSelector } from "react-redux";
import { ShippingForm } from "../components/CheckOut/ShippingForm";
import { CartOverview } from "../components/CheckOut/CartOverView";
import { Payment } from "../components/CheckOut/Payment";
import { ShippingDetails } from "../components/CheckOut/ShippingDetails";

export const CheckOutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const sections = ["Shopping Cart", "Shipping Details", "Overview"];

  console.log(step);

  return (
    <div className="checkout-page mx-auto">
      <h1 className="title">Your Shopping Cart</h1>

      <div className="sections ">
        {sections.map((section, i) => (
          <div key={i} className={`section ${step === i + 1 ? "active" : ""}`}>
            <span>{i}</span>
            <h2>{section}</h2>
          </div>
        ))}
      </div>

      <section>
        {step === 1 && (
          <CartOverview onNext={() => setStep(2)} cartItems={cartItems} />
        )}
        {step === 2 && (
          <ShippingDetails
            setShippingData={setShippingData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Payment
            cartItems={cartItems}
            shippingData={shippingData}
            onBack={() => setStep(2)}
          />
        )}
      </section>
    </div>
  );
};
