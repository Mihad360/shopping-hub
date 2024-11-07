import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: [],
};

export const shopSlice = createSlice({
  name: "shopSlice",
  initialState,
  reducers: {},
});

export default shopSlice.reducer;