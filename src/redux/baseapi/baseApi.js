import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setLogout } from "../features/userSlice";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const BaseQueryWithLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && [401, 403, 404].includes(result.error.status)) {
    console.log(result);
    await signOut(auth)
    await api.dispatch(setLogout())
    await localStorage.removeItem("access-token");
    window.location.href = "/signin";
  }

  return result;
};

const shopapi = createApi({
  reducerPath: "api",
  baseQuery: BaseQueryWithLogout,
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
    }),
    getIsAdmin: builder.query({
      query: (email) => `/users/admin/${email}`
    })
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
  useGetIsAdminQuery
} = shopapi;

export default shopapi;
