import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://shopping-hub-server.vercel.app",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const shopapi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Cart", "User", "Shop", "NewArrival", "Stats"],
  endpoints: (builder) => ({
    getShop: builder.query({
      query: () => "/shop",
      providesTags: ["Shop"],
    }),
    addItem: builder.mutation({
      query: (data) => ({
        url: "/shop",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),
    deleteShopItem: builder.mutation({
      query: (id) => ({
        url: `/shop/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shop"],
    }),
    getShopItem: builder.query({
      query: (id) => `/shop/${id}`,
      providesTags: ["Shop"],
    }),
    updateShopItem: builder.mutation({
      query: ({ id, ...item }) => ({
        url: `/shop/${id}`,
        method: "PATCH",
        body: item,
      }),
      invalidatesTags: ["Shop"],
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
      providesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result) =>
        result ? [{ type: "User", id: "LIST" }] : ["User"],
    }),
    updateAdmin: builder.mutation({
      query: (id) => ({
        url: `/users/admin/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    saveJwt: builder.mutation({
      query: (userInfo) => ({
        url: "/jwt",
        method: "POST",
        body: userInfo,
      }),
    }),
    getNewArrival: builder.query({
      query: () => "/newarrival",
      providesTags: ["NewArrival"], // Added tag
    }),
    addNewArrival: builder.mutation({
      query: (data) => ({
        url: "/newarrival",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["NewArrival"], // Added tag
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/newarrival/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["NewArrival"], // Added tag
    }),
    getIsAdmin: builder.query({
      query: (email) => `/users/admin/${email}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getPaymentList: builder.query({
      query: (email) => `/checkout-list?email=${email}`,
      providesTags: ["Stats"],
    }),
    getAdminstats: builder.query({
      query: () => "/admin-stats",
      providesTags: ["Stats"],
    }),
    getOrderstats: builder.query({
      query: () => "/order-stats",
      providesTags: ["Stats"],
    }),
    getUserstats: builder.query({
      query: () => "/user-stats",
      providesTags: ["Stats"],
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
  useSaveJwtMutation,
  useGetNewArrivalQuery,
  useGetIsAdminQuery,
  useDeleteUserMutation,
  useAddItemMutation,
  useDeleteShopItemMutation,
  useGetShopItemQuery,
  useUpdateShopItemMutation,
  useAddNewArrivalMutation,
  useUpdateStatusMutation,
  useGetPaymentListQuery,
  useGetAdminstatsQuery,
  useGetOrderstatsQuery,
  useGetUserstatsQuery,
} = shopapi;

export default shopapi;
