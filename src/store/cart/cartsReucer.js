// actions/cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const changeQuantity = (productID, size, quantity) => ({
  type: CHANGE_QUANTITY,
  payload: { productID, size, quantity },
});

export const removeItem = (productID) => ({
  type: REMOVE_ITEM,
  payload: productID,
});

// reducers/cartReducer.js
// import { ADD_TO_CART, CHANGE_QUANTITY, REMOVE_ITEM } from '../actions/cartActions';

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItem = action.payload;
      const existing = state.items.find(item => item.productID === newItem.productID);

      if (existing) {
        const updatedItems = state.items.map(item => {
          if (item.productID === newItem.productID) {
            const mergedSizes = { ...item.items };
            for (let size in newItem.items) {
              mergedSizes[size] = (mergedSizes[size] || 0) + newItem.items[size];
            }
            return { ...item, items: mergedSizes };
          }
          return item;
        });
        return { ...state, items: updatedItems };
      }

      return { ...state, items: [...state.items, newItem] };
    }

    case CHANGE_QUANTITY: {
        const { productID, size, quantity } = action.payload;

        return {
            ...state,
            items: state.items.map(item => {
            if (item.productID === productID) {
                // Create a copy of sizes
                const updatedSizes = { ...item.items };

                if (quantity < 1) {
                // Remove that size key only if quantity < 1
                delete updatedSizes[size];
                } else {
                // Otherwise update or add
                updatedSizes[size] = quantity;
                }

                // Return item even if updatedSizes is empty (to keep no-size products)
                return { ...item, items: updatedSizes };
            }
            return item;
            }),
        };
    }


    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.productID !== action.payload),
      };
    }

    default:
      return state;
  }
};
