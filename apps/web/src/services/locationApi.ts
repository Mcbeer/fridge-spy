import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//
export const locationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8002/api/v1/" }),
  tagTypes: [],
  endpoints: (builder) => ({
    // Query
    getLocationsByHouseId: builder.query({
      query: (houseId: string) => `location/${houseId}`,
    }),
    getUserHouses: builder.query({
      query: () => `house`
    }),
    getHouseById: builder.query({
      query: (houseId: string) => `house/${houseId}`
    })
    // Posts

    // Updates

    // Deletes
  }),
});
