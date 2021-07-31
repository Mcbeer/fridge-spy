import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8002/api/v1/" }),
  tagTypes: [],
  endpoints: (builder) => ({
    // Get locations in a house
    getLocationsByHouseId: builder.query({
      query: (houseId: string) => `location/${houseId}`,
    }),

    // Get location by it's id

    // Get Houses

    //
  }),
});
