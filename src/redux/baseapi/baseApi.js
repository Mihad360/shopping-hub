import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shopapi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Cart"],
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
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: (email) => `/cart?email=${email}`,
      providesTags: ["Cart"]
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"]
    }),
  }),
});

export const {
  useGetShopQuery,
  useAddUserMutation,
  useAddCartMutation,
  useGetCartQuery,
  useDeleteCartMutation,
} = shopapi;

export default shopapi;
