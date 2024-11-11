import { configureStore } from "@reduxjs/toolkit";
import shopapi from "./baseapi/baseApi";
import userSlice from "./features/userSlice"
import shopSlice from "./features/shopSlice"

const store = configureStore({
  reducer: {
    [shopapi.reducerPath]: shopapi.reducer,
    shopSlice: shopSlice,
    userSlice: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopapi.middleware),
});

export default store;