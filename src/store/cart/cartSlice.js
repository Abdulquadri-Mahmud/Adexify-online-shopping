import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("guestCart")
    ? JSON.parse(localStorage.getItem("guestCart"))
    : [],
  error: null,
  success: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload; // ✅ take product directly
      const findProductIndex = state.items.findIndex(
        (item) =>
          item.productId === product.productId &&
          item.selectedSize === product.selectedSize // handle size uniqueness
      );

      if (findProductIndex >= 0) {
        // Item already exists
        state.error = "This item is already in your cart.";
        state.success = null;
      } else {
        // Add new item
        state.items.push({ ...product, quantity: product.quantity || 1 });
        state.error = null;
        state.success = "Item added to cart!";
      }

      localStorage.setItem("guestCart", JSON.stringify(state.items));
    },

    changeQuantity: (state, action) => {
      const { productId, selectedSize, quantity } = action.payload;
      const findProductIndex = state.items.findIndex(
        (item) =>
          item.productId === productId && item.selectedSize === selectedSize
      );

      if (findProductIndex >= 0) {
        if (quantity > 0) {
          state.items[findProductIndex].quantity = quantity;
        } else {
          state.items = state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.selectedSize === selectedSize
              )
          );
        }
      }

      localStorage.setItem("guestCart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const { productId, selectedSize } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId && item.selectedSize === selectedSize
          )
      );

      localStorage.setItem("guestCart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("guestCart");
    },

     clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.success = null;
    },
  },
});

export const { addToCart, changeQuantity, removeFromCart, clearError, clearSuccess, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
