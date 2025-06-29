import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "./Cart";
import { PriceComponent } from "./PriceComponent";

export const CartItemsList = ({ cartItems }) => {
  const dispatch = useDispatch();

  return (
    <>
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
                      Delete
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        // <CartItemsList cartItems={cartItems} />
      )}
    </>
  );
};
