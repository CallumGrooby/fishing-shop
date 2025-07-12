import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const id = product._id || product.id; // Fallback for cart or product format

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1, id: id });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload._id;
      state.items = state.items.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload._id;
      const item = state.items.find((item) => item.id === productId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== productId);
        }

        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    updateCartItem: (state, action) => {
      const { id, updates } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        Object.assign(item, updates);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  updateCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
