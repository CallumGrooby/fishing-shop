import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";

import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
} from "../components/Cart";
import { PriceComponent } from "../components/PriceComponent";
import { Link } from "react-router-dom";
import { CartItemsList } from "../components/CartItemsList";
import { DeleteIcon } from "../components/Icons/DeleteIcon";
export const CartPage = ({ closeModal }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckOut = () => {
    closeModal("cartOpen");
  };

  console.log("Cart Items", cartItems);

  return (
    <div className="cart-container">
      <div className="border-bottom">
        <h2 className="cart-title">Your Cart</h2>

        <button
          className="mobile-only close-button"
          onClick={() => closeModal("cartOpen")}
        >
          x
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.li
                className="cart-item"
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.25 } }}
                layout
              >
                <div className="cart-item-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <p className="product-name">{item.name}</p>

                  <PriceComponent product={item} />

                  <div className="action-buttons-container">
                    <div className="quantity-container">
                      <button
                        className="quantity-button"
                        onClick={() =>
                          dispatch(decreaseQuantity({ _id: item.id }))
                        }
                      >
                        -
                      </button>
                      <p className="quantity-text">{item.quantity}</p>
                      <button
                        className="quantity-button"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() => dispatch(removeFromCart({ _id: item.id }))}
                    >
                      <DeleteIcon className="icon" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        // <CartItemsList cartItems={cartItems} />
      )}

      <Link className="offer-button" to={"checkout"} onClick={handleCheckOut}>
        Check Out
      </Link>
    </div>
  );
};
