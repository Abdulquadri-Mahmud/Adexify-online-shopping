// Correct import path and name
import { SET_WISHLIST_COUNT } from "./wishlistActions"; // ✅ Correct spelling

// Initial state
const initialState = {
  wishlistCount: 0, // ✅ Fixed spelling
};

// Reducer
export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WISHLIST_COUNT:
      return { ...state, wishlistCount: action.payload }; // ✅ Consistent
    default:
      return state;
  }
};
