import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducers from "./userReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import Wishlists from "./wishlists/Wishlists";
import adminReducer from "./adminReducer";
import { cartReducer } from "./cart/cartsReucer";

const rootReducer = combineReducers({
    user: userReducers,
    cart: cartReducer,
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