// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart.js"; // adjust path if needed
import productReducer from "./productSlice.js";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export default store;
