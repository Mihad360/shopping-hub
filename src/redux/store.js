import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage as default storage
import shopapi from "./baseapi/baseApi";
import userSlice from "./features/userSlice";
import shopSlice from "./features/shopSlice";

// Configure persistence for the userSlice reducer
const persistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    [shopapi.reducerPath]: shopapi.reducer,
    shopSlice: shopSlice,
    userSlice: persistedUserReducer, // Use persisted reducer for userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(shopapi.middleware),
});

export const persistor = persistStore(store); // Create persistor instance
export default store;
