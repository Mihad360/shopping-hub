import { configureStore } from "@reduxjs/toolkit";
import shopapi from "./baseapi/baseApi";

const store = configureStore({
  reducer: {
    [shopapi.reducerPath]: shopapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      shopapi.middleware
    ),
});
export default store;
