import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shopapi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getShop: builder.query({
      query: () => "/shop",
    }),
    addUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: userInfo,
      }),
    }),
    addCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cart",
        method: "POST",
        body: cartInfo,
      }),
      invalidatesTags: ["cart"],
    }),
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["cart"],
    }),
  }),
});

export const {
  useGetShopQuery,
  useAddUserMutation,
  useAddCartMutation,
  useGetCartQuery,
} = shopapi;

export default shopapi;
