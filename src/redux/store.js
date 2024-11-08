import { configureStore } from "@reduxjs/toolkit";
import { shopSlice } from "./features/shopSlice";
import shopapi from "./baseapi/baseApi";

export const store = configureStore({
  reducer: {
    [shopapi.reducerPath]: shopapi.reducer,
    shopSlice: shopSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopapi.middleware),
});
