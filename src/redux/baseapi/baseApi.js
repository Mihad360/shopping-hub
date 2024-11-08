import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shopapi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    endpoints: (builder) => ({
        getShop: builder.query({
            query: () => "/shop",
        })
    })
})

export const {useGetShopQuery} = shopapi

export default shopapi;