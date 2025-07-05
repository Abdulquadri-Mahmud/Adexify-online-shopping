import { SET_CART_COUNT } from "./cartActions";

const initialState = {
  count: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_COUNT:
      return { ...state, count: action.payload };
    default:
      return state;
  }
};
