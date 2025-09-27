import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducers from "./userReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import Wishlists from "./wishlists/Wishlists";
import adminReducer from "./adminReducer";
import { cartReducer } from "./cart/cartsReducer";
import cartSlice from "./cart/cartSlice";
import wishlistSlice from "./cart/wishlistSlice";

const rootReducer = combineReducers({
    user: userReducers,
    cart: cartReducer,
    guestCart: cartSlice,
    guestWishlist: wishlistSlice,
    wishlist : Wishlists,
    admin: adminReducer
});

const persistConfig = {
    key : 'root',
    storage,
    version: 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    })
});

export const persistor = persistStore(store);