// cart.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        // If already in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // If not, add new with quantity 1
        state.items.push({ id: action.payload, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      // Remove completely based on ID
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // If quantity drops to 0, remove item
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }

        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
  },
});

// Export the actions to use in components
export const { addToCart, removeFromCart, decreaseQuantity } =
  cartSlice.actions;

// Export the reducer to use in store.js
export default cartSlice.reducer;
