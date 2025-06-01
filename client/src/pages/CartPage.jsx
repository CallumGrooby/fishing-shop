import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
} from "../components/Cart";
export const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckOut = () => {
    console.log("Button Clicked");
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
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
    <div>
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>{item.id}</p>
              <p>{item.quantity}</p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Delete
              </button>
              <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                -
              </button>
              <button onClick={() => dispatch(addToCart(item.id))}>+</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleCheckOut}>Check Out</button>
    </div>
  );
};
