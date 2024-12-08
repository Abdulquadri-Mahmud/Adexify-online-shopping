import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart : (state, action) => {
            const { productID, quantity, productName, userId, productPrice, productImage, productSize} = action.payload;
            const findProductsID = (state.items).findIndex(item => item.productID === productID);
            if (findProductsID >= 0) {
                // state.items[findProductsID].quantity += quantity;
            }
            else{
                state.items.push({productID, quantity, productName, productImage, productPrice, userId, productSize});
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        changeQuantity: (state, action) => {
            const {productID, quantity} = action.payload;
            const findProductsID = (state.items).findIndex(item => item.productID === productID);
            if (quantity > 0) {
                state.items[findProductsID].quantity = quantity;
            }
            else{
                state.items = (state.items).filter(item => item.productID !== productID);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        }, 
        deleteProduct: (state, action) => {
            const { productID } = action.payload;

            const findProductIndex = (state.items).findIndex(item => item.productID === productID);

            if (findProductIndex || !findProductIndex) {
                state.items = (state.items).filter(item => item.productID !== productID);
                // console.log(findProductIndex);
            }
        }
    }
})
export const { addToCart, changeQuantity, deleteProduct} = cartSlice.actions;

export default cartSlice.reducer;