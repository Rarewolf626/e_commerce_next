"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/addToCart.slice";
import authSlice from "./slices/auth.slice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
    key: "auth",
    storage,
};

const cartPersistConfig = {
    key: "cart",
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    cart: persistReducer(cartPersistConfig, cartSlice.reducer),
});

// Configure the store with the persisted reducers
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create the persistor to manage rehydrating the state
export const persistor = persistStore(store);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
