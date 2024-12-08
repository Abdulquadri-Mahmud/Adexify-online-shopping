import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlists : localStorage.getItem('wishlist-items') ? JSON.parse(localStorage.getItem('wishlist-items')) : []
}

const wishlistsSlice = createSlice({
    name: 'wishlist-items',
    initialState,
    reducers: {
        addWishlist : (state, action) => {
            const {productID, quantity, productName, userId, productPrice, productImage} = action.payload;
            const findProductIndex = (state.wishlists).findIndex((list) => list.productID === productID);
            if (findProductIndex >= 0) {
                // state.items[findProductIndex].quantity += quantity;
            }else{
                state.wishlists.push({productID, quantity, productName, userId, productPrice, productImage});
                localStorage.setItem('wishlist-items', JSON.stringify(state.wishlists));
            }
        },
        deleteWishlist: (state, action) => {
            const { productID } = action.payload;

            const findProductIndex = (state.wishlists).findIndex(item => item.productID === productID);

            if (findProductIndex || !findProductIndex) {
                state.wishlists = (state.wishlists).filter(item => item.productID !== productID);
                // console.log(findProductIndex);
            }
        }
    }
});

export const { addWishlist, deleteWishlist } = wishlistsSlice.actions;

export default wishlistsSlice.reducer;