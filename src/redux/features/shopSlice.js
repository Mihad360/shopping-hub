import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: [],
};

const shopSlice = createSlice({
  name: "shopSlice",
  initialState,
  reducers: {},
});

export default shopSlice.reducer;