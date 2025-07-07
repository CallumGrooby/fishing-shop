// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart"; // adjust path if needed
import productReducer from "./Store/productSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export default store;
