import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shopapi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Cart", "User"],
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
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ["User"]
    }),
    updateAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"]
    }),
  }),
});

export const {
  useGetShopQuery,
  useAddUserMutation,
  useAddCartMutation,
  useGetCartQuery,
  useDeleteCartMutation,
  useGetUsersQuery,
  useUpdateAdminMutation,
} = shopapi;

export default shopapi;
