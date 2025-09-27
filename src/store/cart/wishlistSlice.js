import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if it exists
const initialCart = JSON.parse(localStorage.getItem("guestCart")) || [];

const wishlistSlice = createSlice({
  name: "guestWishlist",
  initialState: {
    items: initialCart,
    error: null,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const exists = state.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.selectedSize === newItem.selectedSize
      );

      if (exists) {
        state.error = "This item is already in your cart.";
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
        state.error = null; // reset error only on success
        localStorage.setItem("guestCart", JSON.stringify(state.items));
      }
    },
    clearWishlistError: (state) => {
      state.error = null;
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);

      localStorage.setItem("guestCart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex((item) => item.productId === productId);

      if (index >= 0) {
        state.items[index].quantity = quantity;
      }

      localStorage.setItem("guestCart", JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("guestCart");
    },

    setWishlist: (state, action) => {
      state.items = action.payload || [];
      localStorage.setItem("guestCart", JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, clearWishlistError, removeFromWishlist, updateQuantity, clearWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
