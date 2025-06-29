import React from "react";
import { CartItemsList } from "../components/CartItemsList";
import { useDispatch, useSelector } from "react-redux";
import { ShippingForm } from "../components/CheckOut/ShippingForm";

export const CheckOutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div>
      {/* 1 Cart Information */}

      <CartItemsList cartItems={cartItems} />

      {/* 2 */}

      <ShippingForm />
    </div>
  );
};
